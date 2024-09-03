import { CoffeeChart } from "@/components/CoffeeChart";
import { Charts } from "@/components/Charts";
import { ChartArea } from "@/components/ChartArea";
import { PieChartWheel } from "@/components/PieChartWheel";

export default function Home() {
  return (
    <div className="h-[calc(100vh-5rem)] sm:h-auto sm:min-h-[600px]">
        <CoffeeChart />
    </div>
  );
}
