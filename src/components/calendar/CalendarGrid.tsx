import {
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  startOfMonth,
  startOfWeek,
} from "date-fns";

import { useCalendar } from "@/context/CalendarContext";
import DayCell from "./DayCell";

const WEEK_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const CalendarGrid = () => {
  const { currentDate } = useCalendar();

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);

  const days = eachDayOfInterval({
    start: calendarStart,
    end: calendarEnd,
  });

  return (
    <div className="relative px-3 pb-4 pt-4 sm:px-4 sm:pb-5">
      <div className="overflow-hidden rounded-[1.55rem] border border-border/65 bg-background/45">
        <div className="grid grid-cols-7 border-b border-border/60 bg-background/70">
          {WEEK_DAYS.map((day) => (
            <div
              key={day}
              className="px-2 py-3 text-center text-[10px] font-medium uppercase tracking-[0.28em] text-foreground/65 sm:py-3.5"
            >
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-0 p-2 sm:p-2.5">
          {days.map((day) => (
            <DayCell
              key={format(day, "yyyy-MM-dd")}
              date={day}
              currentMonth={currentDate}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CalendarGrid;