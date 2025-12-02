import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Coffee, Calendar } from "lucide-react";
import { QuizData } from "@/types/quiz.types";

interface SynjaroAppDemoProps {
  data: QuizData;
  onContinue: () => void;
}

export const SynjaroAppDemo = ({ data, onContinue }: SynjaroAppDemoProps) => {
  const [activeTab, setActiveTab] = useState("today");

  const personalizedTeas = [
    {
      name: "Green Matcha Tea",
      time: "8:00 AM - Morning",
      benefits: "Boosts metabolism +15%",
      emoji: "🍵",
      ingredients: "Green tea, lemon, ginger"
    },
    {
      name: "Hibiscus with Cinnamon",
      time: "2:00 PM - Afternoon",
      benefits: "Reduces bloating and anxiety",
      emoji: "🌺",
      ingredients: "Hibiscus, cinnamon, cloves"
    },
    {
      name: "Calming Chamomile",
      time: "9:00 PM - Evening",
      benefits: "Improves sleep and digestion",
      emoji: "🌼",
      ingredients: "Chamomile, lemon balm, mint"
    }
  ];

  const todayMeals = [
    {
      meal: "Breakfast",
      time: "8:30 AM",
      calories: 350,
      items: ["2 scrambled eggs", "1 slice whole wheat bread", "Avocado", "Black coffee"],
      emoji: "🍳"
    },
    {
      meal: "Lunch",
      time: "12:30 PM",
      calories: 450,
      items: ["Grilled chicken breast", "Brown rice", "Black beans", "Green salad"],
      emoji: "🍗"
    },
    {
      meal: "Snack",
      time: "4:00 PM",
      calories: 150,
      items: ["Natural yogurt", "Homemade granola", "Berries"],
      emoji: "🥤"
    },
    {
      meal: "Dinner",
      time: "7:30 PM",
      calories: 400,
      items: ["Grilled salmon", "Sweet potato", "Steamed broccoli"],
      emoji: "🐟"
    }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-4 py-8 safe-area-inset">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold gradient-text">
            📱 Try Synjaro Now!
          </h2>
          <p className="text-sm text-muted-foreground">
            See what your daily routine will look like with AI by your side
          </p>
        </div>

        {/* App Preview Container */}
        <div className="bg-card border-4 border-border rounded-3xl shadow-2xl overflow-hidden">
          {/* Phone Notch */}
          <div className="bg-background h-5 flex items-center justify-center">
            <div className="w-20 h-3 bg-border rounded-full" />
          </div>

          {/* App Header */}
          <div className="bg-gradient-to-r from-primary to-accent p-4 text-primary-foreground">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-xs opacity-90">Hello, Welcome!</p>
                <p className="text-xl font-bold">Synjaro AI</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                🤖
              </div>
            </div>

            {/* Today's Progress */}
            <div className="bg-white/10 backdrop-blur rounded-xl p-3 space-y-2">
              <div className="flex justify-between text-xs">
                <span>Today's Calorie Goal</span>
                <span className="font-bold">1,350 / {((data.tdee || 0) - (data.calorieDeficit || 0)).toLocaleString()}</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2">
                <div className="bg-white h-full rounded-full w-4/5" />
              </div>
              <p className="text-xs opacity-75">Great! You're on track 🎯</p>
            </div>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 rounded-none border-b h-10">
              <TabsTrigger value="today" className="text-xs">
                <Calendar className="w-3 h-3 mr-1" />
                Today
              </TabsTrigger>
              <TabsTrigger value="teas" className="text-xs">
                <Coffee className="w-3 h-3 mr-1" />
                Teas
              </TabsTrigger>
              <TabsTrigger value="progress" className="text-xs">
                📊 Progress
              </TabsTrigger>
            </TabsList>

            {/* Today Tab */}
            <TabsContent value="today" className="p-3 space-y-3 max-h-72 overflow-y-auto">
              <div className="space-y-2">
                <h3 className="font-bold text-sm text-foreground flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Your Menu Today
                </h3>
                {todayMeals.map((meal, i) => (
                  <div key={i} className="bg-muted/50 rounded-xl p-3 space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{meal.emoji}</span>
                        <div>
                          <p className="font-semibold text-sm text-foreground">{meal.meal}</p>
                          <p className="text-xs text-muted-foreground">{meal.time}</p>
                        </div>
                      </div>
                      <p className="text-xs font-bold text-primary">{meal.calories} kcal</p>
                    </div>
                    <ul className="text-xs text-muted-foreground space-y-0.5 pl-1">
                      {meal.items.map((item, j) => (
                        <li key={j}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Teas Tab */}
            <TabsContent value="teas" className="p-3 space-y-3 max-h-72 overflow-y-auto">
              <div className="space-y-2">
                <h3 className="font-bold text-sm text-foreground">
                  ☕ Your Personalized Teas
                </h3>
                <p className="text-xs text-muted-foreground">
                  Ingredients you already have at home!
                </p>
                {personalizedTeas.map((tea, i) => (
                  <div key={i} className="bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 rounded-xl p-3 space-y-1">
                    <div className="flex items-start gap-2">
                      <span className="text-2xl">{tea.emoji}</span>
                      <div className="flex-1">
                        <p className="font-bold text-sm text-foreground">{tea.name}</p>
                        <p className="text-xs text-muted-foreground mb-1">{tea.time}</p>
                        <p className="text-xs text-primary font-semibold mb-1">
                          ✨ {tea.benefits}
                        </p>
                        <div className="bg-background/50 rounded-lg p-1.5">
                          <p className="text-xs text-muted-foreground">
                            <span className="font-semibold">Ingredients:</span> {tea.ingredients}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Progress Tab */}
            <TabsContent value="progress" className="p-3 space-y-3 max-h-72 overflow-y-auto">
              <div className="space-y-3">
                <h3 className="font-bold text-sm text-foreground">📊 Your Journey</h3>
                
                {/* Mini Chart */}
                <div className="bg-muted/50 rounded-xl p-3">
                  <div className="flex justify-between items-end h-24">
                    {[65, 70, 85, 95, 80, 70, 60].map((height, i) => (
                      <div 
                        key={i} 
                        className="bg-gradient-to-t from-primary to-accent rounded-t-lg w-6 transition-all"
                        style={{ height: `${height}%` }}
                      />
                    ))}
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-primary/10 rounded-xl p-3 text-center">
                    <p className="text-2xl font-bold text-primary">-{((data.currentWeight || 0) - (data.goalWeight || 0)).toFixed(1)}kg</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Total Goal</p>
                  </div>
                  <div className="bg-green-500/10 rounded-xl p-3 text-center">
                    <p className="text-2xl font-bold text-green-600 dark:text-green-400">7</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Day Streak</p>
                  </div>
                </div>

                {/* Achievements */}
                <div className="space-y-1">
                  <h4 className="font-semibold text-xs text-foreground">🏆 Unlocked Achievements</h4>
                  <div className="flex flex-wrap gap-1">
                    <div className="bg-yellow-100 dark:bg-yellow-900/30 px-2 py-0.5 rounded-full text-xs">
                      🔥 7-day streak
                    </div>
                    <div className="bg-blue-100 dark:bg-blue-900/30 px-2 py-0.5 rounded-full text-xs">
                      💧 Water goal
                    </div>
                    <div className="bg-green-100 dark:bg-green-900/30 px-2 py-0.5 rounded-full text-xs">
                      🥗 Full menu
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* CTA */}
        <div className="text-center space-y-3 pt-2">
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 border-2 border-primary/30 rounded-xl p-3">
            <p className="text-sm text-foreground font-semibold mb-1">
              ✨ This is just a PREVIEW of what Synjaro AI does for you!
            </p>
            <p className="text-xs text-muted-foreground">
              Personalized teas • Recipes with homemade ingredients • Progress charts • Daily AI suggestions
            </p>
          </div>

          <Button 
            onClick={onContinue}
            size="lg"
            className="w-full h-14 text-base font-bold"
          >
            🚀 I Want Synjaro AI With Me!
          </Button>

          <p className="text-xs text-muted-foreground">
            ⏰ Instant access after purchase
          </p>
        </div>
      </div>
    </div>
  );
};
