import { Connection, Page, ShopifyPageOperation, ShopifyPagesOperation } from "../types";


// Mock de páginas
export const mockPages: Page[] = [
  {
    id: 'page-1',
    title: 'Sobre Nós',
    handle: 'sobre-nos',
    body: 'Conteúdo completo da página Sobre Nós.',
    bodySummary: 'Resumo da página Sobre Nós.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    seo: {
      title: 'Sobre Nós - Futshop',
      description: 'Conheça mais sobre a Futshop.',
    },
  },
  {
    id: 'page-2',
    title: 'Política de Privacidade',
    handle: 'politica-de-privacidade',
    body: 'Conteúdo completo da página Política de Privacidade.',
    bodySummary: 'Resumo da Política de Privacidade.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    seo: {
      title: 'Política de Privacidade - Futshop',
      description: 'Saiba como tratamos seus dados na Futshop.',
    },
  },
];

export const mockPagesConnection: Connection<Page> = {
  edges: mockPages.map((page) => ({ node: page })),
};

// Função getPagesMock
export async function getPagesMock(): Promise<ShopifyPagesOperation> {
  return {
    data: {
      pages: mockPagesConnection,
    },
  };
}

export async function getPageMock(
  handle: string
): Promise<ShopifyPageOperation> {
  const page: Page | undefined = mockPages.find((p) => p.handle === handle);

  if (!page) {
    throw new Error(`Página com handle "${handle}" não encontrada no mock`);
  }

  return {
    data: {
      pageByHandle: page,
    },
    variables: {
      handle,
    },
  };
}
