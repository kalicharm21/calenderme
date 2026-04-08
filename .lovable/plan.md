

## Wall Calendar Web App — Updated Plan

### Overview
A calm, minimal, premium digital wall calendar mimicking a real physical paper calendar. Two-column desktop layout (75/25), stacked on mobile. localStorage for persistence. Interactive note management with full CRUD and completion tracking.

### Design System
- Colors: Off-white (#FAF9F6, #F5F0EB), warm grays, soft beige borders
- Typography: Serif for month headers, sans-serif for body
- Shadows: Paper-like depth on calendar sheet and note cards
- Accents: Soft pastels for note color tags and date highlights

### Layout
- Desktop: max-w-[1280px] centered, grid 3fr/1fr
- Mobile: Single column, calendar above notes

### Calendar Sheet (Left 75%)
1. Hero section with seasonal Unsplash image, dark overlay, month + year
2. 7-column calendar grid with weekday headers
3. Date range selection: click start → click end → click resets
4. Notes-linked dates show color-coded dots/highlights

### Notes Panel (Right 25%) — Full CRUD + Interactions

**Add Note:**
- Inline expandable form or modal triggered by "+" button
- Fields: title, description, color tag (5 pastel options), linked date/range
- Smooth slide-down animation on open

**Edit Note:**
- Click edit icon on any note card to toggle inline editing
- Pre-filled form with save/cancel actions
- Subtle highlight animation while editing

**Delete Note:**
- Trash icon with confirmation tooltip ("Are you sure?")
- Framer Motion exit animation (fade + slide out)
- Removes associated date highlights from calendar

**Mark as Done:**
- Checkbox or "Done" button on each note card
- Completed notes get:
  - Strikethrough on title and description
  - Faded opacity (50%)
  - Moved to "Completed" section at bottom of panel
  - Calendar date highlights removed
- Toggle back to active by unchecking

**Interactive Enhancements:**
- Hover effects on note cards (slight lift shadow)
- Drag-feel reordering visual feedback
- Color tag picker with animated dot selection
- Date cells pulse subtly when hovering a linked note
- Clicking a highlighted date scrolls to / highlights its note in the panel
- Smooth Framer Motion transitions for all state changes (add, edit, delete, complete)
- Empty state illustration when no notes exist

### Seasonal Images
Curated Unsplash URLs mapped by month (winter: Dec-Feb, spring: Mar-May, summer: Jun-Aug, autumn: Sep-Nov)

### Components
- `CalendarSheet` — paper wrapper with shadow/border
- `HeroImage` — seasonal image + overlay + month title
- `CalendarGrid` — 7-col grid
- `DayCell` — date with selection/highlight/dot states
- `NotesPanel` — sidebar with note list, form, completed section
- `NoteCard` — card with edit/delete/done actions, strikethrough state
- `NoteForm` — create/edit form with color picker + date linking
- `DeleteConfirm` — small confirmation tooltip
- `DateRangeContext` — React context for selection + notes state

### Data (localStorage)
```text
notes: [{
  id, title, description, color,
  startDate, endDate, completed, createdAt
}]
selectedRange: { start, end }
```

### Tech
- React + Vite + TypeScript + Tailwind CSS
- Framer Motion for animations
- date-fns for date logic
- localStorage for persistence

