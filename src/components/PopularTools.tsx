import ToolCard from "./ToolCard";
import { tools } from "@/data/tools";

const PopularTools = () => {
  const popularTools = tools.filter((tool) => tool.popular);

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Popular Tools
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Most loved tools by our community
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularTools.map((tool) => (
            <ToolCard
              key={tool.id}
              icon={tool.icon}
              name={tool.name}
              description={tool.description}
              path={tool.path}
              category={tool.category}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularTools;
