export type QuizData = {
  // Fase 1: Identificação
  gender?: string;
  age?: string;
  height?: number; // cm
  currentWeight?: number; // kg
  goalWeight?: number; // kg

  // Fase 2: Análise Corporal
  problemAreas?: string[]; // múltipla seleção
  bodyShape?: string;
  lastIdealWeight?: string;
  weightGainReason?: string;
  previousAttempts?: string;

  // Fase 3: Estilo de Vida
  activityLevel?: string;
  occupation?: string;
  sleepQuality?: number; // 1-10
  stressLevel?: number; // 1-10
  waterIntake?: number; // litros

  // Fase 4: Alimentação
  dietPreference?: string;
  restrictions?: string[];
  eatingHabits?: string;

  // Fase 5: Motivação
  mainMotivation?: string;
  goalTimeline?: string;

  // Calculados
  bmi?: number;
  bmr?: number; // Taxa metabólica basal
  tdee?: number; // Gasto calórico diário
  calorieDeficit?: number;
  estimatedDuration?: number; // semanas
};

export interface Transformation {
  id: number;
  image: string;
  name: string;
  age: number;
  weight: string;
  time: string;
  testimonial: string;
}
