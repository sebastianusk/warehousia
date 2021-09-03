import React, { useState, Dispatch, SetStateAction } from 'react';
import { useHistory } from 'react-router-dom';

interface ProductListState {
  productData: ProductListType;
  handleEdit(data: any): void;
  handleDelete(): boolean;
  handleRowClick(
    e: React.MouseEvent<HTMLElement>,
    rowIndex: any,
    record: any
  ): boolean;
  showModalEdit: boolean;
  setShowModalEdit: Dispatch<SetStateAction<boolean>>;
  dataToBeEdited: any;
}

type ProductListType = {
  key: string;
  productCode: string;
  productName: string;
  amount: number;
}[];

export default function useProductList(): ProductListState {
  const [showModalEdit, setShowModalEdit] = useState<boolean>(false);
  const [dataToBeEdited, setDataToBeEdited] = useState<any>({});
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

  const history = useHistory();

  const handleEdit = (data: any) => {
    setDataToBeEdited(data);
    setShowModalEdit(true);
  };

  const handleDelete = () => true;

  const handleRowClick = (
    e: React.MouseEvent<HTMLElement>,
    rowIndex: any,
    record: any
  ) => {
    // eslint-disable-next-line no-console
    console.log(record);
    history.push(`/product-detail/${record.productCode}`);
    return true;
  };

  return {
    productData,
    handleEdit,
    handleDelete,
    handleRowClick,
    showModalEdit,
    setShowModalEdit,
    dataToBeEdited,
  };
}
