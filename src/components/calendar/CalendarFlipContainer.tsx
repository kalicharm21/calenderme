import { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useCalendar } from "@/context/CalendarContext";

interface CalendarFlipContainerProps {
  pageKey: string;
  children: ReactNode;
}

const CalendarFlipContainer = ({
  pageKey,
  children,
}: CalendarFlipContainerProps) => {
  const { monthDirection, setIsFlipping } = useCalendar();

  return (
    <div
      className="relative"
      style={{
        perspective: "1800px",
        transformStyle: "preserve-3d",
      }}
    >
      <div className="pointer-events-none absolute inset-x-5 top-2 z-0 h-4 rounded-full bg-black/6 blur-xl dark:bg-black/20" />
      <div className="pointer-events-none absolute inset-x-4 top-3 z-0 h-full rounded-[2rem] bg-black/[0.03] blur-2xl dark:bg-black/[0.10]" />

      <AnimatePresence
        mode="wait"
        initial={false}
        onExitComplete={() => setIsFlipping(false)}
      >
        <motion.div
          key={pageKey}
          initial={{
            opacity: 0.88,
            rotateX: monthDirection === 1 ? 10 : -10,
            y: monthDirection === 1 ? 20 : -12,
            scale: 0.985,
            filter: "drop-shadow(0px 12px 24px rgba(0,0,0,0.08))",
          }}
          animate={{
            opacity: 1,
            rotateX: 0,
            y: 0,
            scale: 1,
            filter: "drop-shadow(0px 18px 34px rgba(0,0,0,0.10))",
          }}
          exit={{
            opacity: 0.58,
            rotateX: monthDirection === 1 ? -86 : 86,
            y: monthDirection === 1 ? -18 : 18,
            scale: 0.992,
            filter: "drop-shadow(0px 28px 42px rgba(0,0,0,0.16))",
          }}
          transition={{
            duration: 0.72,
            ease: [0.22, 1, 0.36, 1],
          }}
          onAnimationStart={() => setIsFlipping(true)}
          style={{
            transformOrigin: "top center",
            transformStyle: "preserve-3d",
            backfaceVisibility: "hidden",
            willChange: "transform, opacity, filter",
          }}
          className="relative z-10"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default CalendarFlipContainer;