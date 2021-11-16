import React from 'react';
import { useMutation } from '@apollo/client';
import { DatePicker, Form, Input, Modal } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { EDIT_SHOP, GET_SHOPS } from 'app/graph';
import { DemandItem } from '../../hooks';
import moment from 'moment';

interface EditDemandModalProps {
  editData: DemandItem | undefined;
  setEditData: (item: DemandItem | undefined) => void;
}

export default function EditDemandModal(
  props: EditDemandModalProps
): React.ReactElement {
  const [form] = useForm();
  const [editShop] = useMutation(EDIT_SHOP);
  return (
    <Modal
      title="Edit Demand"
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
          props.setEditData(undefined);
          form.resetFields();
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
            value: key === 'expiredAt' ? moment(value) : value,
          }))}
        >
          <Form.Item label="Created At" name="createdAt">
            <Input disabled />
          </Form.Item>
          <Form.Item label="ShopId ID" name="shopId">
            <Input disabled />
          </Form.Item>
          <Form.Item label="Product Id" name="productId">
            <Input disabled />
          </Form.Item>
          <Form.Item label="Amount" name="amount">
            <Input type="number" />
          </Form.Item>
          <Form.Item label="Expired At" name="expiredAt" valuePropName="value">
            <DatePicker />
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
}
