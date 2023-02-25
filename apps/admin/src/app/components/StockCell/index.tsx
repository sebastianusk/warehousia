import React from 'react';

export default function StockCell({
  stocksData,
  warehouseId,
  dataToShow,
}: {
  stocksData: {
    warehouseId: string;
    amount: number;
  }[];
  warehouseId?: string;
  dataToShow: 'stock' | 'total';
}) {
  if (stocksData) {
    if (dataToShow === 'stock') {
      const currentWHStock = stocksData.find(
        (datum: any) => datum.warehouseId === warehouseId
      );
      if (currentWHStock) {
        return <span>{currentWHStock.amount}</span>;
      }
      return <span>0</span>;
    }
    if (dataToShow === 'total') {
      let totalStock = 0;
      stocksData.forEach((productStock: any) => {
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
