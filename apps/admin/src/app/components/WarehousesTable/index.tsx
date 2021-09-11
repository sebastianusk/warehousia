import React, { ReactElement } from 'react';
import { Table, Space, Button, Tag } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import useWarehouseTable from './hooks';

const { Column } = Table;

export default function WarehouseTable(): ReactElement {
  const {
    data,
    loading,
    // handleEdit,
    handleDelete,
    handleRowClick,
    showModalEdit,
    setShowModalEdit,
    dataToBeEdited,
  } = useWarehouseTable();

  if (loading) return <></>;
  // eslint-disable-next-line no-console
  if (data) console.log(data);

  return (
    <>
      {/* <ModalEditProduct
        visible={showModalEdit}
        setVisible={setShowModalEdit}
        initialData={dataToBeEdited}
      /> */}
      <Table
        size="middle"
        dataSource={data}
        onRow={(record, rowIndex) => ({
          onClick: (e) => {
            handleRowClick(e, rowIndex, record);
          },
        })}
      >
        <Column title="ID" dataIndex="id" key="id" />
        <Column title="Warehouse Name" dataIndex="name" key="name" />
        <Column
          title="Status"
          dataIndex="active"
          key="active"
          render={(status) => (
            <>
              {status === true ? (
                <Tag color="green" key="status-active">
                  Active
                </Tag>
              ) : (
                <Tag color="grey" key="status-inactive">
                  Inactive
                </Tag>
              )}
            </>
          )}
        />
        <Column
          title="Features"
          dataIndex="features"
          key="features"
          render={(features) => (
            <>
              {features.map((feat: any) => (
                <Tag color="geekblue" key={feat}>
                  {feat}
                </Tag>
              ))}
            </>
          )}
        />
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
                  // handleEdit(e);
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
