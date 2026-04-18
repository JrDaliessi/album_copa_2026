# Porta Figurinhas Copa 2026 - Contexto Central

## Visão do Produto
Landing page de alta conversão, com visual premium e dinâmico, voltada para a venda de porta-figurinhas temáticos da Copa de 2026. A ênfase será em UI/UX moderna, animações envolventes, gatilhos de urgência, copy emocional e direcionamento direto para fechamento de pedidos via WhatsApp.

## Objetivo do Sistema
Atrair fãs de futebol e colecionadores, apresentando o porta-figurinhas, suas 4 cores disponíveis e a opção exclusiva de personalização, convertendo os visitantes em leads/compradores no WhatsApp de forma rápida e fluida.

## Escopo Inicial
- Landing page (Single Page Application).
- Componentes visuais requintados (carrossel de imagens, seletores de cor, botões fixos).
- Responsividade total (mobile-first).
- Integração de CTA para WhatsApp com mensagens pré formatadas.

## Regras de Negócio Iniciais
- 4 cores base de produto: Preto, Amarelo, Verde, Azul.
- Opção de personalização com nome.
- Vendas feitas exclusivamente pelo WhatsApp (não haverá checkout nativo na versão v1).

## Arquitetura & Stack Definidas
- **Core**: Next.js (App Router), React, TypeScript.
- **Estilização**: Tailwind CSS.
- **Animações**: Framer Motion (para efeitos dinâmicos, parallax e micro-interações).
- **Ícones e UI**: Lucide React, Radix UI (se necessário para componentes acessíveis).
- **Testes**: Jest e React Testing Library (TDD obrigatório).
- **PWA**: Configuração para instalação local (Next PWA).
- **Backend/DB (Futuro)**: Supabase (atualmente sem persistência ativa, mas a arquitetura deve estar preparada segundo o padrão).

## Organização (Feature-Based + Clean Architecture Leve)
- O projeto segue separação de responsabilidades: `presentation`, `application`, `domain`, e `infrastructure`.
- O diretório principal de roteamento será `src/app`.
- As lógicas e componentes da landing page estarão contidas na feature `landing` ou `home`.

## Convenções Adotadas
- **Nomenclatura**: Arquivos em Kebab-case (ex: `hero-section.tsx`), Componentes em PascalCase (`HeroSection`).
- **Commits**: Seguirão padrão convencional (feat, fix, chore, etc).
- **TDD**: Testes devem ser criados antes das implementações de componentes ou fluxos críticos.
- **Design Padrão**: Uso restrito de paleta de cores (Cinza escuro para fundos, Verde institucional, Amarelo/Dourado premium para destaques, branco/cinza claro).

## Pendências e Próximos Passos
- Aprovação da Visão Arquitetural e Estrutura de Pastas.
- Setup inicial do projeto Next.js.
- Migração das imagens do diretório atual para `public/imagens`.
- Implementação iterativa da feature `landing` aplicando TDD.
