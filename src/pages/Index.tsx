import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CategoriesSection from "@/components/CategoriesSection";
import PopularTools from "@/components/PopularTools";
import AllToolsGrid from "@/components/AllToolsGrid";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <CategoriesSection />
      <PopularTools />
      <AllToolsGrid />
      <Footer />
    </div>
  );
};

export default Index;
