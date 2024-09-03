"use client";

import { ModeToggle } from "@/components/layout/Mode-Toggle";
import { motion } from "framer-motion";
import { Coffee } from "lucide-react";

export function Header() {
  return (
    <header className="w-full">
      <div className="container mx-auto px-4 pt-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <motion.div
            className="text-2xl"
            initial={{ opacity: 0, rotate: 0 }}
            animate={{ opacity: 1, rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            style={{
              color: "hsl(var(--primary))",
            }}
          >
            <Coffee />
          </motion.div>
          <div className="text-2xl font-bold">Coffee Chart</div>
        </div>
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
