import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, StickyNote } from "lucide-react";

import { useCalendar, Note } from "@/context/CalendarContext";
import NoteCard from "./NoteCard";
import NoteForm from "./NoteForm";

const NotesPanel = () => {
  const { notes } = useCalendar();

  const [formOpen, setFormOpen] = useState(false);
  const [editNote, setEditNote] = useState<Note | null>(null);

  const activeNotes = notes.filter((n) => !n.completed);
  const completedNotes = notes.filter((n) => n.completed);

  const handleEdit = (note: Note) => {
    setEditNote(note);
    setFormOpen(true);
  };

  const handleClose = () => {
    setFormOpen(false);
    setEditNote(null);
  };

  return (
    <div className="relative h-full">
      <div className="pointer-events-none absolute inset-0 rounded-[1.85rem] bg-black/[0.035] blur-2xl dark:bg-black/[0.10]" />

      <div className="relative overflow-hidden rounded-[1.85rem] border border-border/70 bg-card/88 shadow-[0_22px_60px_-28px_rgba(0,0,0,0.28)] backdrop-blur-md transition-colors duration-500">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.16),transparent_22%,transparent_80%,rgba(0,0,0,0.03))]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.38),transparent_70%)]" />

        <div className="relative flex h-full min-h-[640px] flex-col p-4 sm:p-5">
          <div className="mb-4 flex items-start justify-between gap-3 border-b border-border/60 pb-4">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-muted-foreground/75">
                Notes board
              </p>
              <h2 className="mt-2 font-serif text-2xl text-foreground">
                Pinned reminders
              </h2>
              <p className="mt-1 text-xs text-muted-foreground">
                Capture date-linked tasks without losing the calm.
              </p>
            </div>

            <motion.button
              type="button"
              whileHover={{ y: -2, rotate: 8, scale: 1.02 }}
              whileTap={{ scale: 0.96, rotate: 0 }}
              onClick={() => {
                setEditNote(null);
                setFormOpen((prev) => !prev);
              }}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border/70 bg-background/75 text-foreground shadow-[0_14px_30px_-18px_rgba(0,0,0,0.24)] transition-colors duration-200 hover:bg-background/95"
              aria-label={formOpen ? "Close note form" : "Add note"}
            >
              <Plus size={18} />
            </motion.button>
          </div>

          <NoteForm open={formOpen} onClose={handleClose} editNote={editNote} />

          <div className="relative min-h-0 flex-1 overflow-hidden">
            <div className="h-full overflow-y-auto pr-1 custom-scroll">
              <motion.div
                layout
                className="space-y-3"
                transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
              >
                <AnimatePresence mode="popLayout">
                  {activeNotes.map((note, index) => (
                    <motion.div
                      key={note.id}
                      layout
                      initial={{ opacity: 0, y: 18, rotate: index % 2 === 0 ? -1 : 1 }}
                      animate={{ opacity: 1, y: 0, rotate: 0 }}
                      exit={{ opacity: 0, y: -12, scale: 0.96 }}
                      transition={{
                        duration: 0.24,
                        delay: index * 0.02,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <NoteCard note={note} onEdit={handleEdit} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>

              {activeNotes.length === 0 && !formOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex min-h-[260px] flex-col items-center justify-center rounded-[1.5rem] border border-dashed border-border/70 bg-background/35 px-6 text-center"
                >
                  <div className="rounded-full border border-border/60 bg-background/70 p-4 shadow-[0_10px_30px_-20px_rgba(0,0,0,0.22)]">
                    <StickyNote size={28} strokeWidth={1.6} className="text-muted-foreground/75" />
                  </div>

                  <h3 className="mt-4 font-serif text-xl text-foreground">
                    No active notes yet
                  </h3>
                  <p className="mt-2 max-w-[24ch] text-sm text-muted-foreground">
                    Select a date range on the calendar and add a note to pin it here.
                  </p>
                </motion.div>
              )}

              {completedNotes.length > 0 && (
                <div className="mt-6 border-t border-border/60 pt-5">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-muted-foreground/75">
                      Completed
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      {completedNotes.length} archived
                    </p>
                  </div>

                  <motion.div
                    layout
                    className="space-y-3"
                    transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <AnimatePresence mode="popLayout">
                      {completedNotes.map((note) => (
                        <motion.div
                          key={note.id}
                          layout
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8, scale: 0.98 }}
                          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                        >
                          <NoteCard note={note} onEdit={handleEdit} />
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </motion.div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotesPanel;