'use client';

import { motion } from 'framer-motion';
import { Sparkles, Palette, MessageCircle, Shield, Zap, Award } from 'lucide-react';

const BENEFITS = [
  {
    icon: Palette,
    title: '4 Cores Exclusivas',
    description:
      'Preto, Amarelo, Verde e Azul. Cada cor é escolhida com base nas tradições do futebol brasileiro e da Copa do Mundo.',
    color: 'from-yellow-500/20 to-yellow-600/5',
    iconColor: 'text-yellow-400',
    glow: 'shadow-yellow-500/20',
  },
  {
    icon: Sparkles,
    title: 'Personalizado com Nome',
    description:
      'Adicione o seu nome e transforme o produto em uma peça única, ideal para colecionadores ou para presentear.',
    color: 'from-purple-500/20 to-purple-600/5',
    iconColor: 'text-purple-400',
    glow: 'shadow-purple-500/20',
  },
  {
    icon: MessageCircle,
    title: 'Atendimento no WhatsApp',
    description:
      'Sem formulários complicados. Fale diretamente pelo WhatsApp e tire todas as dúvidas antes de encomendar.',
    color: 'from-green-500/20 to-green-600/5',
    iconColor: 'text-green-400',
    glow: 'shadow-green-500/20',
  },
  {
    icon: Shield,
    title: 'Qualidade Garantida',
    description:
      'Produzido com materiais de alta qualidade para proteger suas figurinhas com segurança durante toda a Copa.',
    color: 'from-blue-500/20 to-blue-600/5',
    iconColor: 'text-blue-400',
    glow: 'shadow-blue-500/20',
  },
  {
    icon: Zap,
    title: 'Entrega Rápida',
    description:
      'Produção ágil e envio rápido para todo o Brasil. Chegue antes das partidas começarem e monte sua coleção.',
    color: 'from-orange-500/20 to-orange-600/5',
    iconColor: 'text-orange-400',
    glow: 'shadow-orange-500/20',
  },
  {
    icon: Award,
    title: '+500 Torcedores',
    description:
      'Mais de 500 porta-figurinhas já entregues e aprovados por colecionadores de futebol em todo o país.',
    color: 'from-pink-500/20 to-pink-600/5',
    iconColor: 'text-pink-400',
    glow: 'shadow-pink-500/20',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export function BenefitsSection() {
  return (
    <section id="benefits" className="section-pad relative overflow-hidden bg-[#07090F]">
      {/* Separator line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-white/20 to-transparent" />

      {/* Ambient */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-green-500/[0.05] blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-yellow-500/[0.04] blur-[120px] pointer-events-none rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <p className="text-yellow-400 text-sm font-semibold uppercase tracking-[0.2em] mb-4">
            Por que escolher
          </p>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Tudo que você precisa
            <br />
            <span className="text-shimmer">para sua coleção</span>
          </h2>
          <p className="mt-4 text-white/50 text-lg max-w-xl mx-auto">
            Pensamos em cada detalhe para que a sua experiência seja incrível — do pedido à entrega.
          </p>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
        >
          {BENEFITS.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={benefit.title}
                variants={cardVariants}
                className={`group relative glass rounded-3xl p-6 hover:bg-white/[0.08] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${benefit.glow}`}
              >
                {/* Background gradient */}
                <div
                  className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${benefit.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                />

                <div className="relative z-10">
                  {/* Icon */}
                  <div
                    className={`w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className={`w-6 h-6 ${benefit.iconColor}`} />
                  </div>

                  {/* Text */}
                  <h3 className="text-lg font-bold text-white mb-2.5 leading-snug">
                    {benefit.title}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed group-hover:text-white/70 transition-colors duration-300">
                    {benefit.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
