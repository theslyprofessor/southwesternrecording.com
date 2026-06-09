import { useState } from "react";
import { ConvexHttpClient } from "convex/browser";
import { anyApi } from "convex/server";
import { Car, CheckCircle2, Loader2 } from "lucide-react";

// Reuses the shared midimaze prod deployment (amiable-moose-236). A Convex
// deploy URL is public, so hardcoding (matching src/lib/convex.ts) is fine.
const convex = new ConvexHttpClient("https://amiable-moose-236.convex.cloud");
const api = anyApi; // no codegen in this repo

type FieldType = "text" | "email" | "tel" | "datetime-local";
interface Field {
  key: string;
  label: string;
  type: FieldType;
  autoComplete?: string;
  placeholder?: string;
}

const FIELDS: Field[] = [
  { key: "dateTimeRequested", label: "Date and time of your session", type: "datetime-local" },
  { key: "name", label: "Name", type: "text", autoComplete: "name" },
  { key: "email", label: "Email", type: "email", autoComplete: "email" },
  { key: "phone", label: "Phone number", type: "tel", autoComplete: "tel" },
  { key: "licensePlateNumber", label: "License plate number", type: "text" },
  { key: "licensePlateState", label: "License plate state", type: "text", placeholder: "CA" },
  { key: "carMake", label: "Make of car", type: "text" },
  { key: "carModel", label: "Model of car", type: "text" },
  { key: "carColor", label: "Color of car", type: "text" },
  { key: "carYear", label: "Year of car", type: "text", placeholder: "2022" },
  { key: "carType", label: "Type of car", type: "text", placeholder: "Sedan / 4-door" },
];

const inputClass =
  "flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50";
const labelClass = "text-sm font-medium leading-none text-foreground mb-1.5 block";
const primaryBtn =
  "inline-flex items-center gap-2 rounded-lg bg-primary text-primary-foreground px-5 py-2.5 font-medium hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed";

interface Props {
  email: string;
}

export default function FreeParkingForm({ email }: Props) {
  const [mode, setMode] = useState<"view" | "edit" | "done">("view");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);
    const payload: Record<string, string> = {};
    for (const f of FIELDS) payload[f.key] = String(fd.get(f.key) ?? "").trim();
    if (Object.values(payload).some((v) => !v)) {
      setError("Please fill in every field.");
      return;
    }
    setSubmitting(true);
    try {
      await convex.mutation(api.parking.submitParkingRequest, payload);
      setMode("done");
    } catch (err) {
      console.error(err);
      const msg =
        err && typeof err === "object" && "data" in err && typeof (err as any).data === "string"
          ? (err as any).data
          : "Something went wrong. Please email us and we'll sort it out.";
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="bg-card rounded-2xl p-8 border border-border mb-8">
      <div className="inline-flex items-center gap-2 text-primary font-semibold mb-3">
        <Car className="h-5 w-5" />
        <span>Parking for Free</span>
      </div>

      {mode === "done" ? (
        <div className="flex items-start gap-3">
          <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mt-0.5" />
          <div>
            <p className="text-foreground font-medium">Request received. Thank you!</p>
            <p className="text-muted-foreground mt-1">
              We'll arrange your free parking with Parking Services and follow up at
              the email you provided. Please submit at least five business days before
              your session.
            </p>
          </div>
        </div>
      ) : mode === "view" ? (
        <>
          <p className="text-foreground leading-relaxed mb-6">
            If you book in advance, parking can be free. Submit the details below{" "}
            <strong>at least five business days before your session</strong>, and we'll
            arrange your free parking with Parking Services. Prefer email? Write to{" "}
            <a
              href={`mailto:${email}`}
              className="text-primary underline underline-offset-2 hover:opacity-80"
            >
              {email}
            </a>
            .
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 mb-6">
            {FIELDS.map((f) => (
              <li key={f.key} className="flex items-start gap-2 text-foreground">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span>{f.label}</span>
              </li>
            ))}
          </ul>
          <button type="button" className={primaryBtn} onClick={() => setMode("edit")}>
            Request Free Parking
          </button>
        </>
      ) : (
        <form onSubmit={handleSubmit} noValidate>
          <p className="text-foreground leading-relaxed mb-6">
            Fill in your details below and submit{" "}
            <strong>at least five business days before your session</strong>. All
            fields are required.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 mb-6">
            {FIELDS.map((f) => (
              <div key={f.key}>
                <label className={labelClass} htmlFor={f.key}>
                  {f.label}
                </label>
                <input
                  id={f.key}
                  name={f.key}
                  type={f.type}
                  required
                  autoComplete={f.autoComplete}
                  placeholder={f.placeholder}
                  disabled={submitting}
                  className={inputClass}
                />
              </div>
            ))}
          </div>
          {error && (
            <p className="text-destructive text-sm mb-4" role="alert">
              {error}
            </p>
          )}
          <div className="flex items-center gap-4">
            <button type="submit" className={primaryBtn} disabled={submitting}>
              {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
              {submitting ? "Submitting…" : "Submit Request"}
            </button>
            <button
              type="button"
              className="text-muted-foreground hover:text-foreground text-sm font-medium"
              onClick={() => {
                setMode("view");
                setError(null);
              }}
              disabled={submitting}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
