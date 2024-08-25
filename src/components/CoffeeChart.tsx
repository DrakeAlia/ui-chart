"use client";

import React, { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";

import { TrendingUp, Coffee, Leaf } from "lucide-react";
import { motion } from "framer-motion";

const chartData = [
  { month: "January", Espresso: 186, Latte: 80, Tea: 120 },
  { month: "February", Espresso: 305, Latte: 200, Tea: 150 },
  { month: "March", Espresso: 237, Latte: 120, Tea: 190 },
  { month: "April", Espresso: 173, Latte: 190, Tea: 220 },
  { month: "May", Espresso: 209, Latte: 130, Tea: 180 },
  { month: "June", Espresso: 214, Latte: 140, Tea: 160 },
];

const chartConfig = {
  Espresso: {
    label: "Espresso",
    color: "hsl(var(--chart-1))",
  },
  Latte: {
    label: "Latte",
    color: "hsl(var(--chart-2))",
  },
  Tea: {
    label: "Tea",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

export function CoffeeChart() {
  const [hoveredBar, setHoveredBar] = useState<string | null>(null);

  if (!chartData || chartData.length === 0) {
    return <div>No data available</div>;
  }

  const CustomTooltip: React.FC<{
    active?: boolean;
    payload?: Array<{
      name: string;
      value: number;
      color: string;
    }>;
    label?: string;
  }> = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="bg-background border border-border p-4 rounded-lg shadow-lg"
        >
          <p className="font-bold mb-2">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {entry.value} cups
            </p>
          ))}
        </motion.div>
      );
    }
    return null;
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row bg-background text-foreground">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="grid flex-1 gap-1 text-center sm:text-left"
        >
          <CardTitle className="text-3xl font-bold">
            Global Beverage Trends
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Espresso, Latte, and Tea Consumption (Past 6 Months)
          </CardDescription>
        </motion.div>
      </CardHeader>
      <CardContent className="px-4 pt-6 sm:px-6 sm:pt-8">
        <ChartContainer config={chartConfig} className="min-h-[350px] w-full">
          <ResponsiveContainer width="100%" height={350} minHeight={300}>
            <BarChart
              data={chartData}
              margin={{ top: 20, bottom: 20, left: 10, right: 10 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="hsl(var(--border))"
              />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                width={50}
              />
              <Tooltip
                content={<CustomTooltip />}
                cursor={{ fill: "hsl(var(--muted))" }}
              />
              <ChartLegend content={<ChartLegendContent />} />
              {["Espresso", "Latte", "Tea"].map((item, index) => (
                <Bar
                  key={item}
                  dataKey={item}
                  fill={`hsl(var(--chart-${index + 1}))`}
                  radius={[4, 4, 0, 0]}
                  onMouseEnter={() => setHoveredBar(item)}
                  onMouseLeave={() => setHoveredBar(null)}
                  animationDuration={1000}
                  animationBegin={index * 200}
                  aria-label={`${item} consumption data`}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
      <CardFooter className="bg-muted/20 border-t border-border/10 py-4">
        <div className="flex w-full flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs sm:text-sm">
          <motion.div
            className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.div
              animate={{ scale: [1, 1.03, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex items-center gap-1 font-medium"
            >
              Overall consumption up 7.8%{" "}
              <TrendingUp className="h-4 w-4 sm:h-4 sm:w-4" />
            </motion.div>
            <div className="text-muted-foreground">January - June 2024</div>
          </motion.div>
          <motion.div
            className="flex flex-wrap items-center gap-3 sm:gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {["Espresso", "Latte", "Tea"].map((item, index) => (
              <motion.div
                key={item}
                className="flex items-center gap-1"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  animate={{
                    color:
                      hoveredBar === item
                        ? `hsl(var(--chart-${index + 1}))`
                        : "hsl(var(--muted-foreground))",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {item === "Tea" ? (
                    <Leaf className="h-3 w-3 sm:h-4 sm:w-4" />
                  ) : (
                    <Coffee className="h-3 w-3 sm:h-4 sm:w-4" />
                  )}
                </motion.div>
                <motion.span
                  animate={{
                    color:
                      hoveredBar === item
                        ? `hsl(var(--chart-${index + 1}))`
                        : "hsl(var(--muted-foreground))",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {item}
                </motion.span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </CardFooter>
    </Card>
  );
}
