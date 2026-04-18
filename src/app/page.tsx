import { Hero } from '@/features/landing/presentation/components/Hero';

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-900">
      <Hero />
      {/* 
        Abaixo, um espaço provisório apenas para permitir a rolagem 
        e vermos o efeito Parallax do Hero funcionando.
      */}
      <div className="h-[1000px] w-full bg-neutral-900 border-t border-white/5 flex items-center justify-center text-white/30">
        Próximas seções: Galeria, Benefícios e FAQ
      </div>
    </main>
  );
}
