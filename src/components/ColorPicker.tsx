
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
    { name: "Navy", value: "#1A1F2C" },
    { name: "Purple", value: "#9b87f5" },
    { name: "Light Purple", value: "#D6BCFA" },
    { name: "Vivid Purple", value: "#8B5CF6" },
    { name: "Magenta", value: "#D946EF" },
    { name: "Orange", value: "#F97316" },
    { name: "Ocean Blue", value: "#0EA5E9" },
    { name: "Forest Green", value: "#059669" },
    { name: "Ruby Red", value: "#E11D48" },
    { name: "Soft Pink", value: "#FFDEE2" },
    { name: "Soft Blue", value: "#D3E4FD" },
    { name: "Soft Green", value: "#F2FCE2" },
    { name: "Soft Orange", value: "#FEC6A1" },
    { name: "Soft Yellow", value: "#FEF7CD" },
  ];

  return (
    <div className={cn("flex flex-wrap gap-3", className)}>
      {colors.map((color) => (
        <button
          key={color.value}
          onClick={() => onChange(color.value)}
          className={cn(
            "w-8 h-8 rounded-full transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-accent",
            selectedColor === color.value && "ring-2 ring-accent scale-110"
          )}
          style={{ backgroundColor: color.value, border: color.value === "#FFFFFF" ? "1px solid #E2E8F0" : "none" }}
          title={color.name}
        />
      ))}
    </div>
  );
};
