import { QuizData } from "@/types/quiz.types";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { AlertCircle, TrendingDown } from "lucide-react";

interface ComparisonChartProps {
  data: QuizData;
}

export const ComparisonChart = ({ data }: ComparisonChartProps) => {
  if (!data.currentWeight || !data.goalWeight || !data.estimatedDuration) {
    return null;
  }

  const currentDate = new Date();
  const startTodayEndDate = new Date(currentDate);
  startTodayEndDate.setDate(
    startTodayEndDate.getDate() + data.estimatedDuration * 7
  );

  const delayedStartDate = new Date(currentDate);
  delayedStartDate.setMonth(delayedStartDate.getMonth() + 6);
  const delayedEndDate = new Date(delayedStartDate);
  delayedEndDate.setDate(
    delayedEndDate.getDate() + data.estimatedDuration * 7
  );

  const chartData = [
    {
      scenario: "Começar Hoje",
      pesoFinal: data.goalWeight,
      dataFinal: startTodayEndDate.toLocaleDateString("pt-BR", {
        month: "short",
        year: "numeric",
      }),
      color: "hsl(var(--primary))",
    },
    {
      scenario: "Começar em 6 Meses",
      pesoFinal: data.currentWeight, // Ainda no peso atual
      dataFinal: delayedStartDate.toLocaleDateString("pt-BR", {
        month: "short",
        year: "numeric",
      }),
      color: "hsl(var(--destructive))",
    },
  ];

  const weightDifference = data.currentWeight - data.goalWeight;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 py-12">
      <div className="w-full max-w-5xl space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold gradient-text">
            ⚖️ O Custo de Esperar
          </h2>
          <p className="text-lg text-muted-foreground">
            Veja a diferença entre agir agora e adiar sua transformação
          </p>
        </div>

        {/* Comparison Chart */}
        <div className="bg-card border border-border rounded-2xl p-6 md:p-8 space-y-6">
          <h3 className="text-xl font-bold text-foreground text-center">
            📊 Comparação de Cenários
          </h3>

          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="scenario"
                stroke="hsl(var(--muted-foreground))"
                tick={{ fontSize: 14 }}
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
                formatter={(value: number, name: string, props: any) => [
                  `${value} kg (${props.payload.dataFinal})`,
                  "Peso",
                ]}
              />
              <Bar dataKey="pesoFinal" radius={[8, 8, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>

          {/* Legend */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 space-y-2">
              <div className="flex items-center gap-2">
                <TrendingDown className="w-5 h-5 text-primary" />
                <h4 className="font-bold text-foreground">Se Começar Hoje</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Você estará no seu peso ideal de{" "}
                <span className="font-bold text-primary">{data.goalWeight} kg</span> até{" "}
                <span className="font-bold text-primary">
                  {startTodayEndDate.toLocaleDateString("pt-BR")}
                </span>
              </p>
              <p className="text-2xl font-bold text-primary">
                -{weightDifference.toFixed(1)} kg 🎯
              </p>
            </div>

            <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-4 space-y-2">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-destructive" />
                <h4 className="font-bold text-foreground">Se Adiar 6 Meses</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Em 6 meses você ainda estará em{" "}
                <span className="font-bold text-destructive">
                  {data.currentWeight} kg
                </span>{" "}
                e só começará a emagrecer depois disso
              </p>
              <p className="text-2xl font-bold text-destructive">
                0 kg perdidos ⏸️
              </p>
            </div>
          </div>
        </div>

        {/* Impact Message */}
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 border-2 border-primary/30 rounded-2xl p-8 space-y-4">
          <h3 className="text-2xl font-bold text-foreground text-center">
            💪 Cada Dia Conta!
          </h3>
          <div className="space-y-3 text-center">
            <p className="text-lg text-foreground">
              Ao começar hoje, você estará <span className="font-bold text-primary">{weightDifference.toFixed(1)} kg mais leve</span> em apenas{" "}
              <span className="font-bold text-primary">{Math.ceil((data.estimatedDuration || 0) / 4)} meses</span>
            </p>
            <p className="text-lg text-muted-foreground">
              Mas se esperar 6 meses para começar, você só alcançará sua meta daqui a{" "}
              <span className="font-bold text-destructive">
                {Math.ceil((data.estimatedDuration || 0) / 4) + 6} meses
              </span>
            </p>
            <div className="pt-4">
              <p className="text-xl font-bold gradient-text">
                A diferença? <span className="text-3xl">6 MESES</span> da sua vida!
              </p>
            </div>
          </div>
        </div>

        {/* Motivational Quote */}
        <div className="text-center p-6 bg-card border border-border rounded-2xl">
          <p className="text-xl font-semibold text-foreground italic">
            "O melhor momento para começar foi há 6 meses. O segundo melhor momento é AGORA."
          </p>
        </div>
      </div>
    </div>
  );
};
