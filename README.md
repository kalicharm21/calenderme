# CalenderMe — Interactive Wall Calendar Component

## Frontend Engineering Challenge Submission

CalenderMe is a high-fidelity interactive calendar component built using React and TypeScript. The project translates a static wall calendar design into a functional, responsive, and production-ready frontend system.

The implementation focuses on clean component architecture, predictable state management, smooth interaction design, and performance optimization while strictly adhering to a frontend-only scope.

---

## Links

- Live Demo: https://calendernotesme.vercel.app/
- Video Demonstration: <ADD_LOOM_LINK>
- Source Code: <ADD_GITHUB_LINK>

---

## Core Requirements Implementation

### Wall Calendar Aesthetic
- Structured layout combining visual section and calendar grid
- Clear visual hierarchy between elements
- Use of shadows and spacing to simulate depth

### Day Range Selector
- Supports start and end date selection
- Distinct visual states:
  - Start date
  - End date
  - Intermediate range
- Smooth transitions between states

### Notes Section
- Notes associated with dates or date ranges
- Full CRUD functionality
- Inline editing and updates

### Responsive Design
- Desktop: Split layout (calendar + notes)
- Tablet: Compact split layout
- Mobile: Fully stacked layout with touch support
- No loss of functionality across breakpoints

---

## Technical Stack

**Frontend**
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- React Three Fiber

**Utilities**
- date-fns

**Tooling**
- Vite
- ESLint
- TypeScript Compiler

---

## Project Structure
src/
├── components/
│ ├── calendar/
│ ├── notes/
│ └── Index.tsx
├── context/
│ └── CalendarContext.tsx
├── utils/
└── styles/

---

## State Management

- Implemented using React Context with useReducer
- Centralized state handling:
  - Selected date range
  - Notes data
  - Theme configuration
- Ensures predictable and scalable state updates

---

## Key Technical Decisions

### State Handling
- Context API chosen to avoid unnecessary dependencies
- Reducer pattern ensures maintainability and clarity

### Animation
- Framer Motion used for layout transitions and interaction feedback
- Controlled animation lifecycle using AnimatePresence

### Rendering
- React Three Fiber used for background rendering
- Optimized with demand-based render loop

### Persistence
- localStorage used for client-side persistence
- No backend or external APIs used

---

## Performance

- Optimized rendering to minimize re-renders
- Efficient animation handling
- Lightweight bundle with modular components
- Stable layout with minimal layout shifts

---

## Responsiveness

| Device   | Layout        |
|----------|---------------|
| Mobile   | Stacked       |
| Tablet   | Split (60/40) |
| Desktop  | Split (75/25) |

---

## Running Locally

```bash
git clone (https://github.com/kalicharm21/calenderme/)
cd calenderme
npm install
npm run dev

Author

Ishaan Mittal
