import { motion } from 'framer-motion';

/** Combined wordmark for both schools with large, clearly visible official logos and smooth micro-animations. */
export function Logo({ light = false }: { light?: boolean; size?: 'sm' | 'md' | 'lg' }) {
  return (
    <span className="inline-flex items-center gap-2.5 sm:gap-4 select-none">
      {/* Large, Bold, Clearly Visible School Logos with Playful Micro-Animations */}
      <span className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* Appletree Play School Logo */}
        <motion.span
          whileHover={{ scale: 1.08, rotate: -2, y: -2 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          className="h-13 sm:h-16 md:h-20 px-2.5 sm:px-3.5 py-1.5 rounded-2xl bg-white shadow-xs border border-leaf/30 flex items-center justify-center transition-shadow hover:shadow-[0_8px_20px_-4px_rgba(117,184,106,0.35)] cursor-pointer"
          title="Appletree Play School (Founded First • 13+ Years)"
        >
          <img
            src="/logos/appletree-play-school-logo.png"
            alt="Appletree Play School Logo"
            className="h-full w-auto object-contain max-w-[95px] sm:max-w-[125px] md:max-w-[150px]"
          />
        </motion.span>

        <span className="text-base sm:text-xl font-bold text-ink/30 select-none">&times;</span>

        {/* Apple Play School Logo */}
        <motion.span
          whileHover={{ scale: 1.08, rotate: 2, y: -2 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          className="h-13 sm:h-16 md:h-20 px-2.5 sm:px-3.5 py-1.5 rounded-2xl bg-white shadow-xs border border-wm/30 flex items-center justify-center transition-shadow hover:shadow-[0_8px_20px_-4px_rgba(244,91,101,0.35)] cursor-pointer"
          title="Apple Play School (Sister Campus • Gangasthan)"
        >
          <img
            src="/logos/apple-play-school-logo.png"
            alt="Apple Play School Logo"
            className="h-full w-auto object-contain max-w-[110px] sm:max-w-[145px] md:max-w-[175px]"
          />
        </motion.span>
      </span>

      {/* Brand Text on Extra Large Screens */}
      <span className="hidden 2xl:flex flex-col text-left">
        <span className={`font-display font-bold text-base leading-tight tracking-tight ${light ? 'text-cream' : 'text-ink'}`}>
          Appletree <span className="text-wm">&bull;</span> Apple
        </span>
        <span className="text-[11px] font-bold text-leaf-deep tracking-wider uppercase mt-0.5">
          13+ Years &bull; Nizamabad
        </span>
      </span>
    </span>
  );
}
