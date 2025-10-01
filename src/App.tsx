import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Index from "./pages/Index";
import CategoryPage from "./pages/CategoryPage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

// Lazy load all tool components
const GradeCalculator = lazy(() => import("./pages/tools/GradeCalculator"));
const LoanCalculator = lazy(() => import("./pages/tools/LoanCalculator"));
const PdfToWord = lazy(() => import("./pages/tools/PdfToWord"));
const PdfMerge = lazy(() => import("./pages/tools/PdfMerge"));
const PdfCompress = lazy(() => import("./pages/tools/PdfCompress"));
const PdfLock = lazy(() => import("./pages/tools/PdfLock"));
const ImageToPdf = lazy(() => import("./pages/tools/ImageToPdf"));
const EssayCounter = lazy(() => import("./pages/tools/EssayCounter"));
const CitationGenerator = lazy(() => import("./pages/tools/CitationGenerator"));
const StudyTimer = lazy(() => import("./pages/tools/StudyTimer"));
const FlashcardMaker = lazy(() => import("./pages/tools/FlashcardMaker"));
const TaxCalculator = lazy(() => import("./pages/tools/TaxCalculator"));
const BudgetPlanner = lazy(() => import("./pages/tools/BudgetPlanner"));
const CurrencyConverter = lazy(() => import("./pages/tools/CurrencyConverter"));
const InvestmentCalculator = lazy(() => import("./pages/tools/InvestmentCalculator"));
const AiSummarizer = lazy(() => import("./pages/tools/AiSummarizer"));
const AiImageGenerator = lazy(() => import("./pages/tools/AiImageGenerator"));
const AiCodeHelper = lazy(() => import("./pages/tools/AiCodeHelper"));
const AiContentWriter = lazy(() => import("./pages/tools/AiContentWriter"));
const AiResumeBuilder = lazy(() => import("./pages/tools/AiResumeBuilder"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/category/:category" element={<CategoryPage />} />
            
            {/* Tool Routes */}
            <Route path="/tools/grade-calculator" element={<GradeCalculator />} />
            <Route path="/tools/loan-calculator" element={<LoanCalculator />} />
            <Route path="/tools/pdf-to-word" element={<PdfToWord />} />
            <Route path="/tools/pdf-merge" element={<PdfMerge />} />
            <Route path="/tools/pdf-compress" element={<PdfCompress />} />
            <Route path="/tools/pdf-lock" element={<PdfLock />} />
            <Route path="/tools/image-to-pdf" element={<ImageToPdf />} />
            <Route path="/tools/essay-counter" element={<EssayCounter />} />
            <Route path="/tools/citation-generator" element={<CitationGenerator />} />
            <Route path="/tools/study-timer" element={<StudyTimer />} />
            <Route path="/tools/flashcard-maker" element={<FlashcardMaker />} />
            <Route path="/tools/tax-calculator" element={<TaxCalculator />} />
            <Route path="/tools/budget-planner" element={<BudgetPlanner />} />
            <Route path="/tools/currency-converter" element={<CurrencyConverter />} />
            <Route path="/tools/investment-calculator" element={<InvestmentCalculator />} />
            <Route path="/tools/ai-summarizer" element={<AiSummarizer />} />
            <Route path="/tools/ai-image-generator" element={<AiImageGenerator />} />
            <Route path="/tools/ai-code-helper" element={<AiCodeHelper />} />
            <Route path="/tools/ai-content-writer" element={<AiContentWriter />} />
            <Route path="/tools/ai-resume-builder" element={<AiResumeBuilder />} />
            
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
