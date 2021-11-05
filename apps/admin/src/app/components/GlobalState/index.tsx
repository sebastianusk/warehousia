import React, { ReactNode, useState } from 'react';

const GlobalContext = React.createContext<any>(null);

type Data =
  | {
      id: string;
      name: string;
      amount: number;
    }[]
  | [];

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
  const [inboundData, setInboundData] = useState<Data>([]);
  const [outboundData, setOutboundData] = useState<Data>([]);
  const [transferData, setTransferData] = useState<Data>([]);

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
        inbound: {
          data: inboundData,
          set: setInboundData,
        },
        outbound: {
          data: outboundData,
          set: setOutboundData,
        },
        transfer: {
          data: transferData,
          set: setTransferData,
        },
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalProvider, GlobalContext };
