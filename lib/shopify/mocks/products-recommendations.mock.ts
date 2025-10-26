import { ShopifyProductRecommendationsOperation } from "../types";


export const mockProductRecommendations: ShopifyProductRecommendationsOperation = {
  data: {
    productRecommendations: [
      {
        id: 'gid://shopify/Product/3',
        handle: 'futshop-bola-nike-flight',
        availableForSale: true,
        title: 'Bola Nike Flight 2024',
        description: 'Bola oficial da temporada 2024 com tecnologia AerowSculpt para trajetórias precisas.',
        descriptionHtml:
          '<p>Bola oficial da temporada 2024 com tecnologia AerowSculpt para trajetórias precisas.</p>',
        options: [
          {
            id: '3',
            name: 'Tamanho',
            values: ['5'],
          },
        ],
        priceRange: {
          maxVariantPrice: { amount: '599.90', currencyCode: 'BRL' },
          minVariantPrice: { amount: '499.90', currencyCode: 'BRL' },
        },
        variants: {
          edges: [
            {
              node: {
                id: 'gid://shopify/ProductVariant/3',
                title: 'Tamanho 5',
                availableForSale: true,
                selectedOptions: [{ name: 'Tamanho', value: '5' }],
                price: { amount: '549.90', currencyCode: 'BRL' },
              },
            },
          ],
        },
        featuredImage: {
          url: 'https://images.unsplash.com/photo-1600181953839-d05b99f5b4d1?w=800',
          altText: 'Bola Nike Flight 2024',
          width: 800,
          height: 800,
        },
        images: {
          edges: [
            {
              node: {
                url: 'https://images.unsplash.com/photo-1600181953839-d05b99f5b4d1?w=800',
                altText: 'Bola Nike Flight 2024',
                width: 800,
                height: 800,
              },
            },
          ],
        },
        seo: {
          title: 'Bola Nike Flight 2024',
          description: 'Alta performance e precisão com a nova bola Nike Flight 2024.',
        },
        tags: ['bola', 'nike', 'futebol'],
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'gid://shopify/Product/4',
        handle: 'futshop-caneleira-adidas-xpro',
        availableForSale: true,
        title: 'Caneleira Adidas X-Pro',
        description: 'Caneleira leve e resistente, ideal para alta performance e conforto.',
        descriptionHtml:
          '<p>Caneleira leve e resistente, ideal para alta performance e conforto.</p>',
        options: [
          {
            id: '4',
            name: 'Tamanho',
            values: ['P', 'M', 'G'],
          },
        ],
        priceRange: {
          maxVariantPrice: { amount: '249.90', currencyCode: 'BRL' },
          minVariantPrice: { amount: '199.90', currencyCode: 'BRL' },
        },
        variants: {
          edges: [
            {
              node: {
                id: 'gid://shopify/ProductVariant/4',
                title: 'M',
                availableForSale: true,
                selectedOptions: [{ name: 'Tamanho', value: 'M' }],
                price: { amount: '229.90', currencyCode: 'BRL' },
              },
            },
          ],
        },
        featuredImage: {
          url: 'https://images.unsplash.com/photo-1618886614637-1b1fbd1c45e7?w=800',
          altText: 'Caneleira Adidas X-Pro',
          width: 800,
          height: 800,
        },
        images: {
          edges: [
            {
              node: {
                url: 'https://images.unsplash.com/photo-1618886614637-1b1fbd1c45e7?w=800',
                altText: 'Caneleira Adidas X-Pro',
                width: 800,
                height: 800,
              },
            },
          ],
        },
        seo: {
          title: 'Caneleira Adidas X-Pro',
          description: 'Proteção e conforto com a nova linha X-Pro da Adidas.',
        },
        tags: ['caneleira', 'adidas', 'futebol'],
        updatedAt: new Date().toISOString(),
      },
    ],
  },
  variables: {
    productId: 'gid://shopify/Product/1',
  },
};


export async function getProductRecommendationsMock(
  productId: string
): Promise<ShopifyProductRecommendationsOperation> {
  return {
    data: {
      productRecommendations: mockProductRecommendations.data.productRecommendations,
    },
    variables: {
      productId,
    },
  };
}
