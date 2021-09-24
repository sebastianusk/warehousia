import React, { ReactElement, Dispatch, SetStateAction } from 'react';
import { Modal, Form, Input, Switch } from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';

import useModalAddShopHooks from './hooks';
import { ShopData } from '../ShopsManager/Types';

type ModalProps = {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  shopData: ShopData;
};

export default function ModalEditShop({
  visible,
  setVisible,
  shopData,
}: ModalProps): ReactElement {
  const {
    confirmLoading,
    handleOk,
    handleCancel,
    formData,
    onChangeName,
    onChangeActive,
  } = useModalAddShopHooks(setVisible, shopData);
  return (
    <>
      <Modal
        title={`Edit Shop ${shopData.id}`}
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        {confirmLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            <Form
              layout="horizontal"
              labelCol={{ span: 9 }}
              wrapperCol={{ span: 14 }}
            >
              <Form.Item label="Shop Name">
                <Input
                  placeholder="input Shop Name"
                  value={formData.name}
                  onChange={onChangeName}
                />
              </Form.Item>
              <Form.Item label="Status">
                <Switch
                  checkedChildren={<CheckOutlined />}
                  unCheckedChildren={<CloseOutlined />}
                  checked={formData.active}
                  onChange={onChangeActive}
                />
              </Form.Item>
            </Form>
          </>
        )}
      </Modal>
    </>
  );
}
