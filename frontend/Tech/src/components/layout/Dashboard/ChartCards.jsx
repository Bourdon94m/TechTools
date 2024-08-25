import React, { useEffect, useState } from "react";
import {
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
  Line,
  ResponsiveContainer,
  LineChart,
  AreaChart,
  BarChart,
  Bar,
  Area,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { cn } from "@/lib/utils";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-3))",
  },
  label: {
    color: "hsl(var(--background))",
  },
};

export function BarChartCard({ className, title }) {
  const [chartData, setChartData] = useState([]);
  const [actualStartWeek, setActualStartWeek] = useState("");
  const [endOfActualWeek, setEndOfActualWeek] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/ticket/stats/current-week/")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const actualStartWeek = data.week_start;
        const endOfActualWeek = data.week_end;

        // Assurez-vous que les données sont dans le format attendu
        const formattedData = [
          { day: "Lundi", desktop: data.daily_stats[0].ticket_count },
          { day: "Mardi", desktop: data.daily_stats[1].ticket_count },
          { day: "Mercredi", desktop: data.daily_stats[2].ticket_count },
          { day: "Jeudi", desktop: data.daily_stats[3].ticket_count },
          { day: "Vendredi", desktop: data.daily_stats[4].ticket_count },
          { day: "Samedi", desktop: data.daily_stats[5].ticket_count },
          { day: "Dimanche", desktop: data.daily_stats[6].ticket_count },
        ];
        // Set data into some useful useState
        setChartData(formattedData);
        setActualStartWeek(actualStartWeek);
        setEndOfActualWeek(endOfActualWeek);
        console.log("Le formatted data que tu veux mettre : ", formattedData);
        console.log("Le chartdata qu'il ya: ", chartData);
      })
      .catch((error) => {
        console.error("Error fetching chart data:", error);
        setError(error.message);
      });
  }, []);

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="p-4">
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>
          Semaine du {actualStartWeek} au {endOfActualWeek}{" "}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        {error ? (
          <div className="text-red-500">Error: {error}</div>
        ) : (
          <ChartContainer className="w-full" config={chartConfig}>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={chartData}
                layout="vertical"
                margin={{
                  top: 10,
                  right: 16,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid horizontal={false} />
                <YAxis
                  dataKey="day"
                  type="category"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                  hide
                />
                <XAxis dataKey="desktop" type="number" hide />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="line" />}
                />
                <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4}>
                  <LabelList
                    dataKey="day"
                    position="insideLeft"
                    offset={8}
                    className="fill-[--color-label]"
                    fontSize={12}
                  />
                  <LabelList
                    dataKey="desktop"
                    position="right"
                    offset={8}
                    className="fill-foreground"
                    fontSize={12}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        )}
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm mt-10">
        <div className="leading-none text-muted-foreground">
          Showing tickets for the current week
        </div>
      </CardFooter>
    </Card>
  );
}

export function LineChartCard({ className, title }) {
  const [chartData, setChartData] = useState([]);
  const [actualStartWeek, setActualStartWeek] = useState("");
  const [endOfActualWeek, setEndOfActualWeek] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/ticket/stats/current-week/")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const actualStartWeek = data.week_start;
        const endOfActualWeek = data.week_end;

        // Assurez-vous que les données sont dans le format attendu
        const formattedData = [
          { day: "Lundi", desktop: data.daily_stats[0].ticket_count },
          { day: "Mardi", desktop: data.daily_stats[1].ticket_count },
          { day: "Mercredi", desktop: data.daily_stats[2].ticket_count },
          { day: "Jeudi", desktop: data.daily_stats[3].ticket_count },
          { day: "Vendredi", desktop: data.daily_stats[4].ticket_count },
          { day: "Samedi", desktop: data.daily_stats[5].ticket_count },
          { day: "Dimanche", desktop: data.daily_stats[6].ticket_count },
        ];
        // Set data into some useful useState
        setChartData(formattedData);
        setActualStartWeek(actualStartWeek);
        setEndOfActualWeek(endOfActualWeek);
        console.log("Le formatted data que tu veux mettre : ", formattedData);
        console.log("Le chartdata qu'il ya: ", chartData);
      })
      .catch((error) => {
        console.error("Error fetching chart data:", error);
        setError(error.message);
      });
  }, []);

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="p-4">
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>
          Semaine du {actualStartWeek} au {endOfActualWeek}{" "}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <ChartContainer className="w-full" config={chartConfig}>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={chartData}
              margin={{
                top: 10,
                right: 12,
                left: 12,
                bottom: 0,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Line
                type="monotone"
                dataKey="desktop"
                stroke="var(--color-desktop)"
                strokeWidth={2}
                dot={{
                  fill: "var(--color-desktop)",
                }}
                activeDot={{
                  r: 6,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm mt-10">
        <div className="leading-none text-muted-foreground">
          Showing ticket trend for the current week
        </div>
      </CardFooter>
    </Card>
  );
}

export function AreaChartCard({ className, title }) {
  const [chartData, setChartData] = useState([]);
  const [actualStartWeek, setActualStartWeek] = useState("");
  const [endOfActualWeek, setEndOfActualWeek] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/ticket/stats/current-week/")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const actualStartWeek = data.week_start;
        const endOfActualWeek = data.week_end;

        // Assurez-vous que les données sont dans le format attendu
        const formattedData = [
          { day: "Lundi", desktop: data.daily_stats[0].ticket_count },
          { day: "Mardi", desktop: data.daily_stats[1].ticket_count },
          { day: "Mercredi", desktop: data.daily_stats[2].ticket_count },
          { day: "Jeudi", desktop: data.daily_stats[3].ticket_count },
          { day: "Vendredi", desktop: data.daily_stats[4].ticket_count },
          { day: "Samedi", desktop: data.daily_stats[5].ticket_count },
          { day: "Dimanche", desktop: data.daily_stats[6].ticket_count },
        ];
        // Set data into some useful useState
        setChartData(formattedData);
        setActualStartWeek(actualStartWeek);
        setEndOfActualWeek(endOfActualWeek);
        console.log("Le formatted data que tu veux mettre : ", formattedData);
        console.log("Le chartdata qu'il ya: ", chartData);
      })
      .catch((error) => {
        console.error("Error fetching chart data:", error);
        setError(error.message);
      });
  }, []);

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="p-4">
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>
          Semaine du {actualStartWeek} au {endOfActualWeek}{" "}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <ChartContainer className="w-full" config={chartConfig}>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart
              data={chartData}
              margin={{
                top: 10,
                right: 12,
                left: 12,
                bottom: 0,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Area
                type="monotone"
                dataKey="desktop"
                stroke="var(--color-desktop)"
                fill="var(--color-desktop)"
                strokeWidth={2}
                dot={{
                  fill: "var(--color-desktop)",
                }}
                activeDot={{
                  r: 6,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm mt-10">
        <div className="leading-none text-muted-foreground">
          Showing ticket trend for the current week
        </div>
      </CardFooter>
    </Card>
  );
}

export default { BarChartCard, AreaChartCard, LineChartCard };
