import { useState, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Image, Upload, Download, Trash2 } from "lucide-react";
import { toast } from "sonner";
import jsPDF from "jspdf";

const ImageToPdf = () => {
  const [images, setImages] = useState<File[]>([]);
  const [isConverting, setIsConverting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const imageFiles = files.filter(file => 
      file.type.startsWith('image/') && 
      ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'].includes(file.type)
    );

    if (imageFiles.length === 0) {
      toast.error("Please select valid image files (JPG, PNG, GIF, WebP)");
      return;
    }

    setImages(prev => [...prev, ...imageFiles]);
    toast.success(`${imageFiles.length} image(s) added successfully!`);
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    toast.success("Image removed");
  };

  const convertToPdf = async () => {
    if (images.length === 0) {
      toast.error("Please add at least one image");
      return;
    }

    setIsConverting(true);
    try {
      const pdf = new jsPDF();
      let isFirstPage = true;

      for (let i = 0; i < images.length; i++) {
        const image = images[i];
        const img = new Image();
        
        await new Promise((resolve, reject) => {
          img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            // Calculate dimensions to fit page
            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();
            const margin = 10;
            const maxWidth = pageWidth - (margin * 2);
            const maxHeight = pageHeight - (margin * 2);
            
            let { width, height } = img;
            
            // Scale image to fit page
            if (width > maxWidth || height > maxHeight) {
              const ratio = Math.min(maxWidth / width, maxHeight / height);
              width *= ratio;
              height *= ratio;
            }
            
            canvas.width = width;
            canvas.height = height;
            
            if (ctx) {
              ctx.drawImage(img, 0, 0, width, height);
              
              if (!isFirstPage) {
                pdf.addPage();
              }
              
              const imgData = canvas.toDataURL('image/jpeg', 0.8);
              const x = (pageWidth - width) / 2;
              const y = (pageHeight - height) / 2;
              
              pdf.addImage(imgData, 'JPEG', x, y, width, height);
              isFirstPage = false;
              resolve(true);
            } else {
              reject(new Error('Canvas context not available'));
            }
          };
          
          img.onerror = () => reject(new Error('Failed to load image'));
          img.src = URL.createObjectURL(image);
        });
      }

      // Download the PDF
      pdf.save('converted-images.pdf');
      toast.success("PDF created and downloaded successfully!");
      
    } catch (error) {
      console.error('Error converting to PDF:', error);
      toast.error("Failed to convert images to PDF");
    } finally {
      setIsConverting(false);
    }
  };

  const clearAll = () => {
    setImages([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    toast.success("All images cleared");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-2xl mb-6">
              <Image className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              ImageToPDF Converter
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Convert images (JPG, PNG, GIF, WebP) to PDF format instantly.
            </p>
          </div>

          <Card className="border-border shadow-lg">
            <CardHeader>
              <CardTitle>Image to PDF Converter</CardTitle>
              <CardDescription>
                Upload multiple images and convert them to a single PDF document
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Upload Section */}
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Upload Images</h3>
                  <p className="text-muted-foreground mb-4">
                    Select multiple images to convert to PDF
                  </p>
                  <Button 
                    onClick={() => fileInputRef.current?.click()}
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Choose Images
                  </Button>
                </div>

                {/* Images Preview */}
                {images.length > 0 && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">
                        Selected Images ({images.length})
                      </h3>
                      <Button 
                        onClick={clearAll}
                        variant="outline"
                        size="sm"
                        className="text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Clear All
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {images.map((image, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={URL.createObjectURL(image)}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg border"
                          />
                          <Button
                            onClick={() => removeImage(index)}
                            size="sm"
                            variant="destructive"
                            className="absolute -top-2 -right-2 w-6 h-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                          <p className="text-xs text-muted-foreground mt-1 truncate">
                            {image.name}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Convert Button */}
                {images.length > 0 && (
                  <Button 
                    onClick={convertToPdf}
                    disabled={isConverting}
                    className="w-full bg-primary hover:bg-primary/90"
                    size="lg"
                  >
                    {isConverting ? (
                      <>
                        <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Converting...
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4 mr-2" />
                        Convert to PDF
                      </>
                    )}
                  </Button>
                )}

                {/* Instructions */}
                <div className="bg-muted/50 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Instructions:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Supported formats: JPG, PNG, GIF, WebP</li>
                    <li>• Images will be automatically resized to fit the PDF page</li>
                    <li>• Each image will be on a separate page</li>
                    <li>• Maximum file size: 10MB per image</li>
                  </ul>
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

export default ImageToPdf;
