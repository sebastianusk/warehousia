import { useState, Dispatch, SetStateAction } from 'react';

interface ModalAddProductState {
  confirmLoading: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  onInputProductCode: (e: any) => void;
  onInputProductName: (e: any) => void;
  onInputProductPrice: (e: any) => void;
  onInputProductCategory: (e: any) => void;
  onInputProductStock: (e: any) => void;
}

export default function useModalAddProductHooks(
  setVisible: Dispatch<SetStateAction<boolean>>
): ModalAddProductState {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [productCode, setProductCode] = useState('');
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);

  const handleOk = () => {
    setConfirmLoading(true);
    // mock post to server
    // eslint-disable-next-line no-console
    console.log(productCode, productName, category, price, stock);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    // eslint-disable-next-line no-console
    console.log('Clicked cancel button');
    setVisible(false);
  };

  const onInputProductCode = (e: any) => {
    setProductCode(e.target.value);
  };
  const onInputProductName = (e: any) => {
    setProductName(e.target.value);
  };
  const onInputProductPrice = (e: any) => {
    setPrice(e.target.value);
  };
  const onInputProductCategory = (e: any) => {
    setCategory(e.target.value);
  };
  const onInputProductStock = (e: any) => {
    setStock(e.target.value);
  };
  return {
    confirmLoading,
    handleOk,
    handleCancel,
    onInputProductCode,
    onInputProductName,
    onInputProductPrice,
    onInputProductCategory,
    onInputProductStock,
  };
}
