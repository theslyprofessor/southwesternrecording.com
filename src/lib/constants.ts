export const SITE_CONFIG = {
  name: "Southwestern Recording",
  tagline: "Recording Arts & Technology at Southwestern College",
  description: "Professional audio engineering and music production education in San Diego. Learn recording, mixing, mastering, and sound design in our state-of-the-art facilities.",
  email: "southwesternrecording@gmail.com",
  phone: "(619) 421-6700",
  url: "https://southwesternrecording.com",
  address: "900 Otay Lakes Road, Chula Vista, CA 91910",
  instagram: "swc.recordingarts",
  instagramUrl: "https://instagram.com/swc.recordingarts",
  bookingFormUrl: "https://forms.gle/Y6QAe9gFCtFocRoS6",
} as const;

export const NAV_LINKS = [
  { href: "#program", label: "Program" },
  { href: "#facilities", label: "Facilities" },
  { href: "#history", label: "History" },
  { href: "#courses", label: "Courses" },
  { href: "#faculty", label: "Faculty" },
  { href: "#collaborate", label: "Work With Us" },
  { href: "#contact", label: "Contact" },
] as const;

export const PROGRAM_HIGHLIGHTS = [
  {
    title: "Hands-On Learning",
    description: "Work in professional recording studios from day one with industry-standard equipment and software.",
    icon: "Mic2",
  },
  {
    title: "Industry Connections",
    description: "Network with working professionals and gain real-world experience through internships and collaborations.",
    icon: "Users",
  },
  {
    title: "Career Ready",
    description: "Graduate with a portfolio of work and the skills employers demand in the audio industry.",
    icon: "Award",
  },
  {
    title: "Affordable Education",
    description: "Community college tuition rates with financial aid available. Quality education without the debt.",
    icon: "DollarSign",
  },
] as const;

export const FACILITIES = [
  {
    name: "Studio A",
    description: "Our flagship recording space featuring a large live room with grand piano, isolated vocal booth, and SSL Duality SE console.",
    features: ["SSL Duality SE Console", "Pro Tools HDX", "Large Live Room", "Grand Piano"],
    image: "/images/studio-a-control-room.webp",
  },
  {
    name: "Studio A Tracking Room",
    description: "A spacious tracking room with world-class acoustics, hardwood floors, and room for a full ensemble.",
    features: ["Acoustic Treatment", "Hardwood Floors", "Isolation Booth", "Full Ensemble Capacity"],
    image: "/images/studio-a-tracking-room.webp",
  },
  {
    name: "Studio B",
    description: "Intimate tracking and mixing environment perfect for smaller sessions, overdubs, and post-production work.",
    features: ["Digital Console", "Pro Tools HDX", "Isolation Booth", "Video Sync"],
  },
  {
    name: "Studios C & D",
    description: "Production suites equipped with professional DAWs and monitoring for music production, editing, and mixing coursework.",
    features: ["Pro Tools", "Logic Pro", "Ableton Live", "Studio Monitors"],
  },
  {
    name: "Studio E",
    description: "Dedicated electronic music production and sound design lab with MIDI controllers, synthesizers, and surround monitoring.",
    features: ["MIDI Controllers", "Synthesizers", "Surround Sound", "Plugin Suites"],
  },
] as const;

