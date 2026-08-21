import { useState } from "react";

const CONVEX_URL = "https://amiable-moose-236.convex.cloud";

const WEEKDAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"] as const;
const TIME_BLOCKS = ["Morning", "Afternoon", "Evening"] as const;
const CLASSES = ["120", "171", "105"] as const;

type Availability = Record<string, string[]>;

interface FormState {
  internshipType: "" | "campus" | "external" | "both";
  program: "" | "rat" | "ftma" | "other";
  firstName: string;
  lastName: string;
  swcEmail: string;
  priorInternshipHere: "" | "yes" | "no";
  classesTaken: string[];
  classesNone: boolean;
  classesOther: string;
  currentlyRegistered: "" | "yes" | "no";
  currentClasses: string;
  whyIntern: string;
  careerGoals: string;
  experience: string;
  availability: Availability;
  availabilityNotes: string;
  attendMeeting: "" | "yes" | "cannot-attend";
  acceptedTerms: boolean;
}

const EMPTY: FormState = {
  internshipType: "",
  program: "",
  firstName: "",
  lastName: "",
  swcEmail: "",
  priorInternshipHere: "",
  classesTaken: [],
  classesNone: false,
  classesOther: "",
  currentlyRegistered: "",
  currentClasses: "",
  whyIntern: "",
  careerGoals: "",
  experience: "",
  availability: {},
  availabilityNotes: "",
  attendMeeting: "",
  acceptedTerms: false,
};

const inputCls =
  "w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50";
const selectCls = inputCls + " cursor-pointer";
const labelCls = "block font-semibold mb-2 text-foreground";
const hintCls = "text-sm text-muted-foreground mb-3";

function toggle(list: string[], value: string): string[] {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}

