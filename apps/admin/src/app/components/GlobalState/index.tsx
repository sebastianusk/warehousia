import React, { ReactNode, useState } from 'react';

const GlobalContext = React.createContext<any>(null);

const GlobalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [userData, setUserData] = useState();
  const [warehousesList, setWarehousesList] = useState();
  const [warehousesListTo, setWarehousesListTo] = useState();
  const [selectedWarehouseTo, setSelectedWarehouseTo] = useState('');
  const [selectedWarehouse, setSelectedWarehouse] = useState('');

  return (
    <GlobalContext.Provider
      value={{
        userData: { userData, setUserData },
        warehouse: {
          warehousesList,
          setWarehousesList,
          selectedWarehouse,
          setSelectedWarehouse,
          warehousesListTo,
          setWarehousesListTo,
          selectedWarehouseTo,
          setSelectedWarehouseTo,
        },
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalProvider, GlobalContext };
