import { useState, Dispatch, SetStateAction } from 'react';
import { useQuery, ApolloError } from '@apollo/client';
import { GET_WAREHOUSES } from '../../graph/index';

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
  handleMenuClick: (e: { key: React.SetStateAction<string> }) => void;
  handleVisibleDropdown: () => void;
  selectedWarehouse: Warehouse | undefined;
  showDropDown: boolean;
  warehouseList: WarehouseList | undefined;
  loading: boolean;
  error: ApolloError | undefined;
}

export default function useProductsPageHooks(): ProductsPageState {
  const [showModal, setShowModal] = useState(false);
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);
  const [selectedWarehouse, setSelectedWarehouse] = useState<
    Warehouse | undefined
  >();

  const { loading, error, data } = useQuery(GET_WAREHOUSES, {
    onCompleted(response) {
      if (response?.warehouses?.length !== 0)
        setSelectedWarehouse(response.warehouses[0]);
    },
  });

  const openModal = () => {
    setShowModal(true);
  };

  const openBulkModal = () => {
    setShowBulkModal(true);
  };

  const handleVisibleDropdown = () => {
    setShowDropDown(!showDropDown);
  };

  const handleMenuClick = (e: { key: React.SetStateAction<string> }) => {
    data.warehouses.forEach((wh: Warehouse) => {
      if (wh.id === e.key) {
        setSelectedWarehouse(wh);
        setShowDropDown(false);
      }
    });
  };

  return {
    showModal,
    setShowModal,
    openModal,
    showBulkModal,
    setShowBulkModal,
    openBulkModal,
    handleMenuClick,
    handleVisibleDropdown,
    showDropDown,
    selectedWarehouse,
    warehouseList: data?.warehouses,
    loading,
    error,
  };
}