export default function InternshipForm() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const toggleAvailability = (day: string, block: string) =>
    setForm((f) => {
      const current = f.availability[day] ?? [];
      return {
        ...f,
        availability: { ...f.availability, [day]: toggle(current, block) },
      };
    });

  const wantsCampus = form.internshipType === "campus" || form.internshipType === "both";
  // External-only track short-circuits: no questionnaire, just a redirect to
  // the Work Experience Education coordinator.
  const externalOnly = form.internshipType === "external";

  // Conditional flow: each step unlocks once the previous one is answered.
  // Steps with `skip: true` are hidden AND count as answered, so the chain
  // continues past them (e.g. no availability grid for external-only).
  const steps: { key: string; answered: boolean; skip?: boolean }[] = [
    { key: "type", answered: form.internshipType !== "" },
    { key: "program", answered: form.program !== "" },
    { key: "name", answered: form.firstName.trim() !== "" && form.lastName.trim() !== "" },
    { key: "email", answered: form.swcEmail.trim() !== "" },
    { key: "prior", answered: form.priorInternshipHere !== "" },
    {
      key: "classes",
      answered: form.classesTaken.length > 0 || form.classesNone || form.classesOther.trim() !== "",
    },
    { key: "registered", answered: form.currentlyRegistered !== "" },
    {
      key: "currentClasses",
      answered: form.currentClasses.trim() !== "",
      skip: form.currentlyRegistered !== "yes",
    },
    { key: "why", answered: form.whyIntern.trim() !== "" },
    { key: "goals", answered: form.careerGoals.trim() !== "" },
    { key: "experience", answered: form.experience.trim() !== "" },
    {
      key: "availability",
      answered: WEEKDAYS.some((d) => (form.availability[d] ?? []).length > 0),
      skip: !wantsCampus,
    },
    { key: "meeting", answered: form.attendMeeting !== "" },
    { key: "terms", answered: form.acceptedTerms },
  ];

  // A step is visible when every prior non-skipped step is answered.
  const visible = new Set<string>();
  let unlocked = true;
  for (const s of steps) {
    if (s.skip || (externalOnly && s.key !== "type")) continue;
    if (unlocked) visible.add(s.key);
    if (!s.answered) unlocked = false;
  }
  const allAnswered = unlocked;
  const answeredCount = steps.filter((s) => !s.skip && s.answered).length;
  const totalCount = steps.filter((s) => !s.skip).length;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    const internshipTypes =
      form.internshipType === "both"
        ? ["campus-studio", "external"]
        : form.internshipType === "campus"
          ? ["campus-studio"]
          : ["external"];

    const classesTaken = form.classesNone && form.classesTaken.length === 0
      ? ["none"]
      : form.classesTaken;

    try {
      const res = await fetch(`${CONVEX_URL}/api/mutation`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          path: "internshipApplications:submitApplication",
          args: {
            firstName: form.firstName,
            lastName: form.lastName,
            swcEmail: form.swcEmail,
            program: form.program || undefined,
            internshipTypes,
            whyIntern: form.whyIntern,
            classesTaken,
            classesOther: form.classesOther || undefined,
            careerGoals: form.careerGoals,
            priorInternshipHere: form.priorInternshipHere === "yes",
            experience: form.experience,
            currentlyRegistered: form.currentlyRegistered === "yes",
            currentClasses: form.currentClasses || undefined,
            availability: WEEKDAYS.map((day) => ({
              day,
              blocks: form.availability[day] ?? [],
            })),
            availabilityNotes: form.availabilityNotes || undefined,
            attendMeeting: form.attendMeeting,
            acceptedTerms: form.acceptedTerms,
          },
          format: "json",
        }),
      });

      const data = await res.json();
      if (data.status === "error") {
        setError(data.errorMessage || "Submission failed. Please try again.");
      } else {
        setSubmitted(true);
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-card rounded-xl border border-border p-8 text-center max-w-2xl mx-auto">
        <div className="text-4xl mb-4">🎧</div>
        <h2 className="text-2xl font-bold mb-3">Application received!</h2>
        <p className="text-muted-foreground">
          Thanks, {form.firstName}. We'll follow up at your Southwestern College
          email with the room for the mandatory intern meeting on{" "}
          <strong className="text-foreground">Wednesday, September 2 at noon</strong>{" "}
          and how to enroll in {form.program === "ftma" ? "FTMA 290" : "RA&T 290"}.
          {form.attendMeeting === "cannot-attend" &&
            " Since you can't attend, remember to email southwesternrecording@gmail.com to schedule your meeting."}
        </p>
      </div>
    );
  }

  const card = "bg-card rounded-xl border border-border p-6";

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-4">
      {/* Progress */}
      {!externalOnly && (
      <div className="flex items-center gap-3 px-1">
        <div className="h-1.5 flex-1 rounded-full bg-border overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${Math.round((answeredCount / totalCount) * 100)}%` }}
          />
        </div>
        <span className="text-xs text-muted-foreground tabular-nums">
          {answeredCount}/{totalCount}
        </span>
      </div>
      )}

      {/* 1. Internship type */}
      {visible.has("type") && (
        <div className={card}>
          <label className={labelCls} htmlFor="internshipType">
            Which internship are you interested in?
          </label>
          <select
            id="internshipType"
            className={selectCls}
            value={form.internshipType}
            onChange={(e) => set("internshipType", e.target.value as FormState["internshipType"])}
          >
            <option value="" disabled>
              Choose one…
            </option>
            <option value="campus">Campus Recording Studio Internship</option>
            <option value="external">External internship (off-campus studio, venue, or company)</option>
            <option value="both">Both — I'm open to either</option>
          </select>
        </div>
      )}

      {/* External-only: redirect to the Work Experience Education coordinator */}
      {externalOnly && (
        <div className={card}>
          <span className={labelCls}>You're all set — one email to send</span>
          <p className="text-foreground leading-relaxed mb-4">
            External internships are coordinated by{" "}
            <strong>Julie Swanson</strong>, Work Experience Education
            Coordinator (Career &amp; Transfer Connections). Reach out to her
            directly and she'll get you set up:
          </p>
          <a
            href="mailto:jswanson@swccd.edu?subject=External%20internship%20inquiry"
            className="inline-block rounded-lg bg-primary text-primary-foreground font-semibold px-6 py-3 hover:opacity-90 transition"
          >
            Email jswanson@swccd.edu
          </a>
          <p className="text-sm text-muted-foreground mt-4">
            Also interested in the campus studio? Switch your answer above to
            "Both" to fill out the studio application too.
          </p>
        </div>
      )}

      {/* 2. Program */}
      {visible.has("program") && (
        <div className={card}>
          <label className={labelCls} htmlFor="program">
            Which program are you in (or closest to)?
          </label>
          <select
            id="program"
            className={selectCls}
            value={form.program}
            onChange={(e) => set("program", e.target.value as FormState["program"])}
          >
            <option value="" disabled>
              Choose one…
            </option>
            <option value="rat">Recording Arts &amp; Technology (RA&amp;T)</option>
            <option value="ftma">Film, Television &amp; Media Arts (FTMA)</option>
            <option value="other">Other / undecided</option>
          </select>
          {form.program !== "" && (
            <p className="text-sm text-muted-foreground mt-3">
              {form.program === "ftma"
                ? "Film interns enroll in FTMA 290 — we'll walk you through it at the intern meeting."
                : form.program === "rat"
                  ? "RA&T interns enroll in RA&T 290 — we'll walk you through it at the intern meeting."
                  : "No problem — we'll help you figure out the right path at the intern meeting."}
            </p>
          )}
        </div>
      )}

      {/* 3. Name */}
      {visible.has("name") && (
        <div className={card}>
          <span className={labelCls}>What's your name?</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              aria-label="First name"
              className={inputCls}
              placeholder="First name"
              value={form.firstName}
              onChange={(e) => set("firstName", e.target.value)}
            />
            <input
              aria-label="Last name"
              className={inputCls}
              placeholder="Last name"
              value={form.lastName}
              onChange={(e) => set("lastName", e.target.value)}
            />
          </div>
        </div>
      )}

      {/* 4. SWC email */}
      {visible.has("email") && (
        <div className={card}>
          <label className={labelCls} htmlFor="swcEmail">
            What is your Southwestern College email?
          </label>
          <input
            id="swcEmail"
            type="email"
            className={inputCls}
            placeholder="you@student.swccd.edu"
            value={form.swcEmail}
            onChange={(e) => set("swcEmail", e.target.value)}
          />
        </div>
      )}

      {/* 5. Prior internship */}
      {visible.has("prior") && (
        <div className={card}>
          <label className={labelCls} htmlFor="prior">
            Have you done an internship here before?
          </label>
          <select
            id="prior"
            className={selectCls}
            value={form.priorInternshipHere}
            onChange={(e) => set("priorInternshipHere", e.target.value as FormState["priorInternshipHere"])}
          >
            <option value="" disabled>
              Choose one…
            </option>
            <option value="no">No — this would be my first</option>
            <option value="yes">Yes — I'm returning</option>
          </select>
        </div>
      )}

      {/* 6. Classes taken */}
      {visible.has("classes") && (
        <div className={card}>
          <span className={labelCls}>Which of these classes have you taken?</span>
          <p className={hintCls}>Select all that apply.</p>
          <div className="flex flex-wrap gap-3">
            {CLASSES.map((c) => (
              <label
                key={c}
                className="flex items-center gap-2 rounded-lg border border-border px-4 py-2 cursor-pointer hover:border-primary/50"
              >
                <input
                  type="checkbox"
                  checked={form.classesTaken.includes(c)}
                  onChange={() => {
                    set("classesTaken", toggle(form.classesTaken, c));
                    if (form.classesNone) set("classesNone", false);
                  }}
                />
                <span className="font-medium">{c}</span>
              </label>
            ))}
            <label className="flex items-center gap-2 rounded-lg border border-border px-4 py-2 cursor-pointer hover:border-primary/50">
              <input
                type="checkbox"
                checked={form.classesNone}
                onChange={(e) => {
                  set("classesNone", e.target.checked);
                  if (e.target.checked) set("classesTaken", []);
                }}
              />
              <span className="font-medium">None yet</span>
            </label>
          </div>
          <input
            className={`${inputCls} mt-3`}
            placeholder="Other relevant classes (optional)"
            value={form.classesOther}
            onChange={(e) => set("classesOther", e.target.value)}
          />
        </div>
      )}

      {/* 7. Currently registered */}
      {visible.has("registered") && (
        <div className={card}>
          <label className={labelCls} htmlFor="registered">
            Are you currently registered for any classes?
          </label>
          <select
            id="registered"
            className={selectCls}
            value={form.currentlyRegistered}
            onChange={(e) => set("currentlyRegistered", e.target.value as FormState["currentlyRegistered"])}
          >
            <option value="" disabled>
              Choose one…
            </option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
      )}

      {/* 7b. Which classes (only if registered) */}
      {visible.has("currentClasses") && (
        <div className={card}>
          <label className={labelCls} htmlFor="currentClasses">
            Which classes are you registered for?
          </label>
          <textarea
            id="currentClasses"
            className={inputCls}
            rows={2}
            placeholder="List your current classes"
            value={form.currentClasses}
            onChange={(e) => set("currentClasses", e.target.value)}
          />
        </div>
      )}

      {/* 8. Why intern */}
      {visible.has("why") && (
        <div className={card}>
          <label className={labelCls} htmlFor="whyIntern">
            Why do you want to be an intern?
          </label>
          <textarea
            id="whyIntern"
            className={inputCls}
            rows={4}
            value={form.whyIntern}
            onChange={(e) => set("whyIntern", e.target.value)}
          />
        </div>
      )}

      {/* 9. Career goals */}
      {visible.has("goals") && (
        <div className={card}>
          <label className={labelCls} htmlFor="careerGoals">
            What are your career goals?
          </label>
          <textarea
            id="careerGoals"
            className={inputCls}
            rows={4}
            value={form.careerGoals}
            onChange={(e) => set("careerGoals", e.target.value)}
          />
        </div>
      )}

      {/* 10. Experience */}
      {visible.has("experience") && (
        <div className={card}>
          <label className={labelCls} htmlFor="experience">
            What is your audio / musical experience?
          </label>
          <textarea
            id="experience"
            className={inputCls}
            rows={4}
            placeholder="Instruments, DAWs, live sound, recordings you've made, bands, etc."
            value={form.experience}
            onChange={(e) => set("experience", e.target.value)}
          />
        </div>
      )}

      {/* 11. Availability (campus track only) */}
      {visible.has("availability") && (
        <div className={card}>
          <span className={labelCls}>
            What is your general availability to work in the studio?
          </span>
          <p className={hintCls}>
            Check the blocks you're generally free, Monday through Friday.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr>
                  <th className="text-left py-2 pr-4 font-semibold"></th>
                  {TIME_BLOCKS.map((b) => (
                    <th key={b} className="py-2 px-3 font-semibold text-center">
                      {b}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {WEEKDAYS.map((day) => (
                  <tr key={day} className="border-t border-border">
                    <td className="py-2.5 pr-4 font-medium">{day}</td>
                    {TIME_BLOCKS.map((block) => (
                      <td key={block} className="py-2.5 px-3 text-center">
                        <input
                          type="checkbox"
                          aria-label={`${day} ${block}`}
                          checked={(form.availability[day] ?? []).includes(block)}
                          onChange={() => toggleAvailability(day, block)}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <input
            className={`${inputCls} mt-3`}
            placeholder="Anything else about your schedule? (optional)"
            value={form.availabilityNotes}
            onChange={(e) => set("availabilityNotes", e.target.value)}
          />
        </div>
      )}

      {/* 12. Meeting RSVP (mandatory meeting) */}
      {visible.has("meeting") && (
        <div className={card}>
          <label className={labelCls} htmlFor="meeting">
            Will you attend the intern info meeting?
          </label>
          <p className={hintCls}>
            The intern info meeting is <strong className="text-foreground">mandatory</strong>:{" "}
            <strong className="text-foreground">Wednesday, September 2 at 12:00 noon</strong>.
            The room will be emailed to you. If you can't attend, you must
            email us at{" "}
            <a href="mailto:southwesternrecording@gmail.com" className="text-primary underline">
              southwesternrecording@gmail.com
            </a>{" "}
            to independently schedule a meeting.
          </p>
          <select
            id="meeting"
            className={selectCls}
            value={form.attendMeeting}
            onChange={(e) => set("attendMeeting", e.target.value as FormState["attendMeeting"])}
          >
            <option value="" disabled>
              Choose one…
            </option>
            <option value="yes">Yes — I'll be there Wednesday, September 2 at noon</option>
            <option value="cannot-attend">
              I can't attend — I'll email you to schedule a meeting independently
            </option>
          </select>
        </div>
      )}

      {/* 13. Terms */}
      {visible.has("terms") && (
        <div className={card}>
          <span className={labelCls}>One last thing</span>
          <p className={hintCls}>
            The intern info meeting on Wednesday, September 2 at noon is
            mandatory. If I can't attend, I will email{" "}
            southwesternrecording@gmail.com and independently schedule a
            meeting.
          </p>
          <label className="flex items-start gap-3 rounded-lg border border-border p-4 cursor-pointer hover:border-primary/50">
            <input
              type="checkbox"
              className="mt-1"
              checked={form.acceptedTerms}
              onChange={(e) => set("acceptedTerms", e.target.checked)}
            />
            <span className="font-medium">I accept these terms</span>
          </label>
        </div>
      )}

      {error && (
        <p className="text-sm font-medium text-red-500" role="alert">
          {error}
        </p>
      )}

      {/* Submit */}
      {allAnswered && !externalOnly && (
        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-lg bg-primary text-primary-foreground font-semibold py-3 hover:opacity-90 disabled:opacity-50 transition"
        >
          {submitting ? "Submitting…" : "Submit application"}
        </button>
      )}
    </form>
  );
}
