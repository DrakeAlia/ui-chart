import { ModeToggle } from "@/components/layout/Mode-Toggle";

export function Header() {
  return (
    <header className="w-full">
      <div className="container mx-auto px-4 pt-4 flex justify-between items-center">
        <div className="text-2xl font-bold">Chart UI</div>
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
