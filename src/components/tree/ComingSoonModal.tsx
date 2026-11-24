import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, MapPin, Bell, Calendar } from 'lucide-react';
import type { Campus } from '../../data/campuses';

interface ComingSoonModalProps {
  campus: Campus | null;
  onClose: () => void;
}

export function ComingSoonModal({ campus, onClose }: ComingSoonModalProps) {
  if (!campus) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6 select-none">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-leaf-night/60 backdrop-blur-md"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: 'spring', stiffness: 350, damping: 25 }}
          className="relative z-10 w-full max-w-md overflow-hidden rounded-[2rem] bg-gradient-to-b from-white via-cream to-[#FFF5E6] p-6 sm:p-8 shadow-2xl border-2 border-amber-300"
          role="dialog"
          aria-modal="true"
          aria-labelledby="coming-soon-title"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white text-ink border border-ink/10 transition shadow-2xs"
            aria-label="Close modal"
          >
            <X className="h-4 w-4" />
          </button>

          {/* Top Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold mb-4">
            <Sparkles className="h-3.5 w-3.5 text-amber-600" />
            <span>Upcoming Branch &bull; Nizamabad Expansion</span>
          </div>

          <h3 id="coming-soon-title" className="font-display text-2xl font-bold text-ink">
            {campus.name}
          </h3>
          <p className="mt-1 text-xs font-semibold text-leaf-deep flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-wm" />
            <span>{campus.area}, Nizamabad, Telangana</span>
          </p>

          <p className="mt-4 text-sm text-ink-soft leading-relaxed">
            {campus.description}
          </p>

          {/* Pillars of Future Campus */}
          <div className="mt-5 space-y-2.5 rounded-2xl bg-white/80 p-4 border border-ink/10 text-xs">
            <div className="flex items-center gap-2 text-ink font-semibold">
              <Calendar className="h-4 w-4 text-leaf-deep" />
              <span>Target Launch: Coming Soon for Upcoming Academic Sessions</span>
            </div>
            <div className="flex items-center gap-2 text-ink font-semibold">
              <Sparkles className="h-4 w-4 text-amber-600" />
              <span>Powered by the Same 13-Year Central Academic Brain</span>
            </div>
          </div>

          {/* Notification / Interest Action */}
          <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={onClose}
              className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 py-3 px-5 rounded-full bg-ink hover:bg-leaf-deep text-cream font-display text-xs font-bold transition shadow-sm"
            >
              <Bell className="h-3.5 w-3.5 text-amber-400" />
              <span>Express Interest for this Branch</span>
            </button>
            <button
              onClick={onClose}
              className="w-full sm:w-auto py-3 px-4 rounded-full bg-white hover:bg-cream text-ink-soft text-xs font-semibold border border-ink/10 transition"
            >
              Back to Tree
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
