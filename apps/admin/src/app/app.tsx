import React, { Switch, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import MainLayout from './components/MainLayout';
import WarehouseInboundPage from './pages/WarehouseInboundPage';
import GuardedRoute from './commons/guardedRoute';
import checkAuth from './commons/checkAuth';

export default function App() {
  return (
    <>
      <Switch>
        <Route path="/login" component={LoginPage} />
      </Switch>
      <MainLayout>
        <Switch>
          <GuardedRoute
            path="/warehouse-inbound"
            component={WarehouseInboundPage}
            isAuthenticated={checkAuth()}
          />
          {/* <Route path="/products" component={MainLayout} /> */}
          {/* <Route path="/warehouse-transfer" component={MainLayout} /> */}
          {/* <Route path="/warehouse-outbound" component={MainLayout} /> */}
          {/* <Route path="/warehouse-preparing" component={MainLayout} /> */}
          {/* <Route path="/admin-menu" component={MainLayout} /> */}
          {/* <Route path="/account" component={MainLayout} /> */}
          {/* <Route path="/" component={MainLayout} /> */}
        </Switch>
      </MainLayout>
    </>
  );
}
