import { QuizData } from "@/types/quiz.types";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadialBarChart, RadialBar, Legend } from "recharts";
import { generateWeightProjection, getBMIClassification } from "@/lib/calculations";
import { TrendingDown, Flame, Target, Calendar } from "lucide-react";

interface ResultsDashboardProps {
  data: QuizData;
}

export const ResultsDashboard = ({ data }: ResultsDashboardProps) => {
  if (!data.currentWeight || !data.goalWeight || !data.estimatedDuration) {
    return null;
  }

  const weightProjection = generateWeightProjection(
    data.currentWeight,
    data.goalWeight,
    data.estimatedDuration
  );

  const bmiData = [
    {
      name: "Current BMI",
      value: data.bmi || 0,
      fill: "#f59e0b",
    },
  ];

  const bmiClassification = getBMIClassification(data.bmi || 0);
  const weightToLose = data.currentWeight - data.goalWeight;
  const months = Math.ceil((data.estimatedDuration || 0) / 4);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 py-8 pb-24 safe-area-inset">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold gradient-text">
            📊 Your Personalized Results
          </h2>
          <p className="text-sm text-muted-foreground">
            Based on your complete profile analysis
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-card border border-border rounded-2xl p-4 space-y-1">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <TrendingDown className="w-4 h-4" />
              <span className="text-xs font-medium">Weight to Lose</span>
            </div>
            <p className="text-2xl font-bold text-foreground">
              {weightToLose.toFixed(1)} kg
            </p>
          </div>

          <div className="bg-card border border-border rounded-2xl p-4 space-y-1">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span className="text-xs font-medium">Estimated Time</span>
            </div>
            <p className="text-2xl font-bold text-foreground">
              {months} {months === 1 ? "month" : "months"}
            </p>
          </div>

          <div className="bg-card border border-border rounded-2xl p-4 space-y-1">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Flame className="w-4 h-4" />
              <span className="text-xs font-medium">Daily Calories</span>
            </div>
            <p className="text-2xl font-bold text-foreground">
              {((data.tdee || 0) - (data.calorieDeficit || 0)).toLocaleString()}
            </p>
          </div>

          <div className="bg-card border border-border rounded-2xl p-4 space-y-1">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Target className="w-4 h-4" />
              <span className="text-xs font-medium">Current BMI</span>
            </div>
            <p className="text-2xl font-bold text-foreground">
              {data.bmi?.toFixed(1)}
            </p>
            <p className={`text-xs font-semibold ${bmiClassification.color}`}>
              {bmiClassification.label}
            </p>
          </div>
        </div>

        {/* Weight Projection Chart */}
        <div className="bg-card border border-border rounded-2xl p-4 space-y-3">
          <h3 className="text-base font-bold text-foreground">
            📈 Weight Projection
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={weightProjection}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="week"
                label={{ value: "Weeks", position: "insideBottom", offset: -5 }}
                stroke="hsl(var(--muted-foreground))"
                tick={{ fontSize: 10 }}
              />
              <YAxis
                label={{ value: "Weight (kg)", angle: -90, position: "insideLeft" }}
                stroke="hsl(var(--muted-foreground))"
                tick={{ fontSize: 10 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Line
                type="monotone"
                dataKey="weight"
                stroke="hsl(var(--primary))"
                strokeWidth={3}
                dot={{ fill: "hsl(var(--primary))", r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Additional Info */}
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-2xl p-4 space-y-3">
          <h3 className="text-base font-bold text-foreground text-center">
            🎯 Your Personalized Plan
          </h3>
          <div className="grid grid-cols-1 gap-4 text-sm">
            <div className="space-y-1">
              <h4 className="font-semibold text-foreground">📋 Nutritional Summary</h4>
              <ul className="space-y-0.5 text-muted-foreground text-xs">
                <li>• Daily calorie burn: <span className="font-semibold text-foreground">{data.tdee?.toLocaleString()} kcal</span></li>
                <li>• Calorie target: <span className="font-semibold text-foreground">{((data.tdee || 0) - (data.calorieDeficit || 0)).toLocaleString()} kcal/day</span></li>
                <li>• Calorie deficit: <span className="font-semibold text-foreground">{data.calorieDeficit} kcal/day</span></li>
                <li>• Expected loss: <span className="font-semibold text-foreground">0.5-1 kg/week</span></li>
              </ul>
            </div>
            <div className="space-y-1">
              <h4 className="font-semibold text-foreground">🎯 Your Goals</h4>
              <ul className="space-y-0.5 text-muted-foreground text-xs">
                <li>• Starting weight: <span className="font-semibold text-foreground">{data.currentWeight} kg</span></li>
                <li>• Goal weight: <span className="font-semibold text-foreground">{data.goalWeight} kg</span></li>
                <li>• Total to lose: <span className="font-semibold text-foreground">{weightToLose.toFixed(1)} kg</span></li>
                <li>• Estimated time: <span className="font-semibold text-foreground">{data.estimatedDuration} weeks</span></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
