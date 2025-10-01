import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Copy, Trash2, Download } from "lucide-react";
import { toast } from "sonner";

const AiSummarizer = () => {
  const [inputText, setInputText] = useState("");
  const [summary, setSummary] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [summaryLength, setSummaryLength] = useState("medium");

  const callDeepSeekAPI = async (text: string) => {
    const prompt = `Please summarize the following text in a ${summaryLength} length summary. Focus on the main points and key information:

${text}

Summary:`;

    const response = await fetch('https://deepseek-v31.p.rapidapi.com/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-rapidapi-host': 'deepseek-v31.p.rapidapi.com',
        'x-rapidapi-key': '165dbf3f30msh28cfa96fd4e8cbfp100001jsnaa16e61c1a40'
      },
      body: JSON.stringify({
        model: "DeepSeek-V3-0324",
        messages: [
          {
            role: "user",
            content: prompt
          }
        ]
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  };

  const generateSummary = async () => {
    if (!inputText.trim()) {
      toast.error("Please enter some text to summarize");
      return;
    }

    if (inputText.length < 50) {
      toast.error("Text is too short. Please enter at least 50 characters.");
      return;
    }

    setIsLoading(true);
    try {
      const result = await callDeepSeekAPI(inputText);
      setSummary(result);
      toast.success("Summary generated successfully!");
    } catch (error) {
      console.error('Error generating summary:', error);
      toast.error("Failed to generate summary. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const copySummary = () => {
    navigator.clipboard.writeText(summary);
    toast.success("Summary copied to clipboard!");
  };

  const downloadSummary = () => {
    const blob = new Blob([summary], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'summary.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Summary downloaded!");
  };

  const clearAll = () => {
    setInputText("");
    setSummary("");
    toast.success("All content cleared!");
  };

  const getWordCount = (text: string) => {
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-2xl mb-6">
              <Sparkles className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              AI Text Summarizer
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Summarize long articles and documents using AI.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Input Section */}
            <div className="space-y-4">
              <Card className="border-border shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Input Text</CardTitle>
                      <CardDescription>
                        Paste your text here to summarize
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={clearAll}
                        variant="outline"
                        size="sm"
                        className="text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Clear
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Paste your article, document, or any text you want to summarize here..."
                    className="min-h-[300px] resize-none"
                  />
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{getWordCount(inputText)} words</span>
                    <span>{inputText.length} characters</span>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Summary Length</label>
                    <select
                      value={summaryLength}
                      onChange={(e) => setSummaryLength(e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-md"
                    >
                      <option value="short">Short (1-2 sentences)</option>
                      <option value="medium">Medium (2-3 paragraphs)</option>
                      <option value="long">Long (3-4 paragraphs)</option>
                    </select>
                  </div>

                  <Button
                    onClick={generateSummary}
                    disabled={isLoading || !inputText.trim()}
                    className="w-full bg-primary hover:bg-primary/90"
                    size="lg"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Summarizing...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 mr-2" />
                        Generate Summary
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Output Section */}
            <div className="space-y-4">
              <Card className="border-border shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>AI Summary</CardTitle>
                      <CardDescription>
                        Generated summary of your text
                      </CardDescription>
                    </div>
                    {summary && (
                      <div className="flex gap-2">
                        <Button
                          onClick={copySummary}
                          variant="outline"
                          size="sm"
                        >
                          <Copy className="w-4 h-4 mr-2" />
                          Copy
                        </Button>
                        <Button
                          onClick={downloadSummary}
                          variant="outline"
                          size="sm"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  {summary ? (
                    <div className="space-y-4">
                      <div className="p-4 bg-muted/50 rounded-lg min-h-[300px]">
                        <p className="whitespace-pre-wrap text-sm leading-relaxed">
                          {summary}
                        </p>
                      </div>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>{getWordCount(summary)} words</span>
                        <span>{summary.length} characters</span>
                      </div>
                    </div>
                  ) : (
                    <div className="min-h-[300px] flex items-center justify-center text-muted-foreground">
                      <div className="text-center">
                        <Sparkles className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>Your AI-generated summary will appear here</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Tips */}
          <Card className="border-border shadow-lg mt-6">
            <CardHeader>
              <CardTitle>Tips for Better Summaries</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                <div className="p-3 bg-muted/50 rounded-lg">
                  <div className="font-semibold">Clear Text</div>
                  <div className="text-muted-foreground">Use well-structured text for better results</div>
                </div>
                <div className="p-3 bg-muted/50 rounded-lg">
                  <div className="font-semibold">Appropriate Length</div>
                  <div className="text-muted-foreground">Text should be at least 50 characters long</div>
                </div>
                <div className="p-3 bg-muted/50 rounded-lg">
                  <div className="font-semibold">Choose Length</div>
                  <div className="text-muted-foreground">Select summary length based on your needs</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AiSummarizer;
