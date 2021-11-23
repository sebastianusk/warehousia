import React, { useContext, useState } from 'react';
import { EditOutlined } from '@ant-design/icons';
import { Button, Card, Space, Table } from 'antd';
import { GlobalContext } from 'app/components/GlobalState';
import WarehouseSelectorAll from 'app/components/WarehousesSelectorAll';
import { GET_TRANSACTIONS } from 'app/graph';
import { useQuery } from '@apollo/client';
import Page from 'app/components/Page';
import useTransactionXslxHooks from 'app/lib/xlsx/transactionXlsxHooks';
import styles from './index.module.css';

const LIMIT = 10;

interface TransactionModel {
  id: string;
  shops: string[];
  warehouseId: string;
  createdAt: string;
  createdBy: string;
  items: {
    productId: string;
    amount: number;
  }[];
  failed: {
    productId: string;
    amount: number;
  }[];
}

export default function WarehouseTransactionListPage(): React.ReactElement {
  const { warehouse } = useContext(GlobalContext);
  const [page, setPage] = useState(1);
  const { data, loading, fetchMore } = useQuery(GET_TRANSACTIONS, {
    variables: {
      warehouseId: warehouse.selectedWarehouseAll,
      offset: (page - 1) * LIMIT,
      limit: LIMIT,
    },
  });

  const { buildTransactionXlsx } = useTransactionXslxHooks();

  return (
    <>
      <Card className={styles.card}>
        <div>
          <Space size="middle" className="picker-container">
            <div>
              <div>Warehouse ID:</div>
              <WarehouseSelectorAll />
            </div>
          </Space>
        </div>
      </Card>
      {data?.transactions && (
        <Card className={styles.card}>
          <Table
            size="middle"
            dataSource={data?.transactions.map((item: TransactionModel) => ({
              ...item,
              key: item.id,
            }))}
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
              render={(_text, record: TransactionModel) => (
                <Space size="middle">
                  <Button
                    size="small"
                    icon={<EditOutlined />}
                    onClick={(e) => {
                      e.stopPropagation();
                      buildTransactionXlsx(record);
                    }}
                  >
                    Print
                  </Button>
                </Space>
              )}
            />
          </Table>
          <Page
            page={page}
            prevEnable={page !== 1}
            nextEnable={data?.transactions.lenght !== 0}
            onNext={() => {
              const newOffset = page * LIMIT;
              fetchMore({ variables: { offset: newOffset } }).then(() =>
                setPage(page + 1)
              );
            }}
            onPrev={() => {
              setPage(page - 1);
            }}
          />
        </Card>
      )}
    </>
  );
}
