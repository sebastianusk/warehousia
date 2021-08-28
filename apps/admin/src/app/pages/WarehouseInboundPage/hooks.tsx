import { useState } from 'react';

interface InboundState {
  handleMenuClick: (e: { key: React.SetStateAction<string> }) => void;
  handleVisibleChange: () => void;
  showDropDown: boolean;
  selectedWarehouse: string;
  warehouseList: string[];
}

export default function useInboundHooks(): InboundState {
  const [showDropDown, setShowDropDown] = useState(false);
  const [selectedWarehouse, setSelectedWarehouse] = useState('Warehouse A');

  const handleVisibleChange = () => {
    setShowDropDown(!showDropDown);
  };

  const handleMenuClick = (e: { key: React.SetStateAction<string> }) => {
    setSelectedWarehouse(e.key);
    setShowDropDown(false);
  };

  const warehouseList = ['Warehouse A', 'Warehouse B', 'Warehouse C'];

  return {
    handleMenuClick,
    handleVisibleChange,
    showDropDown,
    selectedWarehouse,
    warehouseList,
  };
}
