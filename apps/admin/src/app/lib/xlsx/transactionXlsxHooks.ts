import { useApolloClient } from '@apollo/client';
import { GET_PRODUCT_STOCK } from 'app/graph';
import JsonAsXlsx from './transactionXlsx';

interface TransactionModel {
  id: string;
  shops: string[];
  warehouseId: string;
  createdAt: string;
  createdBy: string;
  items: {
    productId: string;
    amount: number;
  }[];
  failed: {
    productId: string;
    amount: number;
  }[];
}

interface TransactionXslxState {
  buildTransactionXlsx(data: TransactionModel): Promise<void>;
}

export default function useTransactionXslxHooks(): TransactionXslxState {
  const client = useApolloClient();

  const buildTransactionXlsx = async (addTrxData: TransactionModel) => {
    console.log(addTrxData.items);
    const newItems = await Promise.all(
      addTrxData.items.map(async (item: any) => {
        const { data } = await client.query({
          query: GET_PRODUCT_STOCK,
          variables: { productId: item.productId },
        });
        return {
          ...item,
          name: data.productStock.name,
          price: data.productStock.price,
        };
      })
    );
    JsonAsXlsx({ ...addTrxData, items: newItems });
  };

  return {
    buildTransactionXlsx,
  };
}
