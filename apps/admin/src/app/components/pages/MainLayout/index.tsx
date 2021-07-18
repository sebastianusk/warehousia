import { ReactElement } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  InboxOutlined,
  GroupOutlined,
  HomeOutlined,
  UserOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import styles from './index.module.css';
import useLayoutHooks from './hooks';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function MainLayout(): ReactElement {
  const { collapsed, onCollapse, currentDir } = useLayoutHooks();
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
          defaultSelectedKeys={['warehouse-inbound']}
          mode="inline"
        >
          <Menu.Item key="products" icon={<InboxOutlined />}>
            Products
          </Menu.Item>
          <SubMenu key="warehouse" icon={<HomeOutlined />} title="Warehouse">
            <Menu.Item key="warehouse-inbound">Inbound</Menu.Item>
            <Menu.Item key="warehouse-transfer">Transfer</Menu.Item>
            <Menu.Item key="warehouse-outbound">Outbound</Menu.Item>
            <Menu.Item key="warehouse-preparing">Preparing</Menu.Item>
            <Menu.Item key="warehouse-transaction">Transaction</Menu.Item>
          </SubMenu>
          <Menu.Item key="7" icon={<GroupOutlined />}>
            Admin Menu
          </Menu.Item>
          <Menu.Item key="8" icon={<UserOutlined />}>
            Account
          </Menu.Item>
          <Menu.Item key="9" icon={<LogoutOutlined />}>
            Log out
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header
          className={styles.siteLayoutBackground}
          style={{ padding: 0 }}
        />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Warehouse</Breadcrumb.Item>
            <Breadcrumb.Item>Inbound</Breadcrumb.Item>
          </Breadcrumb>
          <div
            className={styles.siteLayoutBackground}
            style={{ padding: 24, minHeight: 360 }}
          >
            data to show
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Warehousia ©2021</Footer>
      </Layout>
    </Layout>
  );
}

export default MainLayout;
