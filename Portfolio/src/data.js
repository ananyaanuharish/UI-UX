// ============================================================
// CONTENT — single source of truth for the whole site.
// Sourced from Ananya's resume. Edit here; UI derives from it.
// ============================================================

export const profile = {
  name: "Ananya A H",
  role: "UX Designer & Frontend Developer",
  location: "Bengaluru, India",
  email: "ananyaharish00@gmail.com",
  phone: "+91 90195 51675",
  github: "https://github.com/ananyaanuharish",
  linkedin: "https://linkedin.com/in/ananya-a-h",
  tagline:
    "I design and build product experiences end-to-end from user flows and Figma prototypes to production React that bridge the gap between design and engineering.",
  summary:
    "UX Designer and Frontend Developer with 1+ year of startup experience building an EOR SaaS platform from 0 to 1 now used by 300+ global companies and 2,000+ employees. I turn user and client feedback into interface improvements, build scalable design systems, and ship accessible, intuitive experiences.",
};

export const stats = [
  { value: "300+", label: "Companies served" },
  { value: "2,000+", label: "Employees impacted" },
  { value: "$20M+", label: "Monthly payroll" },
  { value: "4", label: "Product portals designed" },
];

export const skillGroups = [
  {
    title: "UX / UI Design",
    tagline: "Research to pixel-perfect flows",
    accent: "var(--color-violet)",
    items: [
      "User Research",
      "Usability Testing",
      "Interaction Design",
      "User Flows & Journey Mapping",
      "Information Architecture",
      "Wireframing",
      "Prototyping",
      "Design Systems",
      "Component Libraries",
      "Accessibility (WCAG)",
      "Responsive Design",
    ],
  },
  {
    title: "Frontend",
    tagline: "Shipping production React",
    accent: "var(--color-magenta)",
    items: ["React", "Tailwind CSS", "ShadCN UI", "Framer Motion", "HTML/CSS", "TypeScript", "JavaScript"],
  },
  {
    title: "Tools & Practices",
    tagline: "How the work gets done",
    accent: "var(--color-sky)",
    items: [
      "Figma",
      "Adobe XD",
      "Design-to-Dev Handoff",
      "Agile / Scrum",
      "Playwright",
      "Claude API",
      "Git & Vercel",
      "Node.js / REST APIs",
    ],
  },
];

// Rich patterns Ananya has hands-on shipped — used for the ticker.
export const uiPatterns = [
  "Multi-step forms",
  "Data tables",
  "Loading skeletons",
  "Modals",
  "Toast notifications",
  "Animated carousels",
  "Empty & error states",
  "Tooltips",
  "Tabs",
  "Pagination",
  "Search & filters",
  "Date pickers",
  "Scroll animations",
  "Page transitions",
];

export const experience = [
  {
    role: "Frontend Developer (SDE 1)",
    company: "Wisemonk",
    context: "Employer of Record (EOR) SaaS Platform",
    period: "Jun 2025 – Jun 2026",
    location: "Bengaluru",
    tags: ["React", "Tailwind", "Framer Motion", "ShadCN", "Figma", "Playwright"],
    metrics: [
      { value: "5", label: "Role-based portals" },
      { value: "10+", label: "UI states designed" },
      { value: "0→1", label: "Built from scratch" },
    ],
    points: [
      "Owned end-to-end UX design and frontend for a 0-to-1 EOR SaaS platform (300+ companies, 2,000+ employees, $20M+ monthly payroll) one product, five role-based portals (Employer, Employee, Contractor, Manager, Super Admin), each designed from scratch.",
      "Shipped the product landing page from scratch: information architecture, hero UX copy, and animated testimonial carousels & feature sections in React, Tailwind, and Framer Motion.",
      "Designed role specific dashboards for each portal by mapping user journeys per role, establishing data hierarchy, and defining 10+ explicit UI states across leave, payroll, and onboarding.",
      "Built a shared component library (skeletons, modals, dropdowns, toasts, icons) in ShadCN UI + Tailwind enforcing a consistent visual language across all five portals.",
      "Ran iterative design-feedback loops with clients and founders, and owned the REST API integration connecting every design to live data.",
      "Authored UX test scripts in Playwright + Claude to validate multi-step forms, error states, and edge cases including cross-device responsiveness checks — before every release.",
    ],
  },
];

