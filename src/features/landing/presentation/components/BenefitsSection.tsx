'use client';

import { motion } from 'framer-motion';
import { Sparkles, Palette, MessageCircle, Shield, Zap, Award } from 'lucide-react';

const BENEFITS = [
  {
    icon: Palette,
    title: '4 Cores Exclusivas',
    description: 'Preto, Amarelo, Verde e Azul — as cores do futebol brasileiro e da Copa 2026.',
    iconColor: 'text-yellow-400',
    iconBg: 'bg-yellow-400/10',
  },
  {
    icon: Sparkles,
    title: 'Com Personalização',
    description: 'Adicione o seu nome e tenha uma peça única, ideal para presentear ou colecionar.',
    iconColor: 'text-purple-400',
    iconBg: 'bg-purple-400/10',
  },
  {
    icon: MessageCircle,
    title: 'Atendimento no WhatsApp',
    description: 'Sem formulário complicado. Fale direto pelo WhatsApp antes de encomendar.',
    iconColor: 'text-green-400',
    iconBg: 'bg-green-400/10',
  },
  {
    icon: Shield,
    title: 'Qualidade Garantida',
    description: 'Material de alta qualidade para proteger suas figurinhas durante toda a Copa.',
    iconColor: 'text-blue-400',
    iconBg: 'bg-blue-400/10',
  },
  {
    icon: Zap,
    title: 'Entrega Rápida',
    description: 'Produção ágil e envio para todo o Brasil. Chegue antes das partidas começarem.',
    iconColor: 'text-orange-400',
    iconBg: 'bg-orange-400/10',
  },
  {
    icon: Award,
    title: '+500 Torcedores',
    description: 'Mais de 500 porta-figurinhas entregues e aprovados em todo o país.',
    iconColor: 'text-pink-400',
    iconBg: 'bg-pink-400/10',
  },
];

export function BenefitsSection() {
  return (
    <section id="benefits" className="section-pad relative overflow-hidden bg-[#07090F]">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-transparent via-white/15 to-transparent" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-green-500/[0.05] blur-[120px] pointer-events-none rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-10"
        >
          <p className="text-yellow-400 text-xs font-bold uppercase tracking-[0.2em] mb-3">Por que escolher</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Tudo que você precisa
            <br />
            <span className="text-shimmer">para sua coleção</span>
          </h2>
          <p className="mt-3 text-white/50 text-sm sm:text-base max-w-md mx-auto">
            Do pedido à entrega, pensamos em cada detalhe para a sua experiência ser incrível.
          </p>
        </motion.div>

        {/* Cards — 1 col mobile, 2 tablet, 3 desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {BENEFITS.map((benefit, i) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="glass rounded-2xl p-5 sm:p-6 flex items-start gap-4 hover:bg-white/[0.07] active:bg-white/[0.07] transition-colors duration-200"
              >
                {/* Icon */}
                <div className={`w-11 h-11 rounded-xl ${benefit.iconBg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                  <Icon className={`w-5 h-5 ${benefit.iconColor}`} />
                </div>
                {/* Text */}
                <div>
                  <h3 className="text-base font-bold text-white mb-1.5">{benefit.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{benefit.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
