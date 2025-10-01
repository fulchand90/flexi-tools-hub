import {
  FileText,
  Layers,
  Minimize2,
  Lock,
  Image,
  Calculator,
  FileEdit,
  Quote,
  Timer,
  BookOpen,
  Receipt,
  Home,
  Wallet,
  DollarSign,
  TrendingUp,
  Sparkles,
  ImageIcon,
  Code,
  PenTool,
  FileUser,
} from "lucide-react";

export interface Tool {
  id: string;
  name: string;
  description: string;
  category: "pdf" | "student" | "finance" | "ai";
  icon: any;
  path: string;
  popular?: boolean;
}

export const tools: Tool[] = [
  // PDF Tools
  {
    id: "pdf-to-word",
    name: "DocuFlex PDF to Word",
    description: "Convert your PDF files to editable Word documents online for free.",
    category: "pdf",
    icon: FileText,
    path: "/tools/pdf-to-word",
    popular: true,
  },
  {
    id: "pdf-merge",
    name: "PDFMerge Pro",
    description: "Merge multiple PDF files into a single document effortlessly.",
    category: "pdf",
    icon: Layers,
    path: "/tools/pdf-merge",
    popular: true,
  },
  {
    id: "pdf-compress",
    name: "PDF Compressor Ultra",
    description: "Reduce PDF file size while maintaining quality.",
    category: "pdf",
    icon: Minimize2,
    path: "/tools/pdf-compress",
  },
  {
    id: "pdf-lock",
    name: "SecurePDF Locker",
    description: "Add password protection to your PDF documents.",
    category: "pdf",
    icon: Lock,
    path: "/tools/pdf-lock",
  },
  {
    id: "image-to-pdf",
    name: "ImageToPDF Converter",
    description: "Convert images (JPG, PNG) to PDF format instantly.",
    category: "pdf",
    icon: Image,
    path: "/tools/image-to-pdf",
  },

  // Student Tools
  {
    id: "grade-calculator",
    name: "GradeCalc Pro",
    description: "Calculate your GPA and course grades accurately.",
    category: "student",
    icon: Calculator,
    path: "/tools/grade-calculator",
    popular: true,
  },
  {
    id: "essay-counter",
    name: "EssayLength Counter",
    description: "Count words, characters, and pages in your essays.",
    category: "student",
    icon: FileEdit,
    path: "/tools/essay-counter",
  },
  {
    id: "citation-generator",
    name: "Citation Generator Plus",
    description: "Generate citations in APA, MLA, and Chicago styles.",
    category: "student",
    icon: Quote,
    path: "/tools/citation-generator",
  },
  {
    id: "study-timer",
    name: "Study Timer Focus",
    description: "Pomodoro timer to boost your study productivity.",
    category: "student",
    icon: Timer,
    path: "/tools/study-timer",
  },
  {
    id: "flashcard-maker",
    name: "Flashcard Maker",
    description: "Create digital flashcards for effective studying.",
    category: "student",
    icon: BookOpen,
    path: "/tools/flashcard-maker",
  },

  // Finance Tools
  {
    id: "tax-calculator",
    name: "TaxCalc Smart",
    description: "Calculate your income tax and deductions easily.",
    category: "finance",
    icon: Receipt,
    path: "/tools/tax-calculator",
  },
  {
    id: "loan-calculator",
    name: "Loan EMI Calculator",
    description: "Calculate monthly EMI for home, car, and personal loans.",
    category: "finance",
    icon: Home,
    path: "/tools/loan-calculator",
    popular: true,
  },
  {
    id: "budget-planner",
    name: "Budget Planner Pro",
    description: "Plan and track your monthly budget efficiently.",
    category: "finance",
    icon: Wallet,
    path: "/tools/budget-planner",
  },
  {
    id: "currency-converter",
    name: "Currency Converter Live",
    description: "Convert currencies with real-time exchange rates.",
    category: "finance",
    icon: DollarSign,
    path: "/tools/currency-converter",
  },
  {
    id: "investment-calculator",
    name: "Investment ROI Calculator",
    description: "Calculate returns on your investments and savings.",
    category: "finance",
    icon: TrendingUp,
    path: "/tools/investment-calculator",
  },

  // AI Tools
  {
    id: "ai-summarizer",
    name: "AI Text Summarizer",
    description: "Summarize long articles and documents using AI.",
    category: "ai",
    icon: Sparkles,
    path: "/tools/ai-summarizer",
    popular: true,
  },
  {
    id: "ai-image-generator",
    name: "AI Image Generator",
    description: "Generate stunning images from text descriptions.",
    category: "ai",
    icon: ImageIcon,
    path: "/tools/ai-image-generator",
    popular: true,
  },
  {
    id: "ai-code-helper",
    name: "AI Code Helper",
    description: "Get AI-powered coding assistance and debugging help.",
    category: "ai",
    icon: Code,
    path: "/tools/ai-code-helper",
  },
  {
    id: "ai-content-writer",
    name: "AI Content Writer",
    description: "Generate blog posts, articles, and content with AI.",
    category: "ai",
    icon: PenTool,
    path: "/tools/ai-content-writer",
  },
  {
    id: "ai-resume-builder",
    name: "AI Resume Builder",
    description: "Create professional resumes with AI assistance.",
    category: "ai",
    icon: FileUser,
    path: "/tools/ai-resume-builder",
    popular: true,
  },
];

export const categories = [
  { id: "pdf", name: "PDF Tools", icon: FileText },
  { id: "student", name: "Student Tools", icon: BookOpen },
  { id: "finance", name: "Finance Tools", icon: Wallet },
  { id: "ai", name: "AI Tools", icon: Sparkles },
];
