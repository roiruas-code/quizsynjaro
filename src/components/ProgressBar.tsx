interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export const ProgressBar = ({ currentStep, totalSteps }: ProgressBarProps) => {
  const progress = (currentStep / totalSteps) * 100;
  
  return (
    <div className="w-full max-w-md mx-auto mb-6 px-1">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs text-muted-foreground font-medium">
          Step {currentStep} of {totalSteps}
        </span>
        <span className="text-xs font-semibold text-primary">
          {Math.round(progress)}%
        </span>
      </div>
      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500 ease-out rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};
