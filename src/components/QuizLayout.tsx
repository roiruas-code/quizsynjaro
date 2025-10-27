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
    <div className="min-h-screen flex flex-col items-center justify-center p-4 py-12">
      <div className="w-full max-w-4xl">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold gradient-text mb-2">
            ✨ Plano de Emagrecimento Personalizado
          </h1>
        </div>

        {/* Progress Bar */}
        <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />

        {/* Question Section */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            {title}
          </h2>
          {subtitle && (
            <p className="text-lg text-muted-foreground">{subtitle}</p>
          )}
        </div>

        {/* Options */}
        <div className="w-full">{children}</div>

        {/* Footer */}
        <div className="text-center mt-12 text-sm text-muted-foreground space-y-2">
          <p>Resultados podem variar de pessoa para pessoa.</p>
          <div className="flex justify-center gap-4">
            <a href="#" className="hover:text-primary transition-colors">
              Termos & Condições
            </a>
            <span>•</span>
            <a href="#" className="hover:text-primary transition-colors">
              Política de Privacidade
            </a>
          </div>
          <p className="text-xs">© 2025 Plano Emagrecimento. Todos os direitos reservados.</p>
        </div>
      </div>
    </div>
  );
};
