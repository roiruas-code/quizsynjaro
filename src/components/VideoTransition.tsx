import { Button } from "@/components/ui/button";
import { Play, Sparkles } from "lucide-react";

interface VideoTransitionProps {
  onContinue: () => void;
}

export const VideoTransition = ({ onContinue }: VideoTransitionProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 animate-fade-in">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Celebration Icon */}
        <div className="relative inline-block">
          <div className="absolute inset-0 animate-ping">
            <Sparkles className="w-24 h-24 text-primary mx-auto opacity-75" />
          </div>
          <Sparkles className="w-24 h-24 text-primary mx-auto relative z-10" />
        </div>

        {/* Main Message */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold gradient-text">
            🎉 Parabéns!
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground">
            Seu Plano Personalizado Está Pronto!
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Baseado nas suas respostas, criamos um plano de emagrecimento exclusivo para você. 
            Assista ao vídeo agora para descobrir como alcançar seus objetivos!
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
          <div className="bg-card border border-border rounded-xl p-4">
            <div className="text-3xl font-bold text-primary">12.487</div>
            <div className="text-xs text-muted-foreground mt-1">Transformações</div>
          </div>
          <div className="bg-card border border-border rounded-xl p-4">
            <div className="text-3xl font-bold text-primary">4.9</div>
            <div className="text-xs text-muted-foreground mt-1">Avaliação</div>
          </div>
          <div className="bg-card border border-border rounded-xl p-4">
            <div className="text-3xl font-bold text-primary">98%</div>
            <div className="text-xs text-muted-foreground mt-1">Sucesso</div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="space-y-4 pt-4">
          <Button 
            onClick={onContinue}
            size="lg"
            className="w-full md:w-auto px-12 h-16 text-xl font-bold animate-pulse hover:animate-none group"
          >
            <Play className="mr-2 w-6 h-6 group-hover:scale-110 transition-transform" />
            Assistir Vídeo Agora
          </Button>
          <p className="text-sm text-muted-foreground">
            ⚡ Apenas 3 minutos para conhecer seu plano completo
          </p>
        </div>

        {/* Social Proof */}
        <div className="pt-8 space-y-3">
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-primary/20 border-2 border-background"></div>
              <div className="w-8 h-8 rounded-full bg-secondary/20 border-2 border-background"></div>
              <div className="w-8 h-8 rounded-full bg-accent/20 border-2 border-background"></div>
            </div>
            <span>+347 pessoas assistindo agora</span>
          </div>
          <div className="inline-block px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm text-primary animate-fade-in">
            ⭐ Maria acabou de completar o quiz há 2 minutos
          </div>
        </div>
      </div>
    </div>
  );
};
