import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { Check, Pencil, Trash2, Undo2 } from "lucide-react";

import { useCalendar, Note, NoteColor } from "@/context/CalendarContext";
import { cn } from "@/lib/utils";

const colorClasses: Record<NoteColor, string> = {
  rose: "bg-note-rose/95",
  sky: "bg-note-sky/95",
  amber: "bg-note-amber/95",
  sage: "bg-note-sage/95",
  lavender: "bg-note-lavender/95",
};

const tapeClasses: Record<NoteColor, string> = {
  rose: "bg-rose-100/55",
  sky: "bg-sky-100/55",
  amber: "bg-amber-100/55",
  sage: "bg-emerald-100/55",
  lavender: "bg-violet-100/55",
};

const pinClasses: Record<NoteColor, string> = {
  rose: "bg-rose-300/90",
  sky: "bg-sky-300/90",
  amber: "bg-amber-300/90",
  sage: "bg-emerald-300/90",
  lavender: "bg-violet-300/90",
};

interface NoteCardProps {
  note: Note;
  onEdit: (note: Note) => void;
}

const getStableTilt = (id: string) => {
  let hash = 0;
  for (let i = 0; i < id.length; i += 1) {
    hash = (hash << 5) - hash + id.charCodeAt(i);
    hash |= 0;
  }

  const values = [-2.8, -1.9, -1.2, -0.6, 0.6, 1.1, 1.8, 2.6];
  return values[Math.abs(hash) % values.length];
};

const NoteCard = ({ note, onEdit }: NoteCardProps) => {
  const { deleteNote, toggleComplete, setHoveredNoteId } = useCalendar();
  const [showDelete, setShowDelete] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const rotation = useMemo(() => getStableTilt(note.id), [note.id]);

  const dateLabel = note.endDate
    ? `${format(new Date(note.startDate), "MMM d")} – ${format(
        new Date(note.endDate),
        "MMM d"
      )}`
    : format(new Date(note.startDate), "MMM d");

  return (
    <motion.article
      layout
      onMouseEnter={() => setHoveredNoteId(note.id)}
      onMouseLeave={() => {
        setHoveredNoteId(null);
        setShowDelete(false);
      }}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      whileHover={{
        y: -5,
        scale: 1.018,
        rotate: note.completed ? 0 : rotation * 0.42,
      }}
      whileTap={{ scale: 0.992 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      style={{
        rotate: `${note.completed ? 0 : isFocused ? rotation * 0.25 : rotation}deg`,
        zIndex: isFocused ? 20 : note.completed ? 1 : 5,
      }}
      className={cn(
        "group relative origin-top transition-[filter] duration-300",
        note.completed ? "opacity-70 saturate-[0.76]" : "opacity-100"
      )}
      tabIndex={0}
    >
      <div
        className={cn(
          "sticky-note relative overflow-hidden rounded-[1.35rem] border border-black/5 p-4 pt-5",
          "shadow-[0_20px_32px_-18px_rgba(0,0,0,0.28),0_10px_14px_-12px_rgba(0,0,0,0.18)]",
          "transition-all duration-300",
          colorClasses[note.color],
          note.completed && "shadow-[0_12px_20px_-16px_rgba(0,0,0,0.18)]"
        )}
      >
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.20),transparent_22%,transparent_72%,rgba(0,0,0,0.04))]" />
        <div className="pointer-events-none absolute inset-x-4 top-0 h-8 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.42),transparent_72%)]" />

        <div className="pointer-events-none absolute left-1/2 top-2 z-20 -translate-x-1/2">
          <span
            className={cn(
              "block h-3.5 w-3.5 rounded-full border border-white/55 shadow-[0_2px_10px_rgba(0,0,0,0.16)]",
              pinClasses[note.color]
            )}
          />
        </div>

        <div
          className={cn(
            "pointer-events-none absolute left-1/2 top-1 z-10 h-5 w-16 -translate-x-1/2 rotate-[-2deg] rounded-sm border border-white/20 shadow-sm backdrop-blur-[1px]",
            tapeClasses[note.color]
          )}
        />

        <div className="relative z-10">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <h4
                className={cn(
                  "line-clamp-2 font-sans text-[15px] font-semibold leading-snug text-foreground",
                  note.completed && "line-through text-foreground/70"
                )}
              >
                {note.title}
              </h4>

              {note.description && (
                <p
                  className={cn(
                    "mt-2 line-clamp-4 text-xs leading-relaxed text-foreground/75",
                    note.completed && "line-through text-foreground/55"
                  )}
                >
                  {note.description}
                </p>
              )}
            </div>

            <div className="flex shrink-0 items-start gap-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100">
              {!note.completed && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.92 }}
                  onClick={() => onEdit(note)}
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-white/45 text-foreground/80 backdrop-blur-sm transition-colors hover:bg-white/70"
                  aria-label="Edit note"
                  type="button"
                >
                  <Pencil size={13} />
                </motion.button>
              )}

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.92 }}
                onClick={() => toggleComplete(note.id)}
                className="flex h-7 w-7 items-center justify-center rounded-full bg-white/45 text-foreground/80 backdrop-blur-sm transition-colors hover:bg-white/70"
                aria-label={note.completed ? "Mark as not done" : "Mark as done"}
                type="button"
              >
                {note.completed ? <Undo2 size={13} /> : <Check size={13} />}
              </motion.button>

              {!showDelete ? (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.92 }}
                  onClick={() => setShowDelete(true)}
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-white/45 text-foreground/80 backdrop-blur-sm transition-colors hover:bg-white/70 hover:text-destructive"
                  aria-label="Delete note"
                  type="button"
                >
                  <Trash2 size={13} />
                </motion.button>
              ) : (
                <motion.button
                  initial={{ scale: 0.92, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  onClick={() => deleteNote(note.id)}
                  className="rounded-full bg-destructive px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-destructive-foreground shadow-sm"
                  type="button"
                >
                  Delete
                </motion.button>
              )}
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between gap-3 border-t border-black/5 pt-3">
            <span className="text-[10px] uppercase tracking-[0.22em] text-foreground/55">
              {dateLabel}
            </span>

            <span
              className={cn(
                "inline-flex rounded-full px-2 py-1 text-[10px] uppercase tracking-[0.22em]",
                note.completed
                  ? "bg-black/5 text-foreground/45"
                  : "bg-white/35 text-foreground/60"
              )}
            >
              {note.completed ? "Done" : "Pinned"}
            </span>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

export default NoteCard;