import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";

import { useCalendar } from "@/context/CalendarContext";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useCalendar();
  const isNight = theme === "night";

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "inline-flex items-center gap-3 rounded-full border px-3.5 py-2.5",
        "border-border/70 bg-background/75 shadow-[0_14px_34px_-22px_rgba(0,0,0,0.38)] backdrop-blur-md",
        "transition-colors duration-500"
      )}
    >
      <div className="flex items-center gap-2">
        <div
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-500",
            isNight
              ? "border-slate-400/20 bg-slate-700/20 text-slate-200"
              : "border-amber-300/40 bg-amber-100/80 text-amber-700"
          )}
        >
          <motion.div
            key={theme}
            initial={{ rotate: -18, opacity: 0, scale: 0.82 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
          >
            {isNight ? <Moon size={15} /> : <Sun size={15} />}
          </motion.div>
        </div>

        <div className="hidden sm:block">
          <p className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground/80">
            Theme
          </p>
          <p className="text-xs font-medium text-foreground">
            {isNight ? "Night mode" : "Day mode"}
          </p>
        </div>
      </div>

      <Switch
        checked={isNight}
        onCheckedChange={toggleTheme}
        aria-label={`Switch to ${isNight ? "day" : "night"} mode`}
      />
    </motion.div>
  );
};

export default ThemeToggle;