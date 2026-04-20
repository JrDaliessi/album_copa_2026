'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQ_ITEMS = [
  {
    q: 'Quais são as cores disponíveis?',
    a: 'Temos 4 cores exclusivas: Preto, Amarelo, Verde e Azul. Cada cor foi escolhida para representar as cores do futebol brasileiro e da Copa do Mundo 2026.',
  },
  {
    q: 'Como funciona a personalização com nome?',
    a: 'Você informa o nome desejado no momento do pedido pelo WhatsApp. O nome é aplicado artesanalmente no produto antes do envio, tornando-o único.',
  },
  {
    q: 'Como faço o pedido?',
    a: 'É simples! Basta clicar em qualquer botão "Encomendar pelo WhatsApp" e você será redirecionado para uma conversa com uma mensagem pré-formatada. É só confirmar os detalhes e pronto.',
  },
  {
    q: 'Qual o prazo de entrega?',
    a: 'Produzimos com agilidade. O prazo médio é de 3 a 7 dias úteis após a confirmação do pedido, podendo variar de acordo com a localidade.',
  },
  {
    q: 'O produto protege bem as figurinhas?',
    a: 'Sim! O porta-figurinhas foi projetado para proteger suas figurinhas com segurança, mantendo-as organizadas e em perfeito estado durante toda a coleção.',
  },
  {
    q: 'Vocês enviam para todo o Brasil?',
    a: 'Sim, enviamos para todo o Brasil via Correios ou transportadora. O frete é calculado no momento do pedido pelo WhatsApp.',
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section id="faq" className="section-pad relative overflow-hidden bg-[#07090F]">
      {/* Separator */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-white/10 to-transparent" />

      {/* Ambient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-yellow-500/[0.04] blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12"
        >
          <p className="text-yellow-400 text-sm font-semibold uppercase tracking-[0.2em] mb-4">
            Dúvidas frequentes
          </p>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Perguntas & Respostas
          </h2>
          <p className="mt-4 text-white/50 text-lg">
            Tudo o que você precisa saber antes de encomendar.
          </p>
        </motion.div>

        {/* Accordion */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-3"
        >
          {FAQ_ITEMS.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className={`glass rounded-2xl overflow-hidden transition-all duration-300 ${
                openIndex === i ? 'ring-1 ring-yellow-400/30' : 'hover:bg-white/[0.06]'
              }`}
            >
              <button
                id={`faq-${i}`}
                onClick={() => toggle(i)}
                aria-expanded={openIndex === i}
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
              >
                <span
                  className={`font-semibold text-base leading-snug transition-colors duration-200 ${
                    openIndex === i ? 'text-yellow-400' : 'text-white/90'
                  }`}
                >
                  {item.q}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="flex-shrink-0"
                >
                  <ChevronDown
                    className={`w-5 h-5 transition-colors duration-200 ${
                      openIndex === i ? 'text-yellow-400' : 'text-white/40'
                    }`}
                  />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.04, 0.62, 0.23, 0.98] }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-5 text-white/55 text-sm leading-relaxed">{item.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