export const COURSES = [
  {
    id: "RA&T 100",
    title: "Music Technology",
    crosslisted: "MUS 100",
    description: "Introduction to music technology, digital audio workstations, MIDI, and electronic music production fundamentals.",
    units: 3,
    level: "Beginner",
  },
  {
    id: "RA&T 105",
    title: "Electroacoustic Composition",
    crosslisted: "MUS 155",
    description: "Creative sound design and electronic composition using synthesis, sampling, and digital audio processing.",
    units: 3,
    level: "Intermediate",
  },
  {
    id: "RA&T 110",
    title: "Music Business / Career Overview",
    crosslisted: "MUS 150",
    description: "Overview of the music industry including publishing, licensing, contracts, royalties, and career planning.",
    units: 3,
    level: "Beginner",
  },
  {
    id: "RA&T 120",
    title: "Recording Techniques",
    crosslisted: "FTMA 111 / MUS 151",
    description: "Microphone selection, placement, and tracking workflows. Learn to capture great sound at the source.",
    units: 3,
    level: "Beginner",
  },
  {
    id: "RA&T 121",
    title: "Audio Recording Technology I",
    description: "Advanced recording, mixing, and signal processing techniques in a professional studio environment.",
    units: 4,
    level: "Intermediate",
  },
  {
    id: "RA&T 122",
    title: "Audio Recording Technology II",
    description: "Capstone studio course covering advanced mixing, mastering, and professional session management.",
    units: 4,
    level: "Advanced",
  },
  {
    id: "RA&T 131",
    title: "Recording Techniques for Mixed Media",
    crosslisted: "FTMA 121",
    description: "Sound design and recording for film, television, and multimedia. Dialog editing, Foley, and final mix.",
    units: 3,
    level: "Advanced",
  },
  {
    id: "RA&T 141",
    title: "Intro to Computer Programming — Audio Focus",
    description: "Programming fundamentals applied to audio applications, automation, and creative coding for sound.",
    units: 3,
    level: "Intermediate",
  },
  {
    id: "RA&T 151",
    title: "Intro to Electronics — Audio Focus",
    description: "Electronics fundamentals for audio: circuits, signal flow, soldering, and equipment maintenance.",
    units: 3,
    level: "Intermediate",
  },
  {
    id: "RA&T 171",
    title: "Live Sound",
    description: "Live sound reinforcement including system design, mixing, stage setup, and event production.",
    units: 4,
    level: "Intermediate",
  },
  {
    id: "RA&T 290",
    title: "Professional Audio Work Experience",
    description: "Supervised work experience in a professional audio environment. Apply classroom skills in real-world settings.",
    units: "2-4",
    level: "Advanced",
  },
] as const;

export const DEGREES = [
  {
    name: "Recording Arts & Technology — Associate in Science",
    abbrev: "AS",
    url: "https://catalog.swccd.edu/associate-degree-certificate-programs/recording-arts-technology/recording-arts-technology-as/",
  },
  {
    name: "Recording Arts & Technology — Certificate of Achievement",
    abbrev: "Certificate",
    url: "https://catalog.swccd.edu/associate-degree-certificate-programs/recording-arts-technology/recording-arts-technology-certificate/",
  },
  {
    name: "Commercial Music — Associate in Arts",
    abbrev: "AA",
    url: "https://catalog.swccd.edu/associate-degree-certificate-programs/music/commercial-music-aa/",
  },
  {
    name: "Commercial Music — Certificate",
    abbrev: "Certificate",
    url: "",
  },
] as const;

export const FACULTY = [
  {
    name: "Nakul Tiruviluamala",
    title: "Program Lead",
    bio: "Audio engineer, technologist, and educator leading the Recording Arts & Technology program at Southwestern College.",
  },
] as const;

export const STUDENT_SUCCESS = [
  {
    name: "Recent Graduate",
    year: "2024",
    quote: "Before Southwestern, I didn't even know what a DAW was. Two years later I was running sessions and mixing records. This program changed the trajectory of my life.",
  },
  {
    name: "Recent Graduate",
    year: "2023",
    quote: "The faculty treat you like a colleague, not just a student. I walked out with real credits, real skills, and a reel I'm proud of.",
  },
  {
    name: "Recent Graduate",
    year: "2023",
    quote: "I came in wanting to make beats. I left knowing how to record a full band, mix for film, and wire a live sound rig. The breadth of what you learn here is incredible.",
  },
  {
    name: "Recent Graduate",
    year: "2024",
    quote: "The work experience course put me in a real studio with real clients. That internship turned into my first paying gig before I even graduated.",
  },
] as const;

export const PROGRAM_INFO = {
  degrees: [
    "Associate in Science (Recording Arts & Technology)",
    "Certificate of Achievement (Recording Arts & Technology)",
    "Associate in Arts (Commercial Music)",
    "Certificate (Commercial Music)",
  ],
  duration: "2 years (full-time)",
  format: "In-person with hands-on studio time",
  totalUnits: "31-35",
} as const;
