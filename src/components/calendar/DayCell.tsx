import { motion } from "framer-motion";
import { format, isSameMonth, isToday } from "date-fns";

import { useCalendar } from "@/context/CalendarContext";
import { cn } from "@/lib/utils";

interface DayCellProps {
  date: Date;
  currentMonth: Date;
}

const DayCell = ({ date, currentMonth }: DayCellProps) => {
  const {
    handleDateClick,
    isDateInRange,
    isDateStart,
    isDateEnd,
    getNotesForDate,
  } = useCalendar();

  const inMonth = isSameMonth(date, currentMonth);
  const isCurrentDay = isToday(date);
  const inRange = isDateInRange(date);
  const isStart = isDateStart(date);
  const isEnd = isDateEnd(date);
  const notes = getNotesForDate(date);
  const hasNotes = notes.length > 0;

  const rangeEdgeClass =
    isStart && isEnd
      ? "rounded-[1.2rem]"
      : isStart
      ? "rounded-l-[1.2rem] rounded-r-md"
      : isEnd
      ? "rounded-r-[1.2rem] rounded-l-md"
      : "rounded-md";

  return (
    <div className="relative min-h-[78px] px-1 py-1 sm:min-h-[92px] sm:px-1.5 sm:py-1.5">
      {inRange && (
        <div
          className={cn(
            "pointer-events-none absolute inset-y-2 left-0 right-0 bg-calendar-range/80",
            rangeEdgeClass
          )}
        />
      )}

      <motion.button
        type="button"
        whileHover={{ y: -2, scale: 1.01 }}
        whileTap={{ scale: 0.985 }}
        transition={{ duration: 0.18 }}
        onClick={() => handleDateClick(date)}
        className={cn(
          "relative z-10 flex h-full min-h-[70px] w-full flex-col items-start justify-between rounded-[1.2rem] px-3 py-2 text-left transition-all duration-200",
          "border border-transparent",
          inMonth ? "text-foreground" : "text-muted-foreground/75",
          !inRange && "hover:border-border/80 hover:bg-calendar-hover/90",
inRange && !isStart && !isEnd && "bg-black/[0.045] dark:bg-white/[0.08]",
          (isStart || isEnd) &&
            "bg-calendar-selected text-foreground shadow-[0_14px_24px_-18px_rgba(0,0,0,0.26)]",
          isCurrentDay &&
            !isStart &&
            !isEnd &&
            "border-border/80 bg-background/66 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.03)]"
        )}
        aria-label={format(date, "MMMM d, yyyy")}
      >
        <div className="flex w-full items-start justify-between gap-2">
          <span
            className={cn(
              "inline-flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-colors",
              isStart || isEnd
                ? "bg-foreground text-background shadow-sm"
                : isCurrentDay
                ? "bg-primary/10 text-foreground"
                : "bg-transparent"
            )}
          >
            {format(date, "d")}
          </span>

          {hasNotes && (
            <div className="mt-1 flex items-center gap-1">
              {notes.slice(0, 3).map((note) => (
                <span
                  key={note.id}
                  className="h-1.5 w-1.5 rounded-full bg-foreground/45"
                />
              ))}
            </div>
          )}
        </div>

        <div className="w-full">
          {isCurrentDay && (
            <span className="text-[10px] uppercase tracking-[0.24em] text-muted-foreground/70">
              Today
            </span>
          )}

          {!isCurrentDay && hasNotes && (
            <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground/55">
              {notes.length} note{notes.length > 1 ? "s" : ""}
            </span>
          )}
        </div>
      </motion.button>
    </div>
  );
};

export default DayCell;