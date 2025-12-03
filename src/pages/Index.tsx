import { useState, useEffect } from "react";
import { QuizLayout } from "@/components/QuizLayout";
import { SelectionCard } from "@/components/SelectionCard";
import { BeforeAfterGallery } from "@/components/BeforeAfterGallery";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import femaleImage from "@/assets/female-option.jpg";
import { QuizData } from "@/types/quiz.types";
import { InputSlider } from "@/components/quiz/InputSlider";
import { MultiSelectCard } from "@/components/quiz/MultiSelectCard";
import { AILoadingDemo } from "@/components/quiz/AILoadingDemo";
import { SynjaroAppDemo } from "@/components/quiz/SynjaroAppDemo";
import { ResultsDashboard } from "@/components/quiz/ResultsDashboard";
import { ComparisonChart } from "@/components/quiz/ComparisonChart";
import { CheckoutPage } from "@/components/quiz/CheckoutPage";
import { AIMessageBubble } from "@/components/quiz/AIMessageBubble";
import { calculateAllMetrics } from "@/lib/calculations";

const Index = () => {
  const [step, setStep] = useState(1);
  const [quizData, setQuizData] = useState<QuizData>({ gender: 'female' });
  const [analyzing, setAnalyzing] = useState(false);
  const { toast } = useToast();

  const totalSteps = 24;

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
    if (step === 19) {
      setAnalyzing(true);
      const calculatedData = calculateAllMetrics(quizData);
      setTimeout(() => {
        setQuizData(calculatedData);
        setAnalyzing(false);
        setStep(20);
      }, 5000);
    } else if (step === 24) {
      localStorage.removeItem("quizData");
      localStorage.removeItem("quizStep");
      window.location.href = "https://pay.kiwify.com.br/seu-produto";
      toast({
        title: "🎉 Great choice!",
        description: "Redirecting to secure checkout...",
      });
    } else {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1 && step !== 20 && step !== 21 && step !== 22) {
      setStep(step - 1);
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1: return !!quizData.age;
      case 2: return !!quizData.height && quizData.height >= 140 && quizData.height <= 220;
      case 3: return !!quizData.currentWeight && quizData.currentWeight >= 40 && quizData.currentWeight <= 200;
      case 4: return !!quizData.goalWeight && quizData.goalWeight >= 40 && quizData.goalWeight <= 200;
      case 5: return quizData.problemAreas && quizData.problemAreas.length > 0;
      case 6: return !!quizData.bodyShape;
      case 7: return !!quizData.lastIdealWeight;
      case 8: return !!quizData.weightGainReason;
      case 9: return !!quizData.previousAttempts;
      case 10: return !!quizData.activityLevel;
      case 11: return !!quizData.occupation;
      case 12: return !!quizData.sleepQuality;
      case 13: return !!quizData.stressLevel;
      case 14: return !!quizData.waterIntake;
      case 15: return !!quizData.dietPreference;
      case 16: return true;
      case 17: return !!quizData.eatingHabits;
      case 18: return !!quizData.mainMotivation;
      case 19: return !!quizData.goalTimeline;
      default: return true;
    }
  };

  if (analyzing) {
    return <AILoadingDemo data={quizData} onComplete={() => { setAnalyzing(false); setStep(20); }} />;
  }

  if (step === 20) {
    return <SynjaroAppDemo data={quizData} onContinue={handleNext} />;
  }

  if (step === 21) {
    return (
      <>
        <ResultsDashboard data={quizData} />
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-lg border-t border-border safe-area-bottom">
          <div className="max-w-md mx-auto">
            <Button
              onClick={handleNext}
              size="lg"
              className="w-full h-14 text-base font-semibold"
            >
              View Comparison Scenarios
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </>
    );
  }

  if (step === 22) {
    return (
      <>
        <ComparisonChart data={quizData} />
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-lg border-t border-border safe-area-bottom">
          <div className="max-w-md mx-auto">
            <Button
              onClick={handleNext}
              size="lg"
              className="w-full h-14 text-base font-semibold"
            >
              See Real Transformations
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </>
    );
  }

  if (step === 23) {
    return <BeforeAfterGallery onContinue={handleNext} />;
  }

  if (step === 24) {
    return <CheckoutPage data={quizData} onCheckout={handleNext} />;
  }

  const getStepTitle = () => {
    const titles: { [key: number]: string } = {
      1: "What's your age?",
      2: "What's your height?",
      3: "Current weight",
      4: "Your goal weight",
      5: "Problem areas",
      6: "Body shape",
      7: "Weight history",
      8: "What caused weight gain?",
      9: "Past diet attempts",
      10: "Activity level",
      11: "Daily routine",
      12: "Sleep quality",
      13: "Stress level",
      14: "Water intake",
      15: "Dietary preference",
      16: "Allergies & restrictions",
      17: "Eating habits",
      18: "Your motivation",
      19: "Timeline goal",
    };
    return titles[step] || "";
  };

  const getStepSubtitle = () => {
    const subtitles: { [key: number]: string } = {
      1: "Let's personalize your journey",
      2: "Use the slider or type directly",
      3: "Be honest for accurate results",
      4: "What weight makes you feel your best?",
      5: "Select all that apply",
      6: "This helps us understand your body",
      7: "When did you feel your best?",
      8: "Understanding this helps us help you",
      9: "This helps us avoid what didn't work",
      10: "How active is your lifestyle?",
      11: "This affects your daily calorie needs",
      12: "Sleep impacts weight loss significantly",
      13: "Stress affects metabolism and cravings",
      14: "Hydration is key to weight loss",
      15: "We'll customize meals to your preference",
      16: "Skip if none apply",
      17: "This helps structure your meal plan",
      18: "Staying motivated is half the battle",
      19: "We'll create a realistic timeline for you",
    };
    return subtitles[step] || "";
  };

  return (
    <QuizLayout
      currentStep={step}
      totalSteps={totalSteps}
      title={getStepTitle()}
      subtitle={getStepSubtitle()}
    >
      <div className="space-y-3 w-full">
        {/* Step 1: Age */}
        {step === 1 && (
          <div className="space-y-3">
            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary/30">
                <img src={femaleImage} alt="Woman" className="w-full h-full object-cover" />
              </div>
            </div>
            <SelectionCard emoji="✨" label="18-25 years" selected={quizData.age === "18-25"} onClick={() => handleSelection("age", "18-25")} />
            <SelectionCard emoji="🌸" label="26-35 years" selected={quizData.age === "26-35"} onClick={() => handleSelection("age", "26-35")} />
            <SelectionCard emoji="💫" label="36-45 years" selected={quizData.age === "36-45"} onClick={() => handleSelection("age", "36-45")} />
            <SelectionCard emoji="🌺" label="46-55 years" selected={quizData.age === "46-55"} onClick={() => handleSelection("age", "46-55")} />
            <SelectionCard emoji="💎" label="56+ years" selected={quizData.age === "56+"} onClick={() => handleSelection("age", "56+")} />
          </div>
        )}

        {/* Step 2: Height */}
        {step === 2 && (
          <div className="bg-card border border-border rounded-2xl p-6">
            <InputSlider
              label="Height"
              value={quizData.height || 165}
              onChange={(value) => handleSelection("height", value)}
              min={140}
              max={220}
              step={1}
              unit="cm"
              description="Slide or type your height"
            />
          </div>
        )}

        {/* Step 3: Current Weight */}
        {step === 3 && (
          <div className="bg-card border border-border rounded-2xl p-6 space-y-6">
            <InputSlider
              label="Current Weight"
              value={quizData.currentWeight || 70}
              onChange={(value) => handleSelection("currentWeight", value)}
              min={40}
              max={200}
              step={0.5}
              unit="kg"
              description="Your current weight in kilograms"
            />
            {quizData.currentWeight && quizData.height && (
              <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 text-center">
                <p className="text-sm text-muted-foreground mb-1">Your Current BMI</p>
                <p className="text-3xl font-bold text-primary">
                  {((quizData.currentWeight / ((quizData.height / 100) ** 2))).toFixed(1)}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Step 4: Goal Weight */}
        {step === 4 && (
          <div className="bg-card border border-border rounded-2xl p-6 space-y-6">
            <InputSlider
              label="Dream Weight"
              value={quizData.goalWeight || (quizData.currentWeight ? quizData.currentWeight - 10 : 60)}
              onChange={(value) => handleSelection("goalWeight", value)}
              min={40}
              max={200}
              step={0.5}
              unit="kg"
              description="Your desired weight"
            />
            {quizData.currentWeight && quizData.goalWeight && quizData.height && (
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-accent/5 border border-accent/20 rounded-xl p-3 text-center">
                  <p className="text-xs text-muted-foreground mb-1">Weight to Lose</p>
                  <p className="text-2xl font-bold text-accent">
                    {(quizData.currentWeight - quizData.goalWeight).toFixed(1)} kg
                  </p>
                </div>
                <div className="bg-green-500/5 border border-green-500/20 rounded-xl p-3 text-center">
                  <p className="text-xs text-muted-foreground mb-1">Goal BMI</p>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {((quizData.goalWeight / ((quizData.height / 100) ** 2))).toFixed(1)}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 5: Problem Areas */}
        {step === 5 && (
          <div className="grid grid-cols-2 gap-3">
            <MultiSelectCard
              icon="🫃"
              title="Belly & Abdomen"
              selected={(quizData.problemAreas || []).includes("belly")}
              onToggle={() => handleMultiSelect("problemAreas", "belly")}
            />
            <MultiSelectCard
              icon="🦵"
              title="Legs & Thighs"
              selected={(quizData.problemAreas || []).includes("legs")}
              onToggle={() => handleMultiSelect("problemAreas", "legs")}
            />
            <MultiSelectCard
              icon="💪"
              title="Arms"
              selected={(quizData.problemAreas || []).includes("arms")}
              onToggle={() => handleMultiSelect("problemAreas", "arms")}
            />
            <MultiSelectCard
              icon="🍑"
              title="Glutes"
              selected={(quizData.problemAreas || []).includes("glutes")}
              onToggle={() => handleMultiSelect("problemAreas", "glutes")}
            />
            <MultiSelectCard
              icon="🫀"
              title="Back"
              selected={(quizData.problemAreas || []).includes("back")}
              onToggle={() => handleMultiSelect("problemAreas", "back")}
            />
            <MultiSelectCard
              icon="🎯"
              title="Full Body"
              selected={(quizData.problemAreas || []).includes("full")}
              onToggle={() => handleMultiSelect("problemAreas", "full")}
            />
          </div>
        )}

        {/* Step 6: Body Shape */}
        {step === 6 && (
          <div className="space-y-3">
            <SelectionCard emoji="🍐" label="Pear (wider hips)" selected={quizData.bodyShape === "pear"} onClick={() => handleSelection("bodyShape", "pear")} />
            <SelectionCard emoji="🍎" label="Apple (wider waist)" selected={quizData.bodyShape === "apple"} onClick={() => handleSelection("bodyShape", "apple")} />
            <SelectionCard emoji="⏳" label="Hourglass (balanced)" selected={quizData.bodyShape === "hourglass"} onClick={() => handleSelection("bodyShape", "hourglass")} />
            <SelectionCard emoji="📏" label="Rectangle (straight lines)" selected={quizData.bodyShape === "rectangle"} onClick={() => handleSelection("bodyShape", "rectangle")} />
            <SelectionCard emoji="🔼" label="Inverted triangle (broad shoulders)" selected={quizData.bodyShape === "inverted"} onClick={() => handleSelection("bodyShape", "inverted")} />
          </div>
        )}

        {/* Step 7: Last Ideal Weight */}
        {step === 7 && (
          <div className="space-y-3">
            <SelectionCard emoji="✨" label="Currently at ideal weight" selected={quizData.lastIdealWeight === "current"} onClick={() => handleSelection("lastIdealWeight", "current")} />
            <SelectionCard emoji="📅" label="Less than 1 year ago" selected={quizData.lastIdealWeight === "1year"} onClick={() => handleSelection("lastIdealWeight", "1year")} />
            <SelectionCard emoji="⏰" label="1-3 years ago" selected={quizData.lastIdealWeight === "1-3years"} onClick={() => handleSelection("lastIdealWeight", "1-3years")} />
            <SelectionCard emoji="🕰️" label="3-5 years ago" selected={quizData.lastIdealWeight === "3-5years"} onClick={() => handleSelection("lastIdealWeight", "3-5years")} />
            <SelectionCard emoji="⏳" label="More than 5 years ago" selected={quizData.lastIdealWeight === "5+years"} onClick={() => handleSelection("lastIdealWeight", "5+years")} />
            <SelectionCard emoji="❓" label="Never at ideal weight" selected={quizData.lastIdealWeight === "never"} onClick={() => handleSelection("lastIdealWeight", "never")} />
          </div>
        )}

        {/* Step 8: Weight Gain Reason */}
        {step === 8 && (
          <div className="space-y-3">
            <SelectionCard emoji="🤰" label="Pregnancy" selected={quizData.weightGainReason === "pregnancy"} onClick={() => handleSelection("weightGainReason", "pregnancy")} />
            <SelectionCard emoji="🛋️" label="Sedentary lifestyle" selected={quizData.weightGainReason === "sedentary"} onClick={() => handleSelection("weightGainReason", "sedentary")} />
            <SelectionCard emoji="😰" label="Stress and anxiety" selected={quizData.weightGainReason === "stress"} onClick={() => handleSelection("weightGainReason", "stress")} />
            <SelectionCard emoji="🌸" label="Menopause" selected={quizData.weightGainReason === "menopause"} onClick={() => handleSelection("weightGainReason", "menopause")} />
            <SelectionCard emoji="💊" label="Medications" selected={quizData.weightGainReason === "medication"} onClick={() => handleSelection("weightGainReason", "medication")} />
            <SelectionCard emoji="🍔" label="Eating habits" selected={quizData.weightGainReason === "habits"} onClick={() => handleSelection("weightGainReason", "habits")} />
            <SelectionCard emoji="🤔" label="I'm not sure" selected={quizData.weightGainReason === "unknown"} onClick={() => handleSelection("weightGainReason", "unknown")} />
          </div>
        )}

        {/* Step 9: Previous Attempts */}
        {step === 9 && (
          <div className="space-y-3">
            <SelectionCard emoji="🆕" label="First time trying" selected={quizData.previousAttempts === "first"} onClick={() => handleSelection("previousAttempts", "first")} />
            <SelectionCard emoji="1️⃣" label="Yes, 1-2 times" selected={quizData.previousAttempts === "1-2"} onClick={() => handleSelection("previousAttempts", "1-2")} />
            <SelectionCard emoji="3️⃣" label="Yes, 3-5 times" selected={quizData.previousAttempts === "3-5"} onClick={() => handleSelection("previousAttempts", "3-5")} />
            <SelectionCard emoji="🔁" label="Yes, many times" selected={quizData.previousAttempts === "many"} onClick={() => handleSelection("previousAttempts", "many")} />
            <AIMessageBubble message="Perfect! Based on your history, I'll help you avoid past mistakes. The Synjaro AI will suggest thermogenic teas ideal for boosting your metabolism in a personalized way." />
          </div>
        )}

        {/* Step 10: Activity Level */}
        {step === 10 && (
          <div className="space-y-3">
            <SelectionCard emoji="🛋️" label="Sedentary (little or no exercise)" selected={quizData.activityLevel === "sedentary"} onClick={() => handleSelection("activityLevel", "sedentary")} />
            <SelectionCard emoji="🚶" label="Lightly active (1-3 days/week)" selected={quizData.activityLevel === "light"} onClick={() => handleSelection("activityLevel", "light")} />
            <SelectionCard emoji="🏃" label="Moderately active (3-5 days/week)" selected={quizData.activityLevel === "moderate"} onClick={() => handleSelection("activityLevel", "moderate")} />
            <SelectionCard emoji="💪" label="Very active (6-7 days/week)" selected={quizData.activityLevel === "active"} onClick={() => handleSelection("activityLevel", "active")} />
            <SelectionCard emoji="🏋️" label="Extremely active (athlete)" selected={quizData.activityLevel === "veryActive"} onClick={() => handleSelection("activityLevel", "veryActive")} />
          </div>
        )}

        {/* Step 11: Occupation */}
        {step === 11 && (
          <div className="space-y-3">
            <SelectionCard emoji="💻" label="Desk job (office)" selected={quizData.occupation === "desk"} onClick={() => handleSelection("occupation", "desk")} />
            <SelectionCard emoji="🚶" label="Standing job (sales, services)" selected={quizData.occupation === "standing"} onClick={() => handleSelection("occupation", "standing")} />
            <SelectionCard emoji="💪" label="Physical job (construction, etc)" selected={quizData.occupation === "physical"} onClick={() => handleSelection("occupation", "physical")} />
            <SelectionCard emoji="🏠" label="Work from home" selected={quizData.occupation === "home"} onClick={() => handleSelection("occupation", "home")} />
            <SelectionCard emoji="🎓" label="Student" selected={quizData.occupation === "student"} onClick={() => handleSelection("occupation", "student")} />
          </div>
        )}

        {/* Step 12: Sleep Quality */}
        {step === 12 && (
          <div className="bg-card border border-border rounded-2xl p-6">
            <InputSlider
              label="Hours of Sleep per Night"
              value={quizData.sleepQuality || 7}
              onChange={(value) => handleSelection("sleepQuality", value)}
              min={3}
              max={12}
              step={0.5}
              unit="hours"
              description="How many hours do you sleep on average?"
            />
          </div>
        )}

        {/* Step 13: Stress Level */}
        {step === 13 && (
          <div className="bg-card border border-border rounded-2xl p-6">
            <InputSlider
              label="Stress Level"
              value={quizData.stressLevel || 5}
              onChange={(value) => handleSelection("stressLevel", value)}
              min={1}
              max={10}
              step={1}
              unit="/10"
              description="1 = very calm, 10 = extremely stressed"
            />
            {quizData.stressLevel && (
              <div className="mt-4 text-center">
                <p className="text-sm text-muted-foreground">
                  {quizData.stressLevel <= 3 && "😌 Low stress"}
                  {quizData.stressLevel > 3 && quizData.stressLevel <= 6 && "😐 Moderate stress"}
                  {quizData.stressLevel > 6 && quizData.stressLevel <= 8 && "😰 High stress"}
                  {quizData.stressLevel > 8 && "😱 Very high stress"}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Step 14: Water Intake */}
        {step === 14 && (
          <div className="bg-card border border-border rounded-2xl p-6">
            <InputSlider
              label="Daily Water Intake"
              value={quizData.waterIntake || 2}
              onChange={(value) => handleSelection("waterIntake", value)}
              min={0.5}
              max={5}
              step={0.25}
              unit="liters"
              description="How many liters of water do you drink per day?"
            />
            {quizData.waterIntake && (
              <div className="mt-4 text-center">
                <p className="text-sm text-muted-foreground">
                  {quizData.waterIntake < 1.5 && "💧 Below recommended"}
                  {quizData.waterIntake >= 1.5 && quizData.waterIntake < 2.5 && "✅ Good hydration"}
                  {quizData.waterIntake >= 2.5 && "🌊 Excellent hydration"}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Step 15: Diet Preference */}
        {step === 15 && (
          <div className="space-y-3">
            <SelectionCard emoji="🍖" label="Omnivore (I eat everything)" selected={quizData.dietPreference === "omnivore"} onClick={() => handleSelection("dietPreference", "omnivore")} />
            <SelectionCard emoji="🥗" label="Vegetarian" selected={quizData.dietPreference === "vegetarian"} onClick={() => handleSelection("dietPreference", "vegetarian")} />
            <SelectionCard emoji="🌱" label="Vegan" selected={quizData.dietPreference === "vegan"} onClick={() => handleSelection("dietPreference", "vegan")} />
            <SelectionCard emoji="🥩" label="Low Carb / Keto" selected={quizData.dietPreference === "lowcarb"} onClick={() => handleSelection("dietPreference", "lowcarb")} />
            <SelectionCard emoji="🌾" label="Gluten-Free" selected={quizData.dietPreference === "glutenfree"} onClick={() => handleSelection("dietPreference", "glutenfree")} />
            <SelectionCard emoji="🐟" label="Mediterranean" selected={quizData.dietPreference === "mediterranean"} onClick={() => handleSelection("dietPreference", "mediterranean")} />
          </div>
        )}

        {/* Step 16: Restrictions */}
        {step === 16 && (
          <div className="space-y-4">
            <p className="text-center text-sm text-muted-foreground">Select all that apply (optional)</p>
            <div className="grid grid-cols-2 gap-3">
              <MultiSelectCard
                icon="🥛"
                title="Lactose"
                selected={(quizData.restrictions || []).includes("lactose")}
                onToggle={() => handleMultiSelect("restrictions", "lactose")}
              />
              <MultiSelectCard
                icon="🌾"
                title="Gluten"
                selected={(quizData.restrictions || []).includes("gluten")}
                onToggle={() => handleMultiSelect("restrictions", "gluten")}
              />
              <MultiSelectCard
                icon="🦐"
                title="Seafood"
                selected={(quizData.restrictions || []).includes("seafood")}
                onToggle={() => handleMultiSelect("restrictions", "seafood")}
              />
              <MultiSelectCard
                icon="🥜"
                title="Nuts & Peanuts"
                selected={(quizData.restrictions || []).includes("nuts")}
                onToggle={() => handleMultiSelect("restrictions", "nuts")}
              />
              <MultiSelectCard
                icon="🥚"
                title="Eggs"
                selected={(quizData.restrictions || []).includes("eggs")}
                onToggle={() => handleMultiSelect("restrictions", "eggs")}
              />
              <MultiSelectCard
                icon="🍯"
                title="Honey"
                selected={(quizData.restrictions || []).includes("honey")}
                onToggle={() => handleMultiSelect("restrictions", "honey")}
              />
            </div>
          </div>
        )}

        {/* Step 17: Eating Habits */}
        {step === 17 && (
          <div className="space-y-3">
            <SelectionCard emoji="🍽️" label="3 main meals" selected={quizData.eatingHabits === "3meals"} onClick={() => handleSelection("eatingHabits", "3meals")} />
            <SelectionCard emoji="🥗" label="5-6 small meals" selected={quizData.eatingHabits === "5meals"} onClick={() => handleSelection("eatingHabits", "5meals")} />
            <SelectionCard emoji="⏰" label="Intermittent fasting" selected={quizData.eatingHabits === "intermittent"} onClick={() => handleSelection("eatingHabits", "intermittent")} />
            <SelectionCard emoji="🍿" label="I snack all day" selected={quizData.eatingHabits === "snacking"} onClick={() => handleSelection("eatingHabits", "snacking")} />
            <SelectionCard emoji="🎲" label="Irregular (no routine)" selected={quizData.eatingHabits === "irregular"} onClick={() => handleSelection("eatingHabits", "irregular")} />
          </div>
        )}

        {/* Step 18: Main Motivation */}
        {step === 18 && (
          <div className="space-y-3">
            <SelectionCard emoji="❤️" label="Health and wellness" selected={quizData.mainMotivation === "health"} onClick={() => handleSelection("mainMotivation", "health")} />
            <SelectionCard emoji="✨" label="Appearance and self-esteem" selected={quizData.mainMotivation === "appearance"} onClick={() => handleSelection("mainMotivation", "appearance")} />
            <SelectionCard emoji="👗" label="Special event (wedding, party)" selected={quizData.mainMotivation === "event"} onClick={() => handleSelection("mainMotivation", "event")} />
            <SelectionCard emoji="💪" label="Physical performance and energy" selected={quizData.mainMotivation === "performance"} onClick={() => handleSelection("mainMotivation", "performance")} />
            <SelectionCard emoji="👨‍⚕️" label="Medical recommendation" selected={quizData.mainMotivation === "medical"} onClick={() => handleSelection("mainMotivation", "medical")} />
            <SelectionCard emoji="👪" label="Family and quality of life" selected={quizData.mainMotivation === "family"} onClick={() => handleSelection("mainMotivation", "family")} />
          </div>
        )}

        {/* Step 19: Goal Timeline */}
        {step === 19 && (
          <div className="space-y-3">
            <SelectionCard emoji="⚡" label="1-2 months (quick results)" selected={quizData.goalTimeline === "1-2months"} onClick={() => handleSelection("goalTimeline", "1-2months")} />
            <SelectionCard emoji="🎯" label="3-4 months (recommended)" selected={quizData.goalTimeline === "3-4months"} onClick={() => handleSelection("goalTimeline", "3-4months")} />
            <SelectionCard emoji="💪" label="5-6 months (sustainable)" selected={quizData.goalTimeline === "5-6months"} onClick={() => handleSelection("goalTimeline", "5-6months")} />
            <SelectionCard emoji="🌟" label="1 year (complete transformation)" selected={quizData.goalTimeline === "1year"} onClick={() => handleSelection("goalTimeline", "1year")} />
          </div>
        )}

        {/* Navigation Buttons - Fixed at bottom */}
        <div className="fixed bottom-12 left-0 right-0 px-4 pb-2 bg-gradient-to-t from-background via-background to-transparent pt-4 z-20">
          <div className="max-w-md mx-auto space-y-2">
            <Button
              onClick={handleNext}
              disabled={!canProceed()}
              className="w-full h-12 text-sm font-semibold group shadow-lg"
              size="lg"
            >
              {step === 19 ? "Analyze My Profile ✨" : "Continue"}
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>

            {step > 1 && step <= 19 && (
              <Button
                onClick={handleBack}
                variant="ghost"
                className="w-full h-8 text-xs text-muted-foreground"
                size="sm"
              >
                <ChevronLeft className="mr-1 w-3 h-3" />
                Back
              </Button>
            )}
          </div>
        </div>
      </div>
    </QuizLayout>
  );
};

export default Index;
