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
        "w-full p-3 text-left rounded-xl border-2 transition-all duration-200 active:scale-[0.98]",
        selected
          ? "border-primary bg-primary/5 shadow-md"
          : "border-border bg-card hover:border-primary/40",
        className
      )}
    >
      <div className="flex items-center gap-3">
        {image && (
          <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
            <img
              src={image}
              alt={label}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        {emoji && !image && (
          <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-secondary/50 flex-shrink-0 text-xl">
            {emoji}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <span className="text-sm font-medium text-foreground line-clamp-2">{label}</span>
        </div>
        <div
          className={cn(
            "w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all",
            selected
              ? "bg-primary border-primary text-primary-foreground"
              : "border-muted-foreground/30 bg-background"
          )}
        >
          {selected && <Check className="w-3.5 h-3.5" />}
        </div>
      </div>
    </button>
  );
};
