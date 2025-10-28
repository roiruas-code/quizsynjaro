import { QuizData } from "@/types/quiz.types";
import { Button } from "@/components/ui/button";
import { Check, Clock, Shield, Star, Zap } from "lucide-react";
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
      question: "Como funciona o plano?",
      answer:
        "Você receberá um plano completo e personalizado com refeições balanceadas, exercícios adaptados ao seu nível e acompanhamento profissional para garantir seus resultados.",
    },
    {
      question: "Quanto tempo até ver resultados?",
      answer:
        "A maioria das pessoas começa a ver resultados visíveis nas primeiras 2-3 semanas. Seu plano projeta que você alcançará sua meta em aproximadamente " +
        months +
        " meses.",
    },
    {
      question: "Preciso de equipamentos especiais?",
      answer:
        "Não! Nossos exercícios podem ser feitos em casa sem equipamentos ou adaptados para academia caso você prefira.",
    },
    {
      question: "E se eu não gostar do plano?",
      answer:
        "Oferecemos garantia de 30 dias. Se você não estiver satisfeito, devolvemos 100% do seu investimento, sem perguntas.",
    },
    {
      question: "Vou passar fome?",
      answer:
        "Absolutamente não! Nosso método é baseado em alimentação balanceada e sustentável. Você comerá bem e ainda assim emagrecerá de forma saudável.",
    },
  ];

  const bonuses = [
    {
      icon: "📱",
      title: "App de Acompanhamento",
      value: "R$ 197",
      description: "Acompanhe seu progresso diariamente",
    },
    {
      icon: "📚",
      title: "Guia de Receitas Saudáveis",
      value: "R$ 97",
      description: "100+ receitas deliciosas e nutritivas",
    },
    {
      icon: "🎯",
      title: "Plano de Treino Personalizado",
      value: "R$ 297",
      description: "Exercícios adaptados ao seu nível",
    },
    {
      icon: "👨‍⚕️",
      title: "Suporte Nutricional",
      value: "R$ 497",
      description: "Tire dúvidas com especialistas",
    },
  ];

  const totalBonusValue = bonuses.reduce(
    (acc, bonus) => acc + parseInt(bonus.value.replace(/\D/g, "")),
    0
  );

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
          <h1 className="text-4xl md:text-5xl font-bold gradient-text">
            🎉 Seu Plano Está Pronto!
          </h1>
          <p className="text-xl text-muted-foreground">
            Transforme seu corpo em apenas {months} meses
          </p>
        </div>

        {/* Plan Recap */}
        <div className="bg-card border-2 border-primary/30 rounded-2xl p-8 space-y-6 shadow-elegant">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              📋 Resumo do Seu Plano Personalizado
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-primary/5 rounded-xl p-6 text-center space-y-2">
              <p className="text-sm text-muted-foreground">Você Vai Perder</p>
              <p className="text-4xl font-bold text-primary">
                {weightToLose.toFixed(1)} kg
              </p>
            </div>

            <div className="bg-accent/5 rounded-xl p-6 text-center space-y-2">
              <p className="text-sm text-muted-foreground">Em Apenas</p>
              <p className="text-4xl font-bold text-accent">
                {months} {months === 1 ? "mês" : "meses"}
              </p>
            </div>

            <div className="bg-success/5 rounded-xl p-6 text-center space-y-2">
              <p className="text-sm text-muted-foreground">Calorias Diárias</p>
              <p className="text-4xl font-bold text-success">
                {((data.tdee || 0) - (data.calorieDeficit || 0)).toLocaleString()}
              </p>
            </div>
          </div>

          <div className="border-t border-border pt-6 space-y-3">
            <h3 className="font-bold text-foreground text-lg">
              ✅ O Que Está Incluído:
            </h3>
            <ul className="space-y-2">
              {[
                "Plano alimentar 100% personalizado para você",
                "Cardápio semanal com receitas práticas",
                "Treinos adaptados ao seu nível de atividade",
                "Lista de compras automática",
                "Calculadora nutricional inteligente",
                "Acompanhamento de progresso em tempo real",
                "Suporte profissional via chat",
                "Atualizações mensais do seu plano",
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bonuses */}
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-2xl p-8 space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              🎁 Bônus Exclusivos (Grátis!)
            </h2>
            <p className="text-muted-foreground">
              Valor total: <span className="line-through">R$ {totalBonusValue}</span>{" "}
              <span className="text-primary font-bold text-xl">GRÁTIS</span>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {bonuses.map((bonus, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-xl p-6 space-y-2"
              >
                <div className="text-4xl mb-2">{bonus.icon}</div>
                <h3 className="font-bold text-foreground">{bonus.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {bonus.description}
                </p>
                <p className="text-primary font-bold">
                  Valor: <span className="line-through text-muted-foreground">{bonus.value}</span> GRÁTIS
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing */}
        <div className="bg-card border-2 border-primary rounded-2xl p-8 space-y-6 shadow-elegant">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2">
              <Star className="w-6 h-6 fill-yellow-500 text-yellow-500" />
              <Star className="w-6 h-6 fill-yellow-500 text-yellow-500" />
              <Star className="w-6 h-6 fill-yellow-500 text-yellow-500" />
              <Star className="w-6 h-6 fill-yellow-500 text-yellow-500" />
              <Star className="w-6 h-6 fill-yellow-500 text-yellow-500" />
            </div>
            <p className="text-sm text-muted-foreground">
              Avaliação média de 12.487 clientes
            </p>

            <div>
              <p className="text-muted-foreground line-through text-xl">
                De R$ 497,00
              </p>
              <p className="text-5xl font-bold gradient-text">R$ 97,00</p>
              <p className="text-muted-foreground">
                ou 12x de R$ 9,70 sem juros
              </p>
            </div>

            <div className="bg-primary/5 border border-primary/20 rounded-xl p-4">
              <p className="text-sm text-foreground">
                🔥 <span className="font-bold">Desconto de 80%</span> apenas para os primeiros 50 inscritos hoje
              </p>
            </div>
          </div>

          <Button
            onClick={onCheckout}
            size="lg"
            className="w-full h-16 text-xl font-bold animate-pulse hover:animate-none"
          >
            <Zap className="w-6 h-6 mr-2" />
            Começar Minha Transformação Agora
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
        <div className="bg-gradient-to-r from-success/10 to-primary/10 border border-success/20 rounded-2xl p-8 text-center space-y-4">
          <Shield className="w-16 h-16 mx-auto text-success" />
          <h3 className="text-2xl font-bold text-foreground">
            🛡️ Garantia Incondicional de 30 Dias
          </h3>
          <p className="text-lg text-foreground max-w-2xl mx-auto">
            Se você não estiver completamente satisfeito com os resultados, basta nos
            enviar um email e devolveremos 100% do seu dinheiro. Sem perguntas, sem
            complicações.
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
            Junte-se a mais de 12.487 pessoas que já transformaram suas vidas
          </p>
        </div>
      </div>
    </div>
  );
};
