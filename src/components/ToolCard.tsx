import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface ToolCardProps {
  icon: LucideIcon;
  name: string;
  description: string;
  path: string;
  category: string;
}

const ToolCard = ({ icon: Icon, name, description, path, category }: ToolCardProps) => {
  return (
    <Card className="group relative overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 transform cursor-pointer border-border bg-gradient-to-br from-card to-card hover:from-primary/5 hover:to-secondary/5">
      <Link to={path}>
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-secondary/0 to-accent/0 group-hover:from-primary/10 group-hover:via-secondary/10 group-hover:to-accent/10 transition-all duration-500 opacity-0 group-hover:opacity-100" />
        
        <CardHeader className="text-center relative z-10">
          <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl flex items-center justify-center group-hover:from-primary/30 group-hover:to-secondary/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg group-hover:shadow-xl">
            <Icon className="w-8 h-8 text-primary group-hover:text-secondary transition-colors duration-500" />
          </div>
          <CardTitle className="text-lg group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-secondary group-hover:bg-clip-text group-hover:text-transparent transition-all duration-500">
            {name}
          </CardTitle>
          <CardDescription className="text-sm mt-2 group-hover:text-foreground transition-colors duration-300">{description}</CardDescription>
        </CardHeader>
        <CardContent className="relative z-10">
          <Button 
            className="w-full relative overflow-hidden bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary text-primary-foreground transition-all duration-500 group-hover:shadow-lg"
          >
            <span className="relative z-10">Use Now</span>
            <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </Button>
        </CardContent>
      </Link>
    </Card>
  );
};

export default ToolCard;
