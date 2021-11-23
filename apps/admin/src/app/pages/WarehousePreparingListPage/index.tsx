import React, { useContext } from 'react';
import { PrinterOutlined } from '@ant-design/icons';
import { Button, Card, Space, Table } from 'antd';
import { GlobalContext } from 'app/components/GlobalState';
import WarehouseSelector from 'app/components/WarehousesSelector';
import { GET_PREPARATION } from 'app/graph';
import { useQuery } from '@apollo/client';
import usePreparingXslxHooks from 'app/lib/xlsx/preparingXlsxHooks';
import styles from './index.module.css';

interface PreparationModel {
  items: {
    productId: string;
    actual: number;
  }[];
  id: string;
  warehouseId: string;
  shops: string[];
}

export default function WarehousePreparingListPage(): React.ReactElement {
  const { warehouse } = useContext(GlobalContext);
  const { data, loading } = useQuery(GET_PREPARATION, {
    variables: {
      warehouseId: warehouse.selectedWarehouse,
    },
  });

  const { buildPreparingXlsx } = usePreparingXslxHooks();

  return (
    <>
      <Card className={styles.card}>
        <div>
          <h2 className={styles.title}>PREPARING LIST</h2>
          <Space size="middle" className="picker-container">
            <div>
              <div>Warehouse ID:</div>
              <WarehouseSelector />
            </div>
          </Space>
        </div>
      </Card>
      <Card className={styles.card} loading={loading}>
        {data?.preparations && (
          <Table
            size="middle"
            dataSource={data?.preparations.data.map(
              (item: PreparationModel) => ({
                ...item,
                key: item.id,
              })
            )}
            loading={loading}
            pagination={false}
          >
            <Table.Column title="ID" dataIndex="id" key="id" />
            <Table.Column
              title="Created At"
              dataIndex="createdAt"
              key="createdAt"
            />
            <Table.Column
              title="Created By"
              dataIndex="createdBy"
              key="createdBy"
            />
            <Table.Column
              title="Action"
              key="action"
              render={(_text, record: PreparationModel) => (
                <Space size="middle">
                  <Button
                    size="small"
                    icon={<PrinterOutlined />}
                    onClick={(e) => {
                      e.stopPropagation();
                      buildPreparingXlsx(record);
                    }}
                  >
                    Print
                  </Button>
                </Space>
              )}
            />
          </Table>
        )}
      </Card>
    </>
  );
}