export const projects = [
  {
    name: "EPFO Registration Automation",
    org: "Wisemonk",
    year: "2025",
    role: "Design + Full stack",
    blurb:
      "Manual EPFO registration took 8 minutes per hire. I built the full fix a Playwright bot that cuts it to under 2 minutes, a REST API tracking each step in real time, and a React ops dashboard with live logs and a re-verify action. Result: 75% faster.",
    stack: ["Playwright", "Node.js", "PostgreSQL", "React"],
    metric: "75% faster",
    match: 96,
    accent: "violet",
    gradient: "linear-gradient(135deg, #5a34f5 0%, #8725d6 60%, #be52c4 100%)",
    highlights: [
      "8 min → under 2 min per registration",
      "Real-time status dashboard with live logs",
      "One-tap re-verify recovery action",
    ],
  },
  {
    name: "AI Customer Workflow",
    org: "Personal AI Project",
    year: "2025",
    role: "AI Workflow Design",
    blurb:
      "Managing leads manually meant reading every email, scoring interest by gut, drafting follow-ups from scratch, and copy-pasting updates into a spreadsheet. I built an AI workflow that reads incoming leads from email, scores and classifies them, auto-drafts personalised outreach messages, and syncs every update back to a CRM table in Coda — zero manual entry, zero missed follow-ups.",
    stack: ["Claude API", "Coda", "Gmail Automation", "Node.js"],
    metric: "Zero manual entry",
    match: 94,
    accent: "sky",
    gradient: "linear-gradient(135deg, #5ec2f9 0%, #34d8b0 100%)",
    highlights: [
      "Reads and classifies leads directly from email",
      "Auto-drafts personalised outreach messages with AI",
      "Syncs lead status back to Coda CRM automatically",
    ],
  },
  {
    name: "Taskify Pro",
    org: "Full-Stack Productivity App",
    year: "2024",
    role: "Design + Full-stack",
    blurb:
      "A productivity app built around UX delight and accessibility smooth Framer Motion page transitions, gradient visual hierarchy, and voice to text input alongside JWT auth, full CRUD, a recycle bin with restore, and due-date tracking. Proof that polish and function can coexist.",
    stack: ["React", "Node.js", "Express", "MongoDB", "Framer Motion"],
    metric: "Voice + a11y",
    match: 92,
    accent: "magenta",
    gradient: "linear-gradient(135deg, #be52c4 0%, #5ec2f9 100%)",
    highlights: [
      "Voice to text task capture",
      "Recycle bin with restore",
      "Animated, accessible page transitions",
    ],
  },
];

export const education = {
  degree: "B.E. in CSE — AI & ML",
  school: "ATME College of Engineering, Mysuru",
  period: "2021 – 2025",
  detail: "CGPA: 8.5 · PUC: 96.83% · School: 94.56%",
};

// Gallery — a mix of Glance-AI-styled shots (made in the Glance app) and
// candids. `ai` flags the ones with the Glance sparkle so we can label them.
export const gallery = [
  { src: "/images/ananya-1.jpeg", caption: "Denim look · waterfront", ai: true },
  { src: "/images/ananya-4.jpeg", caption: "Formal look · golden scarf", ai: true },
  { src: "/images/ananya-2.jpeg", caption: "Winter look · city park", ai: true },
  { src: "/images/ananya-3.jpeg", caption: "Casual look · flower market", ai: true },
  { src: "/images/candid-3.jpeg", caption: "The real me · fountains", ai: false },
  { src: "/images/candid-1.jpeg", caption: "The real me · riverside", ai: false },
  { src: "/images/candid-2.jpeg", caption: "The real me · night plaza", ai: false },
];

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Work", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];
