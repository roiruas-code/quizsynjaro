import { Check } from "lucide-react";

interface MultiSelectCardProps {
  title: string;
  description?: string;
  icon?: string;
  selected: boolean;
  onToggle: () => void;
}

export const MultiSelectCard = ({
  title,
  description,
  icon,
  selected,
  onToggle,
}: MultiSelectCardProps) => {
  return (
    <button
      onClick={onToggle}
      className={`relative w-full p-4 rounded-xl border-2 transition-all duration-200 text-center active:scale-[0.98] ${
        selected
          ? "border-primary bg-primary/5 shadow-md"
          : "border-border bg-card hover:border-primary/40"
      }`}
    >
      {selected && (
        <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
          <Check className="w-3 h-3 text-primary-foreground" />
        </div>
      )}

      {icon && <div className="text-2xl mb-2">{icon}</div>}

      <h3 className="text-xs font-medium text-foreground">{title}</h3>

      {description && (
        <p className="text-[10px] text-muted-foreground mt-1">{description}</p>
      )}
    </button>
  );
};
