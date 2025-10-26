import { ShopifyCart, ShopifyCreateCartOperation } from "lib/shopify/types";
import { mockCart } from "./cart.mock";

// Função para criar um novo carrinho mock
export async function createCartMock(): Promise<ShopifyCreateCartOperation> {
  // Clona o mockCart para criar uma instância nova
  const newCart: ShopifyCart = JSON.parse(JSON.stringify(mockCart));
  newCart.id = `cart-${Math.random().toString(36).substr(2, 9)}`;
  newCart.totalQuantity = 0;
  newCart.lines.edges = [];

  return {
    data: {
      cartCreate: {
        cart: newCart,
      },
    },
  };
}
