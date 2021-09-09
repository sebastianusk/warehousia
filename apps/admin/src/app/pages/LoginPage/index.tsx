import React, { ReactElement } from 'react';
import { Form, Input, Button, Col, Row, Alert, Spin } from 'antd';

import styles from './index.module.css';
import useCheckLogin from './hooks';

function LoginPage(): ReactElement {
  const { loading, error, handleSubmit, setUsername, setPassword } =
    useCheckLogin();

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h3>WAREHOUSIA</h3>
        <Form
          name="loginForm"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          className={styles.formContainer}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
            className={styles.formItem}
          >
            <Input
              onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
                setUsername(e.currentTarget.value)
              }
            />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password
              onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
                setPassword(e.currentTarget.value)
              }
            />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            {loading ? (
              <Spin />
            ) : (
              <Button
                type="primary"
                htmlType="submit"
                onClick={handleSubmit}
                className={styles.submitButton}
              >
                Login
              </Button>
            )}
          </Form.Item>
          {error ? (
            <Row>
              <Col span="24">
                <Alert message="invalid email/password" type="warning" />
              </Col>
            </Row>
          ) : (
            <Row>
              <Col span="24" style={{ height: '39px' }} />
            </Row>
          )}
        </Form>
      </div>
    </div>
  );
}

export default LoginPage;
