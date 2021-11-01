import React, { ReactElement, Dispatch, SetStateAction } from 'react';
import { Modal, Form, Input, Checkbox, Radio, Switch, Button } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
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
  key: string;
};

export default function ModalEditUser({
  visible,
  setVisible,
  userData,
  key,
}: ModalProps): ReactElement {
  const {
    handleOk,
    handleCancel,
    loadingDataWarehouses,
    warehousesOptions,
    form,
  } = useModalAddUserHooks(setVisible);
  return (
    <>
      <Modal
        title="Edit Admin"
        visible={visible}
        onCancel={handleCancel}
        footer={null}
        key={key}
      >
        {loadingDataWarehouses ? (
          <p>Loading...</p>
        ) : (
          <>
            <Form
              layout="horizontal"
              labelCol={{ span: 9 }}
              wrapperCol={{ span: 14 }}
              onFinish={handleOk}
              form={form}
              initialValues={userData}
              key={key}
            >
              <Form.Item label="Username" name="username">
                <Input placeholder="input username" />
              </Form.Item>
              <Form.Item
                label="Role"
                name="role"
                rules={[{ required: true, message: 'Please pick a role' }]}
              >
                <Radio.Group>
                  <Radio.Button value="ADMIN">Admin</Radio.Button>
                  <Radio.Button value="SUPER_ADMIN">Super Admin</Radio.Button>
                </Radio.Group>
              </Form.Item>
              <Form.Item label="Assigned Warehouse(s)" name="warehouses">
                <Checkbox.Group options={warehousesOptions} />
              </Form.Item>
              <Form.Item label="Active" name="active" valuePropName="checked">
                <Switch
                  checkedChildren={<CheckOutlined />}
                  unCheckedChildren={<CloseOutlined />}
                />
              </Form.Item>
              <Form.Item label="Change Password" name="password">
                <Input placeholder="input new password for the user" />
              </Form.Item>
              <Form.Item
                wrapperCol={{ span: 24, offset: 20 }}
                style={{ marginTop: '44px' }}
              >
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </>
        )}
      </Modal>
    </>
  );
}
