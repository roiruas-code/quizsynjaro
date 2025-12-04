import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Shield, Clock, Star, CheckCircle } from "lucide-react";
import { QuizData } from "@/types/quiz.types";

interface VideoSalesPageProps {
  data: QuizData;
  onContinue: () => void;
}

export const VideoSalesPage = ({ data, onContinue }: VideoSalesPageProps) => {
  const [showCTA, setShowCTA] = useState(false);
  const [watchTime, setWatchTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Show CTA after 60 seconds of watching or immediately on mobile for testing
  useEffect(() => {
    if (watchTime >= 60) {
      setShowCTA(true);
    }
  }, [watchTime]);

  // Timer while video is "playing"
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setWatchTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const weightToLose = data.currentWeight && data.goalWeight 
    ? Math.round(data.currentWeight - data.goalWeight) 
    : 15;

  const handleVideoClick = () => {
    setIsPlaying(true);
    // For demo purposes, show CTA after 3 seconds in development
    setTimeout(() => setShowCTA(true), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-primary/5">
      {/* Header */}
      <div className="px-4 py-6 text-center">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
          <Play className="w-4 h-4" />
          Important Video
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-3 leading-tight">
          Before You Get Your Plan...
          <br />
          <span className="text-primary">Watch This Quick Video</span>
        </h1>
        <p className="text-muted-foreground text-sm md:text-base max-w-md mx-auto">
          See how women like you are losing {weightToLose}+ lbs using simple home ingredients
        </p>
      </div>

      {/* Video Container */}
      <div className="px-4 mb-6">
        <div 
          className="relative w-full max-w-2xl mx-auto aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl cursor-pointer group"
          onClick={handleVideoClick}
        >
          {/* Replace this with your actual video embed */}
          <iframe
            className="absolute inset-0 w-full h-full"
            src="https://www.youtube.com/embed/YOUR_VIDEO_ID?rel=0&modestbranding=1&autoplay=0"
            title="Synjaro Success Stories"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
          
          {/* Play overlay - shows before playing */}
          {!isPlaying && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/30 transition-colors">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                <Play className="w-10 h-10 text-primary-foreground ml-1" />
              </div>
            </div>
          )}
        </div>

        {/* Video progress indicator */}
        {isPlaying && (
          <div className="mt-3 text-center">
            <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              Watching: {Math.floor(watchTime / 60)}:{(watchTime % 60).toString().padStart(2, '0')}
            </div>
          </div>
        )}
      </div>

      {/* Key Points */}
      <div className="px-4 mb-6">
        <div className="max-w-md mx-auto space-y-3">
          <div className="flex items-start gap-3 bg-card border border-border rounded-xl p-4">
            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-foreground text-sm">100% Personalized for You</p>
              <p className="text-xs text-muted-foreground">Based on your unique metabolism and lifestyle</p>
            </div>
          </div>
          <div className="flex items-start gap-3 bg-card border border-border rounded-xl p-4">
            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-foreground text-sm">Home Ingredients Only</p>
              <p className="text-xs text-muted-foreground">Green tea, ginger, hibiscus—things you already have</p>
            </div>
          </div>
          <div className="flex items-start gap-3 bg-card border border-border rounded-xl p-4">
            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-foreground text-sm">AI Guidance 24/7</p>
              <p className="text-xs text-muted-foreground">Daily suggestions and real-time progress tracking</p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonial */}
      <div className="px-4 mb-6">
        <div className="max-w-md mx-auto bg-primary/5 border border-primary/20 rounded-2xl p-4">
          <div className="flex items-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <p className="text-sm text-foreground italic mb-3">
            "I was skeptical at first, but the video explained exactly how it works. 
            I lost 23 lbs in 8 weeks using teas I make at home. Best decision I ever made!"
          </p>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-xs font-bold text-primary">
              JM
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Jennifer M.</p>
              <p className="text-xs text-muted-foreground">Lost 23 lbs • Phoenix, AZ</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className={`px-4 pb-8 transition-all duration-500 ${showCTA ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
        <div className="max-w-md mx-auto">
          <Button
            onClick={onContinue}
            size="lg"
            className="w-full h-14 text-base font-semibold bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg"
          >
            Get My Personalized Plan Now
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          
          {/* Trust badges */}
          <div className="flex items-center justify-center gap-4 mt-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Shield className="w-4 h-4" />
              <span>Secure Checkout</span>
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle className="w-4 h-4" />
              <span>30-Day Guarantee</span>
            </div>
          </div>
        </div>
      </div>

      {/* Skip link for those who've seen enough */}
      {!showCTA && (
        <div className="text-center pb-8">
          <button 
            onClick={() => setShowCTA(true)}
            className="text-sm text-muted-foreground underline hover:text-foreground transition-colors"
          >
            I've seen enough, show me the plan →
          </button>
        </div>
      )}
    </div>
  );
};
