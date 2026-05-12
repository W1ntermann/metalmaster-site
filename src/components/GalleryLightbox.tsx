import { Card } from "@/components/ui/card";
import { X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface LightboxImage {
  id?: number | string;
  src: string;
  alt?: string;
}

interface GalleryLightboxProps {
  images: LightboxImage[];
}

const GalleryLightbox = ({ images }: GalleryLightboxProps) => {
  const [selected, setSelected] = useState<LightboxImage | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!selected) return;
      if (e.key === "Escape") {
        close();
      } else if (e.key === "ArrowLeft") {
        navigate("prev");
      } else if (e.key === "ArrowRight") {
        navigate("next");
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected, images]);

  const open = (img: LightboxImage) => {
    setSelected(img);
    document.body.style.overflow = "hidden";
  };

  const close = () => {
    setSelected(null);
    document.body.style.overflow = "unset";
  };

  const navigate = (dir: "prev" | "next") => {
    if (!selected) return;
    const idx = images.findIndex(i => i.id === selected.id || i.src === selected.src);
    if (idx === -1) return;
    let ni = dir === "next" ? idx + 1 : idx - 1;
    if (ni < 0) ni = images.length - 1;
    if (ni >= images.length) ni = 0;
    setSelected(images[ni]);
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((img) => (
          <Card key={img.id ?? img.src} className="overflow-hidden group cursor-pointer" onClick={() => open(img)}>
            <div className="relative h-64 overflow-hidden">
              <img src={img.src} alt={img.alt ?? ""} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-black/40 p-2 rounded-full">
                  <ZoomIn className="h-5 w-5 text-white" />
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl"
            onClick={close}
          >
            <button
              onClick={(e) => { e.stopPropagation(); close(); }}
              className="absolute top-4 right-4 md:top-6 md:right-6 text-white/70 hover:text-white bg-black/50 hover:bg-black/70 rounded-full p-2 md:p-3 z-10"
              aria-label="Закрити"
            >
              <X className="h-5 w-5 md:h-6 md:w-6" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); navigate("prev"); }}
              className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white bg-black/50 hover:bg-black/70 rounded-full p-2 md:p-3 z-10"
              aria-label="Попереднє"
            >
              <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); navigate("next"); }}
              className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white bg-black/50 hover:bg-black/70 rounded-full p-2 md:p-3 z-10"
              aria-label="Наступне"
            >
              <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
            </button>

            <motion.div
              key={selected.id ?? selected.src}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative max-w-7xl max-h-[90vh] mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-white rounded-lg shadow-2xl p-3">
                <img src={selected.src} alt={selected.alt ?? ""} className="max-w-full max-h-[80vh] w-auto h-auto object-contain" />
              </div>
            </motion.div>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/90 bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full text-sm">
              {images.findIndex(img => img.id === selected.id || img.src === selected.src) + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GalleryLightbox;
