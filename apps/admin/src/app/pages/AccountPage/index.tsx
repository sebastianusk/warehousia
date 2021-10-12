import React from 'react';
import { Button, Card, Form, Input } from 'antd';

import { useForm } from 'antd/lib/form/Form';
import styles from './index.module.css';

export default function AccountPage(): React.ReactElement {
  const [form] = useForm();
  // const { loading, error, handleSubmit, setNewPass, setOldPass } =
  // useAccountPageHooks();
  return (
    <>
      <Card className={styles.card}>
        <div>
          <h3>CHANGE PASSWORD</h3>
          <Form form={form} labelCol={{ span: 4 }} wrapperCol={{ span: 8 }}>
            <Form.Item name="old-pass" label="Old Password">
              <Input.Password />
            </Form.Item>
            <Form.Item name="new-pass" label="New Password">
              <Input.Password />
            </Form.Item>
            <Form.Item name="confirm-pass" label="Confirm Password">
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Button>SUBMIT</Button>
            </Form.Item>
          </Form>
        </div>
      </Card>
    </>
  );
}
