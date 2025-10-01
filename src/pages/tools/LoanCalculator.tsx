import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Home } from "lucide-react";
import { toast } from "sonner";

const LoanCalculator = () => {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [tenure, setTenure] = useState("");
  const [emi, setEmi] = useState<number | null>(null);
  const [totalAmount, setTotalAmount] = useState<number | null>(null);
  const [totalInterest, setTotalInterest] = useState<number | null>(null);

  const calculateEMI = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate) / 12 / 100; // Monthly interest rate
    const n = parseFloat(tenure) * 12; // Total months

    if (isNaN(p) || isNaN(r) || isNaN(n) || p <= 0 || r < 0 || n <= 0) {
      toast.error("Please enter valid positive numbers");
      return;
    }

    const emiValue = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalAmountValue = emiValue * n;
    const totalInterestValue = totalAmountValue - p;

    setEmi(parseFloat(emiValue.toFixed(2)));
    setTotalAmount(parseFloat(totalAmountValue.toFixed(2)));
    setTotalInterest(parseFloat(totalInterestValue.toFixed(2)));
    toast.success("EMI calculated successfully!");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-2xl mb-6">
              <Home className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Loan EMI Calculator
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Calculate monthly EMI for home, car, and personal loans
            </p>
          </div>

          <Card className="border-border shadow-lg">
            <CardHeader>
              <CardTitle>Loan Details</CardTitle>
              <CardDescription>
                Enter your loan amount, interest rate, and tenure to calculate EMI
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Loan Amount (₹)
                  </label>
                  <Input
                    type="number"
                    placeholder="500000"
                    value={principal}
                    onChange={(e) => setPrincipal(e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Annual Interest Rate (%)
                  </label>
                  <Input
                    type="number"
                    step="0.1"
                    placeholder="8.5"
                    value={rate}
                    onChange={(e) => setRate(e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Loan Tenure (Years)
                  </label>
                  <Input
                    type="number"
                    placeholder="20"
                    value={tenure}
                    onChange={(e) => setTenure(e.target.value)}
                  />
                </div>

                <Button onClick={calculateEMI} className="w-full bg-primary hover:bg-primary/90" size="lg">
                  Calculate EMI
                </Button>

                {emi !== null && (
                  <div className="space-y-4 animate-scale-in">
                    <Card className="bg-primary/5 border-primary/20">
                      <CardContent className="pt-6">
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground mb-2">Monthly EMI</p>
                          <p className="text-4xl font-bold text-primary">₹{emi.toLocaleString()}</p>
                        </div>
                      </CardContent>
                    </Card>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card className="border-border">
                        <CardContent className="pt-6">
                          <p className="text-sm text-muted-foreground mb-1">Total Amount Payable</p>
                          <p className="text-2xl font-bold text-foreground">
                            ₹{totalAmount?.toLocaleString()}
                          </p>
                        </CardContent>
                      </Card>

                      <Card className="border-border">
                        <CardContent className="pt-6">
                          <p className="text-sm text-muted-foreground mb-1">Total Interest</p>
                          <p className="text-2xl font-bold text-foreground">
                            ₹{totalInterest?.toLocaleString()}
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
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

export default LoanCalculator;
