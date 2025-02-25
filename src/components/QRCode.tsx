
import { QRCodeSVG } from "qrcode.react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface QRCodeProps {
  value: string;
  color?: string;
  backgroundColor?: string;
  pattern?: "dots" | "squares";
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

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className={cn("relative p-8 rounded-2xl bg-white/30 backdrop-blur-sm shadow-lg", className)}>
      <QRCodeSVG
        value={value || "https://stryqr.com"}
        size={size}
        level="H"
        fgColor={color}
        bgColor={backgroundColor}
        includeMargin={true}
        className="animate-fade-in"
      />
    </div>
  );
};
