import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Target, Users, Zap } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              About FlexiTools Hub
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Your trusted companion for everyday digital tasks
            </p>
          </div>

          <div className="prose prose-lg max-w-none mb-12">
            <Card className="border-border">
              <CardContent className="pt-6">
                <p className="text-muted-foreground mb-4">
                  FlexiTools Hub is a comprehensive online platform offering 20 powerful tools
                  designed to make your digital life easier. Whether you're a student, professional,
                  or creator, our tools are built to help you work smarter and faster.
                </p>
                <p className="text-muted-foreground">
                  We believe in providing free, accessible, and user-friendly tools that anyone
                  can use without complicated setups or subscriptions. Our mission is to democratize
                  access to essential digital tools for users worldwide.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="border-border text-center hover:shadow-lg transition-shadow duration-300">
              <CardContent className="pt-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-xl mb-4">
                  <Target className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Our Mission</h3>
                <p className="text-muted-foreground text-sm">
                  To provide free, powerful tools that empower everyone to achieve more
                </p>
              </CardContent>
            </Card>

            <Card className="border-border text-center hover:shadow-lg transition-shadow duration-300">
              <CardContent className="pt-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-xl mb-4">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Community First</h3>
                <p className="text-muted-foreground text-sm">
                  Built by users, for users - we listen and continuously improve
                </p>
              </CardContent>
            </Card>

            <Card className="border-border text-center hover:shadow-lg transition-shadow duration-300">
              <CardContent className="pt-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-xl mb-4">
                  <Zap className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Fast & Reliable</h3>
                <p className="text-muted-foreground text-sm">
                  Optimized performance with secure, privacy-focused technology
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
