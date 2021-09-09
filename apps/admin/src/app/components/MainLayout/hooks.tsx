import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { GET_ME } from '../../graph';

interface LayoutState {
  loading: boolean;
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
  const { data, loading } = useQuery<GetMeType>(GET_ME);

  const history = useHistory();

  const onCollapse = (): void => {
    setCollapsed(!collapsed);
  };

  const changeDir = (targetDir: string) => {
    if (targetDir === 'Logout') {
      localStorage.clear();
      history.push('/login');
    } else {
      setCurrentDir(targetDir);
      history.push(`/${targetDir.toLowerCase()}`);
    }
  };

  return {
    loading,
    userData: data?.me,
    collapsed,
    currentDir,
    onCollapse,
    changeDir,
  };
}
