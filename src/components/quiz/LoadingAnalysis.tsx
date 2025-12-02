import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Check } from "lucide-react";

const analysisSteps = [
  "Analyzing your physical profile...",
  "Calculating your metabolic rate...",
  "Evaluating your eating habits...",
  "Determining your calorie needs...",
  "Creating results projection...",
  "Personalizing your weight loss plan...",
];

export const LoadingAnalysis = () => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const stepDuration = 800;
    const totalDuration = stepDuration * analysisSteps.length;
    const interval = 50;

    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          return 100;
        }
        return prev + (100 / (totalDuration / interval));
      });
    }, interval);

    const stepTimer = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= analysisSteps.length - 1) {
          clearInterval(stepTimer);
          return prev;
        }
        return prev + 1;
      });
    }, stepDuration);

    return () => {
      clearInterval(progressTimer);
      clearInterval(stepTimer);
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 safe-area-inset">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center animate-pulse">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <div className="w-5 h-5 rounded-full bg-primary animate-ping" />
            </div>
          </div>
          <h2 className="text-2xl font-bold gradient-text">
            🧠 Analyzing Your Data
          </h2>
          <p className="text-sm text-muted-foreground">
            Please wait while we create your personalized plan
          </p>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <Progress value={progress} className="h-3" />
          <p className="text-center text-xs text-muted-foreground font-semibold">
            {Math.round(progress)}% complete
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-2 bg-card border border-border rounded-2xl p-4">
          {analysisSteps.map((step, index) => (
            <div
              key={index}
              className={`flex items-center gap-2 transition-all duration-500 ${
                index <= currentStep ? "opacity-100" : "opacity-30"
              }`}
            >
              <div
                className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                  index < currentStep
                    ? "bg-primary text-primary-foreground"
                    : index === currentStep
                    ? "bg-primary/20 text-primary animate-pulse"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {index < currentStep ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <span className="text-xs font-bold">{index + 1}</span>
                )}
              </div>
              <p
                className={`text-sm ${
                  index <= currentStep
                    ? "text-foreground font-semibold"
                    : "text-muted-foreground"
                }`}
              >
                {step}
              </p>
            </div>
          ))}
        </div>

        {/* Motivational Message */}
        <div className="text-center p-4 bg-primary/5 border border-primary/20 rounded-2xl">
          <p className="text-sm font-semibold text-foreground">
            ✨ You're just a few steps away from your transformation!
          </p>
        </div>
      </div>
    </div>
  );
};
