import { useApolloClient } from '@apollo/client';
import { GET_PRODUCTS_BY_IDS } from 'app/graph';
import JsonAsXlsx from './preparingXlsx';

type PreparingProps = {
  items: {
    productId: string;
    actual: number;
  }[];
  id: string;
  warehouseId: string;
  shops: string[];
};

interface PreparingXslxState {
  buildPreparingXlsx(data: PreparingProps): Promise<void>;
}

export default function usePreparingXslxHooks(): PreparingXslxState {
  const client = useApolloClient();

  const buildPreparingXlsx = async (props: PreparingProps) => {
    const products = await client.query({
      query: GET_PRODUCTS_BY_IDS,
      variables: { ids: props.items.map((item) => item.productId) },
    });

    const newItems = props.items.map((item: any) => ({
      ...item,
      productName: products.data.getProductsByIds.find(
        (product: any) => product.id === item.productId
      )?.name,
    }));

    newItems.sort((a: any, b: any) => b.actual - a.actual);
    JsonAsXlsx({ ...props, items: newItems });
  };

  return {
    buildPreparingXlsx,
  };
}
