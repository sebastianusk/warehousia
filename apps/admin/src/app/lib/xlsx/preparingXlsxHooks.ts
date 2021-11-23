import { useApolloClient } from '@apollo/client';
import { SEARCH_PRODUCT } from 'app/graph';
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

export default function useTransactionXslxHooks(): PreparingXslxState {
  const client = useApolloClient();

  const buildPreparingXlsx = async (props: PreparingProps) => {
    const newItems = await Promise.all(
      props.items.map(async (item: any) => {
        const { data } = await client.query({
          query: SEARCH_PRODUCT,
          variables: { query: item.productId },
        });
        return {
          ...item,
          productName: data.searchProduct[0].name,
        };
      })
    );
    newItems.sort((a: any, b: any) => b.actual - a.actual);
    JsonAsXlsx({ ...props, items: newItems });
  };

  return {
    buildPreparingXlsx,
  };
}
