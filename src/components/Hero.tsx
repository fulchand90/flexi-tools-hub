import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  const scrollToTools = () => {
    const toolsSection = document.getElementById("tools-section");
    if (toolsSection) {
      toolsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/5 animate-shimmer" 
           style={{ backgroundSize: "200% 200%" }} />
      
      {/* Floating orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-6 leading-tight animate-bounce-in">
            All-in-One Online Tools Hub – Convert, Calculate & Create
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-slide-up">
            Free tools for students, professionals, and creators worldwide
          </p>
          <Button
            size="lg"
            onClick={scrollToTools}
            className="relative bg-gradient-to-r from-primary to-secondary hover:from-primary-hover hover:to-secondary text-primary-foreground px-8 py-6 text-lg shadow-xl hover:shadow-2xl transition-all duration-500 group animate-glow hover:scale-110 transform"
          >
            <span className="relative z-10">Start Using Tools</span>
            <ArrowDown className="ml-2 w-5 h-5 group-hover:translate-y-2 transition-transform duration-500 relative z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
