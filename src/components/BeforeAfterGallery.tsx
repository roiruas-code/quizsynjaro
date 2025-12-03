import { useState } from "react";
import { ChevronLeft, ChevronRight, Star, Verified } from "lucide-react";
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
  location: string;
  weight: string;
  time: string;
  testimonial: string;
}

const transformations: Transformation[] = [
  {
    id: 1,
    image: transformation1,
    name: "Sarah M.",
    age: 47,
    location: "Austin, TX",
    weight: "62 lbs",
    time: "7 months",
    testimonial: "I was SO skeptical at first, but this app literally changed my life! The AI figured out exactly what teas work for my body. Down 62 lbs and feeling like myself again!",
  },
  {
    id: 2,
    image: transformation2,
    name: "Amanda K.",
    age: 52,
    location: "Phoenix, AZ",
    weight: "71 lbs",
    time: "8 months",
    testimonial: "After menopause, nothing worked. I tried EVERYTHING. Synjaro's AI actually understood my hormonal changes and customized everything. Best investment I've ever made!",
  },
  {
    id: 3,
    image: transformation3,
    name: "Jessica T.",
    age: 31,
    location: "Denver, CO",
    weight: "38 lbs",
    time: "4 months",
    testimonial: "Post-baby weight was killing my confidence. The daily tea suggestions and meal plans were so easy to follow. I'm in better shape now than before I got pregnant!",
  },
  {
    id: 4,
    image: transformation4,
    name: "Lauren W.",
    age: 36,
    location: "Nashville, TN",
    weight: "44 lbs",
    time: "5 months",
    testimonial: "What I love most is that everything uses normal grocery store ingredients! No weird supplements or expensive shakes. Just real food and natural teas. It actually works!",
  },
  {
    id: 5,
    image: transformation5,
    name: "Rachel H.",
    age: 42,
    location: "Charlotte, NC",
    weight: "53 lbs",
    time: "6 months",
    testimonial: "The progress charts kept me motivated when I wanted to quit. Watching my weight go down week by week was addicting! My husband started using it too lol",
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
    <div className="min-h-screen flex flex-col items-center justify-start p-4 pt-6 pb-8 safe-area-inset bg-gradient-to-b from-background to-primary/5">
      <div className="w-full max-w-md space-y-4">
        {/* Header */}
        <div className="text-center space-y-1">
          <h2 className="text-xl font-bold text-foreground">
            Real Results, Real Women
          </h2>
          <p className="text-xs text-muted-foreground">
            Join thousands who transformed with Synjaro AI
          </p>
        </div>

        {/* Gallery */}
        <div className="relative">
          <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-lg">
            {/* Image */}
            <div className="relative aspect-[4/3] bg-muted">
              <img
                src={current.image}
                alt={`${current.name}'s transformation`}
                className="w-full h-full object-contain"
              />
              <div className="absolute top-2 left-2 bg-black/70 text-white px-2 py-0.5 rounded-full text-[10px] font-medium">
                Before & After
              </div>
              <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1">
                <Verified className="w-3 h-3" />
                Verified
              </div>
            </div>

            {/* Content */}
            <div className="p-4 space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-foreground">
                      {current.name}
                    </h3>
                    <span className="text-xs text-muted-foreground">
                      {current.age} · {current.location}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-muted-foreground">
                      Lost <span className="font-bold text-primary">{current.weight}</span>
                    </span>
                    <span className="text-xs text-muted-foreground">
                      in <span className="font-bold text-primary">{current.time}</span>
                    </span>
                  </div>
                </div>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                  ))}
                </div>
              </div>

              <blockquote className="text-xs text-foreground leading-relaxed bg-muted/50 rounded-lg p-3">
                "{current.testimonial}"
              </blockquote>
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={handlePrevious}
            className="absolute left-0 top-1/3 -translate-y-1/2 -translate-x-2 w-8 h-8 rounded-full bg-card border border-border shadow-md hover:scale-110 transition-all flex items-center justify-center"
            aria-label="Previous"
          >
            <ChevronLeft className="w-4 h-4 text-foreground" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/3 -translate-y-1/2 translate-x-2 w-8 h-8 rounded-full bg-card border border-border shadow-md hover:scale-110 transition-all flex items-center justify-center"
            aria-label="Next"
          >
            <ChevronRight className="w-4 h-4 text-foreground" />
          </button>
        </div>

        {/* Indicators */}
        <div className="flex justify-center gap-1.5">
          {transformations.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-1.5 rounded-full transition-all ${
                index === currentIndex ? "w-5 bg-primary" : "w-1.5 bg-border"
              }`}
              aria-label={`Go to transformation ${index + 1}`}
            />
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 py-2">
          <div className="text-center">
            <p className="text-lg font-bold text-primary">12,487+</p>
            <p className="text-[10px] text-muted-foreground">Women Transformed</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-primary">4.9★</p>
            <p className="text-[10px] text-muted-foreground">App Rating</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-primary">47 lbs</p>
            <p className="text-[10px] text-muted-foreground">Avg. Lost</p>
          </div>
        </div>

        {/* CTA */}
        <div className="space-y-2 pt-2">
          <Button
            onClick={onContinue}
            size="lg"
            className="w-full h-12 text-sm font-semibold shadow-lg"
          >
            Get My Personalized Plan
          </Button>
          <p className="text-[10px] text-center text-muted-foreground">
            Join 12,000+ women who transformed their lives
          </p>
        </div>
      </div>
    </div>
  );
};
