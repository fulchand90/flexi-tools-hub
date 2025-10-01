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
    <Card className="group hover:shadow-xl transition-all duration-300 hover:scale-105 transform cursor-pointer border-border">
      <Link to={path}>
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
            <Icon className="w-8 h-8 text-primary" />
          </div>
          <CardTitle className="text-lg group-hover:text-primary transition-colors duration-300">
            {name}
          </CardTitle>
          <CardDescription className="text-sm mt-2">{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300"
          >
            Use Now
          </Button>
        </CardContent>
      </Link>
    </Card>
  );
};

export default ToolCard;
