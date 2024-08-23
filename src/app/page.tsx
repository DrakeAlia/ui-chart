import { ChartArea } from "@/components/ChartArea";
import { Charts } from "@/components/Charts";

export default function Home() {
  return (
    <div className="space-y-8 ">
      <div className="mb-8">
        <Charts />
      </div>
      <div>
        <ChartArea />
      </div>
    </div>
  );
}
