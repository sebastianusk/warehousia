import React, { ReactNode, useState } from 'react';

const GlobalContext = React.createContext<any>(null);

const GlobalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [userData, setUserData] = useState();
  const [warehousesList, setWarehousesList] = useState();
  const [warehousesListAll, setWarehousesListAll] = useState();
  const [selectedWarehouseTo, setSelectedWarehouseTo] = useState('');
  const [selectedWarehouse, setSelectedWarehouse] = useState('');
  const [selectedWarehouseAll, setSelectedWarehouseAll] = useState('');

  return (
    <GlobalContext.Provider
      value={{
        userData: { userData, setUserData },
        warehouse: {
          warehousesList,
          setWarehousesList,
          selectedWarehouse,
          setSelectedWarehouse,
          warehousesListAll,
          setWarehousesListAll,
          selectedWarehouseTo,
          setSelectedWarehouseTo,
          selectedWarehouseAll,
          setSelectedWarehouseAll,
        },
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalProvider, GlobalContext };
