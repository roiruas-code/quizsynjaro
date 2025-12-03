import { ReactNode } from "react";
import { ProgressBar } from "./ProgressBar";

interface QuizLayoutProps {
  children: ReactNode;
  currentStep: number;
  totalSteps: number;
  title: string;
  subtitle?: string;
}

export const QuizLayout = ({
  children,
  currentStep,
  totalSteps,
  title,
  subtitle,
}: QuizLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background via-background to-primary/5">
      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-start px-4 pt-4 pb-44 safe-area-padding-top overflow-y-auto">
        <div className="w-full max-w-md animate-fade-in">
          {/* Logo/Brand */}
          <div className="text-center mb-4">
            <h1 className="text-base font-bold text-primary">
              Synjaro
            </h1>
            <p className="text-[10px] text-muted-foreground">AI-Powered Weight Loss</p>
            <div className="flex items-center justify-center gap-1 mt-1">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-500 text-[10px]">★</span>
                ))}
              </div>
              <span className="text-[10px] text-muted-foreground">4.9 · 12,487+ results</span>
            </div>
          </div>

          {/* Progress Bar */}
          <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />

          {/* Question Section */}
          <div className="text-center mb-4">
            <h2 className="text-lg font-semibold text-foreground mb-1">
              {title}
            </h2>
            {subtitle && (
              <p className="text-xs text-muted-foreground">{subtitle}</p>
            )}
          </div>

          {/* Options */}
          <div className="w-full">{children}</div>
        </div>
      </div>

      {/* Footer - Fixed at very bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border safe-area-padding-bottom z-10">
        <div className="text-center py-2 px-4 text-[10px] text-muted-foreground">
          <p>Results may vary. <a href="#" className="underline">Terms</a> · <a href="#" className="underline">Privacy</a></p>
          <p className="opacity-60">© 2025 Synjaro</p>
        </div>
      </div>
    </div>
  );
};
