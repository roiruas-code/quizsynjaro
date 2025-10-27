import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface SelectionCardProps {
  image?: string;
  label: string;
  emoji?: string;
  selected?: boolean;
  onClick: () => void;
  className?: string;
}

export const SelectionCard = ({
  image,
  label,
  emoji,
  selected = false,
  onClick,
  className,
}: SelectionCardProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "selection-card w-full p-4 text-left group",
        selected && "selected",
        className
      )}
    >
      <div className="flex items-center gap-4">
        {image && (
          <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-muted p-1">
            <img
              src={image}
              alt={label}
              className="w-full h-full object-contain rounded-lg"
            />
          </div>
        )}
        {emoji && !image && (
          <div className="w-20 h-20 rounded-xl flex items-center justify-center bg-secondary/50 flex-shrink-0 text-4xl">
            {emoji}
          </div>
        )}
        <div className="flex-1">
          <span className="text-lg font-semibold text-foreground">{label}</span>
        </div>
        <div
          className={cn(
            "w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all",
            selected
              ? "bg-primary border-primary text-primary-foreground"
              : "border-border bg-background"
          )}
        >
          {selected && <Check className="w-5 h-5" />}
        </div>
      </div>
    </button>
  );
};
