import React from 'react';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { useMutation } from '@apollo/client';
import { Form, Input, Modal, Switch } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { EDIT_SHOP, GET_SHOPS } from 'app/graph';
import { ShopItem } from '../../hooks';

interface EditShopsModalProps {
  editData: ShopItem | undefined;
  setEditData: (item: ShopItem | undefined) => void;
}

export default function EditShopModal(
  props: EditShopsModalProps
): React.ReactElement {
  const [form] = useForm();
  const [editShop] = useMutation(EDIT_SHOP);
  return (
    <Modal
      title="Edit Shop"
      visible={props.editData !== undefined}
      onCancel={() => {
        props.setEditData(undefined);
        form.resetFields();
      }}
      onOk={() => {
        const values = form.getFieldsValue();
        editShop({
          variables: {
            input: values,
          },
          refetchQueries: [GET_SHOPS],
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
          <Form.Item label="ShopId ID" name="id">
            <Input disabled />
          </Form.Item>
          <Form.Item label="Shop Name" name="name">
            <Input placeholder="input shop name" />
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
