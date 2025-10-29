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

  // Chás personalizados baseados no perfil
  const personalizedTeas = [
    {
      name: "Chá Verde Matcha",
      time: "08:00 - Manhã",
      benefits: "Acelera metabolismo +15%",
      emoji: "🍵",
      ingredients: "Chá verde, limão, gengibre"
    },
    {
      name: "Hibisco com Canela",
      time: "14:00 - Tarde",
      benefits: "Reduz inchaço e ansiedade",
      emoji: "🌺",
      ingredients: "Hibisco, canela, cravo"
    },
    {
      name: "Camomila Calmante",
      time: "21:00 - Noite",
      benefits: "Melhora sono e digestão",
      emoji: "🌼",
      ingredients: "Camomila, erva-cidreira, hortelã"
    }
  ];

  const todayMeals = [
    {
      meal: "Café da Manhã",
      time: "08:30",
      calories: 350,
      items: ["2 ovos mexidos", "1 fatia pão integral", "Abacate", "Café sem açúcar"],
      emoji: "🍳"
    },
    {
      meal: "Almoço",
      time: "12:30",
      calories: 450,
      items: ["Peito de frango grelhado", "Arroz integral", "Feijão", "Salada verde"],
      emoji: "🍗"
    },
    {
      meal: "Lanche",
      time: "16:00",
      calories: 150,
      items: ["Iogurte natural", "Granola caseira", "Frutas vermelhas"],
      emoji: "🥤"
    },
    {
      meal: "Jantar",
      time: "19:30",
      calories: 400,
      items: ["Salmão grelhado", "Batata doce", "Brócolis no vapor"],
      emoji: "🐟"
    }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-4 py-12">
      <div className="max-w-4xl w-full space-y-6">
        {/* Header */}
        <div className="text-center space-y-3">
          <h2 className="text-3xl md:text-4xl font-bold gradient-text">
            📱 Experimente o Synjaro Agora!
          </h2>
          <p className="text-lg text-muted-foreground">
            Veja como será seu dia a dia com a IA ao seu lado
          </p>
        </div>

        {/* App Preview Container (looks like phone) */}
        <div className="bg-card border-4 border-border rounded-3xl shadow-2xl overflow-hidden max-w-md mx-auto">
          {/* Phone Notch */}
          <div className="bg-background h-6 flex items-center justify-center">
            <div className="w-24 h-4 bg-border rounded-full" />
          </div>

          {/* App Header */}
          <div className="bg-gradient-to-r from-primary to-accent p-6 text-primary-foreground">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm opacity-90">Olá, {data.gender === 'female' ? 'Bem-vinda' : 'Bem-vindo'}!</p>
                <p className="text-2xl font-bold">Synjaro IA</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                🤖
              </div>
            </div>

            {/* Today's Progress */}
            <div className="bg-white/10 backdrop-blur rounded-xl p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Meta de Calorias Hoje</span>
                <span className="font-bold">1.350 / {((data.tdee || 0) - (data.calorieDeficit || 0)).toLocaleString()}</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2">
                <div className="bg-white h-full rounded-full w-4/5" />
              </div>
              <p className="text-xs opacity-75">Ótimo! Você está no caminho certo 🎯</p>
            </div>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 rounded-none border-b">
              <TabsTrigger value="today">
                <Calendar className="w-4 h-4 mr-2" />
                Hoje
              </TabsTrigger>
              <TabsTrigger value="teas">
                <Coffee className="w-4 h-4 mr-2" />
                Chás
              </TabsTrigger>
              <TabsTrigger value="progress">
                📊 Progresso
              </TabsTrigger>
            </TabsList>

            {/* Today Tab */}
            <TabsContent value="today" className="p-4 space-y-4 max-h-96 overflow-y-auto">
              <div className="space-y-3">
                <h3 className="font-bold text-foreground flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Seu Cardápio Hoje
                </h3>
                {todayMeals.map((meal, i) => (
                  <div key={i} className="bg-muted/50 rounded-xl p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{meal.emoji}</span>
                        <div>
                          <p className="font-semibold text-foreground">{meal.meal}</p>
                          <p className="text-xs text-muted-foreground">{meal.time}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-primary">{meal.calories} kcal</p>
                      </div>
                    </div>
                    <ul className="text-xs text-muted-foreground space-y-1 pl-2">
                      {meal.items.map((item, j) => (
                        <li key={j}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Teas Tab */}
            <TabsContent value="teas" className="p-4 space-y-4 max-h-96 overflow-y-auto">
              <div className="space-y-3">
                <h3 className="font-bold text-foreground">
                  ☕ Seus Chás Personalizados
                </h3>
                <p className="text-sm text-muted-foreground">
                  Ingredientes que você já tem em casa!
                </p>
                {personalizedTeas.map((tea, i) => (
                  <div key={i} className="bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 rounded-xl p-4 space-y-2">
                    <div className="flex items-start gap-3">
                      <span className="text-3xl">{tea.emoji}</span>
                      <div className="flex-1">
                        <p className="font-bold text-foreground">{tea.name}</p>
                        <p className="text-xs text-muted-foreground mb-2">{tea.time}</p>
                        <p className="text-sm text-primary font-semibold mb-2">
                          ✨ {tea.benefits}
                        </p>
                        <div className="bg-background/50 rounded-lg p-2">
                          <p className="text-xs text-muted-foreground">
                            <span className="font-semibold">Ingredientes:</span> {tea.ingredients}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Progress Tab */}
            <TabsContent value="progress" className="p-4 space-y-4 max-h-96 overflow-y-auto">
              <div className="space-y-4">
                <h3 className="font-bold text-foreground">📊 Sua Jornada</h3>
                
                {/* Mini Chart */}
                <div className="bg-muted/50 rounded-xl p-4">
                  <div className="flex justify-between items-end h-32">
                    {[65, 70, 85, 95, 80, 70, 60].map((height, i) => (
                      <div 
                        key={i} 
                        className="bg-gradient-to-t from-primary to-accent rounded-t-lg w-8 transition-all"
                        style={{ height: `${height}%` }}
                      />
                    ))}
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>Seg</span><span>Ter</span><span>Qua</span><span>Qui</span><span>Sex</span><span>Sáb</span><span>Dom</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-primary/10 rounded-xl p-4 text-center">
                    <p className="text-3xl font-bold text-primary">-{((data.currentWeight || 0) - (data.goalWeight || 0)).toFixed(1)}kg</p>
                    <p className="text-xs text-muted-foreground mt-1">Meta Total</p>
                  </div>
                  <div className="bg-green-500/10 rounded-xl p-4 text-center">
                    <p className="text-3xl font-bold text-green-600 dark:text-green-400">7</p>
                    <p className="text-xs text-muted-foreground mt-1">Dias Seguidos</p>
                  </div>
                </div>

                {/* Achievements */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm text-foreground">🏆 Conquistas Desbloqueadas</h4>
                  <div className="flex flex-wrap gap-2">
                    <div className="bg-yellow-100 dark:bg-yellow-900/30 px-3 py-1 rounded-full text-xs">
                      🔥 Sequência de 7 dias
                    </div>
                    <div className="bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded-full text-xs">
                      💧 Meta de água
                    </div>
                    <div className="bg-green-100 dark:bg-green-900/30 px-3 py-1 rounded-full text-xs">
                      🥗 Cardápio completo
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* CTA */}
        <div className="text-center space-y-4 pt-4">
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 border-2 border-primary/30 rounded-xl p-4 max-w-md mx-auto">
            <p className="text-sm text-foreground font-semibold mb-2">
              ✨ Isso é apenas uma AMOSTRA do que a IA Synjaro faz por você!
            </p>
            <p className="text-xs text-muted-foreground">
              Chás personalizados • Receitas com ingredientes caseiros • Gráficos de progresso • Sugestões diárias da IA
            </p>
          </div>

          <Button 
            onClick={onContinue}
            size="lg"
            className="w-full md:w-auto px-12 h-16 text-xl font-bold"
          >
            🚀 Quero Ter a IA Synjaro Comigo!
          </Button>

          <p className="text-xs text-muted-foreground">
            ⏰ Acesso imediato após a compra
          </p>
        </div>
      </div>
    </div>
  );
};