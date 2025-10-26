import {
  HIDDEN_PRODUCT_TAG,
  SHOPIFY_GRAPHQL_API_ENDPOINT,
  TAGS
} from 'lib/constants';
import { ensureStartsWith } from 'lib/utils';
import {
  unstable_cacheLife as cacheLife,
  unstable_cacheTag as cacheTag,
  revalidateTag
} from 'next/cache';
import { cookies, headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { addToCartMock } from './mocks/cart/add-cart.mock';
import { getCartMock } from './mocks/cart/cart.mock';
import { createCartMock } from './mocks/cart/create-cart.mock';
import { removeFromCartMock } from './mocks/cart/remove-cart';
import { updateCartMock } from './mocks/cart/update-cart.mock';
import { getCollectionMock, getCollectionsMock } from './mocks/colections.mock';
import { getCollectionProductsMock } from './mocks/collection-products.mock';
import { getMenuMock } from './mocks/menu.mock';
import { getPageMock, getPagesMock } from './mocks/pages.mock';
import { getProductRecommendationsMock } from './mocks/products-recommendations.mock';
import { getProductMock, getProductsMock } from './mocks/products.mock';
import {
  Cart,
  Collection,
  Connection,
  Image,
  Menu,
  Page,
  Product,
  ShopifyCart,
  ShopifyCollection,
  ShopifyProduct
} from './types';

const domain = process.env.SHOPIFY_STORE_DOMAIN
  ? ensureStartsWith(process.env.SHOPIFY_STORE_DOMAIN, 'https://')
  : '';
const endpoint = `${domain}${SHOPIFY_GRAPHQL_API_ENDPOINT}`;
const key = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!;

type ExtractVariables<T> = T extends { variables: object }
  ? T['variables']
  : never;

// export async function shopifyFetch<T>({
//   headers,
//   query,
//   variables
// }: {
//   headers?: HeadersInit;
//   query: string;
//   variables?: ExtractVariables<T>;
// }): Promise<{ status: number; body: T } | never> {
//   try {
//     const result = await fetch(endpoint, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'X-Shopify-Storefront-Access-Token': key,
//         ...headers
//       },
//       body: JSON.stringify({
//         ...(query && { query }),
//         ...(variables && { variables })
//       })
//     });

//     const body = await result.json();

//     if (body.errors) {
//       throw body.errors[0];
//     }

//     return {
//       status: result.status,
//       body
//     };
//   } catch (e) {
//     if (isShopifyError(e)) {
//       throw {
//         cause: e.cause?.toString() || 'unknown',
//         status: e.status || 500,
//         message: e.message,
//         query
//       };
//     }

//     throw {
//       error: e,
//       query
//     };
//   }
// }

const removeEdgesAndNodes = <T>(array: Connection<T>): T[] => {
  return array.edges.map((edge) => edge?.node);
};

const reshapeCart = (cart: ShopifyCart): Cart => {
  if (!cart.cost?.totalTaxAmount) {
    cart.cost.totalTaxAmount = {
      amount: '0.0',
      currencyCode: cart.cost.totalAmount.currencyCode
    };
  }

  return {
    ...cart,
    lines: removeEdgesAndNodes(cart.lines)
  };
};

const reshapeCollection = (
  collection: ShopifyCollection
): Collection | undefined => {
  if (!collection) {
    return undefined;
  }

  return {
    ...collection,
    path: `/search/${collection.handle}`
  };
};

const reshapeCollections = (collections: ShopifyCollection[]) => {
  const reshapedCollections = [];

  for (const collection of collections) {
    if (collection) {
      const reshapedCollection = reshapeCollection(collection);

      if (reshapedCollection) {
        reshapedCollections.push(reshapedCollection);
      }
    }
  }

  return reshapedCollections;
};

const reshapeImages = (images: Connection<Image>, productTitle: string) => {
  const flattened = removeEdgesAndNodes(images);

  return flattened.map((image) => {
    const filename = image.url.match(/.*\/(.*)\..*/)?.[1];
    return {
      ...image,
      altText: image.altText || `${productTitle} - ${filename}`
    };
  });
};

const reshapeProduct = (
  product: ShopifyProduct,
  filterHiddenProducts: boolean = true
) => {
  if (
    !product ||
    (filterHiddenProducts && product.tags.includes(HIDDEN_PRODUCT_TAG))
  ) {
    return undefined;
  }

  const { images, variants, ...rest } = product;

  return {
    ...rest,
    images: reshapeImages(images, product.title),
    variants: removeEdgesAndNodes(variants)
  };
};

const reshapeProducts = (products: ShopifyProduct[]) => {
  const reshapedProducts = [];

  for (const product of products) {
    if (product) {
      const reshapedProduct = reshapeProduct(product);

      if (reshapedProduct) {
        reshapedProducts.push(reshapedProduct);
      }
    }
  }

  return reshapedProducts;
};

export async function createCart(): Promise<Cart> {
  const res = await createCartMock()
  
  // shopifyFetch<ShopifyCreateCartOperation>({
  //   query: createCartMutation
  // });

  return reshapeCart(res.data.cartCreate.cart);
}

export async function addToCart(
  lines: { merchandiseId: string; quantity: number }[]
): Promise<Cart> {
  const cartId = (await cookies()).get('cartId')?.value!;
  const res = await addToCartMock('cart-1', [
    { merchandiseId: 'gid://shopify/ProductVariant/1', quantity: 2 },
  ]);
  
  // await shopifyFetch<ShopifyAddToCartOperation>({
  //   query: addToCartMutation,
  //   variables: {
  //     cartId,
  //     lines
  //   }
  // });
  return reshapeCart(res.data.cartLinesAdd.cart);
}

export async function removeFromCart(lineIds: string[]): Promise<Cart> {
  const cartId = (await cookies()).get('cartId')?.value!;
  const res = await removeFromCartMock('cart-1', ['line-1']);
  
  
  // await shopifyFetch<ShopifyRemoveFromCartOperation>({
  //   query: removeFromCartMutation,
  //   variables: {
  //     cartId,
  //     lineIds
  //   }
  // });

  return reshapeCart(res.data.cartLinesRemove.cart);
}

export async function updateCart(
  lines: { id: string; merchandiseId: string; quantity: number }[]
): Promise<Cart> {
  const cartId = (await cookies()).get('cartId')?.value!;
  const res = await updateCartMock('cart-1', [
  { id: 'line-1', merchandiseId: 'gid://shopify/ProductVariant/1', quantity: 2 },
  { id: 'line-2', merchandiseId: 'gid://shopify/ProductVariant/2', quantity: 1 },
])
  
  // await shopifyFetch<ShopifyUpdateCartOperation>({
  //   query: editCartItemsMutation,
  //   variables: {
  //     cartId,
  //     lines
  //   }
  // });

  return reshapeCart(res.data.cartLinesUpdate.cart);
}

export async function getCart(): Promise<Cart | undefined> {
  const cartId = (await cookies()).get('cartId')?.value;

  // if (!cartId) {
  //   return undefined;
  // }

  const res = await getCartMock('cartId') 
  console.log('getCartMock', res);
  // await shopifyFetch<ShopifyCartOperation>({
  //   query: getCartQuery,
  //   variables: { cartId }
  // });

  // Old carts becomes `null` when you checkout.
  if (!res.data.cart) {
    return undefined;
  }

  return reshapeCart(res.data.cart);
}

export async function getCollection(
  handle: string
): Promise<Collection | undefined> {
  'use cache';
  cacheTag(TAGS.collections);
  cacheLife('days');

  const res = await getCollectionMock('handle')
  
  // await shopifyFetch<ShopifyCollectionOperation>({
  //   query: getCollectionQuery,
  //   variables: {
  //     handle
  //   }
  // });

  return reshapeCollection(res.data.collection);
}

export async function getCollectionProducts({
  collection,
  reverse,
  sortKey
}: {
  collection: string;
  reverse?: boolean;
  sortKey?: string;
}): Promise<Product[]> {
  'use cache';
  cacheTag(TAGS.collections, TAGS.products);
  cacheLife('days');

  const res = await getCollectionProductsMock('camisas');
  
  // await shopifyFetch<ShopifyCollectionProductsOperation>({
  //   query: getCollectionProductsQuery,
  //   variables: {
  //     handle: collection,
  //     reverse,
  //     sortKey: sortKey === 'CREATED_AT' ? 'CREATED' : sortKey
  //   }
  // });

  if (!res.data.collection) {
    console.log(`No collection found for \`${collection}\``);
    return [];
  }

  return reshapeProducts(
    removeEdgesAndNodes(res.data.collection.products)
  );
}

export async function getCollections(): Promise<Collection[]> {
  'use cache';
  cacheTag(TAGS.collections);
  cacheLife('days');

  const res = await getCollectionsMock()
  
  // await shopifyFetch<ShopifyCollectionsOperation>({
  //   query: getCollectionsQuery
  // });
  const shopifyCollections = removeEdgesAndNodes(res.data?.collections);
  const collections = [
    {
      handle: '',
      title: 'All',
      description: 'All products',
      seo: {
        title: 'All',
        description: 'All products'
      },
      path: '/search',
      updatedAt: new Date().toISOString()
    },
    // Filter out the `hidden` collections.
    // Collections that start with `hidden-*` need to be hidden on the search page.
    ...reshapeCollections(shopifyCollections).filter(
      (collection) => !collection.handle.startsWith('hidden')
    )
  ];

  return collections;
}

export async function getMenu(handle: string): Promise<Menu[]> {
  'use cache';
  cacheTag(TAGS.collections);
  cacheLife('days');

  const res = await getMenuMock(handle)
  
  // ShopifyMenuOperation = {
  //    data: {
  //     menu: {
  //       items: [{
  //         title: 'string',
  //         url: 'string',
  //       }],
  //     },
  //   },
  //   variables: {
  //     handle: 'string',
  //   }
  // }

  return (
    res.data.menu?.items.map((item: { title: string; url: string }) => ({
      title: item.title,
      path: item.url
        .replace(domain, '')
        .replace('/collections', '/search')
        .replace('/pages', '')
    })) || []
  );
}

export async function getPage(handle: string): Promise<Page> {
  const res = await getPageMock(handle)
  
  // await shopifyFetch<ShopifyPageOperation>({
  //   query: getPageQuery,
  //   variables: { handle }
  // });

  return res.data.pageByHandle;
}

export async function getPages(): Promise<Page[]> {
  const res = await getPagesMock()
  
  // await shopifyFetch<ShopifyPagesOperation>({
  //   query: getPagesQuery
  // });

  return removeEdgesAndNodes(res.data.pages);
}

export async function getProduct(handle: string): Promise<Product | undefined> {
  'use cache';
  cacheTag(TAGS.products);
  cacheLife('days');

  const res = await getProductMock(handle)
  
  // await shopifyFetch<ShopifyProductOperation>({
  //   query: getProductQuery,
  //   variables: {
  //     handle
  //   }
  // });

  return reshapeProduct(res.data.product, false);
}

export async function getProductRecommendations(
  productId: string
): Promise<Product[]> {
  'use cache';
  cacheTag(TAGS.products);
  cacheLife('days');

  const res =await getProductRecommendationsMock('1')
  //  await shopifyFetch<ShopifyProductRecommendationsOperation>({
  //   query: getProductRecommendationsQuery,
  //   variables: {
  //     productId
  //   }
  // });

  return reshapeProducts(res.data.productRecommendations);
}

export async function getProducts({
  query,
  reverse,
  sortKey
}: {
  query?: string;
  reverse?: boolean;
  sortKey?: string;
}): Promise<Product[]> {
  'use cache';
  cacheTag(TAGS.products);
  cacheLife('days');

  const res = await getProductsMock()
  
  // shopifyFetch<ShopifyProductsOperation>({
  //   query: getProductsQuery,
  //   variables: {
  //     query,
  //     reverse,
  //     sortKey
  //   }
  // });

  return reshapeProducts(removeEdgesAndNodes(res.data.products));
}

// This is called from `app/api/revalidate.ts` so providers can control revalidation logic.
export async function revalidate(req: NextRequest): Promise<NextResponse> {
  // We always need to respond with a 200 status code to Shopify,
  // otherwise it will continue to retry the request.
  const collectionWebhooks = [
    'collections/create',
    'collections/delete',
    'collections/update'
  ];
  const productWebhooks = [
    'products/create',
    'products/delete',
    'products/update'
  ];
  const topic = (await headers()).get('x-shopify-topic') || 'unknown';
  const secret = req.nextUrl.searchParams.get('secret');
  const isCollectionUpdate = collectionWebhooks.includes(topic);
  const isProductUpdate = productWebhooks.includes(topic);

  if (!secret || secret !== process.env.SHOPIFY_REVALIDATION_SECRET) {
    console.error('Invalid revalidation secret.');
    return NextResponse.json({ status: 401 });
  }

  if (!isCollectionUpdate && !isProductUpdate) {
    // We don't need to revalidate anything for any other topics.
    return NextResponse.json({ status: 200 });
  }

  if (isCollectionUpdate) {
    revalidateTag(TAGS.collections);
  }

  if (isProductUpdate) {
    revalidateTag(TAGS.products);
  }

  return NextResponse.json({ status: 200, revalidated: true, now: Date.now() });
}
