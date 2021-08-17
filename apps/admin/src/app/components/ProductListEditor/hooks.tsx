import { useState } from 'react';

interface ProductListState {
  productData: ProductListType;
  setProductData: any;
  handleEdit(): boolean;
  handleDelete(): boolean;
}

type ProductListType = {
  key: string;
  productCode: string;
  productName: string;
  amount: number;
}[];

export default function useProductList(): ProductListState {
  const [productData, setProductData] = useState<ProductListType>([
    {
      key: '1',
      productCode: '1234',
      productName: 'Tas Cewek 1',
      amount: 100,
    },
    {
      key: '2',
      productCode: '1235',
      productName: 'Tas Cewek 2',
      amount: 5000,
    },
    {
      key: '3',
      productCode: '1236',
      productName: 'Dompet Wanita',
      amount: 0,
    },
  ]);

  const handleEdit = () => true;

  const handleDelete = () => true;

  return {
    productData,
    setProductData,
    handleEdit,
    handleDelete,
  };
}
