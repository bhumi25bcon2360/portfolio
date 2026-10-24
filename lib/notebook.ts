/**
 * Bhumi's portfolio content, all written in one notebook (this file).
 * The page renders from it, and `doodlePrompt()` builds the chatbot's
 * Gemini instructions from the very same data.
 */

export type Note = {
  id: string;
  title: string;
  gist: string;
  notes: string[];
  stack: string[];
  repo: string;
  live?: string;
};

// GitHub username: repo links are made from it.
const GITHUB_HANDLE = "bhumi25bcon2360";
const LINKEDIN_LINK = "https://www.linkedin.com/in/bhumi-shah-7849b137b/";

const repoOf = (name: string) => (GITHUB_HANDLE ? `https://github.com/${GITHUB_HANDLE}/${name}` : "");

export const bhumi = {
  name: "Bhumi Shah",
  first: "Bhumi",
  initials: "BS",
  degree: "B.Tech in Computer Science & Engineering",
  uni: "JECRC University, Jaipur",
  batch: "2025",
  roll: "25BCON2360",
  city: "Jaipur, Rajasthan, India",
  email: "bhumi.25bcon2360@jecrcu.edu.in",
  github: GITHUB_HANDLE ? `https://github.com/${GITHUB_HANDLE}` : "",
  linkedin: LINKEDIN_LINK,
  photo: "/bhumi.jpg",
  subtitle: "Computer Science student who plans on paper and builds in code.",
  // The intro, split so some phrases get a highlighter swipe on scroll.
  intro: [
    { text: "I'm Bhumi, a Computer Science student at JECRC University in Jaipur. I like " },
    { text: "code that's easy to read", mark: true },
    { text: " and " },
    { text: "apps that are easy to use", mark: true },
    {
      text: ". I plan on paper first, build in small steps and keep notes on what I learn, from recursion in Python to saving data in the browser. ",
    },
    { text: "AI is part of my toolkit", mark: true },
    { text: " for explaining ideas and reviewing my work." },
  ],
};

export const doodleBot = {
  name: "Doodle",
  note: `Ask me about ${bhumi.first}'s work`,
};

export const tabs = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export const checklists = [
  { heading: "Programming", items: ["Python", "JavaScript", "HTML", "CSS"] },
  {
    heading: "Concepts",
    items: ["Recursion", "Dictionaries & dataclasses", "Loops & conditions", "DOM & events"],
  },
  { heading: "Web", items: ["Responsive layouts", "localStorage", "Next.js", "Tailwind CSS"] },
  { heading: "Code quality", items: ["Readable code", "Refactoring", "unittest", "Debugging"] },
  {
    heading: "AI & tools",
    items: ["Gemini API", "Prompt engineering", "Git & GitHub", "VS Code", "Vercel", "Google Colab"],
  },
];

export const notes: Note[] = [
  {
    id: "py",
    title: "Python Programs Collection",
    gist: "Three classic Python exercises, each written neatly and explained.",
    notes: [
      "Factorial, iterative and recursive",
      "Fibonacci series",
      "Structure → dictionary: dataclass, object, tuple list, records",
    ],
    stack: ["Python"],
    repo: repoOf("python-factorial"),
  },
  {
    id: "refactor",
    title: "Messy Python Code Improvement",
    gist: "Rewrote a messy marks script with AI's help so anyone can read it. The output didn't change.",
    notes: [
      "Clear variable and function names",
      "Input validation for marks",
      "Built-ins instead of manual loops",
      "Grade table instead of if-chains",
    ],
    stack: ["Python", "AI refactoring"],
    repo: repoOf("messy-python-code-improvement"),
  },
  {
    id: "bugs",
    title: "Bug Fixing Using AI (student_utils)",
    gist: "Used 9 unit tests to find 3 bugs, then fixed them with RED → FIX → GREEN.",
    notes: [
      "Average used len − 1 → now len",
      "Pass mark: > 40 → >= 40",
      "Distinction unreachable → conditions reordered",
      "4 failures + 1 error → 9/9 passing",
    ],
    stack: ["Python", "unittest"],
    repo: repoOf("bug-fixing-student-utils"),
  },
  {
    id: "quiz",
    title: "Interactive Quiz Application",
    gist: "Five multiple-choice questions with progress, locked answers and a final score.",
    notes: ["Progress across 5 questions", "One answer per question", "Score screen + Play Again"],
    stack: ["HTML", "CSS", "JavaScript"],
    repo: repoOf("interactive-quiz-app"),
  },
  {
    id: "books",
    title: "Book Reading List Application",
    gist: "A reading tracker that sorts books into Want to Read, Reading and Finished, and remembers them.",
    notes: [
      "Add books with a status",
      "Filter, change status, delete",
      "Counts for each status",
      "Duplicate check + 60-character limit",
      "localStorage, deployed on Vercel",
    ],
    stack: ["HTML", "CSS", "JavaScript", "Vercel"],
    repo: repoOf("reading-list-app"),
    live: "https://reading-list-app-bhumi-shah.vercel.app/",
  },
];

