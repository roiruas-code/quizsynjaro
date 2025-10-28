import { QuizData } from "@/types/quiz.types";

/**
 * Calcula o IMC (Índice de Massa Corporal)
 * IMC = peso (kg) / (altura (m))²
 */
export const calculateBMI = (weight: number, height: number): number => {
  const heightInMeters = height / 100;
  return Number((weight / (heightInMeters * heightInMeters)).toFixed(1));
};

/**
 * Calcula a TMB/BMR (Taxa Metabólica Basal) usando fórmula de Mifflin-St Jeor
 * Homens: (10 × peso) + (6.25 × altura) - (5 × idade) + 5
 * Mulheres: (10 × peso) + (6.25 × altura) - (5 × idade) - 161
 */
export const calculateBMR = (
  weight: number,
  height: number,
  age: number,
  gender: string
): number => {
  const baseBMR = 10 * weight + 6.25 * height - 5 * age;
  const bmr = gender === "male" ? baseBMR + 5 : baseBMR - 161;
  return Math.round(bmr);
};

/**
 * Calcula o TDEE (Total Daily Energy Expenditure)
 * TDEE = TMB × fator de atividade
 */
export const calculateTDEE = (bmr: number, activityLevel: string): number => {
  const activityFactors: { [key: string]: number } = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    veryActive: 1.9,
  };

  const factor = activityFactors[activityLevel] || 1.2;
  return Math.round(bmr * factor);
};

/**
 * Calcula o déficit calórico recomendado
 * 1 kg de gordura ≈ 7700 calorias
 * Déficit recomendado: 500-1000 cal/dia (0.5-1kg/semana)
 */
export const calculateCalorieDeficit = (
  currentWeight: number,
  goalWeight: number,
  weeks: number
): number => {
  const weightToLose = currentWeight - goalWeight;
  const totalCaloriesDeficit = weightToLose * 7700;
  const dailyDeficit = totalCaloriesDeficit / (weeks * 7);

  // Limitar entre 500-1000 cal/dia
  return Math.round(Math.max(500, Math.min(1000, dailyDeficit)));
};

/**
 * Calcula o tempo estimado para atingir a meta
 * Baseado em perda saudável de 0.5-1kg por semana
 */
export const calculateEstimatedDuration = (
  currentWeight: number,
  goalWeight: number
): number => {
  const weightToLose = currentWeight - goalWeight;
  // Assumindo perda média de 0.75kg por semana
  const weeks = Math.ceil(weightToLose / 0.75);
  return weeks;
};

/**
 * Gera dados de projeção de peso ao longo do tempo
 */
export const generateWeightProjection = (
  currentWeight: number,
  goalWeight: number,
  weeks: number
): { week: number; weight: number }[] => {
  const projection = [];
  const weightPerWeek = (currentWeight - goalWeight) / weeks;

  for (let week = 0; week <= weeks; week++) {
    const weight = currentWeight - weightPerWeek * week;
    projection.push({
      week,
      weight: Math.round(weight * 10) / 10,
    });
  }

  return projection;
};

/**
 * Calcula o peso ideal baseado no IMC saudável (21-23)
 */
export const calculateIdealWeight = (height: number): {
  min: number;
  max: number;
  average: number;
} => {
  const heightInMeters = height / 100;
  const min = Math.round(21 * heightInMeters * heightInMeters);
  const max = Math.round(23 * heightInMeters * heightInMeters);
  const average = Math.round(22 * heightInMeters * heightInMeters);

  return { min, max, average };
};

/**
 * Obtém a classificação do IMC
 */
export const getBMIClassification = (bmi: number): {
  label: string;
  color: string;
} => {
  if (bmi < 18.5) return { label: "Abaixo do peso", color: "text-blue-600" };
  if (bmi < 25) return { label: "Peso normal", color: "text-green-600" };
  if (bmi < 30) return { label: "Sobrepeso", color: "text-yellow-600" };
  if (bmi < 35) return { label: "Obesidade grau I", color: "text-orange-600" };
  if (bmi < 40) return { label: "Obesidade grau II", color: "text-red-600" };
  return { label: "Obesidade grau III", color: "text-red-800" };
};

/**
 * Calcula todos os dados do usuário de uma vez
 */
export const calculateAllMetrics = (data: QuizData): QuizData => {
  if (!data.currentWeight || !data.height || !data.age || !data.gender) {
    return data;
  }

  const bmi = calculateBMI(data.currentWeight, data.height);
  const bmr = calculateBMR(
    data.currentWeight,
    data.height,
    parseInt(data.age),
    data.gender
  );
  const tdee = calculateTDEE(bmr, data.activityLevel || "sedentary");

  let estimatedDuration = 0;
  let calorieDeficit = 0;

  if (data.goalWeight) {
    estimatedDuration = calculateEstimatedDuration(
      data.currentWeight,
      data.goalWeight
    );
    calorieDeficit = calculateCalorieDeficit(
      data.currentWeight,
      data.goalWeight,
      estimatedDuration
    );
  }

  return {
    ...data,
    bmi,
    bmr,
    tdee,
    calorieDeficit,
    estimatedDuration,
  };
};
