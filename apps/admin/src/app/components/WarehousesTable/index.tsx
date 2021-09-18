import React, { ReactElement } from 'react';
import { Table, Space, Button, Tag } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import useWarehouseTable from './hooks';
import ModalEditWarehouse from '../ModalEditWarehouse';

const { Column } = Table;

type WarehouseTableProps = {
  data: WarehouseListType;
};

type WarehouseListType = {
  id?: string;
  name: string;
  active: boolean;
  features: string[];
}[];

export default function WarehouseTable({
  data,
}: WarehouseTableProps): ReactElement {
  const {
    handleEdit,
    handleDelete,
    showModalEdit,
    setShowModalEdit,
    dataToBeEdited,
  } = useWarehouseTable();

  return (
    <>
      <ModalEditWarehouse
        visible={showModalEdit}
        setVisible={setShowModalEdit}
        initialData={dataToBeEdited}
      />
      <Table size="middle" dataSource={data}>
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
                  handleEdit(record);
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
