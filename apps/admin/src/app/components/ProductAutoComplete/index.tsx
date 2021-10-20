import React from 'react';
import { useLazyQuery } from '@apollo/client';
import { AutoComplete } from 'antd';
import { SEARCH_PRODUCT } from 'app/graph';

interface ProductAutoCompleteProps {
  onSelect: (productId: string) => void;
}

export default function ProductAutoComplete(
  props: ProductAutoCompleteProps
): React.ReactElement {
  const [getProduct, { data }] = useLazyQuery(SEARCH_PRODUCT);

  return (
    <AutoComplete
      style={{ width: '200px' }}
      onSelect={() => {}}
      onSearch={(value) => {
        getProduct({ variables: { query: value } });
      }}
    >
      {data?.searchProduct.map((item: { id: string; name: string }) => (
        <AutoComplete.Option value={`${item.id} - ${item.name}`} key={item.id}>
          {`${item.id} - ${item.name}`}
        </AutoComplete.Option>
      ))}
    </AutoComplete>
  );
}
