import { Product, ShopifyProduct, ShopifyProductOperation, ShopifyProductsOperation } from "../types";

export const mockProducts: Product[] = [
  {
    id: 'gid://shopify/Product/1',
    handle: 'futshop-camisa-selecao-brasil',
    availableForSale: true,
    title: 'Camisa Seleção Brasil 2024',
    description: 'Camisa oficial da Seleção Brasileira 2024 com tecnologia Dri-FIT e design premium.',
    descriptionHtml: '<p>Camisa oficial da Seleção Brasileira 2024 com tecnologia Dri-FIT e design premium.</p>',
    options: [{ id: '1', name: 'Tamanho', values: ['P', 'M', 'G', 'GG'] }],
    priceRange: { maxVariantPrice: { amount: '399.90', currencyCode: 'BRL' }, minVariantPrice: { amount: '349.90', currencyCode: 'BRL' } },
    variants: [
      { id: 'gid://shopify/ProductVariant/3', title: 'P', availableForSale: true, selectedOptions: [{ name: 'Tamanho', value: 'P' }], price: { amount: '379.90', currencyCode: 'BRL' } },
      { id: 'gid://shopify/ProductVariant/4', title: 'M', availableForSale: true, selectedOptions: [{ name: 'Tamanho', value: 'M' }], price: { amount: '379.90', currencyCode: 'BRL' } },
      { id: 'gid://shopify/ProductVariant/5', title: 'G', availableForSale: true, selectedOptions: [{ name: 'Tamanho', value: 'G' }], price: { amount: '379.90', currencyCode: 'BRL' } },
      { id: 'gid://shopify/ProductVariant/6', title: 'GG', availableForSale: true, selectedOptions: [{ name: 'Tamanho', value: 'GG' }], price: { amount: '379.90', currencyCode: 'BRL' } },
    ],

    featuredImage: { url: 'https://i.imgur.com/rvpTz2T.jpeg', altText: 'Camisa Seleção Brasil 2024', width: 800, height: 800 },
    images: [{ url: 'https://i.imgur.com/rvpTz2T.jpeg', altText: 'Camisa Seleção Brasil 2024', width: 800, height: 800 }],
    seo: { title: 'Camisa Seleção Brasil 2024', description: 'Comemore com estilo com a nova camisa da Seleção Brasileira.' },
    tags: ['camisa', 'brasil', 'futebol'],
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'gid://shopify/Product/2',
    handle: 'futshop-tenis-nike-phantom',
    availableForSale: true,
    title: 'Camiseta Bahia 2025',
    description: 'Tênis profissional para gramado natural com ajuste preciso e tração de alto desempenho.',
    descriptionHtml: '<p>Tênis profissional para gramado natural com ajuste preciso e tração de alto desempenho.</p>',
    options: [{ id: '2', name: 'Tamanho', values: ['39', '40', '41', '42', '43'] }],
    priceRange: { maxVariantPrice: { amount: '1299.90', currencyCode: 'BRL' }, minVariantPrice: { amount: '1199.90', currencyCode: 'BRL' } },
    variants: [{ id: 'gid://shopify/ProductVariant/2', title: '42', availableForSale: true, selectedOptions: [{ name: 'Tamanho', value: '42' }], price: { amount: '1249.90', currencyCode: 'BRL' } }],
    featuredImage: { url: 'https://i.imgur.com/4ifRsdf.jpeg', altText: 'Tênis Nike Phantom GX Elite', width: 800, height: 800 },
    images: [{ url: 'https://i.imgur.com/4ifRsdf.jpeg', altText: 'Tênis Nike Phantom GX Elite', width: 800, height: 800 }],
    seo: { title: 'Tênis Nike Phantom GX Elite', description: 'Domine o campo com o novo Phantom GX Elite da Nike.' },
    tags: ['tênis', 'nike', 'futebol'],
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'gid://shopify/Product/3',
    handle: 'futshop-camisa-flamengo-2024',
    availableForSale: true,
    title: 'Camisa Flamengo 2024',
    description: 'Camisa oficial do São Paulo 2025 com tecido respirável e ajuste confortável.',
    descriptionHtml: '<p>Camisa oficial do São Paulo 2024 com tecido respirável e ajuste confortável.</p>',
    options: [{ id: '3', name: 'Tamanho', values: ['P', 'M', 'G', 'GG'] }],
    priceRange: { maxVariantPrice: { amount: '399.90', currencyCode: 'BRL' }, minVariantPrice: { amount: '349.90', currencyCode: 'BRL' } },
    variants: [{ id: 'gid://shopify/ProductVariant/3', title: 'M', availableForSale: true, selectedOptions: [{ name: 'Tamanho', value: 'M' }], price: { amount: '379.90', currencyCode: 'BRL' } },
  ],
    featuredImage: { url: 'https://i.imgur.com/gZUzqtX.jpeg', altText: 'Camisa Flamengo 2024', width: 800, height: 800 },
    images: [{ url: 'https://i.imgur.com/gZUzqtX.jpeg', altText: 'Camisa Flamengo 2024', width: 800, height: 800 }],
    seo: { title: 'Camisa São Paulo 2024', description: 'Mostre sua paixão pelo Tricolor com a nova camisa oficial.' },
    tags: ['camisa', 'sao-paulo', 'futebol'],
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'gid://shopify/Product/4',
    handle: 'futshop-bola-adidas-pro',
    availableForSale: true,
    title: 'Bola Adidas Pro',
    description: 'Bola oficial para treino e jogos, com excelente precisão e durabilidade.',
    descriptionHtml: '<p>Bola oficial para treino e jogos, com excelente precisão e durabilidade.</p>',
    options: [{ id: '4', name: 'Tamanho', values: ['4', '5'] }],
    priceRange: { maxVariantPrice: { amount: '299.90', currencyCode: 'BRL' }, minVariantPrice: { amount: '249.90', currencyCode: 'BRL' } },
    variants: [{ id: 'gid://shopify/ProductVariant/4', title: '5', availableForSale: true, selectedOptions: [{ name: 'Tamanho', value: '5' }], price: { amount: '279.90', currencyCode: 'BRL' } }],
    featuredImage: { url: 'https://i.imgur.com/qdxkPPv.jpeg', altText: 'Bola Adidas Pro', width: 800, height: 800 },
    images: [{ url: 'https://i.imgur.com/qdxkPPv.jpeg', altText: 'Bola Adidas Pro', width: 800, height: 800 }],
    seo: { title: 'Bola Adidas Pro', description: 'Treine como profissional com a bola Adidas Pro.' },
    tags: ['bola', 'adidas', 'futebol'],
    updatedAt: new Date().toISOString(),
  },

  {
    id: 'gid://shopify/Product/6',
    handle: 'futshop-camisa-palmeiras-2024',
    availableForSale: true,
    title: 'Camisa Palmeiras 2024',
    description: 'Camisa oficial do Palmeiras 2024 com tecido respirável e ajuste confortável.',
    descriptionHtml: '<p>Camisa oficial do Palmeiras 2024 com tecido respirável e ajuste confortável.</p>',
    options: [{ id: '6', name: 'Tamanho', values: ['P', 'M', 'G', 'GG'] }],
    priceRange: { maxVariantPrice: { amount: '399.90', currencyCode: 'BRL' }, minVariantPrice: { amount: '349.90', currencyCode: 'BRL' } },
    variants: [{ id: 'gid://shopify/ProductVariant/6', title: 'M', availableForSale: true, selectedOptions: [{ name: 'Tamanho', value: 'M' }], price: { amount: '379.90', currencyCode: 'BRL' } }],
    featuredImage: { url: 'https://i.imgur.com/2ipKnQJ.jpeg', altText: 'Camisa Palmeiras 2024', width: 800, height: 800 },
    images: [{ url: 'https://i.imgur.com/2ipKnQJ.jpeg', altText: 'Camisa Palmeiras 2024', width: 800, height: 800 }],
    seo: { title: 'Camisa Palmeiras 2024', description: 'Mostre sua paixão pelo Verdão com a nova camisa oficial.' },
    tags: ['camisa', 'palmeiras', 'futebol'],
    updatedAt: new Date().toISOString(),
  },
 
  {
    id: 'gid://shopify/Product/8',
    handle: 'futshop-camisa-corinthians-2024',
    availableForSale: true,
    title: 'Camisa Corinthians 2024',
    description: 'Camisa oficial do Corinthians 2024 com tecido respirável e ajuste confortável.',
    descriptionHtml: '<p>Camisa oficial do Corinthians 2024 com tecido respirável e ajuste confortável.</p>',
    options: [{ id: '8', name: 'Tamanho', values: ['P', 'M', 'G', 'GG'] }],
    priceRange: { maxVariantPrice: { amount: '399.90', currencyCode: 'BRL' }, minVariantPrice: { amount: '349.90', currencyCode: 'BRL' } },
    variants: [{ id: 'gid://shopify/ProductVariant/8', title: 'M', availableForSale: true, selectedOptions: [{ name: 'Tamanho', value: 'M' }], price: { amount: '379.90', currencyCode: 'BRL' } }],
    featuredImage: { url: 'https://i.imgur.com/oxkVs0D.jpeg', altText: 'Camisa Corinthians 2024', width: 800, height: 800 },
    images: [{ url: 'https://i.imgur.com/oxkVs0D.jpeg', altText: 'Camisa Corinthians 2024', width: 800, height: 800 }],
    seo: { title: 'Camisa Corinthians 2024', description: 'Mostre sua paixão pelo Timão com a nova camisa oficial.' },
    tags: ['camisa', 'corinthians', 'futebol'],
    updatedAt: new Date().toISOString(),
  },

];




export async function getProductsMock(): Promise<ShopifyProductsOperation> {
  return {
    body: {
      data: {
        products: {
          edges: mockProducts.map((product) => ({
            node: product,
          })),
        },
      },
    },
  } as any;
}

export async function getProductMock(
  handle: string
): Promise<ShopifyProductOperation> {
  const product = mockProducts[0];
  if (!product) throw new Error('Nenhum produto disponível no mock');

  return {
    data: {
      product: toShopifyProduct(product),
    },
    variables: {
      handle,
    },
  };
}

function toShopifyProduct(product: Product): ShopifyProduct {
  return {
    ...product,
    variants: {
      edges: product.variants.map((v) => ({ node: v })),
    },
    images: {
      edges: product.images.map((img) => ({ node: img })),
    },
  };
}