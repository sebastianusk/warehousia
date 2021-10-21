import { Button, Modal, Table } from 'antd';
import React from 'react';

interface ErrorLogModalProps {
  errors: ErrorModel[];
}

interface ErrorModel {
  id: string;
  message: string;
}

export default function ErrorLogModal(
  props: ErrorLogModalProps
): React.ReactElement {
  const [modal, contextHolder] = Modal.useModal();
  return (
    <div>
      <Button
        onClick={() =>
          modal.error({
            content: props.errors && (
              <Table
                dataSource={props.errors.map((item) => ({
                  ...item,
                  key: item.id,
                }))}
                columns={[
                  { title: 'field', key: 'field', dataIndex: 'id' },
                  { title: 'message', key: 'message', dataIndex: 'message' },
                ]}
              />
            ),
          })
        }
        disabled={props.errors.length === 0}
      >
        Show Error
      </Button>
      {contextHolder}
    </div>
  );
}
