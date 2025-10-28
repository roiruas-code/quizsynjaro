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
      name: "IMC Atual",
      value: data.bmi || 0,
      fill: "#f59e0b",
    },
  ];

  const bmiClassification = getBMIClassification(data.bmi || 0);
  const weightToLose = data.currentWeight - data.goalWeight;
  const months = Math.ceil((data.estimatedDuration || 0) / 4);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 py-12">
      <div className="w-full max-w-6xl space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold gradient-text">
            📊 Seus Resultados Personalizados
          </h2>
          <p className="text-lg text-muted-foreground">
            Baseado na análise completa do seu perfil
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-card border border-border rounded-2xl p-6 space-y-2">
            <div className="flex items-center gap-2 text-muted-foreground">
              <TrendingDown className="w-5 h-5" />
              <span className="text-sm font-medium">Peso a Perder</span>
            </div>
            <p className="text-4xl font-bold text-foreground">
              {weightToLose.toFixed(1)} kg
            </p>
          </div>

          <div className="bg-card border border-border rounded-2xl p-6 space-y-2">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="w-5 h-5" />
              <span className="text-sm font-medium">Tempo Estimado</span>
            </div>
            <p className="text-4xl font-bold text-foreground">
              {months} {months === 1 ? "mês" : "meses"}
            </p>
          </div>

          <div className="bg-card border border-border rounded-2xl p-6 space-y-2">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Flame className="w-5 h-5" />
              <span className="text-sm font-medium">Calorias Diárias</span>
            </div>
            <p className="text-4xl font-bold text-foreground">
              {((data.tdee || 0) - (data.calorieDeficit || 0)).toLocaleString()}
            </p>
          </div>

          <div className="bg-card border border-border rounded-2xl p-6 space-y-2">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Target className="w-5 h-5" />
              <span className="text-sm font-medium">IMC Atual</span>
            </div>
            <p className="text-4xl font-bold text-foreground">
              {data.bmi?.toFixed(1)}
            </p>
            <p className={`text-sm font-semibold ${bmiClassification.color}`}>
              {bmiClassification.label}
            </p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Weight Projection Chart */}
          <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
            <h3 className="text-xl font-bold text-foreground">
              📈 Projeção de Peso
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weightProjection}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis
                  dataKey="week"
                  label={{ value: "Semanas", position: "insideBottom", offset: -5 }}
                  stroke="hsl(var(--muted-foreground))"
                />
                <YAxis
                  label={{ value: "Peso (kg)", angle: -90, position: "insideLeft" }}
                  stroke="hsl(var(--muted-foreground))"
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
                  dot={{ fill: "hsl(var(--primary))", r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* BMI Gauge */}
          <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
            <h3 className="text-xl font-bold text-foreground">
              🎯 Seu IMC Atual
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <RadialBarChart
                cx="50%"
                cy="50%"
                innerRadius="60%"
                outerRadius="90%"
                data={bmiData}
                startAngle={180}
                endAngle={0}
              >
                <RadialBar
                  background
                  dataKey="value"
                  cornerRadius={10}
                />
                <Legend
                  iconSize={10}
                  layout="vertical"
                  verticalAlign="middle"
                  align="right"
                />
                <text
                  x="50%"
                  y="50%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="text-4xl font-bold fill-foreground"
                >
                  {data.bmi?.toFixed(1)}
                </text>
              </RadialBarChart>
            </ResponsiveContainer>
            <div className="text-center">
              <p className={`text-lg font-semibold ${bmiClassification.color}`}>
                {bmiClassification.label}
              </p>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-2xl p-8 space-y-4">
          <h3 className="text-2xl font-bold text-foreground text-center">
            🎯 Seu Plano Personalizado
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h4 className="font-semibold text-foreground">📋 Resumo Nutricional</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Gasto calórico diário: <span className="font-semibold text-foreground">{data.tdee?.toLocaleString()} kcal</span></li>
                <li>• Meta calórica: <span className="font-semibold text-foreground">{((data.tdee || 0) - (data.calorieDeficit || 0)).toLocaleString()} kcal/dia</span></li>
                <li>• Déficit calórico: <span className="font-semibold text-foreground">{data.calorieDeficit} kcal/dia</span></li>
                <li>• Perda esperada: <span className="font-semibold text-foreground">0.5-1 kg/semana</span></li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-foreground">🎯 Seus Objetivos</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Peso inicial: <span className="font-semibold text-foreground">{data.currentWeight} kg</span></li>
                <li>• Peso meta: <span className="font-semibold text-foreground">{data.goalWeight} kg</span></li>
                <li>• Total a perder: <span className="font-semibold text-foreground">{weightToLose.toFixed(1)} kg</span></li>
                <li>• Prazo estimado: <span className="font-semibold text-foreground">{data.estimatedDuration} semanas</span></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
