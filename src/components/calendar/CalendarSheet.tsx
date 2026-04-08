import { format } from "date-fns";

import { useCalendar } from "@/context/CalendarContext";
import CalendarGrid from "./CalendarGrid";
import HeroImage from "./HeroImage";
import CalendarFlipContainer from "./CalendarFlipContainer";

const CalendarSheet = () => {
  const { currentDate } = useCalendar();
  const pageKey = format(currentDate, "yyyy-MM");

  return (
    <div className="calendar-mounted relative">
      <div className="pointer-events-none absolute left-1/2 top-3 z-30 flex -translate-x-1/2 items-center gap-20 sm:gap-28">
        <span className="paper-pin" />
        <span className="paper-pin" />
      </div>

      <div className="calendar-paper-stack relative rounded-[2rem] p-[10px] sm:p-3">
        <div className="pointer-events-none absolute inset-x-5 top-4 h-full rounded-[1.75rem] bg-black/[0.035] blur-2xl dark:bg-black/[0.10]" />
        <div className="pointer-events-none absolute inset-x-3 top-2 h-full rounded-[1.75rem] border border-white/20 opacity-40" />

        <CalendarFlipContainer pageKey={pageKey}>
          <div className="relative overflow-hidden rounded-[1.75rem] border border-border/70 bg-card/95 shadow-[0_20px_60px_-28px_rgba(0,0,0,0.22)] backdrop-blur-sm transition-colors duration-500">
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.22),transparent_18%,transparent_82%,rgba(0,0,0,0.03))]" />
            <HeroImage />
            <CalendarGrid />
          </div>
        </CalendarFlipContainer>
      </div>
    </div>
  );
};

export default CalendarSheet;