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
  onSearch: (val: string) => void;
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
  const [showDropDown, setShowDropDown] = useState(false);
  const [selectedWarehouse, setSelectedWarehouse] = useState<
    Warehouse | undefined
  >();

  const { loading, error, data } = useQuery(GET_WAREHOUSES, {
    variables: {
      query: '',
      pagination: {
        offset: 0,
        limit: 10,
      },
    },
    onCompleted(response) {
      setSelectedWarehouse(response.warehouses.data[0]);
    },
  });

  const onSearch = (val: string): void => {
    // eslint-disable-next-line no-console
    console.log(val);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const handleVisibleDropdown = () => {
    setShowDropDown(!showDropDown);
  };

  const handleMenuClick = (e: { key: React.SetStateAction<string> }) => {
    data.warehouses.data.forEach((wh: Warehouse) => {
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
    onSearch,
    handleMenuClick,
    handleVisibleDropdown,
    showDropDown,
    selectedWarehouse,
    warehouseList: data?.warehouses?.data,
    loading,
    error,
  };
}
