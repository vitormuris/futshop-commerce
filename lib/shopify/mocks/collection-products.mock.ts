import { Connection, Product, ShopifyCollectionProductsOperation, ShopifyProduct } from "../types";
import { mockProducts } from "./products.mock";


// Transformando Product[] em Connection<ShopifyProduct>
function toShopifyProductConnection(products: Product[]): Connection<ShopifyProduct> {
  return {
    edges: products.map((product) => ({
      node: {
        ...product,
        variants: {
          edges: product.variants.map((v) => ({ node: v })),
        },
        images: {
          edges: product.images.map((img) => ({ node: img })), // product.images já é Image[]
        },
      },
    })),
  };
}


// Função getCollectionProductsMock
export async function getCollectionProductsMock(
  handle: string,
  reverse?: boolean,
  sortKey?: string
): Promise<ShopifyCollectionProductsOperation> {
  // Para mock, apenas retorna todos os produtos
  const productsConnection = toShopifyProductConnection(mockProducts);

  return {
    data: {
      collection: {
        products: productsConnection,
      },
    },
    variables: {
      handle,
      reverse,
      sortKey,
    },
  };
}


