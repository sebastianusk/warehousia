import React from 'react';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { useMutation } from '@apollo/client';
import { Checkbox, Form, Input, Modal, Switch } from 'antd';
import { EDIT_WAREHOUSE, GET_WAREHOUSES } from 'app/graph';
import { useForm } from 'antd/lib/form/Form';
import { WarehouseItem } from '../../hooks';

interface EditWahouseModalProps {
  editData: WarehouseItem | undefined;
  setEditData: (item: WarehouseItem | undefined) => void;
}

const featureOptions = [
  { label: 'Outbound', value: 'OUTBOUND' },
  { label: 'Inbound', value: 'INBOUND' },
  { label: 'Transfer', value: 'TRANSFER' },
];

export default function EditWarehouseModal(
  props: EditWahouseModalProps
): React.ReactElement {
  const [form] = useForm();
  const [editWarehouse] = useMutation(EDIT_WAREHOUSE);
  return (
    <Modal
      visible={props.editData !== undefined}
      onCancel={() => {
        props.setEditData(undefined);
        form.resetFields();
      }}
      onOk={() => {
        const values = form.getFieldsValue();
        editWarehouse({
          variables: {
            input: values,
          },
          refetchQueries: [GET_WAREHOUSES],
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
          <Form.Item label="Warehouse ID" name="id">
            <Input disabled />
          </Form.Item>
          <Form.Item label="Warehouse Name" name="name">
            <Input placeholder="input warehouse name" />
          </Form.Item>
          <Form.Item label="Features" name="features">
            <Checkbox.Group options={featureOptions} />
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
