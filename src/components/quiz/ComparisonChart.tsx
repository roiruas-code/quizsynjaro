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
      scenario: "Start Today",
      finalWeight: data.goalWeight,
      endDate: startTodayEndDate.toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      }),
      color: "hsl(var(--primary))",
    },
    {
      scenario: "Start in 6 Months",
      finalWeight: data.currentWeight,
      endDate: delayedStartDate.toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      }),
      color: "hsl(var(--destructive))",
    },
  ];

  const weightDifference = data.currentWeight - data.goalWeight;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 py-8 pb-24 safe-area-inset">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold gradient-text">
            ⚖️ The Cost of Waiting
          </h2>
          <p className="text-sm text-muted-foreground">
            See the difference between acting now and delaying your transformation
          </p>
        </div>

        {/* Comparison Chart */}
        <div className="bg-card border border-border rounded-2xl p-4 space-y-4">
          <h3 className="text-base font-bold text-foreground text-center">
            📊 Scenario Comparison
          </h3>

          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="scenario"
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
                formatter={(value: number, name: string, props: any) => [
                  `${value} kg (${props.payload.endDate})`,
                  "Weight",
                ]}
              />
              <Bar dataKey="finalWeight" radius={[8, 8, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>

          {/* Legend */}
          <div className="grid grid-cols-1 gap-3">
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-3 space-y-1">
              <div className="flex items-center gap-2">
                <TrendingDown className="w-4 h-4 text-primary" />
                <h4 className="font-bold text-sm text-foreground">If You Start Today</h4>
              </div>
              <p className="text-xs text-muted-foreground">
                You'll be at your ideal weight of{" "}
                <span className="font-bold text-primary">{data.goalWeight} kg</span> by{" "}
                <span className="font-bold text-primary">
                  {startTodayEndDate.toLocaleDateString("en-US")}
                </span>
              </p>
              <p className="text-lg font-bold text-primary">
                -{weightDifference.toFixed(1)} kg 🎯
              </p>
            </div>

            <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-3 space-y-1">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-destructive" />
                <h4 className="font-bold text-sm text-foreground">If You Delay 6 Months</h4>
              </div>
              <p className="text-xs text-muted-foreground">
                In 6 months you'll still be at{" "}
                <span className="font-bold text-destructive">
                  {data.currentWeight} kg
                </span>{" "}
                and only then start losing weight
              </p>
              <p className="text-lg font-bold text-destructive">
                0 kg lost ⏸️
              </p>
            </div>
          </div>
        </div>

        {/* Impact Message */}
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 border-2 border-primary/30 rounded-2xl p-4 space-y-3">
          <h3 className="text-lg font-bold text-foreground text-center">
            💪 Every Day Counts!
          </h3>
          <div className="space-y-2 text-center">
            <p className="text-sm text-foreground">
              By starting today, you'll be <span className="font-bold text-primary">{weightDifference.toFixed(1)} kg lighter</span> in just{" "}
              <span className="font-bold text-primary">{Math.ceil((data.estimatedDuration || 0) / 4)} months</span>
            </p>
            <p className="text-sm text-muted-foreground">
              But if you wait 6 months to start, you'll only reach your goal in{" "}
              <span className="font-bold text-destructive">
                {Math.ceil((data.estimatedDuration || 0) / 4) + 6} months
              </span>
            </p>
            <div className="pt-2">
              <p className="text-base font-bold gradient-text">
                The difference? <span className="text-2xl">6 MONTHS</span> of your life!
              </p>
            </div>
          </div>
        </div>

        {/* Motivational Quote */}
        <div className="text-center p-4 bg-card border border-border rounded-2xl">
          <p className="text-sm font-semibold text-foreground italic">
            "The best time to start was 6 months ago. The second best time is NOW."
          </p>
        </div>
      </div>
    </div>
  );
};
