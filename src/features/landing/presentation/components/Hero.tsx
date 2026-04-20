'use client';

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { ShoppingBag, Star, ChevronDown, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { buildWhatsappLink } from '../../application/use-cases/build-whatsapp-link.use-case';

const PRODUCT_IMAGES = [
  '/imagens/WhatsApp Image 2026-04-18 at 14.52.26(1).jpeg',
  '/imagens/WhatsApp Image 2026-04-18 at 14.52.27.jpeg',
  '/imagens/WhatsApp Image 2026-04-18 at 14.52.27(1).jpeg',
  '/imagens/WhatsApp Image 2026-04-18 at 14.52.28(1).jpeg',
];

const SOCIAL_PROOF = [
  { value: '500+', label: 'Pedidos entregues' },
  { value: '4', label: 'Cores exclusivas' },
  { value: '100%', label: 'Satisfeitos' },
];

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeImage, setActiveImage] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const opacityHero = useTransform(scrollYProgress, [0, 0.7], [1, 0.3]);

  const whatsappUrl = buildWhatsappLink({});

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % PRODUCT_IMAGES.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const prev = () => setActiveImage((a) => (a - 1 + PRODUCT_IMAGES.length) % PRODUCT_IMAGES.length);
  const next = () => setActiveImage((a) => (a + 1) % PRODUCT_IMAGES.length);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative flex flex-col overflow-hidden bg-[#07090F]"
    >
      {/* ── Ambient background ── */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-15%] left-[-20%] w-[500px] h-[500px] rounded-full bg-yellow-500/[0.07] blur-[100px]" />
        <div className="absolute bottom-[0%] right-[-20%] w-[450px] h-[450px] rounded-full bg-green-600/[0.08] blur-[100px]" />
        <motion.div style={{ y: yBg }} className="absolute inset-0">
          <img
            src="/copa-trophy-bg.png"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover object-center"
          />
        </motion.div>
        {/* Heavy dark overlay so text stays readable */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#07090F]/75 via-[#07090F]/50 to-[#07090F]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07090F]/80 via-[#07090F]/20 to-transparent" />
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      </div>

      {/* ── Content ── */}
      <motion.div
        style={{ opacity: opacityHero }}
        className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 pt-14 pb-8"
      >

        {/* ─────────────────────────────────────────
            Layout: flex-col on mobile, grid on desktop
            Mobile: badge → image → text → CTAs
            Desktop: text (left) | image (right)
            ───────────────────────────────────────── */}

        {/* BADGE — always on top, centered on mobile, left on desktop */}
        <div className="flex lg:justify-start justify-center mb-5">
          <div className="inline-flex items-center gap-2 glass px-3.5 py-1.5 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
            <span className="text-xs font-bold text-yellow-400 tracking-widest uppercase">Copa do Mundo 2026</span>
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          </div>
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">

          {/* ── PRODUCT IMAGE ── FIRST in DOM → first on mobile; right column on desktop ── */}
          <motion.div
            initial={{ opacity: 0.2, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full mb-6 lg:mb-0 lg:col-start-2 lg:row-start-1"
          >
            {/* Glow */}
            <div className="absolute inset-4 rounded-[1.5rem] bg-yellow-400/10 blur-2xl pointer-events-none" />

            {/* Carousel */}
            <div className="relative w-full aspect-[4/3] lg:aspect-[4/5] rounded-[1.5rem] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.65)]">
              <AnimatePresence mode="crossfade">
                <motion.img
                  key={activeImage}
                  src={PRODUCT_IMAGES[activeImage]}
                  alt={`Porta Figurinhas Copa 2026 — imagem ${activeImage + 1}`}
                  className="absolute inset-0 w-full h-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.55 }}
                />
              </AnimatePresence>

              <div className="absolute inset-0 bg-gradient-to-t from-[#07090F]/40 via-transparent to-transparent" />
              <div className="absolute inset-0 rounded-[1.5rem] ring-1 ring-inset ring-white/10" />

              {/* Arrows */}
              <button onClick={prev} aria-label="Imagem anterior"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center glass rounded-full text-white touch-manipulation active:scale-90 transition-transform z-10">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button onClick={next} aria-label="Próxima imagem"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center glass rounded-full text-white touch-manipulation active:scale-90 transition-transform z-10">
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Bottom info strip */}
              <div className="absolute bottom-3 left-3 right-3 glass rounded-xl p-2.5 flex items-center justify-between z-10">
                <div>
                  <p className="text-white text-xs font-bold">Porta Figurinhas</p>
                  <p className="text-white/50 text-[10px]">Copa 2026</p>
                </div>
                <div className="flex gap-1.5 items-center">
                  {['#1a1a1a', '#FBBF24', '#16a34a', '#3b82f6'].map((c, i) => (
                    <div key={i} className="w-4 h-4 rounded-full border border-white/20" style={{ backgroundColor: c }} />
                  ))}
                </div>
              </div>
            </div>

            {/* Dot indicators */}
            <div className="flex items-center justify-center gap-2 mt-3">
              {PRODUCT_IMAGES.map((_, i) => (
                <button key={i} onClick={() => setActiveImage(i)} aria-label={`Ver imagem ${i + 1}`}
                  className={`transition-all duration-300 rounded-full touch-manipulation ${activeImage === i ? 'w-5 h-2 bg-yellow-400' : 'w-2 h-2 bg-white/25 hover:bg-white/50'}`}
                />
              ))}
            </div>

            {/* Desktop only extras */}
            <div className="absolute -right-6 top-4 bottom-4 hidden lg:flex flex-col gap-2 justify-center">
              {PRODUCT_IMAGES.map((src, i) => (
                <button key={i} onClick={() => setActiveImage(i)}
                  className={`w-12 h-12 rounded-xl overflow-hidden border-2 transition-all duration-300 ${activeImage === i ? 'border-yellow-400 scale-110 shadow-[0_0_14px_rgba(251,191,36,0.5)]' : 'border-white/10 hover:border-white/30 opacity-60 hover:opacity-100'}`}>
                  <img src={src} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -left-4 top-8 hidden lg:flex glass rounded-2xl px-3.5 py-2.5 shadow-xl items-center gap-2.5"
            >
              <div className="w-7 h-7 rounded-full bg-yellow-400/20 flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
              </div>
              <div>
                <p className="text-white text-xs font-semibold">Com personalização</p>
                <p className="text-white/50 text-[10px]">Seu nome no produto</p>
              </div>
            </motion.div>
          </motion.div>

          {/* ── TEXT + CTAs ── after image in DOM; left column on desktop ── */}
          <motion.div
            initial={{ opacity: 0.2, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col lg:col-start-1 lg:row-start-1"
          >
            {/* Headline */}
            <h1 className="text-[2.2rem] leading-[1.1] sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight text-white mb-3 lg:mb-5">
              O porta{' '}
              <span className="text-shimmer">figurinhas</span>
              {' '}que a sua{' '}
              <span className="relative inline-block">
                coleção
                <motion.span
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 0.8, delay: 0.7, ease: 'easeOut' }}
                  className="absolute bottom-0.5 left-0 h-[3px] bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full"
                />
              </span>
              {' '}merecia
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-white/55 leading-relaxed mb-5 max-w-md">
              Escolha uma das <strong className="text-white/90 font-semibold">4 cores exclusivas</strong>,
              personalize com seu nome e tenha uma peça única feita para{' '}
              <strong className="text-white/90 font-semibold">quem ama futebol</strong>.
            </p>

            {/* CTAs */}
            <div className="flex flex-col gap-3 mb-5">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" id="hero-cta-primary"
                className="flex items-center justify-center gap-3 w-full py-4 bg-green-600 hover:bg-green-500 active:scale-[0.98] transition-all duration-200 rounded-2xl text-white font-bold text-base shadow-[0_0_36px_-6px_rgba(22,163,74,0.7)] hover:shadow-[0_0_50px_-6px_rgba(22,163,74,0.9)] touch-manipulation">
                <ShoppingBag className="w-5 h-5 flex-shrink-0" />
                Quero encomendar agora
                <span className="w-1.5 h-1.5 rounded-full bg-green-300 animate-pulse flex-shrink-0" />
              </a>
              <a href="#gallery" id="hero-cta-secondary"
                className="flex items-center justify-center gap-2 w-full py-4 glass hover:bg-white/10 active:scale-[0.98] transition-all duration-200 rounded-2xl text-white font-semibold text-sm sm:text-base touch-manipulation">
                Ver cores disponíveis
                <ChevronDown className="w-4 h-4 opacity-60" />
              </a>
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-7 h-7 rounded-full border-2 border-[#07090F] bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center">
                    <span className="text-[9px] font-bold text-[#07090F]">{i * 10}</span>
                  </div>
                ))}
              </div>
              <div>
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="w-3 h-3 fill-yellow-400 text-yellow-400" />)}
                </div>
                <span className="text-[11px] text-white/40">+500 torcedores satisfeitos</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-7 grid grid-cols-3 gap-2 glass rounded-2xl py-4 px-2"
        >
          {SOCIAL_PROOF.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-xl sm:text-2xl font-extrabold text-yellow-400">{stat.value}</p>
              <p className="text-[10px] sm:text-xs text-white/40 mt-0.5 leading-tight">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator — desktop only */}
      <div className="hidden lg:flex absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex-col items-center gap-1.5">
        <span className="text-white/25 text-[10px] tracking-widest uppercase">Rolar</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-5 h-8 rounded-full border border-white/15 flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-1.5 rounded-full bg-yellow-400" />
        </motion.div>
      </div>
    </section>
  );
}
