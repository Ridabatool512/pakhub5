export type JobType = "Full-time" | "Part-time" | "Internship" | "Remote" | "Contract" | "Government" | "Freelance";

export interface Job {
  id: string;
  title: string;
  company: string;
  companySlug: string;
  logo: string; // emoji or initial
  logoColor: string; // tailwind bg utility
  location: string;
  salaryMin: number;
  salaryMax: number;
  type: JobType;
  experience: "Fresh Graduate" | "1-2 Years" | "3-5 Years" | "Senior";
  industry: string;
  postedDays: number;
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  skills: string[];
}

export const CITIES = ["Islamabad", "Lahore", "Karachi", "Rawalpindi", "Faisalabad", "Multan", "Peshawar", "Remote"] as const;
export const JOB_TYPES: JobType[] = ["Full-time", "Part-time", "Internship", "Remote", "Contract"];
export const EXPERIENCE_LEVELS = ["Fresh Graduate", "1-2 Years", "3-5 Years", "Senior"] as const;
export const SALARY_RANGES = [
  { label: "PKR 30,000+", min: 30000 },
  { label: "PKR 50,000+", min: 50000 },
  { label: "PKR 100,000+", min: 100000 },
  { label: "PKR 200,000+", min: 200000 },
];
export const INDUSTRIES = ["Software", "Design", "Banking", "Telecom", "Marketing", "Education", "Healthcare"] as const;
export const POPULAR_SEARCHES = ["Frontend Developer", "UI/UX Designer", "Software Engineer", "Data Analyst", "Graphic Designer"];

const baseJobs: Omit<Job, "description" | "responsibilities" | "requirements" | "benefits" | "skills">[] = [
  { id: "1", title: "Frontend Developer", company: "Techlogix Pakistan", companySlug: "techlogix", logo: "T", logoColor: "bg-blue-600", location: "Islamabad", salaryMin: 120000, salaryMax: 180000, type: "Full-time", experience: "1-2 Years", industry: "Software", postedDays: 2 },
  { id: "2", title: "UI/UX Designer", company: "Systems Limited", companySlug: "systems-limited", logo: "S", logoColor: "bg-indigo-600", location: "Lahore", salaryMin: 100000, salaryMax: 160000, type: "Full-time", experience: "1-2 Years", industry: "Design", postedDays: 1 },
  { id: "3", title: "Software Engineer", company: "NETSOL Technologies", companySlug: "netsol", logo: "N", logoColor: "bg-sky-600", location: "Lahore", salaryMin: 150000, salaryMax: 250000, type: "Full-time", experience: "3-5 Years", industry: "Software", postedDays: 4 },
  { id: "4", title: "Graphic Designer", company: "Creative Chaos", companySlug: "creative-chaos", logo: "C", logoColor: "bg-pink-600", location: "Karachi", salaryMin: 80000, salaryMax: 130000, type: "Full-time", experience: "1-2 Years", industry: "Design", postedDays: 6 },
  { id: "5", title: "Data Analyst", company: "Jazz Pakistan", companySlug: "jazz", logo: "J", logoColor: "bg-red-600", location: "Islamabad", salaryMin: 110000, salaryMax: 180000, type: "Full-time", experience: "1-2 Years", industry: "Telecom", postedDays: 3 },
  { id: "6", title: "Backend Engineer (Node.js)", company: "Arbisoft", companySlug: "arbisoft", logo: "A", logoColor: "bg-emerald-600", location: "Lahore", salaryMin: 180000, salaryMax: 300000, type: "Remote", experience: "3-5 Years", industry: "Software", postedDays: 1 },
  { id: "7", title: "Marketing Intern", company: "PTCL Group", companySlug: "ptcl", logo: "P", logoColor: "bg-violet-600", location: "Islamabad", salaryMin: 30000, salaryMax: 45000, type: "Internship", experience: "Fresh Graduate", industry: "Marketing", postedDays: 5 },
  { id: "8", title: "Mobile App Developer (Flutter)", company: "Techlogix Pakistan", companySlug: "techlogix", logo: "T", logoColor: "bg-blue-600", location: "Karachi", salaryMin: 140000, salaryMax: 220000, type: "Full-time", experience: "3-5 Years", industry: "Software", postedDays: 7 },
  { id: "9", title: "Product Manager", company: "Systems Limited", companySlug: "systems-limited", logo: "S", logoColor: "bg-indigo-600", location: "Remote", salaryMin: 250000, salaryMax: 400000, type: "Remote", experience: "Senior", industry: "Software", postedDays: 2 },
  { id: "10", title: "Customer Support Executive", company: "Jazz Pakistan", companySlug: "jazz", logo: "J", logoColor: "bg-red-600", location: "Lahore", salaryMin: 45000, salaryMax: 70000, type: "Full-time", experience: "Fresh Graduate", industry: "Telecom", postedDays: 1 },
  { id: "11", title: "DevOps Engineer", company: "NETSOL Technologies", companySlug: "netsol", logo: "N", logoColor: "bg-sky-600", location: "Islamabad", salaryMin: 200000, salaryMax: 320000, type: "Full-time", experience: "Senior", industry: "Software", postedDays: 9 },
  { id: "12", title: "Content Writer (Freelance)", company: "Creative Chaos", companySlug: "creative-chaos", logo: "C", logoColor: "bg-pink-600", location: "Remote", salaryMin: 40000, salaryMax: 90000, type: "Contract", experience: "1-2 Years", industry: "Marketing", postedDays: 3 },
  { id: "13", title: "Software Engineer (Govt.)", company: "NADRA", companySlug: "nadra", logo: "N", logoColor: "bg-emerald-700", location: "Islamabad", salaryMin: 90000, salaryMax: 140000, type: "Government", experience: "1-2 Years", industry: "Software", postedDays: 4 },
  { id: "14", title: "Assistant Director (BPS-17)", company: "FBR Pakistan", companySlug: "fbr", logo: "F", logoColor: "bg-green-700", location: "Islamabad", salaryMin: 80000, salaryMax: 130000, type: "Government", experience: "Fresh Graduate", industry: "Banking", postedDays: 10 },
  { id: "15", title: "Logo Designer (Freelance)", company: "Independent", companySlug: "independent", logo: "I", logoColor: "bg-amber-600", location: "Remote", salaryMin: 25000, salaryMax: 80000, type: "Freelance", experience: "1-2 Years", industry: "Design", postedDays: 1 },
];

