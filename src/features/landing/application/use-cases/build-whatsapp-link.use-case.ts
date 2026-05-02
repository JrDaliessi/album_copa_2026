import { OrderDetails } from '../../domain/types/product.types';

export function buildWhatsappLink(details: Partial<OrderDetails> = {}): string {
  const phoneNumber = '5519991534420'; // Reference: (19) 99153-4420
  
  let message = 'Olá, quero encomendar um porta figurinhas da Copa 2026.';

  if (details.color) {
    message += ` Gostaria de ter o modelo ${details.isDuplo ? 'Duplo ' : ''}na cor ${details.color}.`;
  } else {
    message += ` Gostaria de ver as cores disponíveis${details.isDuplo ? ' para o modelo Duplo' : ''}.`;
  }

  if (details.wantsPersonalization) {
    message += ` E quero ver a opção personalizada com nome.`;
  } else if (!details.color) {
    message += ` E a opção personalizada com nome.`;
  }

  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
}
