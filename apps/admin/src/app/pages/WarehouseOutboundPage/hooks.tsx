import { useState } from 'react';

interface TransferPageState {
  handleMenuClickWarehouse: (e: { key: React.SetStateAction<string> }) => void;
  handleMenuClickShop: (e: { key: React.SetStateAction<string> }) => void;
  handleVisibleChangeWarehouse: () => void;
  handleVisibleChangeShop: () => void;
  showDropDownWarehouse: boolean;
  showDropDownShop: boolean;
  selectedWarehouse: string;
  selectedShop: string;
  warehouseList: string[];
  shopList: string[];
}

export default function useTranserPageHooks(): TransferPageState {
  const [showDropDownWarehouse, setShowDropDownWarehouse] = useState(false);
  const [showDropDownShop, setShowDropDownShop] = useState(false);
  const [selectedWarehouse, setSelectedWarehouse] = useState('Warehouse A');
  const [selectedShop, setSelectedShop] = useState('Shop 1');
  const [warehouseList, setWarehouseList] = useState([
    'Warehouse A',
    'Warehouse B',
    'Warehouse C',
  ]);
  const [shopList, setshopList] = useState(['Shop 1', 'Shop 2', 'Shop 3']);

  const handleVisibleChangeWarehouse = () => {
    setShowDropDownWarehouse(!showDropDownWarehouse);
  };
  const handleVisibleChangeShop = () => {
    setShowDropDownShop(!showDropDownShop);
  };

  const handleMenuClickWarehouse = (e: {
    key: React.SetStateAction<string>;
  }) => {
    setshopList(warehouseList.filter((warehouse) => warehouse !== e.key));
    setSelectedWarehouse(e.key);
    setShowDropDownWarehouse(false);
  };

  const handleMenuClickShop = (e: { key: React.SetStateAction<string> }) => {
    setShowDropDownShop(false);
    setWarehouseList(warehouseList.filter((warehouse) => warehouse !== e.key));
    setSelectedShop(e.key);
  };

  return {
    handleMenuClickWarehouse,
    handleMenuClickShop,
    handleVisibleChangeWarehouse,
    handleVisibleChangeShop,
    showDropDownWarehouse,
    showDropDownShop,
    selectedWarehouse,
    selectedShop,
    warehouseList,
    shopList,
  };
}
