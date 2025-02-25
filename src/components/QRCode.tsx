
import { useEffect, useRef, useState } from "react";
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
  const [mounted, setMounted] = useState(false);
  const qrRef = useRef<HTMLDivElement>(null);
  const qrCode = useRef<QRCodeStyling>();

  useEffect(() => {
    setMounted(true);
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
        type: pattern === "dots" ? "extra-rounded" : pattern === "rounded" ? "rounded" : "square",
        color: color,
      },
      cornersDotOptions: {
        type: pattern === "dots" ? "dot" : pattern === "rounded" ? "rounded" : "square",
        color: color,
      },
    });

    if (qrRef.current) {
      qrRef.current.innerHTML = '';
      qrCode.current?.append(qrRef.current);
    }
  }, [value, color, backgroundColor, pattern, size]);

  if (!mounted) return null;

  return (
    <div 
      className={cn(
        "relative p-8 rounded-2xl glass-card shadow-lg transition-all duration-300",
        pattern === "rounded" && "!rounded-[32px]",
        pattern === "dots" && "!rounded-full",
        className
      )}
    >
      <div 
        ref={qrRef} 
        className={cn(
          "animate-fade-in",
          pattern === "rounded" && "rounded-2xl overflow-hidden",
          pattern === "dots" && "rounded-full overflow-hidden"
        )} 
      />
    </div>
  );
};
