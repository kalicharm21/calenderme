import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { format } from "date-fns";
import { X } from "lucide-react";

import { useCalendar, NoteColor, Note } from "@/context/CalendarContext";
import { cn } from "@/lib/utils";

const COLORS: NoteColor[] = ["rose", "sky", "amber", "sage", "lavender"];

const colorClassMap: Record<NoteColor, string> = {
  rose: "bg-note-rose",
  sky: "bg-note-sky",
  amber: "bg-note-amber",
  sage: "bg-note-sage",
  lavender: "bg-note-lavender",
};

interface NoteFormProps {
  open: boolean;
  onClose: () => void;
  editNote?: Note | null;
}

const NoteForm = ({ open, onClose, editNote }: NoteFormProps) => {
  const { selectedRange, addNote, updateNote, clearSelection } = useCalendar();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState<NoteColor>("amber");

  useEffect(() => {
    if (editNote) {
      setTitle(editNote.title);
      setDescription(editNote.description);
      setColor(editNote.color);
    } else {
      setTitle("");
      setDescription("");
      setColor("amber");
    }
  }, [editNote, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (editNote) {
      updateNote(editNote.id, {
        title,
        description,
        color,
      });
    } else {
      const startDate = selectedRange.start
        ? selectedRange.start.toISOString()
        : new Date().toISOString();

      const endDate = selectedRange.end
        ? selectedRange.end.toISOString()
        : null;

      addNote({
        title,
        description,
        color,
        startDate,
        endDate,
        completed: false,
      });

      clearSelection();
    }

    onClose();
  };

  const dateLabel = editNote
    ? editNote.endDate
      ? `${format(new Date(editNote.startDate), "MMM d")} – ${format(
          new Date(editNote.endDate),
          "MMM d"
        )}`
      : format(new Date(editNote.startDate), "MMM d")
    : selectedRange.start
    ? selectedRange.end
      ? `${format(selectedRange.start, "MMM d")} – ${format(
          selectedRange.end,
          "MMM d"
        )}`
      : format(selectedRange.start, "MMM d")
    : "Today";

  return (
    <AnimatePresence initial={false}>
      {open && (
        <motion.form
          initial={{ opacity: 0, y: -10, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.985 }}
          transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
          onSubmit={handleSubmit}
          className="relative mb-4 overflow-hidden rounded-[1.5rem] border border-border/70 bg-background/78 shadow-[0_18px_40px_-24px_rgba(0,0,0,0.25)] backdrop-blur-sm"
        >
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.22),transparent_20%,transparent_80%,rgba(0,0,0,0.03))]" />
          <div className="pointer-events-none absolute left-1/2 top-1 z-10 h-5 w-16 -translate-x-1/2 rotate-[-2deg] rounded-sm border border-white/20 bg-white/35 shadow-sm backdrop-blur-[1px]" />

          <div className="relative z-10 p-4 sm:p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground/75">
                  {editNote ? "Edit note" : "New note"}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {dateLabel}
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-background/70 hover:text-foreground"
                aria-label="Close note form"
              >
                <X size={14} />
              </button>
            </div>

            <div className="mt-4 space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Note title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full border-0 border-b border-border/80 bg-transparent pb-2 text-sm font-medium text-foreground outline-none placeholder:text-muted-foreground/55 focus:border-foreground/30"
                  autoFocus
                />
              </div>

              <div>
                <textarea
                  placeholder="Description (optional)"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="w-full resize-none rounded-2xl border border-border/65 bg-background/45 px-3 py-2.5 text-xs leading-relaxed text-foreground outline-none placeholder:text-muted-foreground/55 focus:border-foreground/25"
                />
              </div>

              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  {COLORS.map((c) => (
                    <motion.button
                      key={c}
                      type="button"
                      whileHover={{ y: -1, scale: 1.08 }}
                      whileTap={{ scale: 0.94 }}
                      onClick={() => setColor(c)}
                      className={cn(
                        "relative h-6 w-6 rounded-full border border-black/5 shadow-sm transition-all",
                        colorClassMap[c],
                        color === c
                          ? "ring-2 ring-foreground/20 ring-offset-2 ring-offset-background"
                          : "opacity-80"
                      )}
                      aria-label={`Choose ${c} note color`}
                    >
                      {color === c && (
                        <span className="absolute inset-[22%] rounded-full border border-white/70" />
                      )}
                    </motion.button>
                  ))}
                </div>

                <button
                  type="submit"
                  className="rounded-full bg-primary px-4 py-2 text-xs font-medium tracking-[0.12em] text-primary-foreground shadow-[0_16px_24px_-18px_rgba(0,0,0,0.28)] transition-all duration-200 hover:translate-y-[-1px] hover:shadow-[0_20px_26px_-18px_rgba(0,0,0,0.32)]"
                >
                  {editNote ? "Save Note" : "Add Note"}
                </button>
              </div>
            </div>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
};

export default NoteForm;