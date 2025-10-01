import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const categories = [
    { name: "PDF Tools", path: "/category/pdf" },
    { name: "Student Tools", path: "/category/student" },
    { name: "Finance Tools", path: "/category/finance" },
    { name: "AI Tools", path: "/category/ai" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur-xl border-b border-border shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg group-hover:shadow-xl animate-glow">
              <span className="text-primary-foreground font-bold text-xl">FT</span>
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent hidden sm:block group-hover:scale-105 transition-transform duration-300">FlexiTools</span>
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            <Link to="/">
              <Button variant="ghost" className="text-foreground hover:text-primary hover:bg-gradient-to-r hover:from-primary/10 hover:to-secondary/10 hover:scale-105 transition-all duration-300">
                Home
              </Button>
            </Link>
            
            <div className="relative group">
              <Button variant="ghost" className="text-foreground hover:text-primary hover:bg-gradient-to-r hover:from-primary/10 hover:to-secondary/10 hover:scale-105 transition-all duration-300">
                Categories
              </Button>
              <div className="absolute left-0 mt-2 w-56 bg-card/95 backdrop-blur-xl rounded-xl shadow-2xl border border-primary/20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 overflow-hidden">
                {categories.map((category) => (
                  <Link
                    key={category.name}
                    to={category.path}
                    className="block px-4 py-3 text-sm text-foreground hover:bg-gradient-to-r hover:from-primary/10 hover:to-secondary/10 hover:text-primary hover:translate-x-2 transition-all duration-300"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>

            <Link to="/about">
              <Button variant="ghost" className="text-foreground hover:text-primary hover:bg-gradient-to-r hover:from-primary/10 hover:to-secondary/10 hover:scale-105 transition-all duration-300">
                About
              </Button>
            </Link>
            
            <Link to="/contact">
              <Button variant="ghost" className="text-foreground hover:text-primary hover:bg-gradient-to-r hover:from-primary/10 hover:to-secondary/10 hover:scale-105 transition-all duration-300">
                Contact
              </Button>
            </Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-foreground hover:text-primary"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4 animate-fade-in">
            <Link to="/" onClick={() => setIsOpen(false)}>
              <Button variant="ghost" className="w-full text-left justify-start mb-1">
                Home
              </Button>
            </Link>
            
            <div className="pl-4 space-y-1">
              <p className="text-sm font-semibold text-muted-foreground px-3 py-2">Categories</p>
              {categories.map((category) => (
                <Link
                  key={category.name}
                  to={category.path}
                  onClick={() => setIsOpen(false)}
                >
                  <Button variant="ghost" className="w-full text-left justify-start">
                    {category.name}
                  </Button>
                </Link>
              ))}
            </div>

            <Link to="/about" onClick={() => setIsOpen(false)}>
              <Button variant="ghost" className="w-full text-left justify-start mb-1">
                About
              </Button>
            </Link>
            
            <Link to="/contact" onClick={() => setIsOpen(false)}>
              <Button variant="ghost" className="w-full text-left justify-start">
                Contact
              </Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
