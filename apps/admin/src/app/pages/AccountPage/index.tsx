import React from 'react';
import { Button, Card, Form, Input, message } from 'antd';

import styles from './index.module.css';
import useAccountPageHooks from './hooks';

export default function AccountPage(): React.ReactElement {
  const { onSubmit, loading } = useAccountPageHooks();
  return (
    <>
      <Card className={styles.card}>
        <div>
          <h3>CHANGE PASSWORD</h3>
          <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 8 }}
            onFinish={onSubmit}
          >
            <Form.Item
              name="oldPass"
              label="Old Password"
              rules={[{ required: true, message: 'Masukan password lama' }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              name="newPass"
              label="New Password"
              rules={[{ required: true, message: 'Masukan password baru' }]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              name="confirmPass"
              label="Confirm Password"
              dependencies={['newPass']}
              hasFeedback
              rules={[
                { required: true, message: 'Masukan ulang password baru' },
                ({ getFieldValue }) => ({
                  validator(_: any, value: any) {
                    if (!value || getFieldValue('newPass') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error('Konfirmasi password berbeda')
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
              <Button htmlType="submit" type="primary" loading={loading}>
                SUBMIT
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Card>
    </>
  );
}
