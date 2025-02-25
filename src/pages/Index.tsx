
import { useState } from "react";
import { QRCode } from "@/components/QRCode";
import { ColorPicker } from "@/components/ColorPicker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Index = () => {
  const [qrValue, setQrValue] = useState("");
  const [qrColor, setQrColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#FFFFFF");

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent-light to-white p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-block px-4 py-1.5 mb-4 rounded-full bg-accent/10 text-accent text-sm font-medium">
            QR Code Generator
          </div>
          <h1 className="text-4xl font-bold text-primary mb-4">StryQR</h1>
          <p className="text-gray-600">Generate beautiful, customizable QR codes instantly</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-8 bg-white/40 backdrop-blur-sm p-8 rounded-2xl shadow-lg animate-fade-in">
            <div className="space-y-4">
              <Label htmlFor="qr-content">Content</Label>
              <Input
                id="qr-content"
                placeholder="Enter URL or text..."
                value={qrValue}
                onChange={(e) => setQrValue(e.target.value)}
                className="w-full"
              />
            </div>

            <div className="space-y-4">
              <Label>QR Code Color</Label>
              <ColorPicker selectedColor={qrColor} onChange={setQrColor} />
            </div>

            <div className="space-y-4">
              <Label>Background Color</Label>
              <ColorPicker selectedColor={bgColor} onChange={setBgColor} />
            </div>
          </div>

          <div className="flex items-center justify-center">
            <QRCode
              value={qrValue}
              color={qrColor}
              backgroundColor={bgColor}
              className="transform hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
