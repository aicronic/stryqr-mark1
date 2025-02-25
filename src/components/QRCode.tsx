
import { useEffect, useRef, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
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
  color = "#000000",
  backgroundColor = "#FFFFFF",
  pattern = "squares",
  size = 256,
  className,
}: QRCodeProps) => {
  const [mounted, setMounted] = useState(false);
  const qrRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div 
      className={cn(
        "relative p-8 rounded-2xl glass-card shadow-lg transition-all duration-300",
        className
      )}
    >
      <div ref={qrRef} className="animate-fade-in">
        <QRCodeSVG
          value={value || "https://stryqr.com"}
          size={size}
          fgColor={color}
          bgColor={backgroundColor}
          level="Q"
          includeMargin
          style={{
            width: '100%',
            height: '100%',
            borderRadius: pattern === "rounded" ? "12px" : "0",
          }}
        />
      </div>
    </div>
  );
};
