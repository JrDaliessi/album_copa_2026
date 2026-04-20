'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { buildWhatsappLink } from '../../application/use-cases/build-whatsapp-link.use-case';
import type { ProductColor } from '../../domain/types/product.types';

const COLORS: { key: ProductColor | null; label: string; dot: string; count: number }[] = [
  { key: null, label: 'Todos', dot: 'bg-white', count: 14 },
  { key: 'preto', label: 'Preto', dot: 'bg-neutral-900 border border-white/30', count: 3 },
  { key: 'amarelo', label: 'Amarelo', dot: 'bg-yellow-400', count: 3 },
  { key: 'verde', label: 'Verde', dot: 'bg-green-500', count: 4 },
  { key: 'azul', label: 'Azul', dot: 'bg-blue-500', count: 4 },
];

const ALL_IMAGES = [
  { src: '/imagens/WhatsApp Image 2026-04-18 at 14.52.26.jpeg', color: 'verde' as ProductColor },
  { src: '/imagens/WhatsApp Image 2026-04-18 at 14.52.26(1).jpeg', color: 'verde' as ProductColor },
  { src: '/imagens/WhatsApp Image 2026-04-18 at 14.52.27.jpeg', color: 'amarelo' as ProductColor },
  { src: '/imagens/WhatsApp Image 2026-04-18 at 14.52.27(1).jpeg', color: 'amarelo' as ProductColor },
  { src: '/imagens/WhatsApp Image 2026-04-18 at 14.52.27(2).jpeg', color: 'preto' as ProductColor },
  { src: '/imagens/WhatsApp Image 2026-04-18 at 14.52.27(3).jpeg', color: 'preto' as ProductColor },
  { src: '/imagens/WhatsApp Image 2026-04-18 at 14.52.28.jpeg', color: 'azul' as ProductColor },
  { src: '/imagens/WhatsApp Image 2026-04-18 at 14.52.28(1).jpeg', color: 'azul' as ProductColor },
  { src: '/imagens/WhatsApp Image 2026-04-18 at 14.52.28(2).jpeg', color: 'azul' as ProductColor },
  { src: '/imagens/WhatsApp Image 2026-04-18 at 14.52.28(3).jpeg', color: 'azul' as ProductColor },
  { src: '/imagens/WhatsApp Image 2026-04-18 at 14.52.28(4).jpeg', color: 'verde' as ProductColor },
  { src: '/imagens/WhatsApp Image 2026-04-18 at 14.52.29.jpeg', color: 'verde' as ProductColor },
  { src: '/imagens/WhatsApp Image 2026-04-18 at 14.52.29(1).jpeg', color: 'amarelo' as ProductColor },
  { src: '/imagens/WhatsApp Image 2026-04-18 at 14.52.29(2).jpeg', color: 'preto' as ProductColor },
];

export function GallerySection() {
  const [activeColor, setActiveColor] = useState<ProductColor | null>(null);
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = activeColor ? ALL_IMAGES.filter((i) => i.color === activeColor) : ALL_IMAGES;

  const openLightbox = (index: number) => setLightbox(index);
  const closeLightbox = () => setLightbox(null);

  const prev = useCallback(() => {
    if (lightbox === null) return;
    setLightbox((lightbox - 1 + filtered.length) % filtered.length);
  }, [lightbox, filtered.length]);

  const next = useCallback(() => {
    if (lightbox === null) return;
    setLightbox((lightbox + 1) % filtered.length);
  }, [lightbox, filtered.length]);

  const whatsappColor = buildWhatsappLink({ color: activeColor ?? undefined });

  return (
    <section id="gallery" className="section-pad relative overflow-hidden bg-[#07090F]">
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-yellow-500/[0.05] blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12"
        >
          <p className="text-yellow-400 text-sm font-semibold uppercase tracking-[0.2em] mb-4">
            Nossa Coleção
          </p>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Escolha a sua cor favorita
          </h2>
          <p className="mt-4 text-white/50 text-lg max-w-xl mx-auto">
            Cada modelo é fabricado com cuidado e atenção aos detalhes. Filtre pela cor e
            visualize como ficará o seu.
          </p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap items-center justify-center gap-2.5 mb-10"
        >
          {COLORS.map((c) => (
            <button
              key={c.label}
              id={`filter-${c.key ?? 'all'}`}
              onClick={() => setActiveColor(c.key)}
              className={`relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeColor === c.key
                  ? 'bg-yellow-400 text-[#07090F] shadow-[0_0_24px_rgba(251,191,36,0.4)]'
                  : 'glass text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              <span className={`w-3 h-3 rounded-full ${c.dot}`} />
              {c.label}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => (
              <motion.div
                key={item.src}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer bg-white/5"
                onClick={() => openLightbox(i)}
              >
                <img
                  src={item.src}
                  alt={`Porta figurinhas cor ${item.color}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-[#07090F]/0 group-hover:bg-[#07090F]/50 transition-all duration-300 flex items-center justify-center">
                  <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-all duration-300 w-7 h-7 drop-shadow-lg" />
                </div>
                {/* Color tag */}
                <div className="absolute top-2.5 left-2.5 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <span className="glass text-white text-[10px] font-semibold uppercase px-2.5 py-1 rounded-full tracking-wide">
                    {item.color}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-center mt-12"
        >
          <a
            href={whatsappColor}
            target="_blank"
            rel="noopener noreferrer"
            id="gallery-cta"
            className="inline-flex items-center gap-3 px-8 py-4 bg-green-600 hover:bg-green-500 transition-all duration-300 rounded-2xl text-white font-bold text-base shadow-[0_0_40px_-8px_rgba(22,163,74,0.6)]"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            {activeColor
              ? `Pedir na cor ${activeColor} pelo WhatsApp`
              : 'Pedir o meu pelo WhatsApp'}
          </a>
        </motion.div>
      </div>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-[#07090F]/95 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 glass p-3 rounded-full text-white hover:bg-white/20 transition-all"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <motion.div
              key={lightbox}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.25 }}
              className="relative max-w-2xl w-full rounded-3xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={filtered[lightbox].src}
                alt="Visualização ampliada"
                className="w-full h-auto object-contain max-h-[80vh]"
              />
            </motion.div>

            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 glass p-3 rounded-full text-white hover:bg-white/20 transition-all"
              aria-label="Próximo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 glass p-2.5 rounded-full text-white/70 hover:text-white transition-all text-sm font-medium"
            >
              ✕
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/40 text-sm">
              {lightbox + 1} / {filtered.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
