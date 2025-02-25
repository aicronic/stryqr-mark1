import { useEffect, useRef } from "react";
import QRCodeStyling from "qr-code-styling";
import { cn } from "@/lib/utils";

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

  // Remove the mounted state as it's unnecessary
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

  return (
    <div 
      ref={qrRef} 
      className={cn(
        "animate-fade-in",
        className
      )} 
    />
  );
};
