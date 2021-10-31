import { useQuery, useApolloClient } from '@apollo/client';
import { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { GET_ME } from '../../graph';
import { GlobalContext } from '../GlobalState';

interface LayoutState {
  userData: UserDataType;
  collapsed: boolean;
  currentDir: string;
  onCollapse(): void;
  changeDir(targetDir: string): void;
}

export type UserDataType =
  | {
      username: string;
      role: string;
      warehouses: string[];
    }
  | undefined;

export type GetMeType = {
  me: UserDataType;
};

export default function useLayoutHooks(): LayoutState {
  const [collapsed, setCollapsed] = useState(false);
  const [currentDir, setCurrentDir] = useState('');
  const { userData } = useContext(GlobalContext);

  useQuery<GetMeType>(GET_ME, {
    onCompleted: (resp) => {
      userData.setUserData(resp.me);
    },
  });
  const client = useApolloClient();

  const history = useHistory();

  const onCollapse = (): void => {
    setCollapsed(!collapsed);
  };

  const changeDir = (targetDir: string) => {
    if (targetDir === 'logout') {
      client.clearStore();
      client.cache.gc();
      localStorage.clear();
      history.push('/login');
    } else {
      setCurrentDir(targetDir);
      history.push(`/${targetDir}`);
    }
  };

  return {
    userData: userData.userData,
    collapsed,
    currentDir,
    onCollapse,
    changeDir,
  };
}
