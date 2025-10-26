import { ShopifyCart, ShopifyRemoveFromCartOperation } from "../../types";
import { mockCart } from "./cart.mock";


// Função para remover linhas do carrinho mock
export async function removeFromCartMock(
  cartId: string,
  lineIds: string[]
): Promise<ShopifyRemoveFromCartOperation> {
  // Clona o mockCart para não alterar o original
  const updatedCart: ShopifyCart = JSON.parse(JSON.stringify(mockCart));
  updatedCart.id = cartId;

  // Remove as linhas com os IDs fornecidos
  updatedCart.lines.edges = updatedCart.lines.edges.filter(
    (edge) => !lineIds.includes(edge.node.id!)
  );

  // Atualiza totalQuantity do carrinho
  updatedCart.totalQuantity = updatedCart.lines.edges.reduce(
    (sum, edge) => sum + edge.node.quantity,
    0
  );

  return {
    data: {
      cartLinesRemove: {
        cart: updatedCart,
      },
    },
    variables: {
      cartId,
      lineIds,
    },
  };
}
