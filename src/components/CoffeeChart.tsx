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
import { motion, AnimatePresence } from "framer-motion";

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
        <div className="bg-background border border-border p-4 rounded-lg shadow-lg">
          <p className="font-bold mb-2">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {entry.value} cups
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row bg-background text-foreground">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle className="text-2xl font-bold">
            Global Beverage Trends
          </CardTitle>
          <CardDescription>
            Espresso, Latte, and Tea Consumption (Past 6 Months)
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <YAxis tickLine={false} axisLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar
                dataKey="Espresso"
                fill="hsl(var(--chart-1))"
                radius={[4, 4, 0, 0]}
                onMouseEnter={() => setHoveredBar("Espresso")}
                onMouseLeave={() => setHoveredBar(null)}
              />
              <Bar
                dataKey="Latte"
                fill="hsl(var(--chart-2))"
                radius={[4, 4, 0, 0]}
                onMouseEnter={() => setHoveredBar("Latte")}
                onMouseLeave={() => setHoveredBar(null)}
              />
              <Bar
                dataKey="Tea"
                fill="hsl(var(--chart-3))"
                radius={[4, 4, 0, 0]}
                onMouseEnter={() => setHoveredBar("Tea")}
                onMouseLeave={() => setHoveredBar(null)}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs sm:text-sm">
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
            <motion.div
              className="flex items-center gap-2 font-medium"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              Overall consumption up 7.8%{" "}
              <TrendingUp className="h-4 w-4 sm:h-4 sm:w-4" />
            </motion.div>
            <motion.div
              className="text-muted-foreground"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              January - June 2024
            </motion.div>
          </div>
          <motion.div
            className="flex flex-wrap items-center gap-2 sm:gap-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {["Espresso", "Latte", "Tea"].map((item, index) => (
              <div
                key={item}
                className="flex items-center gap-1 text-muted-foreground"
              >
                {item === "Tea" ? (
                  <Leaf
                    className={`h-3 w-3 sm:h-4 sm:w-4 ${
                      hoveredBar === item
                        ? `text-[hsl(var(--chart-${index + 1}))]`
                        : ""
                    }`}
                  />
                ) : (
                  <Coffee
                    className={`h-3 w-3 sm:h-4 sm:w-4 ${
                      hoveredBar === item
                        ? `text-[hsl(var(--chart-${index + 1}))]`
                        : ""
                    }`}
                  />
                )}
                <span>{item}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </CardFooter>
    </Card>
  );
}
