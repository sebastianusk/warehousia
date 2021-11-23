import React from 'react';
import { Layout, Menu } from 'antd';
import {
  InboxOutlined,
  GroupOutlined,
  HomeOutlined,
  UserOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import styles from './index.module.css';
import useLayoutHooks from './hooks';

const { Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

// eslint-disable-next-line react/prop-types
const MainLayout: React.FC = ({ children }) => {
  const { userData, collapsed, onCollapse, currentDir, changeDir } =
    useLayoutHooks();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className={styles.logo}>
          <h3>WAREHOUSIA</h3>
        </div>
        <div className={styles.userInfo}>
          <div className={styles.userAvatar}>
            <img
              src={`https://avatars.dicebear.com/api/bottts/${userData?.username}.svg`}
              alt="profile"
              width={50}
              height={50}
            />
          </div>
          <div>
            <h4 className={styles.avatarText}>{userData?.username}</h4>
          </div>
          <h5 className={styles.avatarText}>{userData?.role}</h5>
        </div>
        <Menu
          theme="dark"
          onClick={(e) => changeDir(e.key)}
          defaultSelectedKeys={[currentDir]}
          mode="inline"
        >
          <Menu.Item key="products" icon={<InboxOutlined />}>
            Products
          </Menu.Item>
          <SubMenu
            key="home-warehouse"
            icon={<HomeOutlined />}
            title="Warehouse"
          >
            <Menu.Item key="warehouse-demand">View Demand</Menu.Item>
            <Menu.Item key="warehouse-inbound">Create Inbound</Menu.Item>
            <Menu.Item key="warehouse-transfer">Transfer Items</Menu.Item>
            <Menu.Item key="warehouse-outbound">Create Outbound</Menu.Item>
            <Menu.Item key="warehouse-preparing">Create Preparing</Menu.Item>
            <Menu.Item key="warehouse-missing">Item Missing Form</Menu.Item>
            <Menu.Item key="warehouse-create-transaction">
              Create Transaction
            </Menu.Item>
            <Menu.Item key="warehouse-transaction">Transaction List</Menu.Item>
          </SubMenu>

          {userData?.role === 'SUPER_ADMIN' ? (
            <SubMenu
              key="super-admin"
              icon={<GroupOutlined />}
              title="Super Admin"
            >
              <Menu.Item key="super-admin-admins">Admins</Menu.Item>
              <Menu.Item key="super-admin-warehouse">Warehouses</Menu.Item>
              <Menu.Item key="super-admin-shops">Shops</Menu.Item>
            </SubMenu>
          ) : (
            <></>
          )}
          <Menu.Item key="account" icon={<UserOutlined />}>
            Account
          </Menu.Item>
          <Menu.Item key="logout" icon={<LogoutOutlined />}>
            Log out
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Content className={styles.contentLayout}>
          <div className={styles.pageContainer}>{children}</div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Warehousia ©2021</Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
