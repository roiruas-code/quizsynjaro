import { useState, useEffect } from "react";
import { Check } from "lucide-react";
import { QuizData } from "@/types/quiz.types";

interface AILoadingDemoProps {
  data: QuizData;
  onComplete: () => void;
}

export const AILoadingDemo = ({ data, onComplete }: AILoadingDemoProps) => {
  const [progress, setProgress] = useState(0);
  const [currentPhase, setCurrentPhase] = useState(0);

  const weightToLose = (data.currentWeight || 0) - (data.goalWeight || 0);
  const months = Math.ceil((data.estimatedDuration || 0) / 4);

  const phases = [
    { 
      icon: "🧬", 
      text: "Analisando seu metabolismo...",
      detail: `IMC: ${data.bmi?.toFixed(1)} • ${weightToLose.toFixed(1)}kg a perder`
    },
    { 
      icon: "🍵", 
      text: "Selecionando chás personalizados...",
      detail: "Chá verde, hibisco, gengibre com limão"
    },
    { 
      icon: "🥗", 
      text: "Criando cardápio com ingredientes caseiros...",
      detail: "Abacate, ovos, arroz integral, feijão, frango"
    },
    { 
      icon: "📊", 
      text: "Calculando sua jornada de emagrecimento...",
      detail: `${weightToLose.toFixed(1)}kg em ${months} ${months === 1 ? 'mês' : 'meses'}`
    },
    { 
      icon: "✨", 
      text: "Seu plano está pronto!",
      detail: "100% personalizado pela IA Synjaro"
    },
  ];

  useEffect(() => {
    const phaseInterval = setInterval(() => {
      setCurrentPhase(prev => {
        if (prev < phases.length - 1) return prev + 1;
        clearInterval(phaseInterval);
        setTimeout(onComplete, 1000);
        return prev;
      });
    }, 1500);

    const progressInterval = setInterval(() => {
      setProgress(prev => Math.min(prev + 1, 100));
    }, 75);

    return () => {
      clearInterval(phaseInterval);
      clearInterval(progressInterval);
    };
  }, [onComplete, phases.length]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full space-y-8">
        {/* App Preview Frame */}
        <div className="bg-card border-2 border-border rounded-3xl p-8 shadow-2xl">
          {/* Fake Phone Header */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <div>
                <p className="font-bold text-foreground">Synjaro</p>
                <p className="text-xs text-muted-foreground">IA Personalizada</p>
              </div>
            </div>
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" style={{ animationDelay: '0.1s' }} />
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" style={{ animationDelay: '0.2s' }} />
            </div>
          </div>

          {/* AI Working Animation */}
          <div className="text-center space-y-6">
            <div className="text-6xl animate-bounce">
              {phases[currentPhase].icon}
            </div>
            
            <div className="space-y-2">
              <p className="text-xl font-bold text-foreground">
                {phases[currentPhase].text}
              </p>
              <p className="text-sm text-muted-foreground">
                {phases[currentPhase].detail}
              </p>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300 rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground">{progress}%</p>
            </div>

            {/* Previous Phases Checklist */}
            <div className="text-left space-y-2 max-w-md mx-auto">
              {phases.slice(0, currentPhase).map((phase, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check className="w-4 h-4 text-primary" />
                  <span>{phase.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Trust Message */}
        <p className="text-center text-sm text-muted-foreground">
          🔒 Suas informações estão seguras e serão usadas apenas para personalizar seu plano
        </p>
      </div>
    </div>
  );
};