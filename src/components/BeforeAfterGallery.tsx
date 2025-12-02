import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import transformation1 from "@/assets/transformation-1.webp";
import transformation2 from "@/assets/transformation-2.jpg";
import transformation3 from "@/assets/transformation-3.webp";
import transformation4 from "@/assets/transformation-4.webp";
import transformation5 from "@/assets/transformation-5.webp";

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
    name: "Valerie D.",
    age: 50,
    weight: "88 lbs",
    time: "8 months",
    testimonial: "At 50, I managed to lose 88 lbs with Synjaro! The AI helped me choose the right teas and perfect recipes. I've never felt so good in my life.",
  },
  {
    id: 2,
    image: transformation2,
    name: "Michelle S.",
    age: 52,
    weight: "77 lbs",
    time: "7 months",
    testimonial: "The Synjaro AI personalized everything for me! The natural teas and recipes with homemade ingredients made all the difference.",
  },
  {
    id: 3,
    image: transformation3,
    name: "Caroline L.",
    age: 29,
    weight: "40 lbs",
    time: "5 months",
    testimonial: "Having AI in my pocket changed everything! Every day I received personalized tea and nutrition suggestions.",
  },
  {
    id: 4,
    image: transformation4,
    name: "Brittany C.",
    age: 34,
    weight: "48 lbs",
    time: "6 months",
    testimonial: "Synjaro is amazing! I only used ingredients I had at home and the charts kept me motivated every day.",
  },
  {
    id: 5,
    image: transformation5,
    name: "Jennifer O.",
    age: 41,
    weight: "55 lbs",
    time: "6 months",
    testimonial: "Synjaro's artificial intelligence learned with me! The personalized teas accelerated my results.",
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
    <div className="min-h-screen flex flex-col items-center justify-center p-4 py-8 safe-area-inset">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold gradient-text">
            ✨ Real Transformations with Synjaro
          </h2>
          <p className="text-sm text-muted-foreground">
            Incredible results from women who used the AI-powered app
          </p>
        </div>

        {/* Gallery */}
        <div className="relative">
          <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-elegant">
            {/* Image */}
            <div className="relative aspect-[4/3] bg-muted">
              <img
                src={current.image}
                alt={`Transformation of ${current.name}`}
                className="w-full h-full object-contain"
              />
              <div className="absolute top-3 left-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold">
                Before & After
              </div>
              <div className="absolute top-3 right-3 bg-gradient-to-r from-primary to-accent text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                <span>🤖</span>
                <span>Synjaro User</span>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-bold text-foreground">
                    {current.name}, {current.age} years old
                  </h3>
                  <div className="flex items-center gap-3 mt-1 text-muted-foreground text-sm">
                    <span className="flex items-center gap-1">
                      <span className="text-lg">⚖️</span>
                      <span className="font-semibold text-primary">{current.weight}</span> lost
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="text-lg">⏱️</span>
                      in <span className="font-semibold text-primary">{current.time}</span>
                    </span>
                  </div>
                </div>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                  ))}
                </div>
              </div>

              <blockquote className="text-sm text-foreground italic border-l-4 border-primary pl-3">
                "{current.testimonial}"
              </blockquote>
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={handlePrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 w-10 h-10 rounded-full bg-card border-2 border-border shadow-lg hover:shadow-elegant hover:scale-110 transition-all flex items-center justify-center group"
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5 text-foreground group-hover:text-primary transition-colors" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 w-10 h-10 rounded-full bg-card border-2 border-border shadow-lg hover:shadow-elegant hover:scale-110 transition-all flex items-center justify-center group"
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5 text-foreground group-hover:text-primary transition-colors" />
          </button>
        </div>

        {/* Indicators */}
        <div className="flex justify-center gap-2">
          {transformations.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex ? "w-6 bg-primary" : "w-2 bg-border"
              }`}
              aria-label={`Go to transformation ${index + 1}`}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center space-y-3 pt-2">
          <Button
            onClick={onContinue}
            size="lg"
            className="w-full h-14 text-base font-semibold"
          >
            🤖 I Want Synjaro AI With Me!
          </Button>
          <p className="text-xs text-muted-foreground">
            Join 12,000+ women who have already transformed their lives with Synjaro
          </p>
        </div>
      </div>
    </div>
  );
};
