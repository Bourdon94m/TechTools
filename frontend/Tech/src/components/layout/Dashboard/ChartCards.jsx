import React, { useEffect, useState } from "react";
import {
  CartesianGrid,
  XAxis,
  YAxis,
  Line,
  ResponsiveContainer,
  LineChart,
  AreaChart,
  BarChart,
  Bar,
  Area,
  Tooltip,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card p-2 shadow-lg rounded-md border border-border">
        <p className="text-sm font-semibold text-foreground">{`${label} : ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

const ChartCard = ({
  className,
  title,
  children,
  startDate,
  endDate,
  error,
}) => (
  <Card className={cn("overflow-hidden bg-card shadow-lg", className)}>
    <CardHeader className="p-4 bg-primary/5">
      <CardTitle className="text-lg font-bold text-primary">{title}</CardTitle>
      <CardDescription className="text-xs text-muted-foreground">
        {startDate} - {endDate}
      </CardDescription>
    </CardHeader>
    <CardContent className="p-4">
      {error ? (
        <div className="text-destructive p-4 text-center">{error}</div>
      ) : (
        children
      )}
    </CardContent>
    <CardFooter className="text-xs text-muted-foreground bg-muted/20 p-2 text-center">
      Données de la semaine en cours
    </CardFooter>
  </Card>
);

const fetchChartData = async (
  setChartData,
  setActualStartWeek,
  setEndOfActualWeek,
  setError
) => {
  try {
    const response = await fetch(
      "http://127.0.0.1:8000/ticket/stats/current-week/"
    );
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    const formattedData = data.daily_stats.map((stat, index) => ({
      day: ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"][index],
      tickets: stat.ticket_count,
    }));
    setChartData(formattedData);
    setActualStartWeek(data.week_start);
    setEndOfActualWeek(data.week_end);
  } catch (error) {
    console.error("Error fetching chart data:", error);
    setError("Impossible de charger les données. Veuillez réessayer.");
  }
};

export function BarChartCard({ className, title }) {
  const [chartData, setChartData] = useState([]);
  const [actualStartWeek, setActualStartWeek] = useState("");
  const [endOfActualWeek, setEndOfActualWeek] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchChartData(
      setChartData,
      setActualStartWeek,
      setEndOfActualWeek,
      setError
    );
  }, []);

  return (
    <ChartCard
      className={className}
      title={title}
      startDate={actualStartWeek}
      endDate={endOfActualWeek}
      error={error}
    >
      <ResponsiveContainer width="100%" height={250}>
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="var(--border)"
            opacity={0.3}
          />
          <XAxis
            dataKey="day"
            stroke="var(--muted-foreground)"
            tick={{ fontSize: 12 }}
          />
          <YAxis stroke="var(--muted-foreground)" tick={{ fontSize: 12 }} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="tickets" fill="var(--primary)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

export function LineChartCard({ className, title }) {
  const [chartData, setChartData] = useState([]);
  const [actualStartWeek, setActualStartWeek] = useState("");
  const [endOfActualWeek, setEndOfActualWeek] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchChartData(
      setChartData,
      setActualStartWeek,
      setEndOfActualWeek,
      setError
    );
  }, []);

  return (
    <ChartCard
      className={className}
      title={title}
      startDate={actualStartWeek}
      endDate={endOfActualWeek}
      error={error}
    >
      <ResponsiveContainer width="100%" height={250}>
        <LineChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="var(--border)"
            opacity={0.3}
          />
          <XAxis
            dataKey="day"
            stroke="var(--muted-foreground)"
            tick={{ fontSize: 12 }}
          />
          <YAxis stroke="var(--muted-foreground)" tick={{ fontSize: 12 }} />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="tickets"
            stroke="var(--primary)"
            strokeWidth={2}
            dot={{
              fill: "var(--background)",
              stroke: "var(--primary)",
              strokeWidth: 2,
            }}
            activeDot={{
              r: 8,
              fill: "var(--primary)",
              stroke: "var(--background)",
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

export function AreaChartCard({ className, title }) {
  const [chartData, setChartData] = useState([]);
  const [actualStartWeek, setActualStartWeek] = useState("");
  const [endOfActualWeek, setEndOfActualWeek] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchChartData(
      setChartData,
      setActualStartWeek,
      setEndOfActualWeek,
      setError
    );
  }, []);

  return (
    <ChartCard
      className={className}
      title={title}
      startDate={actualStartWeek}
      endDate={endOfActualWeek}
      error={error}
    >
      <ResponsiveContainer width="100%" height={250}>
        <AreaChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="var(--border)"
            opacity={0.3}
          />
          <XAxis
            dataKey="day"
            stroke="var(--muted-foreground)"
            tick={{ fontSize: 12 }}
          />
          <YAxis stroke="var(--muted-foreground)" tick={{ fontSize: 12 }} />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="tickets"
            stroke="var(--primary)"
            fill="var(--primary)"
            fillOpacity={0.2}
            strokeWidth={2}
            dot={{
              fill: "var(--background)",
              stroke: "var(--primary)",
              strokeWidth: 2,
            }}
            activeDot={{
              r: 8,
              fill: "var(--primary)",
              stroke: "var(--background)",
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

export default { BarChartCard, LineChartCard, AreaChartCard };
