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
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

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

const chartData = [
  { month: "January", espresso: 186, latte: 80, tea: 120 },
  { month: "February", espresso: 305, latte: 200, tea: 150 },
  { month: "March", espresso: 237, latte: 120, tea: 190 },
  { month: "April", espresso: 173, latte: 190, tea: 220 },
  { month: "May", espresso: 209, latte: 130, tea: 180 },
  { month: "June", espresso: 214, latte: 140, tea: 160 },
];

const chartConfig = {
  espresso: {
    label: "Espresso",
    color: "hsl(var(--chart-1))",
  },
  latte: {
    label: "Latte",
    color: "hsl(var(--chart-2))",
  },
  tea: {
    label: "Tea",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

export function CoffeeChart() {
  const { theme } = useTheme();
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
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row bg-gradient-to-r from-[hsl(var(--chart-1))] to-[hsl(var(--chart-3))] text-white">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle className="text-2xl font-bold">
            Global Beverage Trends
          </CardTitle>
          <CardDescription className="text-gray-200">
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
                dataKey="espresso"
                fill="url(#espressoGradient)"
                radius={[4, 4, 0, 0]}
                onMouseEnter={() => setHoveredBar("espresso")}
                onMouseLeave={() => setHoveredBar(null)}
              >
                {chartData.map((entry, index) => (
                  <motion.rect
                    key={`espresso-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  />
                ))}
              </Bar>
              <Bar
                dataKey="latte"
                fill="url(#latteGradient)"
                radius={[4, 4, 0, 0]}
                onMouseEnter={() => setHoveredBar("latte")}
                onMouseLeave={() => setHoveredBar(null)}
              >
                {chartData.map((entry, index) => (
                  <motion.rect
                    key={`latte-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                  />
                ))}
              </Bar>
              <Bar
                dataKey="tea"
                fill="url(#teaGradient)"
                radius={[4, 4, 0, 0]}
                onMouseEnter={() => setHoveredBar("tea")}
                onMouseLeave={() => setHoveredBar(null)}
              >
                {chartData.map((entry, index) => (
                  <motion.rect
                    key={`tea-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
                  />
                ))}
              </Bar>
              <defs>
                <linearGradient
                  id="espressoGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor="hsl(var(--chart-1))"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="hsl(var(--chart-1))"
                    stopOpacity={0.2}
                  />
                </linearGradient>
                <linearGradient id="latteGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="hsl(var(--chart-2))"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="hsl(var(--chart-2))"
                    stopOpacity={0.2}
                  />
                </linearGradient>
                <linearGradient id="teaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="hsl(var(--chart-3))"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="hsl(var(--chart-3))"
                    stopOpacity={0.2}
                  />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
      <CardFooter className="bg-muted">
        <div className="flex w-full items-start gap-4 text-sm">
          <motion.div
            className="grid gap-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2 font-medium leading-none">
              <TrendingUp className="h-5 w-5 text-[hsl(var(--chart-1))]" />
              <span>Overall consumption up 7.8% this month</span>
            </div>
          </motion.div>
          <motion.div
            className="grid gap-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              <Coffee
                className={`h-5 w-5 ${
                  hoveredBar === "espresso" ? "text-[hsl(var(--chart-1))]" : ""
                }`}
              />
              <span>Espresso</span>
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              <Coffee
                className={`h-5 w-5 ${
                  hoveredBar === "latte" ? "text-[hsl(var(--chart-2))]" : ""
                }`}
              />
              <span>Latte</span>
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              <Leaf
                className={`h-5 w-5 ${
                  hoveredBar === "tea" ? "text-[hsl(var(--chart-3))]" : ""
                }`}
              />
              <span>Tea</span>
            </div>
          </motion.div>
        </div>
      </CardFooter>
    </Card>
  );
}
