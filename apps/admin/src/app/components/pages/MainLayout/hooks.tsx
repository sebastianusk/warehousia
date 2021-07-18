import { useState } from 'react';

import { useHistory } from 'react-router-dom';

interface LayoutState {
  collapsed: boolean;
  currentDir: string;
  onCollapse(): void;
  changeDir(targetDir: string): void;
}

export default function useLayoutHooks(): LayoutState {
  const [collapsed, setCollapsed] = useState(false);
  const [currentDir, setCurrentDir] = useState('');
  const history = useHistory();

  const onCollapse = (): void => {
    setCollapsed(!collapsed)
  }

  const changeDir = (targetDir: string): void => {
    setCurrentDir(targetDir)
    history.push(targetDir)
  }

  return {
    collapsed,
    currentDir,
    onCollapse,
    changeDir
  };
}
