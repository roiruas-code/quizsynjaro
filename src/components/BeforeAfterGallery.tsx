import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import transformation1 from "@/assets/transformation-1.jpg";
import transformation2 from "@/assets/transformation-2.jpg";
import transformation3 from "@/assets/transformation-3.jpg";
import transformation4 from "@/assets/transformation-4.jpg";

interface Transformation {
  id: number;
  image: string;
  name: string;
  age: number;
  weight: string;
  time: string;
  testimonial: string;
}

const transformations: Transformation[] = [
  {
    id: 1,
    image: transformation1,
    name: "Ana Silva",
    age: 32,
    weight: "15 kg",
    time: "3 meses",
    testimonial: "Perdi 15kg e ganhei muita confiança! O plano foi perfeito para mim.",
  },
  {
    id: 2,
    image: transformation2,
    name: "Carlos Santos",
    age: 45,
    weight: "28 kg",
    time: "6 meses",
    testimonial: "Transformação completa! Me sinto 10 anos mais jovem.",
  },
  {
    id: 3,
    image: transformation3,
    name: "Mariana Costa",
    age: 28,
    weight: "12 kg",
    time: "4 meses",
    testimonial: "Finalmente consegui emagrecer de forma saudável e sustentável!",
  },
  {
    id: 4,
    image: transformation4,
    name: "Pedro Lima",
    age: 38,
    weight: "20 kg",
    time: "5 meses",
    testimonial: "Mudou minha vida! Recomendo para todos.",
  },
];

interface BeforeAfterGalleryProps {
  onContinue: () => void;
}

export const BeforeAfterGallery = ({ onContinue }: BeforeAfterGalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? transformations.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === transformations.length - 1 ? 0 : prev + 1));
  };

  const current = transformations[currentIndex];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 py-12">
      <div className="w-full max-w-4xl space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold gradient-text">
            ✨ Transformações Reais
          </h2>
          <p className="text-lg text-muted-foreground">
            Veja os resultados incríveis de quem já seguiu o plano
          </p>
        </div>

        {/* Gallery */}
        <div className="relative">
          <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-elegant">
            {/* Image */}
            <div className="relative aspect-video bg-muted">
              <img
                src={current.image}
                alt={`Transformação de ${current.name}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-semibold">
                Antes e Depois
              </div>
            </div>

            {/* Content */}
            <div className="p-6 md:p-8 space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-bold text-foreground">
                    {current.name}, {current.age} anos
                  </h3>
                  <div className="flex items-center gap-4 mt-2 text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <span className="text-2xl">⚖️</span>
                      <span className="font-semibold text-primary">{current.weight}</span> perdidos
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="text-2xl">⏱️</span>
                      em <span className="font-semibold text-primary">{current.time}</span>
                    </span>
                  </div>
                </div>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                  ))}
                </div>
              </div>

              <blockquote className="text-lg text-foreground italic border-l-4 border-primary pl-4">
                "{current.testimonial}"
              </blockquote>
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={handlePrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 w-12 h-12 rounded-full bg-card border-2 border-border shadow-lg hover:shadow-elegant hover:scale-110 transition-all flex items-center justify-center group"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-6 h-6 text-foreground group-hover:text-primary transition-colors" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 w-12 h-12 rounded-full bg-card border-2 border-border shadow-lg hover:shadow-elegant hover:scale-110 transition-all flex items-center justify-center group"
            aria-label="Próximo"
          >
            <ChevronRight className="w-6 h-6 text-foreground group-hover:text-primary transition-colors" />
          </button>
        </div>

        {/* Indicators */}
        <div className="flex justify-center gap-2">
          {transformations.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex ? "w-8 bg-primary" : "w-2 bg-border"
              }`}
              aria-label={`Ir para transformação ${index + 1}`}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center space-y-4 pt-4">
          <Button
            onClick={onContinue}
            size="lg"
            className="w-full md:w-auto px-12 h-14 text-lg font-semibold"
          >
            Começar Minha Transformação
          </Button>
          <p className="text-sm text-muted-foreground">
            Junte-se a mais de 12.000 pessoas que já transformaram suas vidas
          </p>
        </div>
      </div>
    </div>
  );
};
