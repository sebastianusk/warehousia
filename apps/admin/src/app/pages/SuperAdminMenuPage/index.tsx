import React, { ReactElement } from 'react';
import { Button, Input, Card } from 'antd';
import styles from './index.module.css';
import ProductListEditor from '../../components/ProductListEditor';
import ModalAddProduct from '../../components/ModalAddProduct';
import useSuperAdminMenuHooks from './hooks';

export default function SuperAdminMenuPage(): ReactElement {
  const {
    showModalAdd,
    setShowModalAdd,
    showModalEdit,
    setShowModalEdit,
    loading,
    error,
    data,
  } = useSuperAdminMenuHooks();

  return (
    <>
      <ModalAddProduct visible setVisible />
    </>
  );
}
