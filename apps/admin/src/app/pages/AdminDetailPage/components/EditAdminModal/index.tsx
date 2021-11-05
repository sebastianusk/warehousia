import React from 'react';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { useMutation } from '@apollo/client';
import { Form, Input, Modal, Switch } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { EDIT_ADMIN, GET_ADMINS } from 'app/graph';
import { AdminModel } from '../../hooks';

interface EditAdminModalProps {
  editData: AdminModel | undefined;
  setEditData: (item: AdminModel | undefined) => void;
}

const roleOptions = [
  { label: 'Admin', value: 'ADMIN' },
  { label: 'Super Admin', value: 'SUPER_ADMIN' },
];

export default function EditAdminModal(
  props: EditAdminModalProps
): React.ReactElement {
  const [form] = useForm();
  const [editAdmin] = useMutation(EDIT_ADMIN);
  return (
    <Modal
      visible={props.editData !== undefined}
      onCancel={() => {
        props.setEditData(undefined);
        form.resetFields();
      }}
      onOk={() => {
        const values = form.getFieldsValue();
        editAdmin({
          variables: {
            input: values,
          },
          refetchQueries: [GET_ADMINS],
        }).then(() => {
          form.resetFields();
          props.setEditData(undefined);
        });
      }}
    >
      {props.editData && (
        <Form
          form={form}
          layout="horizontal"
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 14 }}
          fields={Object.entries(props.editData).map(([key, value]) => ({
            name: key,
            value,
          }))}
        >
          <Form.Item label="Username" name="username">
            <Input disabled />
          </Form.Item>
          <Form.Item label="Role" name="role">
            <Input placeholder="input role" />
          </Form.Item>
          <Form.Item label="Status" valuePropName="checked" name="active">
            <Switch
              checkedChildren={<CheckOutlined />}
              unCheckedChildren={<CloseOutlined />}
            />
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
}
