import React, { Dispatch, SetStateAction } from 'react';
import { Modal, Form, Button, message, InputNumber } from 'antd';
import { useMutation } from '@apollo/client';
import { useForm } from 'antd/lib/form/Form';
import { UPDATE_PRODUCT_STOCK } from 'app/graph';

type ModalProps = {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  dataToEdit: {
    productId: string;
    warehouseId: string;
    amount: number;
  };
  key: string;
};

export default function ModalEditUser({
  visible,
  setVisible,
  dataToEdit,
  key,
}: ModalProps) {
  const [form] = useForm();
  const [updateStock, { loading }] = useMutation(UPDATE_PRODUCT_STOCK, {
    refetchQueries: ['ProductStock', 'ProductLog'],
    onCompleted() {
      message.info('Success edit stock');
      setVisible(false);
    },
  });

  const handleSubmit = () => {
    updateStock({
      variables: {
        input: {
          id: dataToEdit.productId,
          warehouse: dataToEdit.warehouseId,
          stock: form.getFieldValue('amount'),
        },
      },
    });
  };

  const handleCancel = () => {
    form.resetFields();
    setVisible(false);
  };

  return (
    <>
      <Modal
        title="Edit Admin"
        visible={visible}
        onCancel={handleCancel}
        key={key}
        width={400}
        footer={[
          <Button
            type="primary"
            form="editStockForm"
            key="submit"
            htmlType="submit"
            loading={loading}
          >
            Submit
          </Button>,
        ]}
      >
        <Form
          id="editStockForm"
          labelCol={{ span: 8 }}
          labelAlign="left"
          form={form}
          onFinish={handleSubmit}
        >
          <Form.Item label="Product ID" name="productId">
            {dataToEdit.productId}
          </Form.Item>
          <Form.Item label="Warehouse ID" name="warehouseId">
            {dataToEdit.warehouseId}
          </Form.Item>
          <Form.Item
            label="Stock"
            name="amount"
            initialValue={dataToEdit.amount}
          >
            <InputNumber type="number" min={0} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
