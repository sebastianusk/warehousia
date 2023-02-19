import { useApolloClient } from '@apollo/client';
import { GET_PRODUCTS_BY_IDS } from 'app/graph';
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
    const products = await client.query({
      query: GET_PRODUCTS_BY_IDS,
      variables: { ids: addTrxData.items.map((item) => item.productId) },
    });

    const newItems = addTrxData.items.map((item: any) => {
      const matchedProduct = products.data.getProductsByIds.find(
        (product: any) => product.id === item.productId
      );
      return {
        ...item,
        name: matchedProduct?.name,
        price: matchedProduct?.price,
      };
    });

    JsonAsXlsx({ ...addTrxData, items: newItems });
  };

  return {
    buildTransactionXlsx,
  };
}
