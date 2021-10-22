import { useState, Dispatch, SetStateAction } from 'react';

export type Warehouse = {
  id: string;
  name: string;
  active: boolean;
  features: string[];
};

export type WarehouseList = Warehouse[];
interface ProductsPageState {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  openModal: () => void;
  showBulkModal: boolean;
  setShowBulkModal: Dispatch<SetStateAction<boolean>>;
  openBulkModal: () => void;
  warehouse: string | undefined;
  setWarehouse: (warehouse: string) => void;
}

export default function useProductsPageHooks(): ProductsPageState {
  const [showModal, setShowModal] = useState(false);
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [warehouse, setWarehouse] = useState<string | undefined>();

  const openModal = () => {
    setShowModal(true);
  };

  const openBulkModal = () => {
    setShowBulkModal(true);
  };

  return {
    showModal,
    setShowModal,
    openModal,
    showBulkModal,
    setShowBulkModal,
    openBulkModal,
    warehouse,
    setWarehouse,
  };
}
