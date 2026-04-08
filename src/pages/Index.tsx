import { CalendarProvider } from "@/context/CalendarContext";
import CalendarSheet from "@/components/calendar/CalendarSheet";
import NotesPanel from "@/components/calendar/NotesPanel";
import ThemeToggle from "@/components/calendar/ThemeToggle";
// import CelestialObject from "@/components/calendar/CelestialObject";

const Index = () => {
  return (
    <CalendarProvider>
      <main className="relative min-h-screen overflow-hidden bg-background text-foreground transition-colors duration-500">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.45),_transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.10),transparent_24%,rgba(0,0,0,0.03))]" />
{/* <CelestialObject /> */}
        <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1560px] items-center justify-center px-4 py-6 sm:px-6 sm:py-8 lg:px-10 lg:py-10">
          <div className="w-full">
            <div className="mb-5 flex items-start justify-between gap-4 lg:mb-6">
              <div className="max-w-xl">
                <p className="text-[10px] font-sans uppercase tracking-[0.32em] text-muted-foreground/75">
                  Wall Calendar
                </p>
                <h1 className="mt-2 font-serif text-2xl leading-tight text-foreground sm:text-3xl">
                  A calm planning space with depth, paper, and light
                </h1>
              </div>

              <div className="flex items-center justify-end">
  <ThemeToggle />
</div>
            </div>

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,3fr)_minmax(320px,1fr)] xl:gap-7 2xl:gap-8">
              <section className="min-w-0">
                <CalendarSheet />
              </section>

              <aside className="min-w-0">
                <NotesPanel />
              </aside>
            </div>
          </div>
        </div>
      </main>
    </CalendarProvider>
  );
};

export default Index;