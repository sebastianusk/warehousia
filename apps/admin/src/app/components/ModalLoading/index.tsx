import React from 'react';
import { Modal, Spin } from 'antd';

import style from './index.module.css';

type ModalLoadingProps = {
  visible: boolean;
};

export default function ModalLoading({
  visible,
}: ModalLoadingProps): React.ReactElement {
  return (
    <Modal
      visible={visible}
      footer={null}
      centered
      closable={false}
      width={200}
    >
      <div className={style.modal}>
        <Spin size="large" />
        <p className={style.text}>Harap menunggu</p>
      </div>
    </Modal>
  );
}
