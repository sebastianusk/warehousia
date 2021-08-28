import { useState } from 'react';

interface InlineProductFormState {
  productName: string;
  amount: number;
  onInputProductCode: (e: any) => void;
  onInputAmount: (e: any) => void;
  onSubmit: () => void;
}

export default function useInlineProductFormHooks(): InlineProductFormState {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [productName, setProductName] = useState('');
  const [amount, setAmount] = useState(0);

  const onInputProductCode = (e: any): void => {
    // eslint-disable-next-line no-console
    console.log(e);
  };

  const onInputAmount = (e: any): void => {
    setAmount(e.target.value);
    // eslint-disable-next-line no-console
    console.log(e);
  };

  const onSubmit = (): void => {
    // eslint-disable-next-line no-console
    console.log('onsubmit');
  };

  return {
    productName,
    amount,
    onInputProductCode,
    onInputAmount,
    onSubmit,
  };
}
