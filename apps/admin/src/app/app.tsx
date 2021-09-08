import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import MainLayout from './components/MainLayout';
import LoginPage from './pages/LoginPage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import WarehouseInboundPage from './pages/WarehouseInboundPage';
import WarehouseTransferPage from './pages/WarehouseTransferPage';
import WarehouseOutboundPage from './pages/WarehouseOutboundPage';

export default function App() {
  return (
    <>
      <Switch>
        <Route exact path="/">
          {localStorage.access_token ? (
            <Redirect to="/home" />
          ) : (
            <Redirect to="/login" />
          )}
        </Route>
        <Route
          path="/login"
          render={() =>
            localStorage.access_token ? <Redirect to="/home" /> : <LoginPage />
          }
        />
        <MainLayout>
          <Switch>
            <Route
              path="/home"
              render={() =>
                localStorage.access_token ? (
                  <ProductsPage />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              path="/products"
              render={() =>
                localStorage.access_token ? (
                  <ProductsPage />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              path="/product-detail/:id"
              render={() =>
                localStorage.access_token ? (
                  <ProductDetailPage />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              path="/warehouse-inbound"
              render={() =>
                localStorage.access_token ? (
                  <WarehouseInboundPage />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              path="/warehouse-transfer"
              render={() =>
                localStorage.access_token ? (
                  <WarehouseTransferPage />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              path="/warehouse-outbound"
              render={() =>
                localStorage.access_token ? (
                  <WarehouseOutboundPage />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            {/* <Route path="/warehouse-preparing" component={MainLayout} /> */}
            {/* <Route path="/admin-menu" component={MainLayout} /> */}
            {/* <Route path="/account" component={MainLayout} /> */}
            {/* <Route path="/" component={MainLayout} /> */}
          </Switch>
        </MainLayout>
      </Switch>
    </>
  );
}
