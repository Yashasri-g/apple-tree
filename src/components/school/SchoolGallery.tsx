import { useState } from 'react';
import { Camera, X, ChevronLeft, ChevronRight } from 'lucide-react';
import type { SchoolSiteData } from '../../data/schoolsData';

interface SchoolGalleryProps {
  school: SchoolSiteData;
}

export function SchoolGallery({ school }: SchoolGalleryProps) {
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  const images = school.galleryImages;

  return (
    <section id="gallery" className="py-16 sm:py-24 px-5 sm:px-8 bg-[#FAF6EE] text-left">
      <div className="mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="max-w-2xl space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-leaf-deep px-3 py-1 rounded-full bg-leaf/10">
            <Camera className="h-3.5 w-3.5" />
            <span>Campus Moments</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-ink tracking-tight">
            Photo Gallery of {school.shortName}
          </h2>
          <p className="text-base sm:text-lg text-ink-soft">
            A window into daily joy: unhurried exploration, hands-on messy art, circle time laughter, and proud milestones.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((img, i) => (
            <div
              key={i}
              onClick={() => setActiveImageIndex(i)}
              className="group relative aspect-[4/3] rounded-3xl overflow-hidden bg-cream shadow-sm border-2 border-white cursor-pointer hover:shadow-xl transition-all"
            >
              <img
                src={img.url}
                alt={img.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-108"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-5 text-white">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md self-start">
                  {img.category}
                </span>
                <h4 className="font-display font-bold text-base mt-1 text-white">{img.title}</h4>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {activeImageIndex !== null && (
          <div
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
            onClick={() => setActiveImageIndex(null)}
          >
            <div
              className="relative max-w-4xl max-h-[90vh] bg-ink rounded-3xl overflow-hidden shadow-2xl p-2"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={images[activeImageIndex].url}
                alt={images[activeImageIndex].title}
                className="max-h-[75vh] w-auto max-w-full rounded-2xl object-contain mx-auto"
              />
              <div className="p-4 flex items-center justify-between text-white">
                <div>
                  <h4 className="font-display font-bold text-base">{images[activeImageIndex].title}</h4>
                  <p className="text-xs text-cream/70">{school.name} &bull; {images[activeImageIndex].category}</p>
                </div>
                <button
                  onClick={() => setActiveImageIndex(null)}
                  className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Prev / Next controls */}
              {activeImageIndex > 0 && (
                <button
                  onClick={() => setActiveImageIndex(activeImageIndex - 1)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/50 text-white hover:bg-black/75 transition-colors"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
              )}
              {activeImageIndex < images.length - 1 && (
                <button
                  onClick={() => setActiveImageIndex(activeImageIndex + 1)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/50 text-white hover:bg-black/75 transition-colors"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
