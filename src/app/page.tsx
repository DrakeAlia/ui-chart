import { CoffeeChart } from "@/components/CoffeeChart";
import { Charts } from "@/components/Charts";
import { ChartArea } from "@/components/ChartArea";
import { PieChartWheel } from "@/components/PieChartWheel";

export default function Home() {
  return (
    <div className="space-y-8">
      <div className="mb-8">
        <CoffeeChart />
      </div>
      <div>
        <Charts />
      </div>
      {/* <div>
        <ChartArea />
      </div> *}
      {* <div>
        <PieChartWheel />
      </div> */}
    </div>
  );
}
