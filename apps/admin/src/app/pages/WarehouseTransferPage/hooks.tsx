import { useState } from 'react';

interface TransferPageState {
  handleMenuClickFrom: (e: { key: React.SetStateAction<string> }) => void;
  handleMenuClickTo: (e: { key: React.SetStateAction<string> }) => void;
  handleVisibleChangeFrom: () => void;
  handleVisibleChangeTo: () => void;
  showDropDownFrom: boolean;
  showDropDownTo: boolean;
  selectedWarehouseFrom: string;
  selectedWarehouseTo: string;
  warehouseListFrom: string[];
  warehouseListTo: string[];
}

export default function useTranserPageHooks(): TransferPageState {
  const [showDropDownFrom, setShowDropDownFrom] = useState(false);
  const [showDropDownTo, setShowDropDownTo] = useState(false);
  const [selectedWarehouseFrom, setSelectedWarehouseFrom] =
    useState('Warehouse A');
  const [selectedWarehouseTo, setSelectedWarehouseTo] = useState('Warehouse B');
  const [warehouseList, setWarehouseList] = useState([
    'Warehouse A',
    'Warehouse B',
    'Warehouse C',
  ]);
  const [warehouseListFrom, setWarehouseListFrom] = useState(warehouseList);
  const [warehouseListTo, setWarehouseListTo] = useState(warehouseList);

  const handleVisibleChangeFrom = () => {
    setShowDropDownFrom(!showDropDownFrom);
  };
  const handleVisibleChangeTo = () => {
    setShowDropDownTo(!showDropDownFrom);
  };

  const handleMenuClickFrom = (e: { key: React.SetStateAction<string> }) => {
    setWarehouseListTo(
      warehouseList.filter((warehouse) => warehouse !== e.key)
    );
    setSelectedWarehouseFrom(e.key);
    setShowDropDownFrom(false);
  };

  const handleMenuClickTo = (e: { key: React.SetStateAction<string> }) => {
    setShowDropDownTo(false);
    setWarehouseListFrom(
      warehouseList.filter((warehouse) => warehouse !== e.key)
    );
    setSelectedWarehouseTo(e.key);
  };

  return {
    handleMenuClickFrom,
    handleMenuClickTo,
    handleVisibleChangeFrom,
    handleVisibleChangeTo,
    showDropDownFrom,
    showDropDownTo,
    selectedWarehouseFrom,
    selectedWarehouseTo,
    warehouseListFrom,
    warehouseListTo,
  };
}
