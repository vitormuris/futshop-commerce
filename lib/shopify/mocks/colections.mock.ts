import { Connection, ShopifyCollection, ShopifyCollectionOperation, ShopifyCollectionsOperation } from "../types";


// Mock de coleções
export const mockCollections: ShopifyCollection[] = [
  {
    handle: 'camisas',
    title: 'Camisas',
    description: 'Todas as camisas de futebol disponíveis.',
    updatedAt: new Date().toISOString(),
    seo: {
      title: 'Camisas - Futshop',
      description: 'Encontre todas as camisas de futebol na Futshop.',
    },
  },
  {
    handle: 'tenis',
    title: 'Tênis',
    description: 'Tênis de futebol para todos os estilos.',
    updatedAt: new Date().toISOString(),
    seo: {
      title: 'Tênis - Futshop',
      description: 'Confira os melhores tênis de futebol.',
    },
  },
];

// Transformando em Connection<ShopifyCollection>
export const mockCollectionsConnection: Connection<ShopifyCollection> = {
  edges: mockCollections.map((collection) => ({ node: collection })),
};

// Função getCollectionsMock
export async function getCollectionsMock(): Promise<ShopifyCollectionsOperation> {
  return {
    data: {
      collections: mockCollectionsConnection,
    },
  };
}


// Função getCollectionMock
export async function getCollectionMock(
  handle: string
): Promise<ShopifyCollectionOperation> {
  const collection: ShopifyCollection | undefined = mockCollections.find(
    (c) => c.handle === handle
  );

  if (!collection) {
    throw new Error(`Coleção com handle "${handle}" não encontrada no mock`);
  }

  return {
    data: {
      collection,
    },
    variables: {
      handle,
    },
  };
}

