import { useState, useEffect, useRef } from "react";
import { QRCode } from "@/components/QRCode";
import { ColorPicker } from "@/components/ColorPicker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { HelpCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

type QRDataType = "text" | "url" | "vcard" | "email" | "phone";

interface ValidationState {
  isValid: boolean;
  message: string;
}

// Add interface for vCard data
interface VCardData {
  fullName: string;
  phone: string;
  email: string;
  organization: string;
}

const Index = () => {
  const defaultText = "StryQR: Made with love";
  const qrRef = useRef<HTMLDivElement>(null);
  
  // Initialize all states with default values
  const [qrValue, setQrValue] = useState(defaultText);
  const [qrColor, setQrColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#FFFFFF");
  const [pattern, setPattern] = useState<"dots" | "squares" | "rounded">("squares");
  const [dataType, setDataType] = useState<QRDataType>("text");
  const [validation, setValidation] = useState<ValidationState>({ 
    isValid: true, 
    message: "" 
  });

  // Add vCard state
  const [vCardData, setVCardData] = useState<VCardData>({
    fullName: "",
    phone: "",
    email: "",
    organization: ""
  });

  // Ensure QR code renders on initial mount
  useEffect(() => {
    if (qrRef.current) {
      setQrValue(defaultText);
      handleDataChange(defaultText, "text");
    }
  }, []); // Empty dependency array means this runs once on mount

  // Remove URL case from validation since we're not validating URLs anymore
  const validateInput = (value: string, type: QRDataType): ValidationState => {
    switch (type) {
      case "phone":
        const phoneRegex = /^\+?[\d\s-]{10,}$/;
        return {
          isValid: phoneRegex.test(value),
          message: phoneRegex.test(value) ? "" : "Please enter a valid phone number"
        };
      default:
        return { isValid: true, message: "" };
    }
  };

  // Simplify handleDataChange to just wrap URLs
  const handleDataChange = (value: string, type: QRDataType) => {
    setDataType(type);
    
    if (type === "url") {
      // Only add https:// if there's actual content
      setQrValue(value === "" ? "" : `https://${value.replace(/^https?:\/\//, '')}`);
    } else {
      setQrValue(value);
    }
  };

  // Add vCard generator function
  const generateVCard = (data: VCardData): string => {
    return [
      "BEGIN:VCARD",
      "VERSION:3.0",
      `FN:${data.fullName}`,
      data.phone ? `TEL:${data.phone}` : "",
      data.email ? `EMAIL:${data.email}` : "",
      data.organization ? `ORG:${data.organization}` : "",
      "END:VCARD"
    ].filter(Boolean).join("\n");
  };

  const renderHelperText = (type: QRDataType) => (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <HelpCircle size={16} />
      {type === "text" && "Create a QR code for any text content"}
      {type === "url" && "Generate a QR code that opens a website when scanned"}
      {type === "vcard" && "Share contact information in vCard format"}
      {type === "phone" && "Create a QR code that opens the phone dialer"}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent-light to-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-block px-4 py-1.5 mb-4 rounded-full bg-accent/10 text-accent text-sm font-medium">
            QR Code Generator
          </div>
          <h1 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-accent to-purple-600 bg-clip-text text-transparent">
              Stry
            </span>
            <span className="text-primary">
              QR
            </span>
          </h1>
          <p className="text-gray-600">Generate beautiful, customizable QR codes instantly</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-start">
          {/* Content Panel - Left */}
          <div className="glass-card p-8 rounded-2xl shadow-lg animate-fade-in">
            <Tabs defaultValue="text" className="space-y-4">
              <TabsList className="grid grid-cols-4 gap-4">
                <TabsTrigger value="text">Text</TabsTrigger>
                <TabsTrigger value="url">URL</TabsTrigger>
                <TabsTrigger value="vcard">vCard</TabsTrigger>
                <TabsTrigger value="contact">Contact</TabsTrigger>
              </TabsList>

              <TabsContent value="text" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="text-content">Text Content</Label>
                  {renderHelperText("text")}
                  <Input
                    id="text-content"
                    placeholder="Enter any text..."
                    value={dataType === "text" ? qrValue : ""}
                    onChange={(e) => handleDataChange(e.target.value, "text")}
                    className="transition-colors focus:border-accent"
                  />
                </div>
              </TabsContent>

              <TabsContent value="url" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="url-content">Website URL</Label>
                  {renderHelperText("url")}
                  <Input
                    id="url-content"
                    placeholder="example.com"
                    value={dataType === "url" ? qrValue.replace(/^https?:\/\//, '') : ""}
                    onChange={(e) => handleDataChange(e.target.value, "url")}
                    className="w-full"
                  />
                </div>
              </TabsContent>

              <TabsContent value="vcard" className="space-y-4">
                <div className="space-y-2">
                  <Label>Contact Information</Label>
                  {renderHelperText("vcard")}
                  <div className="space-y-4">
                    <Input
                      placeholder="Full Name"
                      value={vCardData.fullName}
                      onChange={(e) => {
                        const newData = { ...vCardData, fullName: e.target.value };
                        setVCardData(newData);
                        handleDataChange(generateVCard(newData), "vcard");
                      }}
                    />
                    <Input 
                      placeholder="Phone"
                      type="tel"
                      pattern="[0-9\s\-\+]+"
                      value={vCardData.phone}
                      onChange={(e) => {
                        const newData = { ...vCardData, phone: e.target.value };
                        setVCardData(newData);
                        handleDataChange(generateVCard(newData), "vcard");
                      }}
                    />
                    <Input 
                      placeholder="Email"
                      type="email"
                      value={vCardData.email}
                      onChange={(e) => {
                        const newData = { ...vCardData, email: e.target.value };
                        setVCardData(newData);
                        handleDataChange(generateVCard(newData), "vcard");
                      }}
                    />
                    <Input 
                      placeholder="Organization"
                      value={vCardData.organization}
                      onChange={(e) => {
                        const newData = { ...vCardData, organization: e.target.value };
                        setVCardData(newData);
                        handleDataChange(generateVCard(newData), "vcard");
                      }}
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="contact" className="space-y-4">
                <div className="space-y-2">
                  <Label>Phone Number</Label>
                  {renderHelperText("phone")}
                  <Input
                    type="tel"
                    placeholder="+1234567890"
                    pattern="[0-9\s\-\+]+"
                    onChange={(e) => handleDataChange(`tel:${e.target.value}`, "phone")}
                    className={!validation.isValid && dataType === "phone" ? "border-red-500" : ""}
                  />
                  {!validation.isValid && dataType === "phone" && (
                    <p className="text-sm text-red-500">{validation.message}</p>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* QR Preview - Center */}
          <div className="flex items-center justify-center">
            <QRCode
              value={qrValue}
              color={qrColor}
              backgroundColor={bgColor}
              pattern={pattern}
              size={300}
            />
          </div>

          {/* Controls Panel - Right */}
          <div className="glass-card p-8 rounded-2xl shadow-lg animate-fade-in space-y-8">
            <div className="space-y-4">
              <Label>Pattern Style</Label>
              <RadioGroup
                value={pattern}
                onValueChange={(value) => setPattern(value as "dots" | "squares" | "rounded")}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="squares" id="squares" />
                  <Label htmlFor="squares">Squares</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="dots" id="dots" />
                  <Label htmlFor="dots">Dots</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="rounded" id="rounded" />
                  <Label htmlFor="rounded">Rounded</Label>
                </div>
              </RadioGroup>
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
        </div>
      </div>
    </div>
  );
};

export default Index;
