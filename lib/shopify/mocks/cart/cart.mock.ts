import { ShopifyCart, ShopifyCartOperation } from "../../types";


// Mock do carrinho
export const mockCart: ShopifyCart = {
  id: 'cart-1',
  checkoutUrl: 'https://checkout.futshop.com/cart-1',
  totalQuantity: 2,
  cost: {
    subtotalAmount: { amount: '1629.80', currencyCode: 'BRL' },
    totalAmount: { amount: '1629.80', currencyCode: 'BRL' },
    totalTaxAmount: { amount: '0', currencyCode: 'BRL' },
  },
  lines: {
    edges: [
      {
        node: {
          id: 'line-1',
          quantity: 1,
          cost: {
            totalAmount: { amount: '379.90', currencyCode: 'BRL' },
          },
          merchandise: {
            id: 'gid://shopify/ProductVariant/1',
            title: 'Camisa Seleção Brasil 2024 - M',
            selectedOptions: [{ name: 'Tamanho', value: 'M' }],
            product: {
              id: 'gid://shopify/Product/1',
              handle: 'futshop-camisa-selecao-brasil',
              title: 'Camisa Seleção Brasil 2024',
              featuredImage: {
                url: 'https://i.imgur.com/58Sm9KD.jpeg',
                altText: 'Camisa Seleção Brasil 2024',
                width: 800,
                height: 800,
              },
            },
          },
        },
      },
      {
        node: {
          id: 'line-2',
          quantity: 1,
          cost: {
            totalAmount: { amount: '1249.90', currencyCode: 'BRL' },
          },
          merchandise: {
            id: 'gid://shopify/ProductVariant/2',
            title: 'Camisa Napoli',
            selectedOptions: [{ name: 'Tamanho', value: '42' }],
            product: {
              id: 'gid://shopify/Product/2',
              handle: 'futshop-tenis-nike-phantom',
              title: 'Camisa Napoli',
              featuredImage: {
                url: 'https://i.imgur.com/3qXy0So.jpeg',
                altText: 'Camisa Napoli',
                width: 800,
                height: 800,
              },
            },
          },
        },
      },
    ],
  },
};

// Função getCartMock
export async function getCartMock(cartId: string): Promise<ShopifyCartOperation> {
  // No mock, retornamos sempre o mesmo cart independentemente do cartId
  return {
    data: {
      cart: { ...mockCart, id: cartId },
    },
    variables: {
      cartId,
    },
  };
}
