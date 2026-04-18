'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { buildWhatsappLink } from '../../application/use-cases/build-whatsapp-link.use-case';

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const yBackground = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.2]);

  const whatsappUrl = buildWhatsappLink({});

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-neutral-900 text-white"
    >
      {/* Background Parallax Image */}
      <motion.div 
        style={{ y: yBackground }}
        className="absolute inset-0 z-0 opacity-40 mix-blend-overlay"
      >
        <img 
          src="/imagens/WhatsApp Image 2026-04-18 at 14.52.26.jpeg" 
          alt="Coleção de porta figurinhas" 
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-neutral-900" />
      </motion.div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        {/* Text area */}
        <motion.div 
          style={{ opacity }}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col space-y-6"
        >
          <div className="inline-flex items-center space-x-2 bg-green-600/20 text-green-400 px-4 py-2 rounded-full w-fit">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-sm font-medium tracking-wide">Copa 2026</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight">
            O porta figurinhas <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200">
              que transforma
            </span> <br/>
            sua coleção
          </h1>
          
          <p className="text-lg md:text-xl text-neutral-300 max-w-lg leading-relaxed">
            Escolha entre 4 cores exclusivas e personalize com seu nome para ter uma peça única, bonita e feita para quem ama futebol de verdade.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row gap-4">
            <a 
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center px-8 py-4 bg-green-600 hover:bg-green-500 transition-all rounded-full text-white font-bold text-lg overflow-hidden shadow-[0_0_40px_-10px_rgba(34,197,94,0.5)]"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <span className="relative z-10">Quero encomendar o meu</span>
            </a>
            
            <a 
              href="#products" 
              className="inline-flex items-center justify-center px-8 py-4 bg-transparent border border-white/20 hover:bg-white/5 transition-all rounded-full text-white font-medium text-lg"
            >
              Ver cores disponíveis
            </a>
          </div>

          <div className="flex flex-wrap gap-4 pt-4 text-sm text-neutral-400">
            <span className="flex items-center gap-1.5">✓ Personalização com nome</span>
            <span className="flex items-center gap-1.5">✓ 4 Cores disponíveis</span>
            <span className="flex items-center gap-1.5">✓ Atendimento rápido</span>
          </div>
        </motion.div>

        {/* Hero Product Image Spotlight */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="relative h-[600px] hidden md:block rounded-3xl overflow-hidden shadow-2xl"
        >
          <img 
            src="/imagens/WhatsApp Image 2026-04-18 at 14.52.26(1).jpeg" 
            alt="Porta figurinhas Brasil" 
            className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-3xl" />
        </motion.div>
      </div>
    </section>
  );
}
