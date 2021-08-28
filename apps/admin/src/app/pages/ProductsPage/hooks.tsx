import { useState, Dispatch, SetStateAction } from 'react';

interface ProductsPageState {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  openModal: () => void;
  onSearch: (val: string) => void;
}

export default function useProductsPageHooks(): ProductsPageState {
  const [showModal, setShowModal] = useState(false);

  const onSearch = (val: string): void => {
    // eslint-disable-next-line no-console
    console.log(val);
  };

  const openModal = () => {
    setShowModal(true);
  };

  return {
    showModal,
    setShowModal,
    openModal,
    onSearch,
  };
}
