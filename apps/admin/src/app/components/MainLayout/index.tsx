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
  const { collapsed, onCollapse, currentDir, changeDir } = useLayoutHooks();
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className={styles.logo}>
          <h3>WAREHOUSIA</h3>
        </div>
        <div className={styles.userInfo}>
          <div className={styles.userAvatar} />
          <div>
            <h4 className={styles.avatarText}>Bubur</h4>
          </div>
          <h5 className={styles.avatarText}>Super Admin</h5>
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
            key="Home-Warehouse"
            icon={<HomeOutlined />}
            title="Warehouse"
          >
            <Menu.Item key="Warehouse-Inbound">Inbound</Menu.Item>
            <Menu.Item key="Warehouse-Transfer">Transfer</Menu.Item>
            <Menu.Item key="Warehouse-Outbound">Outbound</Menu.Item>
            <Menu.Item key="Warehouse-Preparing">Preparing</Menu.Item>
            <Menu.Item key="Warehouse-Transaction">Transaction</Menu.Item>
          </SubMenu>
          <Menu.Item key="Admin-menu" icon={<GroupOutlined />}>
            Admin Menu
          </Menu.Item>
          <Menu.Item key="Account" icon={<UserOutlined />}>
            Account
          </Menu.Item>
          <Menu.Item key="Logout" icon={<LogoutOutlined />}>
            Log out
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        {/* <Header className={styles.header} /> */}
        <Content className={styles.contentLayout}>
          <div className={styles.pageContainer}>{children}</div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Warehousia ©2021</Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
