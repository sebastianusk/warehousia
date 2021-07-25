import React, { Switch, Route } from 'react-router-dom';
import LoginPage from './components/pages/LoginPage';
import MainLayout from './components/pages/MainLayout';
import WarehouseInboundPage from './components/pages/WarehouseInboundPage';

export default function App() {
  return (
    <MainLayout>
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route path="/products" component={MainLayout} />
        <Route path="/warehouse-inbound" component={WarehouseInboundPage} />
        <Route path="/warehouse-transfer" component={MainLayout} />
        <Route path="/warehouse-outbound" component={MainLayout} />
        <Route path="/warehouse-preparing" component={MainLayout} />
        <Route path="/admin-menu" component={MainLayout} />
        <Route path="/account" component={MainLayout} />
        <Route path="/" component={MainLayout} />
      </Switch>
    </MainLayout>
  );
}
