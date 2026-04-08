import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCalendar } from '@/context/CalendarContext';

const seasonalImages: Record<number, string> = {
  0: 'https://images.unsplash.com/photo-1457269449834-928af64c684d?w=1200&q=80',
  1: 'https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=1200&q=80',
  2: 'https://cdn.kimkim.com/files/a/content_articles/featured_photos/cba29b267a63a0220374262779d8947314167721/big-aa517c323d9f44efa3729e953eb83419.jpg',
  3: 'https://www.zicasso.com/static/051d2ec557c69d6cae4ee23d9e85a5cb/7d056/051d2ec557c69d6cae4ee23d9e85a5cb.jpg',
  4: 'https://travelogyindia.b-cdn.net/blog/wp-content/uploads/2019/12/Ooty-South-India-in-June-1024x768.jpg',
  5: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80',
  6: 'https://static.vecteezy.com/system/resources/thumbnails/030/530/458/small_2x/house-in-the-middle-of-the-forest-in-the-rainy-season-photo.jpg',
  7: 'https://www.tripsavvy.com/thmb/gxB-68bglstUL93GbogyuXWDJIg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/cape-cod-sunset-GettyImages-468491788-dfe4a080432f45d8ad2b40ee801969e3.jpg',
  8: 'https://klima.al/wp-content/uploads/2023/10/september-weather.jpg',
  9: 'https://images.unsplash.com/photo-1505765050516-f72dcac9c60e?w=1200&q=80',
  10: 'https://www.threeriversparks.org/sites/default/files/inline-images/snow-covered%20leaves%20resized.jpg',
  11: 'https://images.unsplash.com/photo-1457269449834-928af64c684d?w=1200&q=80',
};

const HeroImage = () => {
  const { currentDate, setCurrentDate } = useCalendar();
  const month = currentDate.getMonth();
  const imageUrl = seasonalImages[month];

  const navigate = (dir: number) => {
    const next = new Date(currentDate);
    next.setMonth(next.getMonth() + dir);
    setCurrentDate(next);
  };

  return (
    <div className="relative h-48 md:h-56 overflow-hidden rounded-t-lg">
      <AnimatePresence mode="wait">
        <motion.img
          key={format(currentDate, 'yyyy-MM')}
          src={imageUrl}
          alt={format(currentDate, 'MMMM yyyy')}
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/50" />
      <div className="absolute inset-0 flex items-center justify-between px-6">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate(-1)}
          className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
        >
          <ChevronLeft size={18} />
        </motion.button>
        <motion.div
          key={format(currentDate, 'yyyy-MM')}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-3xl md:text-4xl font-serif text-white font-semibold tracking-wide">
            {format(currentDate, 'MMMM')}
          </h1>
          <p className="text-white/80 text-sm mt-1 font-sans tracking-widest">
            {format(currentDate, 'yyyy')}
          </p>
        </motion.div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate(1)}
          className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
        >
          <ChevronRight size={18} />
        </motion.button>
      </div>
    </div>
  );
};

export default HeroImage;
