import { Link } from "react-router-dom";
import { categories } from "@/data/tools";
import { Card, CardContent } from "@/components/ui/card";

const CategoriesSection = () => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Browse by Category
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover tools organized by purpose to help you work smarter
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Link key={category.id} to={`/category/${category.id}`}>
              <Card 
                className="group relative overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-110 hover:-translate-y-3 transform cursor-pointer border-border bg-gradient-to-br from-card to-card animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Animated gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-secondary/0 to-accent/0 group-hover:from-primary/20 group-hover:via-secondary/20 group-hover:to-accent/20 transition-all duration-700 animate-shimmer" />
                
                <CardContent className="p-8 text-center relative z-10">
                  <div className="mx-auto mb-4 w-20 h-20 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl flex items-center justify-center group-hover:from-primary group-hover:to-secondary group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 shadow-lg group-hover:shadow-2xl animate-float">
                    <category.icon className="w-10 h-10 text-primary group-hover:text-primary-foreground transition-colors duration-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-secondary group-hover:bg-clip-text group-hover:text-transparent transition-all duration-500">
                    {category.name}
                  </h3>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
