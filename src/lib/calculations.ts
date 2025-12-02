import { QuizData } from "@/types/quiz.types";

/**
 * Calculate BMI (Body Mass Index)
 */
export const calculateBMI = (weight: number, height: number): number => {
  const heightInMeters = height / 100;
  return Number((weight / (heightInMeters * heightInMeters)).toFixed(1));
};

/**
 * Calculate BMR (Basal Metabolic Rate) using Mifflin-St Jeor formula
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
 * Calculate TDEE (Total Daily Energy Expenditure)
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
 * Get age from range string
 */
const getAgeFromRange = (ageRange: string): number => {
  const ageMap: { [key: string]: number } = {
    "18-25": 22,
    "26-35": 30,
    "36-45": 40,
    "46-55": 50,
    "56+": 60,
  };
  return ageMap[ageRange] || 35;
};

/**
 * Calculate estimated duration to reach goal
 */
export const calculateEstimatedDuration = (
  currentWeight: number,
  goalWeight: number
): number => {
  const weightToLose = currentWeight - goalWeight;
  const weeks = Math.ceil(weightToLose / 0.75);
  return weeks;
};

/**
 * Generate weight projection data
 */
export const generateWeightProjection = (
  currentWeight: number,
  goalWeight: number,
  weeks: number
): { week: number; weight: number }[] => {
  const projection = [];
  const weightPerWeek = (currentWeight - goalWeight) / weeks;
  for (let week = 0; week <= weeks; week++) {
    projection.push({
      week,
      weight: Math.round((currentWeight - weightPerWeek * week) * 10) / 10,
    });
  }
  return projection;
};

/**
 * Get BMI classification
 */
export const getBMIClassification = (bmi: number): { label: string; color: string } => {
  if (bmi < 18.5) return { label: "Underweight", color: "text-blue-600" };
  if (bmi < 25) return { label: "Normal weight", color: "text-green-600" };
  if (bmi < 30) return { label: "Overweight", color: "text-yellow-600" };
  if (bmi < 35) return { label: "Obesity Class I", color: "text-orange-600" };
  if (bmi < 40) return { label: "Obesity Class II", color: "text-red-600" };
  return { label: "Obesity Class III", color: "text-red-800" };
};

/**
 * Calculate all user metrics
 */
export const calculateAllMetrics = (data: QuizData): QuizData => {
  if (!data.currentWeight || !data.height || !data.age) {
    return data;
  }

  const age = getAgeFromRange(data.age);
  const gender = data.gender || "female";

  const bmi = calculateBMI(data.currentWeight, data.height);
  const bmr = calculateBMR(data.currentWeight, data.height, age, gender);
  const tdee = calculateTDEE(bmr, data.activityLevel || "sedentary");

  let estimatedDuration = 0;
  let calorieDeficit = 500;

  if (data.goalWeight) {
    estimatedDuration = calculateEstimatedDuration(data.currentWeight, data.goalWeight);
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
