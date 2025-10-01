import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PenTool, Copy, Trash2, Download, Sparkles } from "lucide-react";
import { toast } from "sonner";

const AiContentWriter = () => {
  const [topic, setTopic] = useState("");
  const [contentType, setContentType] = useState("blog");
  const [tone, setTone] = useState("professional");
  const [wordCount, setWordCount] = useState("500");
  const [keywords, setKeywords] = useState("");
  const [generatedContent, setGeneratedContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const callDeepSeekAPI = async (prompt: string) => {
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

  const generateContent = async () => {
    if (!topic.trim()) {
      toast.error("Please enter a topic");
      return;
    }

    setIsLoading(true);
    try {
      const prompt = `Write a ${contentType} about "${topic}" in a ${tone} tone. 
      
Target word count: ${wordCount} words
${keywords ? `Keywords to include: ${keywords}` : ''}

Please create engaging, well-structured content with:
- A compelling introduction
- Clear main points
- Proper formatting
- A strong conclusion

Content:`;

      const result = await callDeepSeekAPI(prompt);
      setGeneratedContent(result);
      toast.success("Content generated successfully!");
    } catch (error) {
      console.error('Error generating content:', error);
      toast.error("Failed to generate content. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const copyContent = () => {
    navigator.clipboard.writeText(generatedContent);
    toast.success("Content copied to clipboard!");
  };

  const downloadContent = () => {
    const blob = new Blob([generatedContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${topic.replace(/\s+/g, '-').toLowerCase()}-content.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Content downloaded!");
  };

  const clearAll = () => {
    setTopic("");
    setKeywords("");
    setGeneratedContent("");
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
              <PenTool className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              AI Content Writer
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Generate blog posts, articles, and content with AI.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Input Section */}
            <div className="space-y-4">
              <Card className="border-border shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Content Settings</CardTitle>
                      <CardDescription>
                        Configure your content requirements
                      </CardDescription>
                    </div>
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
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Topic/Subject</label>
                    <Input
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      placeholder="e.g., Benefits of Remote Work"
                      className="w-full"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Content Type</label>
                      <select
                        value={contentType}
                        onChange={(e) => setContentType(e.target.value)}
                        className="w-full px-3 py-2 border border-border rounded-md"
                      >
                        <option value="blog">Blog Post</option>
                        <option value="article">Article</option>
                        <option value="essay">Essay</option>
                        <option value="social">Social Media Post</option>
                        <option value="email">Email</option>
                        <option value="product">Product Description</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Tone</label>
                      <select
                        value={tone}
                        onChange={(e) => setTone(e.target.value)}
                        className="w-full px-3 py-2 border border-border rounded-md"
                      >
                        <option value="professional">Professional</option>
                        <option value="casual">Casual</option>
                        <option value="friendly">Friendly</option>
                        <option value="formal">Formal</option>
                        <option value="conversational">Conversational</option>
                        <option value="persuasive">Persuasive</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Target Word Count</label>
                    <select
                      value={wordCount}
                      onChange={(e) => setWordCount(e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-md"
                    >
                      <option value="200">200 words</option>
                      <option value="300">300 words</option>
                      <option value="500">500 words</option>
                      <option value="750">750 words</option>
                      <option value="1000">1000 words</option>
                      <option value="1500">1500 words</option>
                      <option value="2000">2000 words</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Keywords (optional)</label>
                    <Input
                      value={keywords}
                      onChange={(e) => setKeywords(e.target.value)}
                      placeholder="e.g., productivity, efficiency, work-life balance"
                      className="w-full"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Separate keywords with commas
                    </p>
                  </div>

                  <Button
                    onClick={generateContent}
                    disabled={isLoading || !topic.trim()}
                    className="w-full bg-primary hover:bg-primary/90"
                    size="lg"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 mr-2" />
                        Generate Content
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
                      <CardTitle>Generated Content</CardTitle>
                      <CardDescription>
                        AI-generated content based on your settings
                      </CardDescription>
                    </div>
                    {generatedContent && (
                      <div className="flex gap-2">
                        <Button
                          onClick={copyContent}
                          variant="outline"
                          size="sm"
                        >
                          <Copy className="w-4 h-4 mr-2" />
                          Copy
                        </Button>
                        <Button
                          onClick={downloadContent}
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
                  {generatedContent ? (
                    <div className="space-y-4">
                      <div className="p-4 bg-muted/50 rounded-lg min-h-[400px] max-h-[500px] overflow-y-auto">
                        <div className="whitespace-pre-wrap text-sm leading-relaxed">
                          {generatedContent}
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>{getWordCount(generatedContent)} words</span>
                        <span>{generatedContent.length} characters</span>
                      </div>
                    </div>
                  ) : (
                    <div className="min-h-[400px] flex items-center justify-center text-muted-foreground">
                      <div className="text-center">
                        <PenTool className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>Your AI-generated content will appear here</p>
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
              <CardTitle>Content Writing Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                <div className="p-3 bg-muted/50 rounded-lg">
                  <div className="font-semibold">Clear Topic</div>
                  <div className="text-muted-foreground">Be specific about what you want to write about</div>
                </div>
                <div className="p-3 bg-muted/50 rounded-lg">
                  <div className="font-semibold">Appropriate Tone</div>
                  <div className="text-muted-foreground">Choose tone that matches your audience</div>
                </div>
                <div className="p-3 bg-muted/50 rounded-lg">
                  <div className="font-semibold">Keywords</div>
                  <div className="text-muted-foreground">Include relevant keywords for better SEO</div>
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

export default AiContentWriter;
