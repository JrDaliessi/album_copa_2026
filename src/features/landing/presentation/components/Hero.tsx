'use client';

import { motion, useScroll, useTransform, useSpring, useMotionValue, animate } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { ShoppingBag, Star, ChevronDown, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { buildWhatsappLink } from '../../application/use-cases/build-whatsapp-link.use-case';
import { AnimatePresence } from 'framer-motion';

/* ─── Product images for the foreground carousel ─── */
const PRODUCT_IMAGES = [
  '/imagens/preto.png',
  '/imagens/amarelo.png',
  '/imagens/verde.png',
  '/imagens/azul.png',
  '/imagens/azul_claro_extra.jpg',
  '/imagens/duplo_amarelo.png',
];

/* ─── Floating particles config ─── */
const PARTICLES = Array.from({ length: 6 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: 2 + Math.random() * 5,
  duration: 4 + Math.random() * 8,
  delay: Math.random() * 6,
  color: ['#FBBF24', '#16A34A', '#3B82F6', '#EF4444', '#ffffff'][Math.floor(Math.random() * 5)],
  opacity: 0.15 + Math.random() * 0.45,
}));

const SOCIAL_PROOF = [
  { value: '500+', label: 'Pedidos entregues' },
  { value: '4', label: 'Cores exclusivas' },
  { value: '100%', label: 'Satisfeitos' },
];

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);

  /* ── Scroll-based parallax ── */
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Trophy: slow upward drift
  const trophyY    = useTransform(scrollYProgress, [0, 1], ['0%', '-22%']);
  const trophyScale= useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const trophyOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  // Mid-layer orbs: medium speed
  const orbY       = useTransform(scrollYProgress, [0, 1], ['0%', '-35%']);

  // Content: slightly faster than trophy → depth illusion
  const contentY   = useTransform(scrollYProgress, [0, 1], ['0%', '6%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  // Particles: each at a different speed handled inline

  /* ── Mouse-tracking ── */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 25 });

  // Trophy rotates gently with mouse
  const trophyRotateX = useTransform(springY, [-300, 300], [4, -4]);
  const trophyRotateY = useTransform(springX, [-300, 300], [-6, 6]);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      mouseX.set(e.clientX - cx);
      mouseY.set(e.clientY - cy);
    };
    window.addEventListener('mousemove', handleMouse, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouse);
  }, [mouseX, mouseY]);

  /* ── Auto-advance carousel removed to prevent blinking and improve UX ── */

  const whatsappUrl = buildWhatsappLink({});

  const renderCarousel = (extraClasses: string) => (
    <motion.div
      initial={{ opacity: 0.15, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`relative w-full ${extraClasses}`}
    >
      {/* Glow halo (static to save GPU) */}
      <div className="absolute inset-4 rounded-[1.5rem] bg-yellow-400/10 blur-[40px] pointer-events-none" />

      {/* Card */}
      <div className="relative w-full aspect-[4/3] lg:aspect-[4/5] rounded-[1.75rem] overflow-hidden shadow-[0_28px_80px_rgba(0,0,0,0.70)] border border-white/[0.07]">
        <div className="absolute inset-0 w-full h-full">
          {PRODUCT_IMAGES.map((src, idx) => (
            <motion.img
              key={src}
              src={src}
              alt={`Porta Figurinhas Copa 2026 — imagem ${idx + 1}`}
              className="absolute inset-0 w-full h-full object-cover touch-pan-y cursor-grab active:cursor-grabbing"
              initial={false}
              animate={{
                opacity: activeImage === idx ? 1 : 0,
                x: activeImage === idx ? 0 : (idx > activeImage ? 40 : -40),
                scale: activeImage === idx ? 1 : 0.95,
                zIndex: activeImage === idx ? 10 : 0
              }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              drag={activeImage === idx ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.7}
              onDragEnd={(e, { offset }) => {
                setHasInteracted(true);
                if (offset.x < -30) {
                  setActiveImage(a => (a + 1) % PRODUCT_IMAGES.length);
                } else if (offset.x > 30) {
                  setActiveImage(a => (a - 1 + PRODUCT_IMAGES.length) % PRODUCT_IMAGES.length);
                }
              }}
              style={{ pointerEvents: activeImage === idx ? 'auto' : 'none' }}
            />
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#07090F]/50 via-transparent to-transparent" />
        <div className="absolute inset-0 rounded-[1.75rem] ring-1 ring-inset ring-white/10" />

        {/* Swipe Hint Overlay */}
        <AnimatePresence>
          {!hasInteracted && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: 1.5, duration: 0.5 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20"
            >
              <motion.div 
                animate={{ x: [-5, 5, -5] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                className="bg-black/60 backdrop-blur-md border border-white/20 text-white/90 text-xs px-4 py-2 rounded-full flex items-center gap-2 shadow-2xl"
              >
                <ChevronLeft className="w-3 h-3" />
                <span className="font-medium tracking-wide">Deslize as cores</span>
                <ChevronRight className="w-3 h-3" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Arrows */}
        <motion.button 
          onClick={() => {
            setHasInteracted(true);
            setActiveImage(a => (a - 1 + PRODUCT_IMAGES.length) % PRODUCT_IMAGES.length);
          }}
          aria-label="Imagem anterior"
          animate={{ x: [0, -3, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-black/30 backdrop-blur-md border border-white/10 hover:bg-black/50 hover:border-white/30 rounded-full text-white touch-manipulation active:scale-90 transition-all z-10"
        >
          <ChevronLeft className="w-5 h-5" />
        </motion.button>

        <motion.button 
          onClick={() => {
            setHasInteracted(true);
            setActiveImage(a => (a + 1) % PRODUCT_IMAGES.length);
          }}
          aria-label="Próxima imagem"
          animate={{ x: [0, 3, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-black/30 backdrop-blur-md border border-white/10 hover:bg-black/50 hover:border-white/30 rounded-full text-white touch-manipulation active:scale-90 transition-all z-10"
        >
          <ChevronRight className="w-5 h-5" />
        </motion.button>

        {/* Bottom strip */}
        <div className="absolute bottom-3 left-3 right-3 glass rounded-xl p-2.5 flex items-center justify-between z-10">
          <div>
            <p className="text-white text-xs font-bold">Porta Figurinhas</p>
            <p className="text-white/50 text-[10px]">Copa 2026</p>
          </div>
          <div className="flex gap-1.5">
            {['#171717', '#FBBF24', '#22C55E', '#3B82F6', '#F472B6', '#F97316'].map((c, i) => (
              <div key={i} className={`w-4 h-4 rounded-full border ${activeImage === i ? 'border-white ring-2 ring-white/30' : 'border-white/20'}`} style={{ backgroundColor: c }} />
            ))}
          </div>
        </div>
      </div>

      {/* Dot indicators */}
      <div className="flex items-center justify-center gap-2 mt-3">
        {PRODUCT_IMAGES.map((_, i) => (
          <button 
            key={i} 
            onClick={() => {
              setHasInteracted(true);
              setActiveImage(i);
            }} 
            aria-label={`Ver imagem ${i + 1}`}
            className={`transition-all duration-300 rounded-full touch-manipulation ${activeImage === i ? 'w-5 h-2 bg-yellow-400' : 'w-2 h-2 bg-white/25 hover:bg-white/50'}`}
          />
        ))}
      </div>

      {/* Desktop thumbnail strip */}
      <div className="absolute -right-6 top-4 bottom-4 hidden lg:flex flex-col gap-2 justify-center">
        {PRODUCT_IMAGES.map((src, i) => (
          <button key={i} onClick={() => setActiveImage(i)}
            className={`w-12 h-12 rounded-xl overflow-hidden border-2 transition-all duration-300 ${activeImage === i ? 'border-yellow-400 scale-110 shadow-[0_0_14px_rgba(251,191,36,0.5)]' : 'border-white/10 opacity-55 hover:opacity-100 hover:border-white/30'}`}>
            <img src={src} alt="" className="w-full h-full object-cover" />
          </button>
        ))}
      </div>

      {/* Floating badge — desktop */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -left-4 top-8 hidden lg:flex glass rounded-2xl px-3.5 py-2.5 shadow-xl items-center gap-2.5 border border-white/10"
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
  );

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative flex flex-col overflow-hidden bg-[#07090F]"
      style={{ minHeight: '100svh' }}
    >

      {/* ══════════════════════════════════════════
          LAYER 0 — deep background: subtle dark vignette
          ══════════════════════════════════════════ */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(251,191,36,0.07)_0%,transparent_70%)]" />

      {/* ══════════════════════════════════════════
          LAYER 1 — TROPHY IMAGE (slowest, 3-D tilt)
          ══════════════════════════════════════════ */}
      <motion.div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{ y: trophyY, scale: trophyScale, opacity: trophyOpacity, perspective: 1200 }}
      >
        <motion.div
          className="absolute inset-0"
          style={{ rotateX: trophyRotateX, rotateY: trophyRotateY, transformStyle: 'preserve-3d' }}
        >
          <img
            src="/imagens/background copa.png"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover object-center"
            style={{ filter: 'saturate(1.25) brightness(0.88)' }}
          />
        </motion.div>

        {/* Colour-vignette so left side stays dark for text */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#07090F]/95 via-[#07090F]/60 to-[#07090F]/20" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#07090F]/60 via-transparent to-[#07090F]" />
      </motion.div>

      {/* ══════════════════════════════════════════
          LAYER 2 — AMBIENT COLOUR ORBS (static to save GPU)
          ══════════════════════════════════════════ */}
      <motion.div className="absolute inset-0 z-[2] pointer-events-none" style={{ y: orbY }}>
        {/* Yellow top-left pulse */}
        <div className="absolute -top-32 -left-24 w-[480px] h-[480px] rounded-full bg-yellow-400/10 blur-[120px]" />
        
        {/* Green bottom-right pulse */}
        <div className="absolute -bottom-40 -right-28 w-[520px] h-[520px] rounded-full bg-green-500/10 blur-[130px]" />
        
        {/* Red centre subtle flash */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[400px] h-[400px] rounded-full bg-red-500/5 blur-[100px]" />
      </motion.div>

      {/* ══════════════════════════════════════════
          LAYER 3 — FLOATING PARTICLES (various speeds)
          ══════════════════════════════════════════ */}
      <div className="absolute inset-0 z-[3] pointer-events-none overflow-hidden">
        {PARTICLES.map(p => (
          <motion.div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
              opacity: p.opacity,
            }}
            animate={{
              y: [0, -28 - p.size * 4, 0],
              x: [0, (p.id % 2 === 0 ? 1 : -1) * (6 + p.size * 2), 0],
              opacity: [p.opacity * 0.4, p.opacity, p.opacity * 0.4],
              scale: [0.8, 1.3, 0.8],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: 'easeInOut',
            }}
          />
        ))}

        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />
      </div>

      {/* ══════════════════════════════════════════
          LAYER 4 — SCANLINES texture (very subtle)
          ══════════════════════════════════════════ */}
      <div
        className="absolute inset-0 z-[4] pointer-events-none opacity-[0.018]"
        style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.08) 2px, rgba(255,255,255,0.08) 4px)' }}
      />

      {/* ══════════════════════════════════════════
          LAYER 5 — CONTENT (fastest visible layer)
          ══════════════════════════════════════════ */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-[10] w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 pt-16 pb-10 flex flex-col"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex lg:justify-start justify-center mb-6"
        >
          <div className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full backdrop-blur-md border border-white/10">
            <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
            <span className="text-xs font-bold text-yellow-400 tracking-widest uppercase">Copa do Mundo 2026</span>
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          </div>
        </motion.div>

        {/* Grid: text left | product carousel right */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">

          {/* ── Product carousel (Desktop) ── */}
          {renderCarousel("hidden lg:block lg:col-start-2 lg:row-start-1")}

          {/* ── Text + CTAs ── */}
          <motion.div
            initial={{ opacity: 0.15, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col lg:col-start-1 lg:row-start-1"
          >
            <h1 className="text-[2.35rem] leading-[1.08] sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight text-white mb-4 lg:mb-5">
              O porta{' '}
              <span className="text-shimmer">figurinhas</span>
              {' '}que a sua{' '}
              <span className="relative inline-block">
                coleção
                <motion.span
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 0.9, delay: 0.8, ease: 'easeOut' }}
                  className="absolute bottom-0.5 left-0 h-[3px] bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full"
                />
              </span>
              {' '}merece
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-white/55 leading-relaxed mb-6 max-w-md">
              Escolha uma das <strong className="text-white/90 font-semibold">4 cores exclusivas</strong>,
              personalize com seu nome e tenha uma peça única feita para{' '}
              <strong className="text-white/90 font-semibold">quem ama futebol de verdade</strong>.
            </p>

            {/* ── Product carousel (Mobile) ── */}
            {renderCarousel("block lg:hidden mb-8 mt-2")}

            <div className="mb-6 flex items-center justify-between sm:justify-start gap-3 sm:gap-6 bg-white/[0.03] p-4 sm:p-0 sm:bg-transparent rounded-2xl border border-white/5 sm:border-transparent">
              <div className="flex flex-col gap-0.5 sm:gap-1">
                <span className="text-white/50 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider">Modelo Simples</span>
                <div className="flex items-baseline">
                  <span className="text-2xl sm:text-4xl font-extrabold text-yellow-400">R$ 40<span className="text-sm sm:text-xl">,00</span></span>
                </div>
              </div>
              <div className="w-px h-10 sm:h-8 bg-white/10" />
              <div className="flex flex-col gap-0.5 sm:gap-1">
                <span className="text-white/50 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider">Modelo Duplo</span>
                <div className="flex items-baseline">
                  <span className="text-2xl sm:text-4xl font-extrabold text-yellow-400">R$ 60<span className="text-sm sm:text-xl">,00</span></span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 mb-6">
              <motion.a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                id="hero-cta-primary"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center justify-center gap-3 w-full py-4 bg-green-600 hover:bg-green-500 transition-all duration-200 rounded-2xl text-white font-bold text-base shadow-[0_0_40px_-8px_rgba(22,163,74,0.75)] hover:shadow-[0_0_55px_-8px_rgba(22,163,74,0.95)] touch-manipulation"
              >
                <ShoppingBag className="w-5 h-5 flex-shrink-0" />
                Quero encomendar agora
                <span className="w-1.5 h-1.5 rounded-full bg-green-300 animate-pulse flex-shrink-0" />
              </motion.a>
              <a href="#gallery" id="hero-cta-secondary"
                className="flex items-center justify-center gap-2 w-full py-4 glass hover:bg-white/10 active:scale-[0.98] transition-all duration-200 rounded-2xl text-white font-semibold text-sm sm:text-base touch-manipulation border border-white/10">
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
                  {[1,2,3,4,5].map(s => <Star key={s} className="w-3 h-3 fill-yellow-400 text-yellow-400" />)}
                </div>
                <span className="text-[11px] text-white/40">+500 torcedores satisfeitos</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="mt-8 grid grid-cols-3 gap-2 glass rounded-2xl py-4 px-2 border border-white/[0.06]"
        >
          {SOCIAL_PROOF.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-xl sm:text-2xl font-extrabold text-yellow-400">{stat.value}</p>
              <p className="text-[10px] sm:text-xs text-white/40 mt-0.5 leading-tight">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll hint — desktop */}
      <motion.div
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        className="hidden lg:flex absolute bottom-7 left-1/2 -translate-x-1/2 z-10 flex-col items-center gap-1.5"
      >
        <span className="text-white/25 text-[10px] tracking-widest uppercase">Rolar</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          className="w-5 h-8 rounded-full border border-white/15 flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-1.5 rounded-full bg-yellow-400" />
        </motion.div>
      </motion.div>
    </section>
  );
}
