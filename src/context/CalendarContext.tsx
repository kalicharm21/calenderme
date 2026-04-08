import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import {
  isSameDay,
  isWithinInterval,
  isBefore,
  startOfDay,
} from "date-fns";

export type NoteColor = "rose" | "sky" | "amber" | "sage" | "lavender";
export type AppTheme = "day" | "night";

export interface Note {
  id: string;
  title: string;
  description: string;
  color: NoteColor;
  startDate: string;
  endDate: string | null;
  completed: boolean;
  createdAt: string;
}

interface SelectedRange {
  start: Date | null;
  end: Date | null;
}

interface CalendarContextType {
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
  setMonthWithDirection: (date: Date, direction: 1 | -1) => void;
  monthDirection: 1 | -1;
  isFlipping: boolean;
  setIsFlipping: (value: boolean) => void;

  theme: AppTheme;
  setTheme: (theme: AppTheme) => void;
  toggleTheme: () => void;

  selectedRange: SelectedRange;
  handleDateClick: (date: Date) => void;
  clearSelection: () => void;

  notes: Note[];
  addNote: (
    note: Omit<Note, "id" | "createdAt">
  ) => void;
  updateNote: (
    id: string,
    updates: Partial<Omit<Note, "id" | "createdAt">>
  ) => void;
  deleteNote: (id: string) => void;
  toggleComplete: (id: string) => void;

  editingNoteId: string | null;
  setEditingNoteId: (id: string | null) => void;

  hoveredNoteId: string | null;
  setHoveredNoteId: (id: string | null) => void;

  isDateInRange: (date: Date) => boolean;
  isDateStart: (date: Date) => boolean;
  isDateEnd: (date: Date) => boolean;
  getNotesForDate: (date: Date) => Note[];
}

const CalendarContext = createContext<CalendarContextType | null>(null);

export const useCalendar = () => {
  const ctx = useContext(CalendarContext);
  if (!ctx) {
    throw new Error("useCalendar must be used within CalendarProvider");
  }
  return ctx;
};

const NOTES_KEY = "wall-calendar-notes";
const THEME_KEY = "wall-calendar-theme";
const RANGE_KEY = "wall-calendar-range";

export const CalendarProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentDate, setCurrentDateState] = useState(new Date());
  const [monthDirection, setMonthDirection] = useState<1 | -1>(1);
  const [isFlipping, setIsFlipping] = useState(false);

  const [theme, setThemeState] = useState<AppTheme>(() => {
    try {
      const savedTheme = localStorage.getItem(THEME_KEY) as AppTheme | null;
      return savedTheme === "night" ? "night" : "day";
    } catch {
      return "day";
    }
  });

  const [selectionState, setSelectionState] = useState<0 | 1 | 2>(0);

  const [selectedRange, setSelectedRange] = useState<SelectedRange>(() => {
    try {
      const saved = localStorage.getItem(RANGE_KEY);
      if (!saved) return { start: null, end: null };

      const parsed = JSON.parse(saved);
      return {
        start: parsed?.start ? new Date(parsed.start) : null,
        end: parsed?.end ? new Date(parsed.end) : null,
      };
    } catch {
      return { start: null, end: null };
    }
  });

  const [notes, setNotes] = useState<Note[]>(() => {
    try {
      const saved = localStorage.getItem(NOTES_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [hoveredNoteId, setHoveredNoteId] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem(
      RANGE_KEY,
      JSON.stringify({
        start: selectedRange.start?.toISOString() ?? null,
        end: selectedRange.end?.toISOString() ?? null,
      })
    );
  }, [selectedRange]);

  useEffect(() => {
    localStorage.setItem(THEME_KEY, theme);
    document.documentElement.classList.toggle("dark", theme === "night");
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    if (!selectedRange.start && !selectedRange.end) {
      setSelectionState(0);
      return;
    }

    if (selectedRange.start && !selectedRange.end) {
      setSelectionState(1);
      return;
    }

    if (selectedRange.start && selectedRange.end) {
      setSelectionState(2);
    }
  }, [selectedRange]);

  const setCurrentDate = useCallback((date: Date) => {
    setCurrentDateState(date);
  }, []);

  const setMonthWithDirection = useCallback(
    (date: Date, direction: 1 | -1) => {
      setMonthDirection(direction);
      setCurrentDateState(date);
    },
    []
  );

  const setTheme = useCallback((nextTheme: AppTheme) => {
    setThemeState(nextTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => (prev === "day" ? "night" : "day"));
  }, []);

  const handleDateClick = useCallback(
    (date: Date) => {
      const d = startOfDay(date);

      if (selectionState === 0) {
        setSelectedRange({ start: d, end: null });
        setSelectionState(1);
      } else if (selectionState === 1) {
        const start = selectedRange.start!;
        if (isBefore(d, start)) {
          setSelectedRange({ start: d, end: start });
        } else {
          setSelectedRange({ start, end: d });
        }
        setSelectionState(2);
      } else {
        setSelectedRange({ start: null, end: null });
        setSelectionState(0);
      }
    },
    [selectionState, selectedRange.start]
  );

  const clearSelection = useCallback(() => {
    setSelectedRange({ start: null, end: null });
    setSelectionState(0);
  }, []);

  const isDateInRange = useCallback(
    (date: Date) => {
      const { start, end } = selectedRange;
      if (!start) return false;
      if (!end) return isSameDay(date, start);

      return isWithinInterval(startOfDay(date), {
        start: startOfDay(start),
        end: startOfDay(end),
      });
    },
    [selectedRange]
  );

  const isDateStart = useCallback(
    (date: Date) => {
      return selectedRange.start ? isSameDay(date, selectedRange.start) : false;
    },
    [selectedRange.start]
  );

  const isDateEnd = useCallback(
    (date: Date) => {
      return selectedRange.end ? isSameDay(date, selectedRange.end) : false;
    },
    [selectedRange.end]
  );

  const getNotesForDate = useCallback(
    (date: Date) => {
      const d = startOfDay(date);

      return notes.filter((n) => {
        if (n.completed) return false;

        const s = startOfDay(new Date(n.startDate));
        if (!n.endDate) return isSameDay(d, s);

        const e = startOfDay(new Date(n.endDate));
        return isWithinInterval(d, { start: s, end: e });
      });
    },
    [notes]
  );

  const addNote = useCallback((note: Omit<Note, "id" | "createdAt">) => {
    setNotes((prev) => [
      ...prev,
      {
        ...note,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
      },
    ]);
  }, []);

  const updateNote = useCallback(
    (id: string, updates: Partial<Omit<Note, "id" | "createdAt">>) => {
      setNotes((prev) =>
        prev.map((n) => (n.id === id ? { ...n, ...updates } : n))
      );
    },
    []
  );

  const deleteNote = useCallback((id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const toggleComplete = useCallback((id: string) => {
    setNotes((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, completed: !n.completed } : n
      )
    );
  }, []);

  return (
    <CalendarContext.Provider
      value={{
        currentDate,
        setCurrentDate,
        setMonthWithDirection,
        monthDirection,
        isFlipping,
        setIsFlipping,
        theme,
        setTheme,
        toggleTheme,
        selectedRange,
        handleDateClick,
        clearSelection,
        notes,
        addNote,
        updateNote,
        deleteNote,
        toggleComplete,
        editingNoteId,
        setEditingNoteId,
        hoveredNoteId,
        setHoveredNoteId,
        isDateInRange,
        isDateStart,
        isDateEnd,
        getNotesForDate,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};