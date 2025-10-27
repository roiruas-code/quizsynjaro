import { useState } from "react";
import { QuizLayout } from "@/components/QuizLayout";
import { SelectionCard } from "@/components/SelectionCard";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import maleImage from "@/assets/male-option.jpg";
import femaleImage from "@/assets/female-option.jpg";

type QuizData = {
  gender?: string;
  age?: string;
  weight?: string;
  bodyType?: string;
  activity?: string;
  diet?: string;
  goal?: string;
};

const Index = () => {
  const [step, setStep] = useState(1);
  const [quizData, setQuizData] = useState<QuizData>({});
  const [generating, setGenerating] = useState(false);
  const { toast } = useToast();

  const totalSteps = 7;

  const handleSelection = (key: keyof QuizData, value: string) => {
    setQuizData({ ...quizData, [key]: value });
  };

  const handleNext = () => {
    if (step === totalSteps) {
      // Generate plan
      setGenerating(true);
      setTimeout(() => {
        setGenerating(false);
        toast({
          title: "🎉 Plano Criado!",
          description: "Seu plano personalizado está pronto.",
        });
      }, 3000);
    } else {
      setStep(step + 1);
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return !!quizData.gender;
      case 2:
        return !!quizData.age;
      case 3:
        return !!quizData.weight;
      case 4:
        return !!quizData.bodyType;
      case 5:
        return !!quizData.activity;
      case 6:
        return !!quizData.diet;
      case 7:
        return !!quizData.goal;
      default:
        return false;
    }
  };

  if (generating) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="text-center space-y-6 max-w-md">
          <Loader2 className="w-16 h-16 animate-spin text-primary mx-auto" />
          <h2 className="text-3xl font-bold">Gerando seu plano...</h2>
          <p className="text-lg text-muted-foreground">
            Estamos criando um plano personalizado baseado nas suas respostas ✨
          </p>
        </div>
      </div>
    );
  }

  return (
    <QuizLayout
      currentStep={step}
      totalSteps={totalSteps}
      title={
        step === 1
          ? "Escolha seu gênero"
          : step === 2
          ? "Qual é a sua idade? 📅"
          : step === 3
          ? "Qual é o seu objetivo de peso? ⚖️"
          : step === 4
          ? "Quais são suas áreas problemáticas? 🎯"
          : step === 5
          ? "Qual é o seu nível de atividade? 🏃"
          : step === 6
          ? "Qual é a sua preferência alimentar? 🥗"
          : "Quando você quer atingir sua meta? ⏰"
      }
      subtitle={
        step === 1
          ? "Vamos personalizar seu plano"
          : step === 3
          ? "Seja realista e específico"
          : undefined
      }
    >
      <div className="space-y-4 max-w-2xl mx-auto">
        {/* Step 1: Gender */}
        {step === 1 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              onClick={() => handleSelection("gender", "male")}
              className="cursor-pointer"
            >
              <div
                className={`selection-card ${
                  quizData.gender === "male" ? "selected" : ""
                }`}
              >
                <img
                  src={maleImage}
                  alt="Masculino"
                  className="w-full h-64 object-cover rounded-t-2xl"
                />
                <div className="p-6 text-center">
                  <h3 className="text-2xl font-bold">Masculino</h3>
                </div>
              </div>
            </div>
            <div
              onClick={() => handleSelection("gender", "female")}
              className="cursor-pointer"
            >
              <div
                className={`selection-card ${
                  quizData.gender === "female" ? "selected" : ""
                }`}
              >
                <img
                  src={femaleImage}
                  alt="Feminino"
                  className="w-full h-64 object-cover rounded-t-2xl"
                />
                <div className="p-6 text-center">
                  <h3 className="text-2xl font-bold">Feminino</h3>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Age */}
        {step === 2 && (
          <>
            <SelectionCard
              emoji="👶"
              label="18-25 anos"
              selected={quizData.age === "18-25"}
              onClick={() => handleSelection("age", "18-25")}
            />
            <SelectionCard
              emoji="🧑"
              label="26-35 anos"
              selected={quizData.age === "26-35"}
              onClick={() => handleSelection("age", "26-35")}
            />
            <SelectionCard
              emoji="👨"
              label="36-45 anos"
              selected={quizData.age === "36-45"}
              onClick={() => handleSelection("age", "36-45")}
            />
            <SelectionCard
              emoji="🧔"
              label="46-55 anos"
              selected={quizData.age === "46-55"}
              onClick={() => handleSelection("age", "46-55")}
            />
            <SelectionCard
              emoji="👴"
              label="56+ anos"
              selected={quizData.age === "56+"}
              onClick={() => handleSelection("age", "56+")}
            />
          </>
        )}

        {/* Step 3: Weight Goal */}
        {step === 3 && (
          <>
            <SelectionCard
              emoji="🎯"
              label="Perder 5-10 kg"
              selected={quizData.weight === "5-10"}
              onClick={() => handleSelection("weight", "5-10")}
            />
            <SelectionCard
              emoji="💪"
              label="Perder 10-20 kg"
              selected={quizData.weight === "10-20"}
              onClick={() => handleSelection("weight", "10-20")}
            />
            <SelectionCard
              emoji="🔥"
              label="Perder 20-30 kg"
              selected={quizData.weight === "20-30"}
              onClick={() => handleSelection("weight", "20-30")}
            />
            <SelectionCard
              emoji="⚡"
              label="Perder mais de 30 kg"
              selected={quizData.weight === "30+"}
              onClick={() => handleSelection("weight", "30+")}
            />
          </>
        )}

        {/* Step 4: Body Type */}
        {step === 4 && (
          <>
            <SelectionCard
              emoji="🫃"
              label="Barriga e abdômen"
              selected={quizData.bodyType === "belly"}
              onClick={() => handleSelection("bodyType", "belly")}
            />
            <SelectionCard
              emoji="🦵"
              label="Pernas e coxas"
              selected={quizData.bodyType === "legs"}
              onClick={() => handleSelection("bodyType", "legs")}
            />
            <SelectionCard
              emoji="💪"
              label="Braços e ombros"
              selected={quizData.bodyType === "arms"}
              onClick={() => handleSelection("bodyType", "arms")}
            />
            <SelectionCard
              emoji="🎯"
              label="Corpo todo"
              selected={quizData.bodyType === "full"}
              onClick={() => handleSelection("bodyType", "full")}
            />
          </>
        )}

        {/* Step 5: Activity Level */}
        {step === 5 && (
          <>
            <SelectionCard
              emoji="🛋️"
              label="Sedentário (pouco ou nenhum exercício)"
              selected={quizData.activity === "sedentary"}
              onClick={() => handleSelection("activity", "sedentary")}
            />
            <SelectionCard
              emoji="🚶"
              label="Levemente ativo (1-3 dias/semana)"
              selected={quizData.activity === "light"}
              onClick={() => handleSelection("activity", "light")}
            />
            <SelectionCard
              emoji="🏃"
              label="Moderadamente ativo (3-5 dias/semana)"
              selected={quizData.activity === "moderate"}
              onClick={() => handleSelection("activity", "moderate")}
            />
            <SelectionCard
              emoji="💪"
              label="Muito ativo (6-7 dias/semana)"
              selected={quizData.activity === "very"}
              onClick={() => handleSelection("activity", "very")}
            />
          </>
        )}

        {/* Step 6: Diet */}
        {step === 6 && (
          <>
            <SelectionCard
              emoji="🍖"
              label="Como de tudo"
              selected={quizData.diet === "omnivore"}
              onClick={() => handleSelection("diet", "omnivore")}
            />
            <SelectionCard
              emoji="🥗"
              label="Vegetariano"
              selected={quizData.diet === "vegetarian"}
              onClick={() => handleSelection("diet", "vegetarian")}
            />
            <SelectionCard
              emoji="🌱"
              label="Vegano"
              selected={quizData.diet === "vegan"}
              onClick={() => handleSelection("diet", "vegan")}
            />
            <SelectionCard
              emoji="🍞"
              label="Low Carb / Keto"
              selected={quizData.diet === "lowcarb"}
              onClick={() => handleSelection("diet", "lowcarb")}
            />
          </>
        )}

        {/* Step 7: Goal Timeline */}
        {step === 7 && (
          <>
            <SelectionCard
              emoji="⚡"
              label="1 mês (resultados rápidos)"
              selected={quizData.goal === "1month"}
              onClick={() => handleSelection("goal", "1month")}
            />
            <SelectionCard
              emoji="🎯"
              label="3 meses (recomendado)"
              selected={quizData.goal === "3months"}
              onClick={() => handleSelection("goal", "3months")}
            />
            <SelectionCard
              emoji="💪"
              label="6 meses (sustentável)"
              selected={quizData.goal === "6months"}
              onClick={() => handleSelection("goal", "6months")}
            />
            <SelectionCard
              emoji="🌟"
              label="1 ano (transformação completa)"
              selected={quizData.goal === "1year"}
              onClick={() => handleSelection("goal", "1year")}
            />
          </>
        )}

        {/* Next Button */}
        <div className="pt-8">
          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            className="w-full h-14 text-lg font-semibold"
            size="lg"
          >
            {step === totalSteps ? "Gerar Meu Plano" : "Continuar"}
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </QuizLayout>
  );
};

export default Index;
