import React from 'react';

export type UserDataType =
  | {
      username: string;
      role: string;
      warehouses: string[];
    }
  | undefined;

const UserContext = React.createContext<UserDataType>({
  username: '',
  role: '',
  warehouses: [''],
});

export default UserContext;
