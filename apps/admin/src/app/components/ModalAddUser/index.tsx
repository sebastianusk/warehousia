import React, { ReactElement, Dispatch, SetStateAction } from 'react';
import { Modal, Form, Input, Checkbox, Radio } from 'antd';
import useModalAddUserHooks from './hooks';

type ModalProps = {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
};

export default function ModalAddUser({
  visible,
  setVisible,
}: ModalProps): ReactElement {
  const {
    confirmLoading,
    handleOk,
    handleCancel,
    formData,
    onChangeUsername,
    onChangePassword,
    onChangeRole,
    onChangeWarehouses,
    loadingDataWarehouses,
    warehousesOptions,
  } = useModalAddUserHooks(setVisible);
  return (
    <>
      <Modal
        title="Add New Admin"
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
              <Form.Item label="Password for the user">
                <Input
                  placeholder="input password"
                  value={formData.password}
                  onChange={onChangePassword}
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
                  value={formData.warehouse}
                />
              </Form.Item>
            </Form>
          </>
        )}
      </Modal>
    </>
  );
}
