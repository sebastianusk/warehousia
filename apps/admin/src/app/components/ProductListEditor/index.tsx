import React, { ReactElement } from 'react';
import { Table, Space, Button } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import useProductList from './hooks';
import ModalEditProduct from '../ModalEditProduct';

const { Column } = Table;

export default function ProductListEditor(): ReactElement {
  const {
    productData,
    handleEdit,
    handleDelete,
    handleRowClick,
    showModalEdit,
    setShowModalEdit,
    dataToBeEdited,
  } = useProductList();

  return (
    <>
      <ModalEditProduct
        visible={showModalEdit}
        setVisible={setShowModalEdit}
        initialData={dataToBeEdited}
      />
      <Table
        size="middle"
        dataSource={productData}
        onRow={(record, rowIndex) => ({
          onClick: (e) => {
            handleRowClick(e, rowIndex, record);
          },
        })}
      >
        <Column
          title="Product Code"
          dataIndex="productCode"
          key="productCode"
        />
        <Column
          title="Product Name"
          dataIndex="productName"
          key="productName"
        />
        <Column title="Amount" dataIndex="amount" key="amount" />
        <Column
          title="Action"
          key="action"
          render={(text, record) => (
            <Space size="middle">
              <Button
                size="small"
                icon={<EditOutlined />}
                onClick={(e) => {
                  e.stopPropagation();
                  handleEdit(e);
                }}
              >
                Edit
              </Button>
              <Button
                size="small"
                icon={<DeleteOutlined />}
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete();
                }}
              >
                Delete
              </Button>
            </Space>
          )}
        />
      </Table>
    </>
  );
}
