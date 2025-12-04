import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Clock, Utensils, Brain, Star, CheckCircle2, Shield } from "lucide-react";
import femaleImage from "@/assets/female-option.jpg";

interface LandingPageProps {
  onStartQuiz: () => void;
}

export const LandingPage = ({ onStartQuiz }: LandingPageProps) => {
  const benefits = [
    { icon: Brain, title: "AI-Powered", description: "Personalized by advanced AI analysis" },
    { icon: Utensils, title: "Home Ingredients", description: "No expensive products needed" },
    { icon: Clock, title: "2-Min Quiz", description: "Get your custom plan instantly" },
  ];

  const features = [
    "Personalized tea & meal recommendations",
    "Daily AI-guided suggestions",
    "Progress tracking & badges",
    "Home ingredients only—nothing exotic",
  ];

  const stats = [
    { value: "12,487+", label: "Transformations" },
    { value: "4.9★", label: "User Rating" },
    { value: "28 lbs", label: "Avg. Lost" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />
        
        <div className="relative max-w-md mx-auto px-4 pt-8 pb-6">
          {/* Logo */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-full mb-4">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">AI-Powered Weight Loss</span>
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-3">
              Your Personalized
              <span className="block gradient-text">Weight Loss Plan</span>
            </h1>
            <p className="text-muted-foreground text-base">
              Join 12,000+ women who transformed their bodies with AI-personalized tea blends and meal plans using simple home ingredients.
            </p>
          </div>

          {/* Hero Image */}
          <div className="relative mb-6">
            <div className="aspect-[3/4] rounded-2xl overflow-hidden border-4 border-primary/20 shadow-elegant">
              <img 
                src={femaleImage} 
                alt="Transform your body" 
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex items-center gap-2 bg-card/90 backdrop-blur-sm rounded-xl p-3 border border-border">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-8 h-8 rounded-full bg-primary/20 border-2 border-card flex items-center justify-center text-xs">
                        👩
                      </div>
                    ))}
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-foreground">2,847 women started today</p>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} className="w-3 h-3 fill-accent text-accent" />
                      ))}
                      <span className="text-xs text-muted-foreground ml-1">4.9</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <Button 
            onClick={onStartQuiz}
            size="lg"
            className="w-full h-14 text-lg font-semibold shadow-elegant hover:shadow-glow transition-all duration-300"
          >
            Take the Free Quiz
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          
          <p className="text-center text-xs text-muted-foreground mt-3">
            <Shield className="w-3 h-3 inline mr-1" />
            Free • 2 minutes • No credit card required
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-8 px-4">
        <div className="max-w-md mx-auto">
          <div className="grid grid-cols-3 gap-3 mb-8">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="bg-card border border-border rounded-xl p-3 text-center hover:border-primary/30 transition-colors"
              >
                <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-primary/10 flex items-center justify-center">
                  <benefit.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-sm font-semibold text-foreground mb-1">{benefit.title}</h3>
                <p className="text-xs text-muted-foreground leading-tight">{benefit.description}</p>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-2xl p-4 mb-8">
            <div className="grid grid-cols-3 gap-2 text-center">
              {stats.map((stat, index) => (
                <div key={index}>
                  <p className="text-xl font-bold text-primary">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-6 px-4 bg-card/50">
        <div className="max-w-md mx-auto">
          <h2 className="text-xl font-bold text-center text-foreground mb-4">
            What You'll Get
          </h2>
          <div className="space-y-3">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="flex items-center gap-3 bg-card border border-border rounded-xl p-3"
              >
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                </div>
                <p className="text-sm font-medium text-foreground">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-8 px-4">
        <div className="max-w-md mx-auto">
          <div className="bg-card border border-border rounded-2xl p-5">
            <div className="flex items-center gap-1 mb-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-4 h-4 fill-accent text-accent" />
              ))}
            </div>
            <p className="text-foreground text-sm leading-relaxed mb-4">
              "I was skeptical at first, but the AI really understood my body type and lifestyle. Lost 32 lbs in 3 months using teas I made at home with ingredients I already had. The daily meal suggestions kept me on track without feeling restricted."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-lg">
                👩
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Jennifer M.</p>
                <p className="text-xs text-muted-foreground">Austin, TX • Lost 32 lbs</p>
              </div>
              <div className="ml-auto px-2 py-1 bg-primary/10 rounded-full">
                <span className="text-xs font-medium text-primary">Verified</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-8 px-4 pb-safe-area-bottom">
        <div className="max-w-md mx-auto text-center">
          <h2 className="text-xl font-bold text-foreground mb-2">
            Ready to Transform?
          </h2>
          <p className="text-sm text-muted-foreground mb-4">
            Take our 2-minute quiz and get your personalized AI plan
          </p>
          <Button 
            onClick={onStartQuiz}
            size="lg"
            className="w-full h-14 text-lg font-semibold shadow-elegant hover:shadow-glow transition-all duration-300"
          >
            Start My Transformation
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-4 px-4 border-t border-border">
        <div className="max-w-md mx-auto text-center">
          <p className="text-xs text-muted-foreground">
            Results may vary. Individual outcomes depend on various factors.
          </p>
          <div className="flex items-center justify-center gap-4 mt-2">
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Terms
            </a>
            <span className="text-muted-foreground/50">•</span>
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Privacy
            </a>
          </div>
          <p className="text-xs text-muted-foreground/70 mt-2">
            © 2025 Synjaro. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};
