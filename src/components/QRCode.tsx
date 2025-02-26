import { useEffect, useRef } from "react";
import QRCodeStyling from "qr-code-styling";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface QRCodeProps {
  value: string;
  color?: string;
  backgroundColor?: string;
  pattern?: "dots" | "squares" | "rounded";
  size?: number;
  className?: string;
}

export const QRCode = ({
  value,
  color = "#9b87f5", // Default to purple
  backgroundColor = "#FFFFFF", // Default to white
  pattern = "squares",
  size = 256,
  className,
}: QRCodeProps) => {
  const qrRef = useRef<HTMLDivElement>(null);
  const qrCode = useRef<QRCodeStyling>();

  useEffect(() => {
    // Create QR instance
    qrCode.current = new QRCodeStyling({
      width: size,
      height: size,
      data: value || "https://stryqr.com",
      dotsOptions: {
        type: pattern === "dots" ? "dots" : pattern === "rounded" ? "rounded" : "square",
        color: color,
      },
      backgroundOptions: {
        color: backgroundColor,
      },
      cornersSquareOptions: {
        type: "square",
        color: color,
      },
      cornersDotOptions: {
        type: "square",
        color: color,
      },
      qrOptions: {
        errorCorrectionLevel: 'H'
      }
    });

    // Immediately append to ref
    if (qrRef.current) {
      qrRef.current.innerHTML = '';
      qrCode.current?.append(qrRef.current);
    }
  }, [value, color, backgroundColor, pattern, size]);

  const downloadQR = async () => {
    if (qrCode.current) {
      await qrCode.current.download({
        extension: "png",
        name: `stryqr-${Date.now()}`
      });
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div 
        ref={qrRef} 
        className={cn("animate-fade-in", className)} 
      />
      <Button
        onClick={downloadQR}
        variant="outline"
        size="sm"
        className="flex items-center gap-2 hover:bg-accent/10"
      >
        <Download className="h-4 w-4" />
        <span>Download QR</span>
      </Button>
    </div>
  );
};
