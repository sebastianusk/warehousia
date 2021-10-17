import React from 'react';
import { useParams } from 'react-router-dom';
import ProductDetailHeader from './components/ProductDetailHeader';

import ProductDetailLog from './components/ProductDetailLog';

type ProductDetailParam = {
  id: string;
};

export default function ProductDetailPage(): React.ReactElement {
  const { id } = useParams<ProductDetailParam>();
  return (
    <>
      <ProductDetailHeader productId={id} />
      <ProductDetailLog productId={id} />
    </>
  );
}
