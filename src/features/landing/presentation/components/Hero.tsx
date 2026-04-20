'use client';

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { ShoppingBag, Star, ChevronDown, Sparkles } from 'lucide-react';
import { buildWhatsappLink } from '../../application/use-cases/build-whatsapp-link.use-case';

const PRODUCT_IMAGES = [
  '/imagens/WhatsApp Image 2026-04-18 at 14.52.26(1).jpeg',
  '/imagens/WhatsApp Image 2026-04-18 at 14.52.27.jpeg',
  '/imagens/WhatsApp Image 2026-04-18 at 14.52.26.jpeg',
  '/imagens/WhatsApp Image 2026-04-18 at 14.52.27(1).jpeg',
];

const SOCIAL_PROOF = [
  { value: '500+', label: 'Pedidos entregues' },
  { value: '4', label: 'Cores exclusivas' },
  { value: '100%', label: 'Satisfeitos' },
];

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacityHero = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scaleHero = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  const whatsappUrl = buildWhatsappLink({});

  useEffect(() => {
    setIsLoaded(true);
    const interval = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % PRODUCT_IMAGES.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#07090F]"
    >
      {/* ── Ambient background ── */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Gradient orbs */}
        <div className="absolute top-[-20%] left-[-10%] w-[700px] h-[700px] rounded-full bg-yellow-500/[0.06] blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-green-600/[0.07] blur-[120px]" />
        <div className="absolute top-[40%] left-[50%] w-[400px] h-[400px] rounded-full bg-yellow-400/[0.04] blur-[100px]" />

        {/* Parallax image layer */}
        <motion.div style={{ y: yBg }} className="absolute inset-0 opacity-[0.12]">
          <img
            src={PRODUCT_IMAGES[0]}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover object-center"
          />
        </motion.div>

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#07090F]/70 via-transparent to-[#07090F]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07090F]/80 via-transparent to-[#07090F]/40" />
      </div>

      {/* ── Grid lines decoration ── */}
      <div
        className="absolute inset-0 z-0 opacity-[0.025]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      {/* ── Main content ── */}
      <motion.div
        style={{ opacity: opacityHero, scale: scaleHero }}
        className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-24 pb-16"
      >
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* ── Left: Text ── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isLoaded ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col space-y-7"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="inline-flex items-center gap-2.5 glass px-4 py-2 rounded-full w-fit"
            >
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-semibold text-yellow-400 tracking-wide uppercase">
                Copa do Mundo 2026
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            </motion.div>

            {/* Headline */}
            <div className="space-y-2">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.05]">
                O porta{' '}
                <span className="relative inline-block">
                  <span className="text-shimmer">figurinhas</span>
                </span>
                <br />
                que a sua{' '}
                <span className="relative">
                  <span className="text-white">coleção</span>
                  <motion.span
                    initial={{ width: '0%' }}
                    animate={isLoaded ? { width: '100%' } : {}}
                    transition={{ duration: 0.8, delay: 0.8, ease: 'easeOut' }}
                    className="absolute bottom-1 left-0 h-[3px] bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full"
                  />
                </span>
                <br />
                merecia
              </h1>
            </div>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-white/60 max-w-md leading-relaxed font-light">
              Escolha uma das{' '}
              <strong className="text-white/90 font-semibold">4 cores exclusivas</strong>, adicione
              personalização com seu nome e tenha uma peça única feita para{' '}
              <strong className="text-white/90 font-semibold">quem ama futebol de verdade</strong>.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                id="hero-cta-primary"
                className="group relative inline-flex items-center justify-center gap-3 px-7 py-4 bg-green-600 hover:bg-green-500 transition-all duration-300 rounded-2xl text-white font-bold text-base shadow-[0_0_40px_-8px_rgba(22,163,74,0.7)] hover:shadow-[0_0_60px_-8px_rgba(22,163,74,0.9)] overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <ShoppingBag className="relative z-10 w-5 h-5" />
                <span className="relative z-10">Quero encomendar agora</span>
                <div className="relative z-10 w-1.5 h-1.5 rounded-full bg-green-300 animate-pulse" />
              </a>

              <a
                href="#gallery"
                id="hero-cta-secondary"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 glass hover:bg-white/10 transition-all duration-300 rounded-2xl text-white font-semibold text-base"
              >
                Ver as cores
                <ChevronDown className="w-4 h-4 opacity-60" />
              </a>
            </div>

            {/* Social proof strips */}
            <div className="flex items-center gap-6 pt-2">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-[#07090F] bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center"
                  >
                    <span className="text-[10px] font-bold text-[#07090F]">{i * 10}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-xs text-white/50 mt-0.5">+500 torcedores satisfeitos</span>
              </div>
            </div>
          </motion.div>

          {/* ── Right: Product Image Stack ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isLoaded ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative hidden lg:flex items-center justify-center"
          >
            {/* Glow */}
            <div className="absolute inset-0 rounded-[2rem] bg-yellow-500/10 blur-3xl scale-90" />

            {/* Main image card */}
            <div className="relative w-full max-w-[480px] aspect-[4/5] rounded-[2rem] overflow-hidden shadow-[0_32px_80px_-16px_rgba(0,0,0,0.8)]">
              <AnimatePresence mode="crossfade">
                <motion.img
                  key={activeImage}
                  src={PRODUCT_IMAGES[activeImage]}
                  alt={`Porta Figurinhas Copa 2026 — imagem ${activeImage + 1}`}
                  className="absolute inset-0 w-full h-full object-cover"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7, ease: 'easeInOut' }}
                />
              </AnimatePresence>
              {/* Image overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#07090F]/50 via-transparent to-transparent" />

              {/* Inner ring */}
              <div className="absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/10" />

              {/* Bottom info bar */}
              <div className="absolute bottom-4 left-4 right-4 glass rounded-xl p-3 flex items-center justify-between">
                <div>
                  <p className="text-white text-sm font-semibold">Porta Figurinhas</p>
                  <p className="text-white/50 text-xs">Copa do Mundo 2026</p>
                </div>
                <div className="flex gap-1.5">
                  {['bg-neutral-900', 'bg-yellow-400', 'bg-green-500', 'bg-blue-500'].map(
                    (c, i) => (
                      <div
                        key={i}
                        className={`w-4 h-4 rounded-full ${c} border border-white/20`}
                      />
                    ),
                  )}
                </div>
              </div>
            </div>

            {/* Thumbnail strip */}
            <div className="absolute -right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2.5">
              {PRODUCT_IMAGES.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`w-12 h-12 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                    activeImage === i
                      ? 'border-yellow-400 scale-110 shadow-[0_0_16px_rgba(251,191,36,0.5)]'
                      : 'border-white/10 hover:border-white/30 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={src} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Floating badge — personalização */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -left-8 top-1/4 glass rounded-2xl px-4 py-3 shadow-xl"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-yellow-400/20 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-yellow-400" />
                </div>
                <div>
                  <p className="text-white text-xs font-semibold">Com personalização</p>
                  <p className="text-white/50 text-[11px]">Seu nome no produto</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* ── Stats bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0"
        >
          {SOCIAL_PROOF.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl sm:text-3xl font-extrabold text-yellow-400">{stat.value}</p>
              <p className="text-xs text-white/40 mt-1 leading-tight">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isLoaded ? { opacity: 1 } : {}}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-white/30 text-xs tracking-widest uppercase">Rolar</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-1.5 rounded-full bg-yellow-400" />
        </motion.div>
      </motion.div>
    </section>
  );
}