export const JOBS: Job[] = baseJobs.map((j) => ({
  ...j,
  description: `We are looking for a talented ${j.title} to join ${j.company}. You'll work with a passionate team building products used across Pakistan and beyond. This role offers an excellent opportunity to grow your career in a fast-paced, collaborative environment.`,
  responsibilities: [
    `Own delivery of ${j.title.toLowerCase()} initiatives end-to-end`,
    "Collaborate with cross-functional teams across design, engineering and product",
    "Write clean, maintainable, well-tested code or design assets",
    "Participate in code reviews, design critiques and team rituals",
    "Drive technical excellence and mentor junior team members",
  ],
  requirements: [
    `${j.experience} experience in a similar role`,
    "Strong communication skills in English and Urdu",
    "Solid foundation in your discipline with a portfolio or GitHub to show",
    "Bachelor's degree in CS, Design or related field (or equivalent experience)",
    "Comfortable working in a hybrid / on-site setup",
  ],
  benefits: [
    "Competitive PKR salary with annual reviews",
    "Health insurance for you and family",
    "Paid annual leave and Eid bonuses",
    "Learning & development budget",
    "Modern office with free meals (or remote stipend)",
  ],
  skills: ["Communication", "Teamwork", "Problem Solving", j.industry, j.title.split(" ")[0]],
}));

export interface Company {
  slug: string;
  name: string;
  logo: string;
  logoColor: string;
  industry: string;
  location: string;
  employees: string;
  rating: number;
  about: string;
  website: string;
}

export const COMPANIES: Company[] = [
  { slug: "systems-limited", name: "Systems Limited", logo: "S", logoColor: "bg-indigo-600", industry: "Information Technology", location: "Lahore", employees: "5,000+", rating: 4.4, about: "Systems Limited is Pakistan's leading IT consulting and software services company, serving Fortune 500 clients globally.", website: "https://www.systemsltd.com" },
  { slug: "netsol", name: "NETSOL Technologies", logo: "N", logoColor: "bg-sky-600", industry: "Software", location: "Lahore", employees: "1,500+", rating: 4.2, about: "NETSOL provides global IT and enterprise software solutions, specializing in asset finance and leasing.", website: "https://www.netsoltech.com" },
  { slug: "jazz", name: "Jazz Pakistan", logo: "J", logoColor: "bg-red-600", industry: "Telecommunications", location: "Islamabad", employees: "4,000+", rating: 4.1, about: "Jazz is Pakistan's largest mobile network operator, driving digital inclusion across the country.", website: "https://jazz.com.pk" },
  { slug: "ptcl", name: "PTCL Group", logo: "P", logoColor: "bg-violet-600", industry: "Telecommunications", location: "Islamabad", employees: "10,000+", rating: 3.9, about: "PTCL is Pakistan's largest integrated information communication technology company.", website: "https://ptcl.com.pk" },
  { slug: "techlogix", name: "Techlogix", logo: "T", logoColor: "bg-blue-600", industry: "IT Services", location: "Islamabad", employees: "1,200+", rating: 4.3, about: "Techlogix is a leading provider of business consulting, systems integration and application development.", website: "https://www.techlogix.com" },
  { slug: "arbisoft", name: "Arbisoft", logo: "A", logoColor: "bg-emerald-600", industry: "Software", location: "Lahore", employees: "800+", rating: 4.6, about: "Arbisoft builds world-class software products in partnership with leading companies around the globe.", website: "https://arbisoft.com" },
];

export function formatPKR(n: number): string {
  return new Intl.NumberFormat("en-PK").format(n);
}

export function jobOpenings(slug: string): number {
  return JOBS.filter((j) => j.companySlug === slug).length;
}