import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Check } from "lucide-react";

const analysisSteps = [
  "Analisando seu perfil físico...",
  "Calculando sua taxa metabólica...",
  "Avaliando seus hábitos alimentares...",
  "Determinando suas necessidades calóricas...",
  "Criando projeção de resultados...",
  "Personalizando seu plano de emagrecimento...",
];

export const LoadingAnalysis = () => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const stepDuration = 800; // ms por etapa
    const totalDuration = stepDuration * analysisSteps.length;
    const interval = 50; // atualização a cada 50ms

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
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center animate-pulse">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
              <div className="w-6 h-6 rounded-full bg-primary animate-ping" />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold gradient-text">
            🧠 Analisando Seus Dados
          </h2>
          <p className="text-lg text-muted-foreground">
            Aguarde enquanto criamos seu plano personalizado
          </p>
        </div>

        {/* Progress Bar */}
        <div className="space-y-4">
          <Progress value={progress} className="h-3" />
          <p className="text-center text-sm text-muted-foreground font-semibold">
            {Math.round(progress)}% concluído
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-3 bg-card border border-border rounded-2xl p-6">
          {analysisSteps.map((step, index) => (
            <div
              key={index}
              className={`flex items-center gap-3 transition-all duration-500 ${
                index <= currentStep ? "opacity-100" : "opacity-30"
              }`}
            >
              <div
                className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                  index < currentStep
                    ? "bg-primary text-primary-foreground"
                    : index === currentStep
                    ? "bg-primary/20 text-primary animate-pulse"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {index < currentStep ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <span className="text-sm font-bold">{index + 1}</span>
                )}
              </div>
              <p
                className={`text-base ${
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
        <div className="text-center p-6 bg-primary/5 border border-primary/20 rounded-2xl">
          <p className="text-lg font-semibold text-foreground">
            ✨ Você está a poucos passos da sua transformação!
          </p>
        </div>
      </div>
    </div>
  );
};
