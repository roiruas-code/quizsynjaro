import { QuizData } from "@/types/quiz.types";
import { Button } from "@/components/ui/button";
import { Check, Clock, Shield, Star, Zap, X, Coffee, TrendingDown, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface CheckoutPageProps {
  data: QuizData;
  onCheckout: () => void;
}

export const CheckoutPage = ({ data, onCheckout }: CheckoutPageProps) => {
  const [timeLeft, setTimeLeft] = useState(15 * 60);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const weightToLose = (data.currentWeight || 0) - (data.goalWeight || 0);
  const months = Math.ceil((data.estimatedDuration || 0) / 4);

  const faqs = [
    {
      question: "How does the Synjaro app work?",
      answer:
        "Synjaro is an app with artificial intelligence that creates a 100% personalized plan for you. The AI suggests natural teas and recipes with homemade ingredients, tracks your progress, and motivates you daily with smart notifications.",
    },
    {
      question: "Do I need to buy expensive ingredients?",
      answer:
        "No! Synjaro's entire approach uses ingredients you already have at home or can find at any grocery store: green tea, hibiscus, ginger, eggs, brown rice, beans, chicken, etc. No expensive superfoods or miracle products.",
    },
    {
      question: "How long until I see results?",
      answer:
        "Most people start seeing visible results within the first 2-3 weeks. The AI calculates that you'll reach your goal of " + weightToLose.toFixed(1) + "kg in approximately " + months + " months with the personalized plan.",
    },
    {
      question: "What if I don't like the app?",
      answer:
        "We offer a 30-day guarantee. If you're not satisfied with Synjaro, we'll refund 100% of your investment, no questions asked.",
    },
    {
      question: "Does the AI really work?",
      answer:
        "Yes! Synjaro AI analyzes 25+ data points about you (weight, height, age, routine, preferences) and uses scientific formulas (BMR, TDEE, calorie deficit) to create a unique plan. It learns from you and adjusts suggestions as you progress.",
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-4 py-8 bg-gradient-to-b from-background to-muted/20 safe-area-inset">
      <div className="w-full max-w-md space-y-6">
        {/* Timer Banner */}
        <div className="bg-destructive text-destructive-foreground rounded-2xl p-4 text-center shadow-elegant">
          <div className="flex items-center justify-center gap-2 mb-1">
            <Clock className="w-5 h-5 animate-pulse" />
            <p className="text-sm font-bold">
              ⏰ Special Offer Expires In:
            </p>
          </div>
          <p className="text-3xl font-bold tabular-nums">
            {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
          </p>
        </div>

        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary to-accent text-white rounded-full font-bold text-sm">
            <span className="animate-pulse">🔥</span>
            Get Synjaro AI in Your Pocket
            <span className="animate-pulse">🔥</span>
          </div>
          <h1 className="text-2xl font-bold gradient-text">
            📱 Your Personalized Weight Loss App
          </h1>
          <p className="text-sm text-muted-foreground">
            AI that suggests teas and recipes FOR YOU, every day
          </p>
        </div>

        {/* What You Get */}
        <div className="bg-card border-2 border-primary/30 rounded-2xl p-4 space-y-4 shadow-elegant">
          <h2 className="text-lg font-bold text-center text-foreground">
            📋 What You'll Get with Synjaro
          </h2>

          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-bold flex items-center gap-2 text-sm text-foreground">
                <Coffee className="w-4 h-4 text-primary" />
                AI-Personalized Teas
              </h3>
              <ul className="space-y-1 text-xs">
                <li className="flex gap-2">
                  <Check className="w-3 h-3 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">3 teas per day adapted to YOUR metabolism</span>
                </li>
                <li className="flex gap-2">
                  <Check className="w-3 h-3 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Ingredients you ALREADY HAVE at home</span>
                </li>
                <li className="flex gap-2">
                  <Check className="w-3 h-3 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Timed for maximum effectiveness</span>
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <h3 className="font-bold flex items-center gap-2 text-sm text-foreground">
                <span className="text-lg">🥗</span>
                Smart Nutrition
              </h3>
              <ul className="space-y-1 text-xs">
                <li className="flex gap-2">
                  <Check className="w-3 h-3 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Daily menu with REAL food</span>
                </li>
                <li className="flex gap-2">
                  <Check className="w-3 h-3 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Simple recipes with common ingredients</span>
                </li>
                <li className="flex gap-2">
                  <Check className="w-3 h-3 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Automatic & budget-friendly shopping list</span>
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <h3 className="font-bold flex items-center gap-2 text-sm text-foreground">
                <TrendingDown className="w-4 h-4 text-primary" />
                Charts & Tracking
              </h3>
              <ul className="space-y-1 text-xs">
                <li className="flex gap-2">
                  <Check className="w-3 h-3 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Visualize your progress in real-time</span>
                </li>
                <li className="flex gap-2">
                  <Check className="w-3 h-3 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Weight, calorie & achievement charts</span>
                </li>
                <li className="flex gap-2">
                  <Check className="w-3 h-3 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Gamification system to keep you motivated</span>
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <h3 className="font-bold flex items-center gap-2 text-sm text-foreground">
                <Sparkles className="w-4 h-4 text-primary" />
                24/7 AI By Your Side
              </h3>
              <ul className="space-y-1 text-xs">
                <li className="flex gap-2">
                  <Check className="w-3 h-3 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Personalized suggestions EVERY day</span>
                </li>
                <li className="flex gap-2">
                  <Check className="w-3 h-3 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Automatic adjustments as you evolve</span>
                </li>
                <li className="flex gap-2">
                  <Check className="w-3 h-3 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Smart notifications at the right times</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Why It Works */}
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-2xl p-4">
          <h2 className="text-base font-bold text-center mb-4 text-foreground">
            🔬 Why Synjaro Works
          </h2>

          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="space-y-1">
              <div className="text-3xl">🤖</div>
              <h3 className="font-bold text-xs text-foreground">Personalized AI</h3>
              <p className="text-xs text-muted-foreground">
                Analyzes 25+ data points about YOU
              </p>
            </div>

            <div className="space-y-1">
              <div className="text-3xl">🏠</div>
              <h3 className="font-bold text-xs text-foreground">Home Ingredients</h3>
              <p className="text-xs text-muted-foreground">
                No expensive products needed
              </p>
            </div>

            <div className="space-y-1">
              <div className="text-3xl">📊</div>
              <h3 className="font-bold text-xs text-foreground">Science Based</h3>
              <p className="text-xs text-muted-foreground">
                BMR, TDEE & deficit formulas
              </p>
            </div>
          </div>
        </div>

        {/* Comparison */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-muted/50 border border-border rounded-xl p-3 space-y-2">
            <h3 className="font-bold text-xs text-center flex items-center justify-center gap-1 text-foreground">
              <X className="w-4 h-4 text-destructive" />
              Without Synjaro
            </h3>
            <ul className="space-y-1 text-xs">
              <li className="flex gap-1 items-start">
                <span className="text-destructive">❌</span>
                <span className="text-muted-foreground">Generic internet diets</span>
              </li>
              <li className="flex gap-1 items-start">
                <span className="text-destructive">❌</span>
                <span className="text-muted-foreground">No guidance on teas</span>
              </li>
              <li className="flex gap-1 items-start">
                <span className="text-destructive">❌</span>
                <span className="text-muted-foreground">Expensive supplements</span>
              </li>
              <li className="flex gap-1 items-start">
                <span className="text-destructive">❌</span>
                <span className="text-muted-foreground">Doing it alone</span>
              </li>
            </ul>
          </div>

          <div className="bg-primary/10 border-2 border-primary rounded-xl p-3 space-y-2">
            <h3 className="font-bold text-xs text-center flex items-center justify-center gap-1 text-foreground">
              <Check className="w-4 h-4 text-primary" />
              With Synjaro
            </h3>
            <ul className="space-y-1 text-xs">
              <li className="flex gap-1 items-start">
                <span className="text-primary">✅</span>
                <span className="text-foreground font-medium">100% personalized plan</span>
              </li>
              <li className="flex gap-1 items-start">
                <span className="text-primary">✅</span>
                <span className="text-foreground font-medium">AI-guided tea timing</span>
              </li>
              <li className="flex gap-1 items-start">
                <span className="text-primary">✅</span>
                <span className="text-foreground font-medium">Home ingredients only</span>
              </li>
              <li className="flex gap-1 items-start">
                <span className="text-primary">✅</span>
                <span className="text-foreground font-medium">24/7 AI support</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Pricing */}
        <div className="bg-card border-2 border-primary rounded-2xl p-4 space-y-4 shadow-elegant">
          <div className="text-center space-y-3">
            <div className="flex items-center justify-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-500 text-yellow-500" />
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              Average rating from 12,487 customers
            </p>

            <div>
              <p className="text-xs text-muted-foreground">
                Investment to have AI by your side:
              </p>
              <p className="line-through text-muted-foreground text-sm mt-1">
                $99.00 (market value for AI apps)
              </p>
              <p className="text-4xl font-bold gradient-text my-1">$19.00</p>
              <p className="text-xs text-muted-foreground">
                or 12x of $1.90 interest-free
              </p>
            </div>

            <div className="bg-primary/10 border border-primary/20 rounded-xl p-2">
              <p className="text-xs text-foreground">
                💡 <span className="font-bold">Less than $0.70 per day</span> for an AI personal trainer + nutritionist in your pocket!
              </p>
            </div>
          </div>

          <Button
            onClick={onCheckout}
            size="lg"
            className="w-full h-14 text-base font-bold animate-pulse hover:animate-none"
          >
            <Zap className="w-5 h-5 mr-2" />
            🚀 I Want Synjaro AI Now!
          </Button>

          <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Shield className="w-4 h-4 text-primary" />
              <span>Secure Payment</span>
            </div>
            <div className="flex items-center gap-1">
              <Check className="w-4 h-4 text-primary" />
              <span>30-Day Guarantee</span>
            </div>
          </div>
        </div>

        {/* Guarantee */}
        <div className="bg-gradient-to-r from-green-500/10 to-primary/10 border border-green-500/20 rounded-2xl p-4 text-center space-y-2">
          <Shield className="w-12 h-12 mx-auto text-green-600 dark:text-green-400" />
          <h3 className="text-lg font-bold text-foreground">
            🛡️ 30-Day Unconditional Guarantee
          </h3>
          <p className="text-xs text-foreground">
            Try Synjaro risk-free! If you're not completely satisfied with the results, 
            we'll refund 100% of your money. No questions, no hassle.
          </p>
        </div>

        {/* FAQ */}
        <div className="bg-card border border-border rounded-2xl p-4 space-y-3">
          <h2 className="text-base font-bold text-foreground text-center">
            ❓ Frequently Asked Questions
          </h2>

          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-sm">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-xs text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Final CTA */}
        <div className="text-center space-y-3 pb-8">
          <Button
            onClick={onCheckout}
            size="lg"
            className="w-full h-14 text-base font-bold"
          >
            🚀 Start My Transformation Now!
          </Button>
          <p className="text-xs text-muted-foreground">
            ⏰ Instant access after purchase
          </p>
        </div>
      </div>
    </div>
  );
};
