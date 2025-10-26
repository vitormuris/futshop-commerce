import { CartItem, ShopifyAddToCartOperation, ShopifyCart } from "../../types";
import { mockProducts } from "../products.mock";
import { mockCart } from "./cart.mock";

// Função para adicionar linhas ao carrinho mock
export async function addToCartMock(
  cartId: string,
  lines: { merchandiseId: string; quantity: number }[]
): Promise<ShopifyAddToCartOperation> {
  // Clona o mockCart para não alterar o original
  const updatedCart: ShopifyCart = JSON.parse(JSON.stringify(mockCart));
  updatedCart.id = cartId;

  for (const line of lines) {
    // Verifica se o item já existe no carrinho
    const existingLine = updatedCart.lines.edges.find(
      (edge) => edge.node.merchandise.id === line.merchandiseId
    );

    if (existingLine) {
      // Se já existe, incrementa a quantidade
      existingLine.node.quantity += line.quantity;

      const productVariant = mockProducts
        .flatMap((p) => p.variants)
        .find((v) => v.id === line.merchandiseId);

      if (productVariant) {
        const unitPrice = parseFloat(productVariant.price.amount);
        existingLine.node.cost.totalAmount.amount = (
          unitPrice * existingLine.node.quantity
        ).toFixed(2);
      }
    } else {
      // Se não existe, adiciona novo item
      const productVariant = mockProducts
        .flatMap((p) => p.variants)
        .find((v) => v.id === line.merchandiseId);

      if (!productVariant) continue;

      const product = mockProducts.find((p) =>
        p.variants.some((v) => v.id === line.merchandiseId)
      );

      if (!product) continue;

      const newLine: CartItem = {
        id: `line-${Math.random().toString(36).substr(2, 9)}`,
        quantity: line.quantity,
        cost: { totalAmount: { amount: productVariant.price.amount, currencyCode: productVariant.price.currencyCode } },
        merchandise: {
          id: productVariant.id,
          title: `${product.title} - ${productVariant.title}`,
          selectedOptions: productVariant.selectedOptions,
          product: {
            id: product.id,
            handle: product.handle,
            title: product.title,
            featuredImage: product.featuredImage,
          },
        },
      };

      updatedCart.lines.edges.push({ node: newLine });
    }
  }

  // Atualiza totalQuantity do carrinho
  updatedCart.totalQuantity = updatedCart.lines.edges.reduce(
    (sum, edge) => sum + edge.node.quantity,
    0
  );

  return {
    data: {
      cartLinesAdd: {
        cart: updatedCart,
      },
    },
    variables: {
      cartId,
      lines,
    },
  };
}
