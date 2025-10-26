import { Menu, ShopifyMenuOperation } from "../types";


// Mock de menu
export const mockMenuItems: Menu[] = [
  { title: 'Home', path: '/' },
  { title: 'Produtos', path: '/products' },
  { title: 'Coleções', path: '/collections' },
  { title: 'Sobre', path: '/about' },
  { title: 'Contato', path: '/contact' },
];

// Função para obter menu mock
export async function getMenuMock(handle: string): Promise<ShopifyMenuOperation> {
  // Aqui você pode usar o `handle` para retornar menus diferentes se quiser
  return {
    data: {
      menu: {
        items: mockMenuItems.map((item) => ({
          title: item.title,
          url: item.path,
        })),
      },
    },
    variables: { handle },
  };
}
