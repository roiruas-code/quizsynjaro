import { useState, useEffect } from "react";
import { QuizLayout } from "@/components/QuizLayout";
import { SelectionCard } from "@/components/SelectionCard";
import { BeforeAfterGallery } from "@/components/BeforeAfterGallery";
import { SocialProof } from "@/components/SocialProof";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import maleImage from "@/assets/male-option.jpg";
import femaleImage from "@/assets/female-option.jpg";
import { QuizData } from "@/types/quiz.types";
import { InputSlider } from "@/components/quiz/InputSlider";
import { MultiSelectCard } from "@/components/quiz/MultiSelectCard";
import { LoadingAnalysis } from "@/components/quiz/LoadingAnalysis";
import { ResultsDashboard } from "@/components/quiz/ResultsDashboard";
import { ComparisonChart } from "@/components/quiz/ComparisonChart";
import { CheckoutPage } from "@/components/quiz/CheckoutPage";
import { calculateAllMetrics, calculateIdealWeight } from "@/lib/calculations";

const Index = () => {
  const [step, setStep] = useState(1);
  const [quizData, setQuizData] = useState<QuizData>({});
  const [analyzing, setAnalyzing] = useState(false);
  const { toast } = useToast();

  const totalSteps = 25;

  // Load saved progress from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem("quizData");
    const savedStep = localStorage.getItem("quizStep");
    if (savedData) {
      setQuizData(JSON.parse(savedData));
    }
    if (savedStep) {
      setStep(parseInt(savedStep));
    }
  }, []);

  // Save progress to localStorage
  useEffect(() => {
    if (Object.keys(quizData).length > 0) {
      localStorage.setItem("quizData", JSON.stringify(quizData));
      localStorage.setItem("quizStep", step.toString());
    }
  }, [quizData, step]);

  const handleSelection = (key: keyof QuizData, value: any) => {
    setQuizData({ ...quizData, [key]: value });
  };

  const handleMultiSelect = (key: keyof QuizData, value: string) => {
    const current = (quizData[key] as string[]) || [];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    setQuizData({ ...quizData, [key]: updated });
  };

  const handleNext = () => {
    if (step === 20) {
      // Após etapa 20, mostrar loading de análise
      setAnalyzing(true);
      
      // Calcular todas as métricas
      const calculatedData = calculateAllMetrics(quizData);
      
      setTimeout(() => {
        setQuizData(calculatedData);
        setAnalyzing(false);
        setStep(21);
      }, 5000); // 5 segundos de análise
    } else if (step === 25) {
      // Checkout final
      localStorage.removeItem("quizData");
      localStorage.removeItem("quizStep");
      
      // Redirecionar para checkout real (substituir URL)
      window.location.href = "https://pay.kiwify.com.br/seu-produto"; // SUBSTITUIR COM URL REAL
      
      toast({
        title: "🎉 Ótima escolha!",
        description: "Redirecionando para o checkout seguro...",
      });
    } else {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1 && step !== 21 && step !== 22 && step !== 23) {
      setStep(step - 1);
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1: return !!quizData.gender;
      case 2: return !!quizData.age;
      case 3: return !!quizData.height && quizData.height >= 140 && quizData.height <= 220;
      case 4: return !!quizData.currentWeight && quizData.currentWeight >= 40 && quizData.currentWeight <= 200;
      case 5: return !!quizData.goalWeight && quizData.goalWeight >= 40 && quizData.goalWeight <= 200;
      case 6: return quizData.problemAreas && quizData.problemAreas.length > 0;
      case 7: return !!quizData.bodyShape;
      case 8: return !!quizData.lastIdealWeight;
      case 9: return !!quizData.weightGainReason;
      case 10: return !!quizData.previousAttempts;
      case 11: return !!quizData.activityLevel;
      case 12: return !!quizData.occupation;
      case 13: return !!quizData.sleepQuality;
      case 14: return !!quizData.stressLevel;
      case 15: return !!quizData.waterIntake;
      case 16: return !!quizData.dietPreference;
      case 17: return true; // Restrições são opcionais
      case 18: return !!quizData.eatingHabits;
      case 19: return !!quizData.mainMotivation;
      case 20: return !!quizData.goalTimeline;
      default: return true;
    }
  };

  // Loading Analysis State
  if (analyzing) {
    return <LoadingAnalysis />;
  }

  // Results Dashboard (Step 21)
  if (step === 21) {
    return (
      <>
        <SocialProof />
        <ResultsDashboard data={quizData} />
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-lg border-t border-border">
          <div className="max-w-2xl mx-auto">
            <Button
              onClick={handleNext}
              size="lg"
              className="w-full h-14 text-lg font-semibold"
            >
              Ver Minha Jornada de Transformação
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </>
    );
  }

  // Comparison Chart (Step 22)
  if (step === 22) {
    return (
      <>
        <SocialProof />
        <ComparisonChart data={quizData} />
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-lg border-t border-border">
          <div className="max-w-2xl mx-auto">
            <Button
              onClick={handleNext}
              size="lg"
              className="w-full h-14 text-lg font-semibold"
            >
              Ver Transformações Reais
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </>
    );
  }

  // Enhanced Gallery (Step 23-24)
  if (step === 23 || step === 24) {
    return (
      <>
        <SocialProof />
        <BeforeAfterGallery onContinue={handleNext} />
      </>
    );
  }

  // Checkout Page (Step 25)
  if (step === 25) {
    return (
      <CheckoutPage data={quizData} onCheckout={handleNext} />
    );
  }

  const getStepTitle = () => {
    const titles: { [key: number]: string } = {
      1: "Escolha seu gênero",
      2: "Qual é a sua idade? 📅",
      3: "Qual é a sua altura? 📏",
      4: "Qual é o seu peso atual? ⚖️",
      5: "Qual é o seu peso ideal? 🎯",
      6: "Quais são suas áreas problemáticas? 🎯",
      7: "Qual é o formato do seu corpo? 👤",
      8: "Quando foi a última vez que teve o peso ideal? ⏰",
      9: "Como ganhou peso? 🤔",
      10: "Já tentou emagrecer antes? 💭",
      11: "Qual é o seu nível de atividade? 🏃",
      12: "Qual é a sua ocupação/rotina? 💼",
      13: "Como é a qualidade do seu sono? 😴",
      14: "Qual é o seu nível de estresse? 😰",
      15: "Quanta água você bebe por dia? 💧",
      16: "Qual é a sua preferência alimentar? 🥗",
      17: "Possui restrições ou alergias alimentares? 🚫",
      18: "Como são seus hábitos alimentares? 🍽️",
      19: "Qual é a sua motivação principal? 💪",
      20: "Em quanto tempo quer atingir sua meta? ⏰",
    };
    return titles[step] || "";
  };

  const getStepSubtitle = () => {
    const subtitles: { [key: number]: string } = {
      1: "Vamos personalizar seu plano",
      3: "Entre 140cm e 220cm",
      4: "Seja honesto para resultados reais",
      5: "Vamos calcular sua jornada ideal",
      6: "Selecione todas que se aplicam",
    };
    return subtitles[step];
  };

  return (
    <>
      <SocialProof />
      <QuizLayout
        currentStep={step}
        totalSteps={20}
        title={getStepTitle()}
        subtitle={getStepSubtitle()}
      >
        <div className="space-y-4 max-w-2xl mx-auto">
          {/* FASE 1: IDENTIFICAÇÃO BÁSICA */}
          
          {/* Step 1: Gender */}
          {step === 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <button onClick={() => handleSelection("gender", "male")} className="touch-feedback">
                <div className={`selection-card ${quizData.gender === "male" ? "selected" : ""}`}>
                  <div className="aspect-[4/3] bg-muted p-4">
                    <img src={maleImage} alt="Masculino" className="w-full h-full object-contain rounded-xl" />
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-2xl font-bold">Masculino</h3>
                  </div>
                </div>
              </button>
              <button onClick={() => handleSelection("gender", "female")} className="touch-feedback">
                <div className={`selection-card ${quizData.gender === "female" ? "selected" : ""}`}>
                  <div className="aspect-[4/3] bg-muted p-4">
                    <img src={femaleImage} alt="Feminino" className="w-full h-full object-contain rounded-xl" />
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-2xl font-bold">Feminino</h3>
                  </div>
                </div>
              </button>
            </div>
          )}

          {/* Step 2: Age */}
          {step === 2 && (
            <>
              <SelectionCard emoji="👶" label="18-25 anos" selected={quizData.age === "18-25"} onClick={() => handleSelection("age", "18-25")} />
              <SelectionCard emoji="🧑" label="26-35 anos" selected={quizData.age === "26-35"} onClick={() => handleSelection("age", "26-35")} />
              <SelectionCard emoji="👨" label="36-45 anos" selected={quizData.age === "36-45"} onClick={() => handleSelection("age", "36-45")} />
              <SelectionCard emoji="🧔" label="46-55 anos" selected={quizData.age === "46-55"} onClick={() => handleSelection("age", "46-55")} />
              <SelectionCard emoji="👴" label="56+ anos" selected={quizData.age === "56+"} onClick={() => handleSelection("age", "56+")} />
            </>
          )}

          {/* Step 3: Height */}
          {step === 3 && (
            <div className="bg-card border border-border rounded-2xl p-8">
              <InputSlider
                label="Altura"
                value={quizData.height || 170}
                onChange={(value) => handleSelection("height", value)}
                min={140}
                max={220}
                step={1}
                unit="cm"
                description="Deslize ou digite sua altura"
              />
            </div>
          )}

          {/* Step 4: Current Weight */}
          {step === 4 && (
            <div className="bg-card border border-border rounded-2xl p-8 space-y-6">
              <InputSlider
                label="Peso Atual"
                value={quizData.currentWeight || 70}
                onChange={(value) => handleSelection("currentWeight", value)}
                min={40}
                max={200}
                step={0.5}
                unit="kg"
                description="Seu peso atual em quilogramas"
              />
              {quizData.currentWeight && quizData.height && (
                <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 text-center">
                  <p className="text-sm text-muted-foreground mb-1">Seu IMC Atual</p>
                  <p className="text-3xl font-bold text-primary">
                    {((quizData.currentWeight / ((quizData.height / 100) ** 2))).toFixed(1)}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Step 5: Goal Weight */}
          {step === 5 && (
            <div className="bg-card border border-border rounded-2xl p-8 space-y-6">
              <InputSlider
                label="Peso Ideal"
                value={quizData.goalWeight || (quizData.currentWeight ? quizData.currentWeight - 10 : 60)}
                onChange={(value) => handleSelection("goalWeight", value)}
                min={40}
                max={200}
                step={0.5}
                unit="kg"
                description="Seu peso desejado"
              />
              {quizData.currentWeight && quizData.goalWeight && quizData.height && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-accent/5 border border-accent/20 rounded-xl p-4 text-center">
                    <p className="text-sm text-muted-foreground mb-1">Peso a Perder</p>
                    <p className="text-3xl font-bold text-accent">
                      {(quizData.currentWeight - quizData.goalWeight).toFixed(1)} kg
                    </p>
                  </div>
                  <div className="bg-success/5 border border-success/20 rounded-xl p-4 text-center">
                    <p className="text-sm text-muted-foreground mb-1">IMC Ideal</p>
                    <p className="text-3xl font-bold text-success">
                      {((quizData.goalWeight / ((quizData.height / 100) ** 2))).toFixed(1)}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* FASE 2: ANÁLISE CORPORAL */}

          {/* Step 6: Problem Areas (Multi-select) */}
          {step === 6 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <MultiSelectCard
                icon="🫃"
                title="Barriga e Abdômen"
                selected={(quizData.problemAreas || []).includes("belly")}
                onToggle={() => handleMultiSelect("problemAreas", "belly")}
              />
              <MultiSelectCard
                icon="🦵"
                title="Pernas e Coxas"
                selected={(quizData.problemAreas || []).includes("legs")}
                onToggle={() => handleMultiSelect("problemAreas", "legs")}
              />
              <MultiSelectCard
                icon="💪"
                title="Braços"
                selected={(quizData.problemAreas || []).includes("arms")}
                onToggle={() => handleMultiSelect("problemAreas", "arms")}
              />
              <MultiSelectCard
                icon="🍑"
                title="Glúteos"
                selected={(quizData.problemAreas || []).includes("glutes")}
                onToggle={() => handleMultiSelect("problemAreas", "glutes")}
              />
              <MultiSelectCard
                icon="🫀"
                title="Costas"
                selected={(quizData.problemAreas || []).includes("back")}
                onToggle={() => handleMultiSelect("problemAreas", "back")}
              />
              <MultiSelectCard
                icon="🎯"
                title="Corpo Todo"
                selected={(quizData.problemAreas || []).includes("full")}
                onToggle={() => handleMultiSelect("problemAreas", "full")}
              />
            </div>
          )}

          {/* Step 7: Body Shape */}
          {step === 7 && (
            <>
              <SelectionCard emoji="🍐" label="Pera (quadris mais largos)" selected={quizData.bodyShape === "pear"} onClick={() => handleSelection("bodyShape", "pear")} />
              <SelectionCard emoji="🍎" label="Maçã (cintura mais larga)" selected={quizData.bodyShape === "apple"} onClick={() => handleSelection("bodyShape", "apple")} />
              <SelectionCard emoji="⏳" label="Ampulheta (ombros e quadris equilibrados)" selected={quizData.bodyShape === "hourglass"} onClick={() => handleSelection("bodyShape", "hourglass")} />
              <SelectionCard emoji="📏" label="Retângulo (linhas retas)" selected={quizData.bodyShape === "rectangle"} onClick={() => handleSelection("bodyShape", "rectangle")} />
              <SelectionCard emoji="🔼" label="Triângulo invertido (ombros largos)" selected={quizData.bodyShape === "inverted"} onClick={() => handleSelection("bodyShape", "inverted")} />
            </>
          )}

          {/* Step 8: Last Ideal Weight */}
          {step === 8 && (
            <>
              <SelectionCard emoji="✨" label="Atualmente no peso ideal" selected={quizData.lastIdealWeight === "current"} onClick={() => handleSelection("lastIdealWeight", "current")} />
              <SelectionCard emoji="📅" label="Menos de 1 ano atrás" selected={quizData.lastIdealWeight === "1year"} onClick={() => handleSelection("lastIdealWeight", "1year")} />
              <SelectionCard emoji="⏰" label="1-3 anos atrás" selected={quizData.lastIdealWeight === "1-3years"} onClick={() => handleSelection("lastIdealWeight", "1-3years")} />
              <SelectionCard emoji="🕰️" label="3-5 anos atrás" selected={quizData.lastIdealWeight === "3-5years"} onClick={() => handleSelection("lastIdealWeight", "3-5years")} />
              <SelectionCard emoji="⏳" label="Mais de 5 anos atrás" selected={quizData.lastIdealWeight === "5+years"} onClick={() => handleSelection("lastIdealWeight", "5+years")} />
              <SelectionCard emoji="❓" label="Nunca tive o peso ideal" selected={quizData.lastIdealWeight === "never"} onClick={() => handleSelection("lastIdealWeight", "never")} />
            </>
          )}

          {/* Step 9: Weight Gain Reason */}
          {step === 9 && (
            <>
              <SelectionCard emoji="🤰" label="Gravidez" selected={quizData.weightGainReason === "pregnancy"} onClick={() => handleSelection("weightGainReason", "pregnancy")} />
              <SelectionCard emoji="🛋️" label="Sedentarismo" selected={quizData.weightGainReason === "sedentary"} onClick={() => handleSelection("weightGainReason", "sedentary")} />
              <SelectionCard emoji="😰" label="Estresse e ansiedade" selected={quizData.weightGainReason === "stress"} onClick={() => handleSelection("weightGainReason", "stress")} />
              <SelectionCard emoji="🌸" label="Menopausa" selected={quizData.weightGainReason === "menopause"} onClick={() => handleSelection("weightGainReason", "menopause")} />
              <SelectionCard emoji="💊" label="Medicamentos" selected={quizData.weightGainReason === "medication"} onClick={() => handleSelection("weightGainReason", "medication")} />
              <SelectionCard emoji="🍔" label="Hábitos alimentares" selected={quizData.weightGainReason === "habits"} onClick={() => handleSelection("weightGainReason", "habits")} />
              <SelectionCard emoji="🤔" label="Não sei ao certo" selected={quizData.weightGainReason === "unknown"} onClick={() => handleSelection("weightGainReason", "unknown")} />
            </>
          )}

          {/* Step 10: Previous Attempts */}
          {step === 10 && (
            <>
              <SelectionCard emoji="🆕" label="Primeira vez tentando" selected={quizData.previousAttempts === "first"} onClick={() => handleSelection("previousAttempts", "first")} />
              <SelectionCard emoji="1️⃣" label="Sim, 1-2 vezes" selected={quizData.previousAttempts === "1-2"} onClick={() => handleSelection("previousAttempts", "1-2")} />
              <SelectionCard emoji="3️⃣" label="Sim, 3-5 vezes" selected={quizData.previousAttempts === "3-5"} onClick={() => handleSelection("previousAttempts", "3-5")} />
              <SelectionCard emoji="🔁" label="Sim, várias vezes" selected={quizData.previousAttempts === "many"} onClick={() => handleSelection("previousAttempts", "many")} />
            </>
          )}

          {/* FASE 3: ESTILO DE VIDA */}

          {/* Step 11: Activity Level */}
          {step === 11 && (
            <>
              <SelectionCard emoji="🛋️" label="Sedentário (pouco ou nenhum exercício)" selected={quizData.activityLevel === "sedentary"} onClick={() => handleSelection("activityLevel", "sedentary")} />
              <SelectionCard emoji="🚶" label="Levemente ativo (1-3 dias/semana)" selected={quizData.activityLevel === "light"} onClick={() => handleSelection("activityLevel", "light")} />
              <SelectionCard emoji="🏃" label="Moderadamente ativo (3-5 dias/semana)" selected={quizData.activityLevel === "moderate"} onClick={() => handleSelection("activityLevel", "moderate")} />
              <SelectionCard emoji="💪" label="Muito ativo (6-7 dias/semana)" selected={quizData.activityLevel === "active"} onClick={() => handleSelection("activityLevel", "active")} />
              <SelectionCard emoji="🏋️" label="Extremamente ativo (atleta)" selected={quizData.activityLevel === "veryActive"} onClick={() => handleSelection("activityLevel", "veryActive")} />
            </>
          )}

          {/* Step 12: Occupation */}
          {step === 12 && (
            <>
              <SelectionCard emoji="💻" label="Trabalho sentado (escritório)" selected={quizData.occupation === "desk"} onClick={() => handleSelection("occupation", "desk")} />
              <SelectionCard emoji="🚶" label="Trabalho em pé (vendas, serviços)" selected={quizData.occupation === "standing"} onClick={() => handleSelection("occupation", "standing")} />
              <SelectionCard emoji="💪" label="Trabalho físico (construção, etc)" selected={quizData.occupation === "physical"} onClick={() => handleSelection("occupation", "physical")} />
              <SelectionCard emoji="🏠" label="Trabalho em casa" selected={quizData.occupation === "home"} onClick={() => handleSelection("occupation", "home")} />
              <SelectionCard emoji="🎓" label="Estudante" selected={quizData.occupation === "student"} onClick={() => handleSelection("occupation", "student")} />
            </>
          )}

          {/* Step 13: Sleep Quality */}
          {step === 13 && (
            <div className="bg-card border border-border rounded-2xl p-8">
              <InputSlider
                label="Horas de Sono por Noite"
                value={quizData.sleepQuality || 7}
                onChange={(value) => handleSelection("sleepQuality", value)}
                min={3}
                max={12}
                step={0.5}
                unit="horas"
                description="Quantas horas você dorme em média?"
              />
            </div>
          )}

          {/* Step 14: Stress Level */}
          {step === 14 && (
            <div className="bg-card border border-border rounded-2xl p-8">
              <InputSlider
                label="Nível de Estresse"
                value={quizData.stressLevel || 5}
                onChange={(value) => handleSelection("stressLevel", value)}
                min={1}
                max={10}
                step={1}
                unit="/10"
                description="1 = muito tranquilo, 10 = extremamente estressado"
              />
              {quizData.stressLevel && (
                <div className="mt-4 text-center">
                  <p className="text-sm text-muted-foreground">
                    {quizData.stressLevel <= 3 && "😌 Baixo estresse"}
                    {quizData.stressLevel > 3 && quizData.stressLevel <= 6 && "😐 Estresse moderado"}
                    {quizData.stressLevel > 6 && quizData.stressLevel <= 8 && "😰 Estresse alto"}
                    {quizData.stressLevel > 8 && "😱 Estresse muito alto"}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Step 15: Water Intake */}
          {step === 15 && (
            <div className="bg-card border border-border rounded-2xl p-8">
              <InputSlider
                label="Consumo de Água Diário"
                value={quizData.waterIntake || 2}
                onChange={(value) => handleSelection("waterIntake", value)}
                min={0.5}
                max={5}
                step={0.25}
                unit="litros"
                description="Quantos litros de água você bebe por dia?"
              />
              {quizData.waterIntake && (
                <div className="mt-4 text-center">
                  <p className="text-sm text-muted-foreground">
                    {quizData.waterIntake < 1.5 && "💧 Abaixo do recomendado"}
                    {quizData.waterIntake >= 1.5 && quizData.waterIntake < 2.5 && "✅ Boa hidratação"}
                    {quizData.waterIntake >= 2.5 && "🌊 Excelente hidratação"}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* FASE 4: ALIMENTAÇÃO */}

          {/* Step 16: Diet Preference */}
          {step === 16 && (
            <>
              <SelectionCard emoji="🍖" label="Onívoro (como de tudo)" selected={quizData.dietPreference === "omnivore"} onClick={() => handleSelection("dietPreference", "omnivore")} />
              <SelectionCard emoji="🥗" label="Vegetariano" selected={quizData.dietPreference === "vegetarian"} onClick={() => handleSelection("dietPreference", "vegetarian")} />
              <SelectionCard emoji="🌱" label="Vegano" selected={quizData.dietPreference === "vegan"} onClick={() => handleSelection("dietPreference", "vegan")} />
              <SelectionCard emoji="🥩" label="Low Carb / Keto" selected={quizData.dietPreference === "lowcarb"} onClick={() => handleSelection("dietPreference", "lowcarb")} />
              <SelectionCard emoji="🌾" label="Sem Glúten" selected={quizData.dietPreference === "glutenfree"} onClick={() => handleSelection("dietPreference", "glutenfree")} />
              <SelectionCard emoji="🐟" label="Mediterrânea" selected={quizData.dietPreference === "mediterranean"} onClick={() => handleSelection("dietPreference", "mediterranean")} />
            </>
          )}

          {/* Step 17: Restrictions (Multi-select, optional) */}
          {step === 17 && (
            <div className="space-y-4">
              <p className="text-center text-sm text-muted-foreground">Selecione todas que se aplicam (opcional)</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <MultiSelectCard
                  icon="🥛"
                  title="Lactose"
                  selected={(quizData.restrictions || []).includes("lactose")}
                  onToggle={() => handleMultiSelect("restrictions", "lactose")}
                />
                <MultiSelectCard
                  icon="🌾"
                  title="Glúten"
                  selected={(quizData.restrictions || []).includes("gluten")}
                  onToggle={() => handleMultiSelect("restrictions", "gluten")}
                />
                <MultiSelectCard
                  icon="🦐"
                  title="Frutos do Mar"
                  selected={(quizData.restrictions || []).includes("seafood")}
                  onToggle={() => handleMultiSelect("restrictions", "seafood")}
                />
                <MultiSelectCard
                  icon="🥜"
                  title="Nozes e Amendoim"
                  selected={(quizData.restrictions || []).includes("nuts")}
                  onToggle={() => handleMultiSelect("restrictions", "nuts")}
                />
                <MultiSelectCard
                  icon="🥚"
                  title="Ovos"
                  selected={(quizData.restrictions || []).includes("eggs")}
                  onToggle={() => handleMultiSelect("restrictions", "eggs")}
                />
                <MultiSelectCard
                  icon="🍯"
                  title="Mel e Derivados"
                  selected={(quizData.restrictions || []).includes("honey")}
                  onToggle={() => handleMultiSelect("restrictions", "honey")}
                />
              </div>
            </div>
          )}

          {/* Step 18: Eating Habits */}
          {step === 18 && (
            <>
              <SelectionCard emoji="🍽️" label="3 refeições principais" selected={quizData.eatingHabits === "3meals"} onClick={() => handleSelection("eatingHabits", "3meals")} />
              <SelectionCard emoji="🥗" label="5-6 pequenas refeições" selected={quizData.eatingHabits === "5meals"} onClick={() => handleSelection("eatingHabits", "5meals")} />
              <SelectionCard emoji="⏰" label="Jejum intermitente" selected={quizData.eatingHabits === "intermittent"} onClick={() => handleSelection("eatingHabits", "intermittent")} />
              <SelectionCard emoji="🍿" label="Belisco o dia todo" selected={quizData.eatingHabits === "snacking"} onClick={() => handleSelection("eatingHabits", "snacking")} />
              <SelectionCard emoji="🎲" label="Irregular (não tenho rotina)" selected={quizData.eatingHabits === "irregular"} onClick={() => handleSelection("eatingHabits", "irregular")} />
            </>
          )}

          {/* FASE 5: MOTIVAÇÃO */}

          {/* Step 19: Main Motivation */}
          {step === 19 && (
            <>
              <SelectionCard emoji="❤️" label="Saúde e bem-estar" selected={quizData.mainMotivation === "health"} onClick={() => handleSelection("mainMotivation", "health")} />
              <SelectionCard emoji="✨" label="Aparência e autoestima" selected={quizData.mainMotivation === "appearance"} onClick={() => handleSelection("mainMotivation", "appearance")} />
              <SelectionCard emoji="👗" label="Evento especial (casamento, festa)" selected={quizData.mainMotivation === "event"} onClick={() => handleSelection("mainMotivation", "event")} />
              <SelectionCard emoji="💪" label="Performance física e energia" selected={quizData.mainMotivation === "performance"} onClick={() => handleSelection("mainMotivation", "performance")} />
              <SelectionCard emoji="👨‍⚕️" label="Recomendação médica" selected={quizData.mainMotivation === "medical"} onClick={() => handleSelection("mainMotivation", "medical")} />
              <SelectionCard emoji="👪" label="Família e qualidade de vida" selected={quizData.mainMotivation === "family"} onClick={() => handleSelection("mainMotivation", "family")} />
            </>
          )}

          {/* Step 20: Goal Timeline */}
          {step === 20 && (
            <>
              <SelectionCard emoji="⚡" label="1-2 meses (resultados rápidos)" selected={quizData.goalTimeline === "1-2months"} onClick={() => handleSelection("goalTimeline", "1-2months")} />
              <SelectionCard emoji="🎯" label="3-4 meses (recomendado)" selected={quizData.goalTimeline === "3-4months"} onClick={() => handleSelection("goalTimeline", "3-4months")} />
              <SelectionCard emoji="💪" label="5-6 meses (sustentável)" selected={quizData.goalTimeline === "5-6months"} onClick={() => handleSelection("goalTimeline", "5-6months")} />
              <SelectionCard emoji="🌟" label="1 ano (transformação completa)" selected={quizData.goalTimeline === "1year"} onClick={() => handleSelection("goalTimeline", "1year")} />
            </>
          )}

          {/* Navigation Buttons */}
          <div className="pt-8 space-y-4">
            <Button
              onClick={handleNext}
              disabled={!canProceed()}
              className="w-full h-14 text-lg font-semibold touch-feedback group"
              size="lg"
            >
              {step === 20 ? "Analisar Meus Dados 🧠" : "Continuar"}
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>

            {step > 1 && step <= 20 && (
              <Button
                onClick={handleBack}
                variant="outline"
                className="w-full h-12 text-base"
                size="lg"
              >
                <ChevronLeft className="mr-2 w-5 h-5" />
                Voltar
              </Button>
            )}
          </div>
        </div>
      </QuizLayout>
    </>
  );
};

export default Index;
