"use client";

import React, { useCallback, useMemo, useState } from "react";
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
  const memoizedChartData = useMemo(() => chartData, []);

  const CustomTooltip = useCallback(
    ({
      active,
      payload,
      label,
    }: {
      active?: boolean;
      payload?: Array<{ name: string; value: number; color: string }>;
      label?: string;
    }) => {
      if (active && payload && payload.length) {
        return (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="bg-background/90 backdrop-blur-sm border border-border p-4 rounded-lg shadow-lg"
          >
            <p className="font-bold mb-2 text-lg">{label}</p>
            <AnimatePresence>
              {payload.map((entry, index) => (
                <motion.p
                  key={entry.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-2"
                  style={{ color: entry.color }}
                >
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: entry.color }}
                  ></span>
                  <span className="font-medium">{entry.name}:</span>{" "}
                  {entry.value} cups
                </motion.p>
              ))}
            </AnimatePresence>
          </motion.div>
        );
      }
      return null;
    },
    []
  );

  const renderBar = useCallback((props: any) => {
    const { fill, x, y, width, height } = props;

    return (
      <motion.rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={fill}
        initial={{ scaleY: 0, originY: 1 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.5 }}
      />
    );
  }, []);

  if (!memoizedChartData || memoizedChartData.length === 0) {
    return (
      <Card className="p-6 text-center">
        <CardTitle className="mb-2">No Data Available</CardTitle>
        <CardDescription>
          Please check back later for updated beverage consumption trends.
        </CardDescription>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row bg-background text-foreground">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="grid flex-1 gap-1 text-center sm:text-left"
        >
          <CardTitle className="text-2xl sm:text-3xl font-bold">
            Global Beverage Trends
          </CardTitle>
          <CardDescription className="text-sm sm:text-base text-muted-foreground">
            Espresso, Latte, and Tea Consumption (Past 6 Months)
          </CardDescription>
        </motion.div>
      </CardHeader>
      <CardContent className="px-4 pt-6 sm:px-6 sm:pt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ChartContainer config={chartConfig} className="min-h-[350px] w-full">
            <ResponsiveContainer width="100%" height={350} minHeight={300}>
              <BarChart
                data={memoizedChartData}
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
                    shape={renderBar}
                    aria-label={`${item} consumption data`}
                  />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </motion.div>
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
              <TrendingUp
                className="h-4 w-4 sm:h-4 sm:w-4"
                aria-hidden="true"
              />
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
                  aria-label={`${item} indicator`}
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

{
  /* <AnimatePresence>
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
    >
      {chartData.map((entry, entryIndex) => (
        <motion.rect
          key={`bar-${item}-${entryIndex}`}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          exit={{ scaleY: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        />
      ))}
    </Bar>
  ))}
</AnimatePresence>; */
}
