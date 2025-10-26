import { ShopifyCart, ShopifyUpdateCartOperation } from "../../types";
import { mockCart } from "./cart.mock";


// Função para atualizar o carrinho mock
export async function updateCartMock(
  cartId: string,
  lines: { id: string; merchandiseId: string; quantity: number }[]
): Promise<ShopifyUpdateCartOperation> {
  // Clona o mockCart para não alterar o original
  const updatedCart: ShopifyCart = JSON.parse(JSON.stringify(mockCart));
  updatedCart.id = cartId;

  // Atualiza as quantidades das linhas conforme passado
  updatedCart.lines.edges = updatedCart.lines.edges.map((edge) => {
    const lineUpdate = lines.find((l) => l.id === edge.node.id);
    if (lineUpdate) {
      edge.node.quantity = lineUpdate.quantity;
      // Atualiza o totalAmount da linha (simples multiplicação do preço unitário)
      const unitPrice = parseFloat(edge.node.cost.totalAmount.amount) / edge.node.quantity || 0;
      edge.node.cost.totalAmount.amount = (unitPrice * lineUpdate.quantity).toFixed(2);
    }
    return edge;
  });

  // Atualiza totalQuantity do carrinho
  updatedCart.totalQuantity = updatedCart.lines.edges.reduce(
    (sum, edge) => sum + edge.node.quantity,
    0
  );

  return {
    data: {
      cartLinesUpdate: {
        cart: updatedCart,
      },
    },
    variables: {
      cartId,
      lines,
    },
  };
}
