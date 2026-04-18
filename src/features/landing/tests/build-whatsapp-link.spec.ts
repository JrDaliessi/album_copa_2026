import { buildWhatsappLink } from '../application/use-cases/build-whatsapp-link.use-case';

describe('BuildWhatsappLink Use Case', () => {
  const phoneNumber = '5519991534420';

  it('deve gerar o link padrão sem variavel definida', () => {
    const link = buildWhatsappLink({});
    expect(link).toContain(phoneNumber);
    expect(link).toContain('Copa%202026'); // Validating simple encode
  });

  it('deve incluir a cor no link se passada', () => {
    const link = buildWhatsappLink({ color: 'verde' });
    expect(link).toContain('cor%20verde');
  });

  it('deve mencionar a personalizacao se requisitado pelo usuario', () => {
    const link = buildWhatsappLink({ wantsPersonalization: true });
    expect(link).toContain('personalizada%20com%20nome');
  });
});
