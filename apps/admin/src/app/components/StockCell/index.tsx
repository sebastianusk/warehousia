import { useQuery } from '@apollo/client';
import { GET_PRODUCT_STOCK } from 'app/graph';
import React from 'react';

export default function StockCell({
  productId,
  warehouseId,
  dataToShow,
}: {
  productId: string;
  warehouseId?: string;
  dataToShow: 'stock' | 'total';
}) {
  const { data, loading } = useQuery(GET_PRODUCT_STOCK, {
    variables: {
      productId,
    },
  });
  if (loading) {
    return <span>Loading...</span>;
  }

  if (data) {
    if (dataToShow === 'stock') {
      const currentWHStock = data.productStock.stocks.find(
        (datum: any) => datum.warehouseId === warehouseId
      );
      if (currentWHStock) {
        return <span>{currentWHStock.amount}</span>;
      }
      return <span>0</span>;
    }
    if (dataToShow === 'total') {
      let totalStock = 0;
      data.productStock.stocks.forEach((productStock: any) => {
        totalStock += productStock.amount;
      });
      return <span>{totalStock}</span>;
    }
  }
  return <span>failed to load</span>;
}
StockCell.defaultProps = {
  warehouseId: '',
};
