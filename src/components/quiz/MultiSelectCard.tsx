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
      className={`relative w-full p-6 rounded-2xl border-2 transition-all duration-300 text-left ${
        selected
          ? "border-primary bg-primary/5 shadow-elegant"
          : "border-border bg-card hover:border-primary/50 hover:shadow-card"
      }`}
    >
      {selected && (
        <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
          <Check className="w-4 h-4 text-primary-foreground" />
        </div>
      )}

      {icon && <div className="text-4xl mb-3">{icon}</div>}

      <h3 className="text-lg font-semibold text-foreground mb-1">{title}</h3>

      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
    </button>
  );
};
