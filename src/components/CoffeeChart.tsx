"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
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

import { TrendingUp, Coffee, Leaf, X, Droplet } from "lucide-react";
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
    // color: "hsl(var(--chart-1))",
    color: "hsl(25, 70%, 45%)", // A rich brown color
  },
  Latte: {
    label: "Latte",
    // color: "hsl(var(--chart-2))",
    color: "hsl(43, 80%, 70%)", // A creamy light brown
  },
  Tea: {
    label: "Tea",
    // color: "hsl(var(--chart-3))",
    color: "hsl(150, 50%, 45%)", // A refreshing green
  },
} satisfies ChartConfig;

export function CoffeeChart() {
  const [hoveredBar, setHoveredBar] = useState<string | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const [totalConsumption, setTotalConsumption] = useState<number>(0);
  const memoizedChartData = useMemo(() => chartData, []);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    const total = memoizedChartData.reduce(
      (acc, month) => acc + month.Espresso + month.Latte + month.Tea,
      0
    );
    setTotalConsumption(total);
  }, [memoizedChartData]);

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

  const renderBar = useCallback(
    (props: any) => {
      const { fill, x, y, width, height, payload, dataKey } = props;
      const isHovered = hoveredBar === dataKey;
      const isSelected = selectedMonth === payload.month;
      const barColor = chartConfig[dataKey as keyof typeof chartConfig].color;

      return (
        <motion.g>
          <defs>
            <linearGradient
              id={`gradient-${dataKey}`}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="0%" stopColor={barColor} stopOpacity={0.8} />
              <stop offset="100%" stopColor={barColor} stopOpacity={0.3} />
            </linearGradient>
          </defs>
          <motion.rect
            x={x}
            y={y}
            width={width}
            height={height}
            fill={`url(#gradient-${dataKey})`}
            initial={{ scaleY: 0, originY: 1 }}
            animate={{
              scaleY: 1,
              filter: isSelected ? "brightness(1.2) saturate(1.2)" : "none",
            }}
            transition={{ duration: 0.5, type: "spring", stiffness: 120 }}
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.2 },
            }}
          />
          {isHovered && (
            <motion.circle
              cx={x + width / 2}
              cy={y - 10}
              r={5}
              fill={barColor}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2 }}
            />
          )}
        </motion.g>
      );
    },
    [hoveredBar, selectedMonth]
  );

  const handleKeyPress = useCallback(
    (event: React.KeyboardEvent, month: string) => {
      if (event.key === "Enter" || event.key === " ") {
        setSelectedMonth(month);
      }
    },
    []
  );

  const handleReset = () => {
    setSelectedMonth(null);
  };

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
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-background to-background/80 backdrop-blur-sm">
        <CardHeader className="flex items-center gap-4 space-y-0 border-b py-5 sm:flex-row bg-background/50 text-foreground">
          <motion.div
            className="text-6xl"
            initial={{ opacity: 0, rotate: 0 }}
            animate={{ opacity: 1, rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            style={{
              color: "hsl(var(--primary))",
            }}
          >
            <Coffee />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid flex-1 gap-1"
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <CardTitle className="text-2xl sm:text-3xl font-bold">
                Global Beverage Trends
              </CardTitle>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <CardDescription className="text-sm sm:text-base text-muted-foreground">
                Espresso, Latte, and Tea Consumption (Past 6 Months)
              </CardDescription>
            </motion.div>
          </motion.div>
        </CardHeader>
        <CardContent className="px-4 pt-6 sm:px-6 sm:pt-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            onMouseMove={handleMouseMove}
            style={{
              transform: `translate(${mousePosition.x * 0.01}px, ${
                mousePosition.y * 0.01
              }px)`,
            }}
          >
            <ChartContainer
              config={chartConfig}
              className="min-h-[350px] w-full"
            >
              <ResponsiveContainer width="100%" height={350} minHeight={300}>
                <BarChart
                  data={memoizedChartData}
                  margin={{ top: 20, bottom: 20, left: 10, right: 10 }}
                  onClick={(data) => setSelectedMonth(data.activeLabel ?? null)}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="hsl(var(--border))"
                    className="animate-fade-in"
                  />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, 3)}
                    tick={{
                      fill: "hsl(var(--muted-foreground))",
                      fontSize: 12,
                    }}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tick={{
                      fill: "hsl(var(--muted-foreground))",
                      fontSize: 12,
                    }}
                    width={50}
                  />
                  <Tooltip
                    content={<CustomTooltip />}
                    cursor={{ fill: "hsl(var(--muted))" }}
                  />
                  <ChartLegend content={<ChartLegendContent />} />
                  {["Espresso", "Latte", "Tea"].map((item) => (
                    <Bar
                      key={item}
                      dataKey={item}
                      fill={chartConfig[item as keyof typeof chartConfig].color}
                      radius={[4, 4, 0, 0]}
                      onMouseEnter={() => setHoveredBar(item)}
                      onMouseLeave={() => setHoveredBar(null)}
                      shape={renderBar}
                      aria-label={`${item} consumption data`}
                      tabIndex={0}
                      onKeyPress={(e) => handleKeyPress(e, item)}
                    />
                  ))}
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </motion.div>
        </CardContent>
        <CardFooter className="bg-muted/20 border-t border-border/10 py-4 flex flex-col gap-4">
          <motion.div
            className="flex w-full flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs sm:text-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <motion.div
              className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                animate={{ scale: [1, 1.03, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex items-center gap-1 font-medium"
              >
                Overall consumption: {totalConsumption} cups
                <TrendingUp
                  className="h-4 w-4 sm:h-4 sm:w-4"
                  aria-hidden="true"
                />
              </motion.div>
              <div className="text-muted-foreground">January - June 2024</div>
            </motion.div>
            <motion.div
              className="flex flex-wrap items-center gap-3 sm:gap-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1.2 }}
            >
              {["Espresso", "Latte", "Tea"].map((item, index) => (
                <motion.div
                  key={item}
                  className="flex items-center gap-1"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 1.2 + index * 0.1 }}
                >
                  <motion.div
                    animate={{
                      color:
                        hoveredBar === item
                          ? chartConfig[item as keyof typeof chartConfig].color
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
                          ? chartConfig[item as keyof typeof chartConfig].color
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
          </motion.div>
          <AnimatePresence>
            {selectedMonth && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex items-center justify-center gap-2"
              >
                <span className="font-medium">Selected: {selectedMonth}</span>
                <motion.button
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleReset}
                  className="flex items-center gap-1 px-2 py-1 bg-muted rounded-md text-sm font-medium"
                >
                  Reset <X className="h-3 w-3" />
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
