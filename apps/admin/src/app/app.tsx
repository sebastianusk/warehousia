import React, { Switch, Route } from 'react-router-dom';

import MainLayout from './components/MainLayout';
import LoginPage from './pages/LoginPage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import WarehouseInboundPage from './pages/WarehouseInboundPage';
import WarehouseTransferPage from './pages/WarehouseTransferPage';
import WarehouseOutboundPage from './pages/WarehouseOutboundPage';

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
            path="/products"
            component={ProductsPage}
            isAuthenticated={checkAuth()}
          />
          <GuardedRoute
            path="/product-detail/:id"
            component={ProductDetailPage}
            isAuthenticated={checkAuth()}
          />
          <GuardedRoute
            path="/warehouse-inbound"
            component={WarehouseInboundPage}
            isAuthenticated={checkAuth()}
          />
          <GuardedRoute
            path="/warehouse-transfer"
            component={WarehouseTransferPage}
            isAuthenticated={checkAuth()}
          />
          <GuardedRoute
            path="/warehouse-outbound"
            component={WarehouseOutboundPage}
            isAuthenticated={checkAuth()}
          />
          {/* <Route path="/warehouse-preparing" component={MainLayout} /> */}
          {/* <Route path="/admin-menu" component={MainLayout} /> */}
          {/* <Route path="/account" component={MainLayout} /> */}
          {/* <Route path="/" component={MainLayout} /> */}
        </Switch>
      </MainLayout>
    </>
  );
}
