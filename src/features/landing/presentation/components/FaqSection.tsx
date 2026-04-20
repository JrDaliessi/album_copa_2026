'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQ_ITEMS = [
  {
    q: 'Quais são as cores disponíveis?',
    a: 'Temos 4 cores exclusivas: Preto, Amarelo, Verde e Azul — as cores do futebol brasileiro e da Copa do Mundo 2026.',
  },
  {
    q: 'Como funciona a personalização?',
    a: 'Você informa o nome desejado no pedido pelo WhatsApp. O nome é aplicado no produto antes do envio, tornando-o único.',
  },
  {
    q: 'Como faço o pedido?',
    a: 'Clique em qualquer botão "Encomendar pelo WhatsApp". Você será direcionado para uma conversa com mensagem pré-formatada — só confirmar e pronto!',
  },
  {
    q: 'Qual o prazo de entrega?',
    a: 'Prazo médio de 3 a 7 dias úteis após confirmação do pedido, podendo variar conforme a localidade.',
  },
  {
    q: 'Vocês enviam para todo o Brasil?',
    a: 'Sim! Enviamos para todo o Brasil via Correios ou transportadora. O frete é calculado no WhatsApp.',
  },
  {
    q: 'O produto protege bem as figurinhas?',
    a: 'Sim! Projetado para manter suas figurinhas organizadas e em perfeito estado durante toda a Copa do Mundo 2026.',
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section id="faq" className="section-pad relative overflow-hidden bg-[#07090F]">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-transparent via-white/10 to-transparent" />

      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-8"
        >
          <p className="text-yellow-400 text-xs font-bold uppercase tracking-[0.2em] mb-3">Dúvidas frequentes</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Perguntas & Respostas
          </h2>
          <p className="mt-3 text-white/50 text-sm sm:text-base">
            Tudo que você precisa saber antes de encomendar.
          </p>
        </motion.div>

        {/* Accordion */}
        <div className="space-y-2.5">
          {FAQ_ITEMS.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              className={`glass rounded-2xl overflow-hidden transition-all duration-200 ${
                openIndex === i ? 'ring-1 ring-yellow-400/30' : ''
              }`}
            >
              <button
                id={`faq-${i}`}
                onClick={() => toggle(i)}
                aria-expanded={openIndex === i}
                className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left touch-manipulation"
              >
                <span className={`font-semibold text-sm sm:text-base leading-snug transition-colors duration-200 ${openIndex === i ? 'text-yellow-400' : 'text-white/90'}`}>
                  {item.q}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                  className="flex-shrink-0"
                >
                  <ChevronDown className={`w-5 h-5 transition-colors duration-200 ${openIndex === i ? 'text-yellow-400' : 'text-white/35'}`} />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-4 text-white/55 text-sm leading-relaxed">{item.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
