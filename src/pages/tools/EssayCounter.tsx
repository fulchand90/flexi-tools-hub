import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileEdit, Copy, Trash2 } from "lucide-react";
import { toast } from "sonner";

const EssayCounter = () => {
  const [text, setText] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [charCountNoSpaces, setCharCountNoSpaces] = useState(0);
  const [paragraphCount, setParagraphCount] = useState(0);
  const [sentenceCount, setSentenceCount] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    // Word count
    const words = text.trim().split(/\s+/).filter(word => word.length > 0);
    setWordCount(text.trim() === "" ? 0 : words.length);

    // Character counts
    setCharCount(text.length);
    setCharCountNoSpaces(text.replace(/\s/g, '').length);

    // Paragraph count
    const paragraphs = text.split(/\n\s*\n/).filter(para => para.trim().length > 0);
    setParagraphCount(text.trim() === "" ? 0 : paragraphs.length);

    // Sentence count
    const sentences = text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0);
    setSentenceCount(text.trim() === "" ? 0 : sentences.length);

    // Page count (assuming 250 words per page)
    setPageCount(Math.ceil(words.length / 250));
  }, [text]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
    toast.success("Text copied to clipboard!");
  };

  const clearText = () => {
    setText("");
    toast.success("Text cleared!");
  };

  const getReadingTime = () => {
    // Average reading speed: 200 words per minute
    const minutes = Math.ceil(wordCount / 200);
    return minutes;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-2xl mb-6">
              <FileEdit className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              EssayLength Counter
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Count words, characters, and pages in your essays.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Text Input */}
            <div className="lg:col-span-2">
              <Card className="border-border shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Your Text</CardTitle>
                      <CardDescription>
                        Paste or type your essay here
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={copyToClipboard}
                        variant="outline"
                        size="sm"
                        disabled={!text}
                      >
                        <Copy className="w-4 h-4 mr-2" />
                        Copy
                      </Button>
                      <Button
                        onClick={clearText}
                        variant="outline"
                        size="sm"
                        disabled={!text}
                        className="text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Clear
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Start typing or paste your essay here..."
                    className="min-h-[400px] resize-none"
                  />
                </CardContent>
              </Card>
            </div>

            {/* Statistics */}
            <div className="space-y-4">
              <Card className="border-border shadow-lg">
                <CardHeader>
                  <CardTitle>Statistics</CardTitle>
                  <CardDescription>
                    Real-time text analysis
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-primary/5 rounded-lg">
                      <div className="text-2xl font-bold text-primary">{wordCount}</div>
                      <div className="text-sm text-muted-foreground">Words</div>
                    </div>
                    <div className="text-center p-3 bg-primary/5 rounded-lg">
                      <div className="text-2xl font-bold text-primary">{charCount}</div>
                      <div className="text-sm text-muted-foreground">Characters</div>
                    </div>
                    <div className="text-center p-3 bg-primary/5 rounded-lg">
                      <div className="text-2xl font-bold text-primary">{charCountNoSpaces}</div>
                      <div className="text-sm text-muted-foreground">No Spaces</div>
                    </div>
                    <div className="text-center p-3 bg-primary/5 rounded-lg">
                      <div className="text-2xl font-bold text-primary">{paragraphCount}</div>
                      <div className="text-sm text-muted-foreground">Paragraphs</div>
                    </div>
                    <div className="text-center p-3 bg-primary/5 rounded-lg">
                      <div className="text-2xl font-bold text-primary">{sentenceCount}</div>
                      <div className="text-sm text-muted-foreground">Sentences</div>
                    </div>
                    <div className="text-center p-3 bg-primary/5 rounded-lg">
                      <div className="text-2xl font-bold text-primary">{pageCount}</div>
                      <div className="text-sm text-muted-foreground">Pages</div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <div className="text-center p-3 bg-secondary/50 rounded-lg">
                      <div className="text-lg font-semibold text-foreground">
                        {getReadingTime()} min
                      </div>
                      <div className="text-sm text-muted-foreground">Reading Time</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tips */}
              <Card className="border-border shadow-lg">
                <CardHeader>
                  <CardTitle>Writing Tips</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <div className="font-semibold">Academic Essays</div>
                      <div className="text-muted-foreground">500-2000 words</div>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <div className="font-semibold">Blog Posts</div>
                      <div className="text-muted-foreground">300-1500 words</div>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <div className="font-semibold">Social Media</div>
                      <div className="text-muted-foreground">50-280 characters</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default EssayCounter;
