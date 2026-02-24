export const SITE_CONFIG = {
  name: "Southwestern Recording",
  tagline: "Recording Arts & Technology at Southwestern College",
  description: "Professional audio engineering and music production education in San Diego. Learn recording, mixing, mastering, and sound design in our state-of-the-art facilities.",
  email: "recording@swccd.edu",
  phone: "(619) 421-6700",
  url: "https://southwesternrecording.com",
  address: "900 Otay Lakes Road, Chula Vista, CA 91910",
} as const;

export const NAV_LINKS = [
  { href: "#program", label: "Program" },
  { href: "#facilities", label: "Facilities" },
  { href: "#courses", label: "Courses" },
  { href: "#faculty", label: "Faculty" },
  { href: "#success", label: "Student Success" },
  { href: "#contact", label: "Apply" },
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
    description: "Our flagship recording space featuring a large live room, isolated vocal booth, and SSL console.",
    features: ["SSL AWS 948 Console", "Pro Tools HDX", "Acoustic Treatment", "Large Live Room"],
  },
  {
    name: "Studio B",
    description: "Intimate tracking and mixing environment perfect for smaller sessions and post-production.",
    features: ["Avid S6 Control Surface", "Dolby Atmos Ready", "Isolation Booths", "Video Sync"],
  },
  {
    name: "Production Lab",
    description: "24-station computer lab with professional DAWs and plugins for music production coursework.",
    features: ["Pro Tools", "Logic Pro X", "Ableton Live", "Universal Audio"],
  },
  {
    name: "Mastering Suite",
    description: "Dedicated mastering room with reference monitoring and analog outboard processing.",
    features: ["PMC Monitors", "Analog Mastering Chain", "Acoustically Calibrated", "High-Res Audio"],
  },
] as const;

export const COURSES = [
  {
    id: "rat-100",
    title: "Introduction to Audio",
    description: "Fundamentals of sound, acoustics, and signal flow. The essential foundation for all audio work.",
    level: "Beginner",
  },
  {
    id: "rat-110",
    title: "Recording Techniques",
    description: "Microphone selection, placement, and tracking workflows. Learn to capture great sound at the source.",
    level: "Beginner",
  },
  {
    id: "rat-120",
    title: "Music Production",
    description: "Electronic music production, beat making, and arrangement using industry-standard DAWs.",
    level: "Intermediate",
  },
  {
    id: "rat-200",
    title: "Mixing & Signal Processing",
    description: "EQ, compression, reverb, and effects. Transform raw tracks into polished productions.",
    level: "Intermediate",
  },
  {
    id: "rat-210",
    title: "Audio Post-Production",
    description: "Sound design for film, television, and games. Dialog editing, Foley, and final mix.",
    level: "Advanced",
  },
  {
    id: "rat-220",
    title: "Mastering & Distribution",
    description: "Final polish and delivery. Prepare your music for streaming platforms and physical media.",
    level: "Advanced",
  },
] as const;

export const FACULTY = [
  {
    name: "Faculty Member",
    title: "Program Director",
    bio: "Brings decades of industry experience in recording and production to lead our program.",
  },
  {
    name: "Faculty Member",
    title: "Studio Manager & Instructor",
    bio: "Expert in studio operations, mixing techniques, and live sound reinforcement.",
  },
  {
    name: "Faculty Member",
    title: "Music Production Instructor",
    bio: "Specialist in electronic music production, sound design, and emerging audio technologies.",
  },
] as const;

export const STUDENT_SUCCESS = [
  {
    name: "Student Name",
    year: "2024",
    achievement: "Now working as Assistant Engineer at major San Diego recording studio",
    quote: "The hands-on experience I got at Southwestern prepared me for real studio work.",
  },
  {
    name: "Student Name",
    year: "2023",
    achievement: "Launched successful podcast production company",
    quote: "I learned not just the technical skills, but how to run a professional audio business.",
  },
  {
    name: "Student Name",
    year: "2023",
    achievement: "Transferred to prestigious music technology program",
    quote: "Southwestern gave me the foundation to pursue my bachelor's degree with confidence.",
  },
] as const;

export const PROGRAM_INFO = {
  degrees: [
    "Associate in Science Degree",
    "Certificate of Achievement",
    "Certificate of Proficiency",
  ],
  duration: "2 years (full-time)",
  format: "In-person with hands-on studio time",
} as const;
