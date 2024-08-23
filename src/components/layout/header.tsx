import Link from "next/link";
import { ModeToggle } from "@/components/layout/Mode-Toggle";

export function Header() {
  return (
    <header className="w-full">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Chart UI</h1>
        <nav>
          <ul className="flex space-x-4 items-center">
            <li>
              <ModeToggle />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
