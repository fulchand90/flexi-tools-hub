import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface Grade {
  id: string;
  name: string;
  grade: string;
  weight: string;
}

const GradeCalculator = () => {
  const [grades, setGrades] = useState<Grade[]>([
    { id: "1", name: "", grade: "", weight: "" },
  ]);
  const [result, setResult] = useState<number | null>(null);

  const addGrade = () => {
    setGrades([...grades, { id: Date.now().toString(), name: "", grade: "", weight: "" }]);
  };

  const removeGrade = (id: string) => {
    if (grades.length > 1) {
      setGrades(grades.filter((g) => g.id !== id));
    }
  };

  const updateGrade = (id: string, field: keyof Grade, value: string) => {
    setGrades(grades.map((g) => (g.id === id ? { ...g, [field]: value } : g)));
  };

  const calculateGPA = () => {
    let totalWeightedGrade = 0;
    let totalWeight = 0;

    for (const grade of grades) {
      const gradeValue = parseFloat(grade.grade);
      const weight = parseFloat(grade.weight);

      if (isNaN(gradeValue) || isNaN(weight)) {
        toast.error("Please enter valid numbers for all grades and weights");
        return;
      }

      totalWeightedGrade += gradeValue * weight;
      totalWeight += weight;
    }

    if (totalWeight === 0) {
      toast.error("Total weight cannot be zero");
      return;
    }

    const gpa = totalWeightedGrade / totalWeight;
    setResult(parseFloat(gpa.toFixed(2)));
    toast.success("GPA calculated successfully!");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-2xl mb-6">
              <Calculator className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              GradeCalc Pro
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Calculate your GPA and course grades accurately
            </p>
          </div>

          <Card className="border-border shadow-lg">
            <CardHeader>
              <CardTitle>Enter Your Grades</CardTitle>
              <CardDescription>
                Add your course grades and their respective weights to calculate your GPA
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {grades.map((grade, index) => (
                  <div key={grade.id} className="flex gap-4 items-end">
                    <div className="flex-1">
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Course Name
                      </label>
                      <Input
                        placeholder="e.g., Mathematics"
                        value={grade.name}
                        onChange={(e) => updateGrade(grade.id, "name", e.target.value)}
                      />
                    </div>
                    <div className="w-32">
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Grade (%)
                      </label>
                      <Input
                        type="number"
                        placeholder="85"
                        value={grade.grade}
                        onChange={(e) => updateGrade(grade.id, "grade", e.target.value)}
                      />
                    </div>
                    <div className="w-32">
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Weight
                      </label>
                      <Input
                        type="number"
                        placeholder="3"
                        value={grade.weight}
                        onChange={(e) => updateGrade(grade.id, "weight", e.target.value)}
                      />
                    </div>
                    {grades.length > 1 && (
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => removeGrade(grade.id)}
                        className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}

                <Button
                  variant="outline"
                  onClick={addGrade}
                  className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Another Course
                </Button>

                <Button onClick={calculateGPA} className="w-full bg-primary hover:bg-primary/90" size="lg">
                  Calculate GPA
                </Button>

                {result !== null && (
                  <Card className="bg-primary/5 border-primary/20 animate-scale-in">
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground mb-2">Your GPA</p>
                        <p className="text-5xl font-bold text-primary">{result}</p>
                        <p className="text-sm text-muted-foreground mt-2">
                          out of 100
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default GradeCalculator;