export const allTech = notes.flatMap((n) => n.stack).filter((t, i, list) => list.indexOf(t) === i);

// "Learning log" shown as a doodled path between the projects and contact.
export const learningLog = [
  { date: "2025", entry: "Joined B.Tech CSE at JECRC University, Jaipur." },
  { date: "Week by week", entry: "Python basics: loops, recursion and dictionaries." },
  { date: "Then", entry: "Learned to clean up messy code and to trust unit tests." },
  { date: "After that", entry: "Moved to the browser with HTML, CSS and JavaScript." },
  { date: "Now", entry: "Building this portfolio in Next.js with a Gemini chatbot." },
];

export const doodleQuestions = [
  "Who is Bhumi?",
  "What projects has Bhumi completed?",
  "What was corrected in the buggy code?",
  "How does the reading list work?",
];

/** Gemini system prompt, assembled from the data above. */
export function doodlePrompt(): string {
  const introText = bhumi.intro.map((p) => p.text).join("");
  const skills = checklists.map((c) => `- ${c.heading}: ${c.items.join(", ")}`).join("\n");
  const projects = notes
    .map((n, i) => {
      const lines = [`${i + 1}. ${n.title}: ${n.gist}`];
      for (const note of n.notes) lines.push(`   - ${note}`);
      lines.push(`   Technologies: ${n.stack.join(", ")}`);
      lines.push(`   GitHub: ${n.repo || "not added yet"}`);
      if (n.live) lines.push(`   Live: ${n.live}`);
      return lines.join("\n");
    })
    .join("\n");
  const log = learningLog.map((l) => `- ${l.date}: ${l.entry}`).join("\n");

  return `You are ${doodleBot.name}, the helpful assistant on ${bhumi.name}'s portfolio website.
You answer visitors' questions about ${bhumi.first}. "You" in a question means ${bhumi.first}.
Refer to ${bhumi.first} by name rather than with pronouns.
Be friendly and brief: 2-5 sentences or a short "- " list, in plain text (no markdown headings, bold or code blocks).

Rules:
- Only use the facts below; never invent projects, grades, dates, jobs or links.
- If the answer isn't here, say you don't know and suggest emailing ${bhumi.email}.
- If a link is "not added yet", say it hasn't been added to the site yet.
- Politely decline questions unrelated to ${bhumi.first}'s portfolio.

PROFILE
Name: ${bhumi.name}
Education: ${bhumi.degree}, ${bhumi.uni} (batch ${bhumi.batch}, roll no. ${bhumi.roll})
Location: ${bhumi.city}
Email: ${bhumi.email}
GitHub: ${bhumi.github || "not added yet"}
LinkedIn: ${bhumi.linkedin || "not added yet"}
About: ${introText}

SKILLS
${skills}

PROJECTS (${notes.length})
${projects}

LEARNING LOG
${log}`;
}
