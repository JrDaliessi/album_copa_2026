'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { buildWhatsappLink } from '../../application/use-cases/build-whatsapp-link.use-case';
import type { ProductColor } from '../../domain/types/product.types';

const COLORS: { key: ProductColor | null; label: string; dot: string }[] = [
  { key: null, label: 'Todos', dot: 'bg-white' },
  { key: 'preto', label: 'Preto', dot: 'bg-neutral-900 border border-white/30' },
  { key: 'amarelo', label: 'Amarelo', dot: 'bg-yellow-400' },
  { key: 'verde', label: 'Verde', dot: 'bg-green-500' },
  { key: 'azul', label: 'Azul', dot: 'bg-blue-500' },
  { key: 'azul-claro', label: 'Azul Claro', dot: 'bg-sky-300' },
];

const ALL_IMAGES = [
  { src: '/imagens/preto.png', color: 'preto' as ProductColor },
  { src: '/imagens/preto1.png', color: 'preto' as ProductColor },
  { src: '/imagens/preto2.png', color: 'preto' as ProductColor },
  { src: '/imagens/preto3.png', color: 'preto' as ProductColor },
  { src: '/imagens/preto4.png', color: 'preto' as ProductColor },
  { src: '/imagens/azul.png', color: 'azul' as ProductColor },
  { src: '/imagens/azul1.png', color: 'azul' as ProductColor },
  { src: '/imagens/azul2.png', color: 'azul' as ProductColor },
  { src: '/imagens/azul3.png', color: 'azul' as ProductColor },
  { src: '/imagens/azul4.png', color: 'azul' as ProductColor },
  { src: '/imagens/verde.png', color: 'verde' as ProductColor },
  { src: '/imagens/verde1.png', color: 'verde' as ProductColor },
  { src: '/imagens/verde2.png', color: 'verde' as ProductColor },
  { src: '/imagens/verde3.png', color: 'verde' as ProductColor },
  { src: '/imagens/verde4.png', color: 'verde' as ProductColor },
  { src: '/imagens/azul claro.png', color: 'azul-claro' as ProductColor },
  { src: '/imagens/azul claro1.png', color: 'azul-claro' as ProductColor },
  { src: '/imagens/azul claro2.png', color: 'azul-claro' as ProductColor },
  { src: '/imagens/ChatGPT Image 1 de mai. de 2026, 11_52_16.png', color: 'azul-claro' as ProductColor },
  { src: '/imagens/ChatGPT Image 1 de mai. de 2026, 11_53_02.png', color: 'preto' as ProductColor },
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

const WhatsAppIcon = () => (
  <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

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
    <section id="gallery" className="section-pad relative overflow-x-clip bg-[#07090F]">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-yellow-500/[0.05] blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-8"
        >
          <p className="text-yellow-400 text-xs font-bold uppercase tracking-[0.2em] mb-3">Nossa Coleção</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Escolha a sua cor favorita
          </h2>
          <p className="mt-3 text-white/50 text-sm sm:text-base max-w-md mx-auto">
            Filtre pela cor e veja como ficará o seu porta-figurinhas.
          </p>
        </motion.div>

        {/* Filter tabs — horizontal scroll on mobile, no wrap */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          {/* Scrollable filter tabs — single row, never wraps */}
          <div
            className="flex items-center gap-2 overflow-x-auto pb-1"
            style={{ WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', msOverflowStyle: 'none', flexWrap: 'nowrap' }}
          >
            {COLORS.map((c) => (
              <button
                key={c.label}
                id={`filter-${c.key ?? 'all'}`}
                onClick={() => setActiveColor(c.key)}
                style={{ flexShrink: 0 }}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 whitespace-nowrap touch-manipulation ${
                  activeColor === c.key
                    ? 'bg-yellow-400 text-[#07090F] shadow-[0_0_20px_rgba(251,191,36,0.35)]'
                    : 'glass text-white/70 hover:text-white active:scale-95'
                }`}
              >
                <span className={`w-2.5 h-2.5 rounded-full ${c.dot}`} />
                {c.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Grid — 2 cols on mobile, 3 on sm, 4 on md+ */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 sm:gap-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => (
              <motion.button
                key={item.src}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35, delay: i * 0.03 }}
                className="group relative aspect-square rounded-xl sm:rounded-2xl overflow-hidden bg-white/5 cursor-pointer touch-manipulation"
                onClick={() => openLightbox(i)}
                aria-label={`Ver imagem ${i + 1} — cor ${item.color}`}
              >
                <img
                  src={item.src}
                  alt={`Porta figurinhas cor ${item.color}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-[#07090F]/0 group-hover:bg-[#07090F]/40 active:bg-[#07090F]/50 transition-all duration-200 flex items-center justify-center">
                  <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-all duration-200 w-6 h-6 drop-shadow-lg" />
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-8"
        >
          <a
            href={whatsappColor}
            target="_blank"
            rel="noopener noreferrer"
            id="gallery-cta"
            className="flex items-center justify-center gap-3 w-full py-4 bg-green-600 hover:bg-green-500 active:scale-[0.98] transition-all duration-200 rounded-2xl text-white font-bold text-sm sm:text-base shadow-[0_0_32px_-6px_rgba(22,163,74,0.6)] touch-manipulation"
          >
            <WhatsAppIcon />
            {activeColor ? `Pedir na cor ${activeColor} pelo WhatsApp` : 'Pedir o meu pelo WhatsApp'}
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
            className="fixed inset-0 z-50 bg-[#07090F]/96 backdrop-blur-xl flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Nav arrows — large touch targets on mobile */}
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 glass flex items-center justify-center rounded-full text-white active:scale-95 touch-manipulation z-10"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <motion.div
              key={lightbox}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.22 }}
              className="w-full max-w-lg mx-14 sm:mx-20 rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={filtered[lightbox].src}
                alt="Visualização ampliada"
                className="w-full h-auto object-contain max-h-[75vh]"
              />
            </motion.div>

            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 glass flex items-center justify-center rounded-full text-white active:scale-95 touch-manipulation z-10"
              aria-label="Próximo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Close — top right */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 w-10 h-10 glass flex items-center justify-center rounded-full text-white/70 hover:text-white text-base touch-manipulation z-20"
              aria-label="Fechar"
            >
              ✕
            </button>

            {/* Counter */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/40 text-sm">
              {lightbox + 1} / {filtered.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
