// import { AnimatePresence, motion } from "framer-motion";
// import { useCalendar } from "@/context/CalendarContext";
// import { cn } from "@/lib/utils";
// // import { AnimatePresence, motion } from "framer-motion";

// const CelestialObject = () => {
//   const { theme } = useCalendar();
//   const isNight = theme === "night";

//   return (
//     <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex justify-end px-5 pt-5 sm:px-7 sm:pt-7 lg:px-10 lg:pt-8">
//       <div className="relative h-20 w-20 sm:h-24 sm:w-24">
//         <AnimatePresence mode="wait" initial={false}>
//           {isNight ? (
//             <motion.div
//               key="moon"
//               initial={{ opacity: 0, x: 26, y: -18, scale: 0.82, rotate: -10 }}
//               animate={{ opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 }}
//               exit={{ opacity: 0, x: -18, y: 16, scale: 0.9, rotate: 8 }}
//               transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
//               className="absolute right-0 top-0"
//             >
//               <motion.div
//                 animate={{ y: [0, -2, 0] }}
//                 transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
//                 className={cn(
//                   "relative h-14 w-14 rounded-full sm:h-16 sm:w-16",
//                   "bg-[radial-gradient(circle_at_35%_35%,rgba(255,255,255,0.96),rgba(221,229,241,0.92)_48%,rgba(180,194,220,0.84)_72%,rgba(127,145,177,0.72)_100%)]",
//                   "shadow-[0_0_30px_rgba(195,210,240,0.18),0_12px_32px_rgba(7,12,24,0.18)]"
//                 )}
//               >
//                 <div className="absolute inset-[18%] rounded-full border border-white/10" />
//                 <div className="absolute right-[16%] top-[18%] h-2.5 w-2.5 rounded-full bg-slate-500/10 blur-[1px]" />
//                 <div className="absolute left-[26%] top-[38%] h-1.5 w-1.5 rounded-full bg-slate-600/10" />
//               </motion.div>
//             </motion.div>
//           ) : (
//             <motion.div
//               key="sun"
//               initial={{ opacity: 0, x: -24, y: -16, scale: 0.8, rotate: 10 }}
//               animate={{ opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 }}
//               exit={{ opacity: 0, x: 18, y: 14, scale: 0.92, rotate: -8 }}
//               transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
//               className="absolute right-0 top-0"
//             >
//               <motion.div
//                 animate={{ y: [0, -2, 0] }}
//                 transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
//                 className={cn(
//                   "relative h-14 w-14 rounded-full sm:h-16 sm:w-16",
//                   "bg-[radial-gradient(circle_at_35%_35%,rgba(255,248,210,1),rgba(251,223,144,0.98)_44%,rgba(232,182,89,0.96)_74%,rgba(198,141,53,0.92)_100%)]",
//                   "shadow-[0_0_36px_rgba(246,210,123,0.22),0_10px_30px_rgba(122,84,31,0.14)]"
//                 )}
//               >
//                 <div className="absolute inset-[-14%] rounded-full border border-amber-200/20" />
//                 <div className="absolute inset-[-28%] rounded-full border border-amber-100/10" />
//               </motion.div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// };

// export default CelestialObject;