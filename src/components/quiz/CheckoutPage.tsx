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
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutos em segundos

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
      question: "Como funciona o app Synjaro?",
      answer:
        "O Synjaro é um aplicativo com inteligência artificial que cria um plano 100% personalizado para você. A IA sugere chás naturais e receitas com ingredientes caseiros, acompanha seu progresso e te motiva diariamente com notificações inteligentes.",
    },
    {
      question: "Preciso comprar ingredientes caros?",
      answer:
        "Não! Toda a proposta do Synjaro é usar ingredientes que você já tem em casa ou que encontra em qualquer mercado: chá verde, hibisco, gengibre, ovos, arroz integral, feijão, frango, etc. Nada de superalimentos caros ou produtos milagrosos.",
    },
    {
      question: "Quanto tempo até ver resultados?",
      answer:
        "A maioria das pessoas começa a ver resultados visíveis nas primeiras 2-3 semanas. A IA calcula que você alcançará sua meta de " + weightToLose.toFixed(1) + "kg em aproximadamente " + months + " meses com o plano personalizado.",
    },
    {
      question: "E se eu não gostar do app?",
      answer:
        "Oferecemos garantia de 30 dias. Se você não estiver satisfeito com o Synjaro, devolvemos 100% do seu investimento, sem perguntas.",
    },
    {
      question: "A IA realmente funciona?",
      answer:
        "Sim! A IA Synjaro analisa 25+ informações sobre você (peso, altura, idade, rotina, preferências) e usa fórmulas científicas (BMR, TDEE, déficit calórico) para criar um plano único. Ela aprende com você e ajusta as sugestões conforme você evolui.",
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-4 py-12 bg-gradient-to-b from-background to-muted/20">
      <div className="w-full max-w-5xl space-y-8">
        {/* Timer Banner */}
        <div className="bg-destructive text-destructive-foreground rounded-2xl p-6 text-center shadow-elegant">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Clock className="w-6 h-6 animate-pulse" />
            <p className="text-lg font-bold">
              ⏰ Oferta Especial Expira Em:
            </p>
          </div>
          <p className="text-4xl font-bold tabular-nums">
            {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
          </p>
        </div>

        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-full font-bold text-lg">
            <span className="animate-pulse">🔥</span>
            Tenha a IA Synjaro no Seu Bolso
            <span className="animate-pulse">🔥</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold gradient-text">
            📱 Seu Aplicativo de Emagrecimento Personalizado
          </h1>
          <p className="text-xl text-muted-foreground">
            A IA que sugere chás e receitas PARA VOCÊ, todos os dias
          </p>
        </div>

        {/* Recap do Plano */}
        <div className="bg-card border-2 border-primary/30 rounded-2xl p-8 space-y-6 shadow-elegant">
          <h2 className="text-2xl font-bold text-center text-foreground">
            📋 O Que Você Vai Receber no Synjaro
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-bold flex items-center gap-2 text-foreground">
                <Coffee className="w-5 h-5 text-primary" />
                Chás Personalizados pela IA
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="flex gap-2">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">3 chás por dia adaptados ao SEU metabolismo</span>
                </li>
                <li className="flex gap-2">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Ingredientes que você JÁ TEM em casa (chá verde, hibisco, gengibre, etc)</span>
                </li>
                <li className="flex gap-2">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Horários calculados para máxima eficácia</span>
                </li>
                <li className="flex gap-2">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Benefícios específicos (acelera metabolismo, reduz inchaço, melhora sono)</span>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold flex items-center gap-2 text-foreground">
                <span className="text-xl">🥗</span>
                Alimentação Inteligente
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="flex gap-2">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Cardápio diário com comida DE VERDADE</span>
                </li>
                <li className="flex gap-2">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Receitas simples com ingredientes do mercado comum</span>
                </li>
                <li className="flex gap-2">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Lista de compras automática e econômica</span>
                </li>
                <li className="flex gap-2">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Calorias calculadas precisamente para VOCÊ</span>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold flex items-center gap-2 text-foreground">
                <TrendingDown className="w-5 h-5 text-primary" />
                Gráficos e Acompanhamento
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="flex gap-2">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Visualize seu progresso em tempo real</span>
                </li>
                <li className="flex gap-2">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Gráficos de peso, calorias e conquistas</span>
                </li>
                <li className="flex gap-2">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Badges de motivação ao atingir metas</span>
                </li>
                <li className="flex gap-2">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Sistema de gamificação para te manter motivada</span>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold flex items-center gap-2 text-foreground">
                <Sparkles className="w-5 h-5 text-primary" />
                IA 24/7 ao Seu Lado
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="flex gap-2">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Sugestões personalizadas TODOS os dias</span>
                </li>
                <li className="flex gap-2">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Ajustes automáticos conforme você evolui</span>
                </li>
                <li className="flex gap-2">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Aprende com seus hábitos e preferências</span>
                </li>
                <li className="flex gap-2">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Notificações inteligentes nos horários certos</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Por Que Synjaro Funciona */}
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-center mb-6 text-foreground">
            🔬 Por Que o Synjaro Funciona?
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center space-y-3">
              <div className="text-5xl">🤖</div>
              <h3 className="font-bold text-foreground">IA Personalizada</h3>
              <p className="text-sm text-muted-foreground">
                Não é um plano genérico. A IA analisa 25+ pontos sobre VOCÊ e cria 
                sugestões únicas baseadas no seu corpo, rotina e objetivos.
              </p>
            </div>

            <div className="text-center space-y-3">
              <div className="text-5xl">🏠</div>
              <h3 className="font-bold text-foreground">Ingredientes Caseiros</h3>
              <p className="text-sm text-muted-foreground">
                Chá verde, hibisco, gengibre, ovos, arroz integral, feijão... 
                Tudo que você já tem (ou deveria ter) em casa. Nada de produtos caros!
              </p>
            </div>

            <div className="text-center space-y-3">
              <div className="text-5xl">📊</div>
              <h3 className="font-bold text-foreground">Ciência + Gamificação</h3>
              <p className="text-sm text-muted-foreground">
                Cálculos de BMR, TDEE e déficit calórico + gráficos motivacionais + 
                badges de conquista = você fica engajada e vê resultados reais!
              </p>
            </div>
          </div>
        </div>

        {/* Comparação Com vs Sem */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-muted/50 border border-border rounded-xl p-6 space-y-4">
            <h3 className="font-bold text-center flex items-center justify-center gap-2 text-foreground">
              <X className="w-6 h-6 text-destructive" />
              Sem o Synjaro
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-2 items-start">
                <span className="text-destructive">❌</span>
                <span className="text-muted-foreground">Dietas genéricas da internet</span>
              </li>
              <li className="flex gap-2 items-start">
                <span className="text-destructive">❌</span>
                <span className="text-muted-foreground">Não sabe qual chá tomar e quando</span>
              </li>
              <li className="flex gap-2 items-start">
                <span className="text-destructive">❌</span>
                <span className="text-muted-foreground">Gastar com produtos "emagrecedores" caros</span>
              </li>
              <li className="flex gap-2 items-start">
                <span className="text-destructive">❌</span>
                <span className="text-muted-foreground">Fazer tudo sozinha, sem acompanhamento</span>
              </li>
              <li className="flex gap-2 items-start">
                <span className="text-destructive">❌</span>
                <span className="text-muted-foreground">Desistir na primeira dificuldade</span>
              </li>
            </ul>
          </div>

          <div className="bg-primary/10 border-2 border-primary rounded-xl p-6 space-y-4">
            <h3 className="font-bold text-center flex items-center justify-center gap-2 text-foreground">
              <Check className="w-6 h-6 text-primary" />
              Com o Synjaro
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-2 items-start">
                <span className="text-primary">✅</span>
                <span className="text-foreground font-medium">Plano 100% personalizado para VOCÊ</span>
              </li>
              <li className="flex gap-2 items-start">
                <span className="text-primary">✅</span>
                <span className="text-foreground font-medium">IA te guia: qual chá, qual horário, qual receita</span>
              </li>
              <li className="flex gap-2 items-start">
                <span className="text-primary">✅</span>
                <span className="text-foreground font-medium">Ingredientes que você JÁ TEM em casa</span>
              </li>
              <li className="flex gap-2 items-start">
                <span className="text-primary">✅</span>
                <span className="text-foreground font-medium">App te acompanha 24/7 e motiva diariamente</span>
              </li>
              <li className="flex gap-2 items-start">
                <span className="text-primary">✅</span>
                <span className="text-foreground font-medium">Gráficos mostram evolução = você se mantém motivada</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Pricing */}
        <div className="bg-card border-2 border-primary rounded-2xl p-8 space-y-6 shadow-elegant">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-yellow-500 text-yellow-500" />
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              Avaliação média de 12.487 clientes
            </p>

            <div>
              <p className="text-muted-foreground">
                Investimento para ter a IA ao seu lado:
              </p>
              <p className="line-through text-muted-foreground text-xl mt-2">
                R$ 497,00 (valor de mercado de apps com IA)
              </p>
              <p className="text-5xl font-bold gradient-text my-2">R$ 97,00</p>
              <p className="text-muted-foreground">
                ou 12x de R$ 9,70 sem juros
              </p>
            </div>

            <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 max-w-md mx-auto">
              <p className="text-sm text-foreground">
                💡 <span className="font-bold">Menos de R$ 3,50 por dia</span> para ter uma IA 
                personal trainer + nutricionista no seu bolso!
              </p>
            </div>
          </div>

          <Button
            onClick={onCheckout}
            size="lg"
            className="w-full h-16 text-xl font-bold animate-pulse hover:animate-none"
          >
            <Zap className="w-6 h-6 mr-2" />
            🚀 Quero a IA Synjaro Comigo Agora!
          </Button>

          <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              <span>Pagamento Seguro</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-primary" />
              <span>Garantia 30 dias</span>
            </div>
          </div>
        </div>

        {/* Guarantee */}
        <div className="bg-gradient-to-r from-green-500/10 to-primary/10 border border-green-500/20 rounded-2xl p-8 text-center space-y-4">
          <Shield className="w-16 h-16 mx-auto text-green-600 dark:text-green-400" />
          <h3 className="text-2xl font-bold text-foreground">
            🛡️ Garantia Incondicional de 30 Dias
          </h3>
          <p className="text-lg text-foreground max-w-2xl mx-auto">
            Teste o Synjaro sem risco! Se você não estiver completamente satisfeito com os resultados, 
            devolvemos 100% do seu dinheiro. Sem perguntas, sem complicações.
          </p>
        </div>

        {/* FAQ */}
        <div className="bg-card border border-border rounded-2xl p-8 space-y-6">
          <h2 className="text-2xl font-bold text-foreground text-center">
            ❓ Perguntas Frequentes
          </h2>

          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Final CTA */}
        <div className="text-center space-y-4 pb-8">
          <Button
            onClick={onCheckout}
            size="lg"
            className="w-full md:w-auto px-16 h-16 text-xl font-bold"
          >
            🚀 Sim, Quero Transformar Meu Corpo Agora!
          </Button>
          <p className="text-sm text-muted-foreground">
            Junte-se a mais de 12.487 pessoas que já transformaram suas vidas com o Synjaro
          </p>
        </div>
      </div>
    </div>
  );
};