
import { cn } from "@/lib/utils";

interface ColorPickerProps {
  selectedColor: string;
  onChange: (color: string) => void;
  className?: string;
}

export const ColorPicker = ({ selectedColor, onChange, className }: ColorPickerProps) => {
  const colors = [
    { name: "Black", value: "#000000" },
    { name: "White", value: "#FFFFFF" },
    { name: "Purple", value: "#9b87f5" },
  ];

  return (
    <div className={cn("flex gap-3", className)}>
      {colors.map((color) => (
        <button
          key={color.value}
          onClick={() => onChange(color.value)}
          className={cn(
            "w-8 h-8 rounded-full transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-accent",
            selectedColor === color.value && "ring-2 ring-accent scale-110"
          )}
          style={{ backgroundColor: color.value, border: color.value === "#FFFFFF" ? "1px solid #E2E8F0" : "none" }}
          title={color.name}
        />
      ))}
    </div>
  );
};
