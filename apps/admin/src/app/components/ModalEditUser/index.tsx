import React, { ReactElement, Dispatch, SetStateAction } from 'react';
import { Modal, Form, Input, Checkbox, Radio } from 'antd';
import useModalAddUserHooks from './hooks';

type ModalProps = {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  userData: {
    username: string;
    role: 'ADMIN' | 'SUPER_ADMIN';
    warehouses: string[];
    active: boolean;
  };
};

export default function ModalEditUser({
  visible,
  setVisible,
  userData,
}: ModalProps): ReactElement {
  const {
    confirmLoading,
    handleOk,
    handleCancel,
    formData,
    onChangeUsername,
    onChangeRole,
    onChangeWarehouses,
    loadingDataWarehouses,
    warehousesOptions,
  } = useModalAddUserHooks(setVisible, userData);
  return (
    <>
      <Modal
        title="Edit Admin"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        {confirmLoading || loadingDataWarehouses ? (
          <p>Loading...</p>
        ) : (
          <>
            <Form
              layout="horizontal"
              labelCol={{ span: 9 }}
              wrapperCol={{ span: 14 }}
            >
              <Form.Item label="Username">
                <Input
                  placeholder="input username"
                  value={formData.username}
                  onChange={onChangeUsername}
                />
              </Form.Item>
              <Form.Item label="Role">
                <Radio.Group onChange={onChangeRole} value={formData.role}>
                  <Radio.Button value="ADMIN">Admin</Radio.Button>
                  <Radio.Button value="SUPER_ADMIN">Super Admin</Radio.Button>
                </Radio.Group>
              </Form.Item>
              <Form.Item label="Assigned Warehouse(s)">
                <Checkbox.Group
                  options={warehousesOptions}
                  onChange={onChangeWarehouses}
                  value={formData.warehouses}
                />
              </Form.Item>
            </Form>
          </>
        )}
      </Modal>
    </>
  );
}
