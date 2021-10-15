import { useState } from 'react';

interface InlineProductFormState {
  product: {
    id: string;
    name: string;
    amount: number;
  };
  onInputProductCode: (e: any) => void;
  onInputAmount: (e: any) => void;
  onSubmit: () => void;
}

export default function useInlineProductFormHooks(
  onAdd: any
): InlineProductFormState {
  const [product, setProduct] = useState({
    id: '',
    name: '',
    amount: 0,
  });

  const onInputProductCode = (e: any): void => {
    
  };

  const onInputAmount = (e: any): void => {
    setProduct({ ...product, amount: e.target.value });
  };

  const onSubmit = (): void => {
    onAdd(product);
  };

  return {
    product,
    onInputProductCode,
    onInputAmount,
    onSubmit,
  };
}
