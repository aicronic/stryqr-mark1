
import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode-generator-ts/js";
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

  useEffect(() => {
    if (!mounted || !qrRef.current) return;

    // Clear previous QR code
    qrRef.current.innerHTML = '';

    try {
      const qr = new QRCode();
      qr.addData(value || "https://stryqr.com");
      qr.make();

      // Create SVG element
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("width", size.toString());
      svg.setAttribute("height", size.toString());
      svg.setAttribute("viewBox", `0 0 ${size} ${size}`);
      svg.style.backgroundColor = backgroundColor;

      const cellSize = size / qr.getModuleCount();
      const modules = qr.getModules();

      // Create QR code pattern
      modules.forEach((row, i) => {
        row.forEach((cell, j) => {
          if (cell) {
            const element = document.createElementNS("http://www.w3.org/2000/svg", 
              pattern === "dots" ? "circle" : "rect"
            );

            if (pattern === "dots") {
              const radius = cellSize / 2.5;
              element.setAttribute("cx", ((j + 0.5) * cellSize).toString());
              element.setAttribute("cy", ((i + 0.5) * cellSize).toString());
              element.setAttribute("r", radius.toString());
            } else {
              const x = j * cellSize;
              const y = i * cellSize;
              const width = cellSize;
              const height = cellSize;

              element.setAttribute("x", x.toString());
              element.setAttribute("y", y.toString());
              element.setAttribute("width", width.toString());
              element.setAttribute("height", height.toString());

              if (pattern === "rounded") {
                element.setAttribute("rx", (cellSize / 3).toString());
                element.setAttribute("ry", (cellSize / 3).toString());
              }
            }

            element.setAttribute("fill", color);
            svg.appendChild(element);
          }
        });
      });

      qrRef.current.appendChild(svg);
    } catch (error) {
      console.error("Error generating QR code:", error);
    }
  }, [value, color, backgroundColor, pattern, size, mounted]);

  if (!mounted) return null;

  return (
    <div 
      className={cn(
        "relative p-8 rounded-2xl glass-card shadow-lg transition-all duration-300",
        className
      )}
    >
      <div ref={qrRef} className="animate-fade-in" />
    </div>
  );
};

