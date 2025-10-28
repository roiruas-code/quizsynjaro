import { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface InputSliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  unit: string;
  description?: string;
}

export const InputSlider = ({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  unit,
  description,
}: InputSliderProps) => {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleSliderChange = (values: number[]) => {
    const newValue = values[0];
    setLocalValue(newValue);
    onChange(newValue);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value) || min;
    const clampedValue = Math.max(min, Math.min(max, newValue));
    setLocalValue(clampedValue);
    onChange(clampedValue);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Label className="text-lg font-semibold">{label}</Label>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            value={localValue}
            onChange={handleInputChange}
            min={min}
            max={max}
            step={step}
            className="w-24 text-right text-lg font-bold"
          />
          <span className="text-lg font-semibold text-muted-foreground">
            {unit}
          </span>
        </div>
      </div>

      <Slider
        value={[localValue]}
        onValueChange={handleSliderChange}
        min={min}
        max={max}
        step={step}
        className="w-full"
      />

      <div className="flex justify-between text-sm text-muted-foreground">
        <span>
          {min} {unit}
        </span>
        <span>
          {max} {unit}
        </span>
      </div>

      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
    </div>
  );
};
