import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import MainLayout from './components/MainLayout';
import LoginPage from './pages/LoginPage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import WarehouseInboundPage from './pages/WarehouseInboundPage';
import WarehouseTransferPage from './pages/WarehouseTransferPage';
import WarehouseOutboundPage from './pages/WarehouseOutboundPage';
import WarehousePreparingPage from './pages/WarehousePreparingPage';
import WarehouseMissingPage from './pages/WarehouseMissingPage';
import WarehouseTransactionPage from './pages/WarehouseTransactionPage';
import SuperAdminMenuPage from './pages/SuperAdminMenuPage';
import AccountPage from './pages/AccountPage';
import UserDetail from './components/UserDetail';
import WarehouseDemandPage from './pages/WarehouseDemandPage';
import SuperAdminWarehousePage from './pages/SuperAdminWarehousePage';
import SuperAdminShopsPage from './pages/SuperAdminShopsPage';

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
            <Route
              path="/warehouse-demand"
              render={() =>
                localStorage.access_token ? (
                  <WarehouseDemandPage />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              path="/warehouse-preparing"
              render={() =>
                localStorage.access_token ? (
                  <WarehousePreparingPage />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              path="/warehouse-missing"
              render={() =>
                localStorage.access_token ? (
                  <WarehouseMissingPage />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              path="/warehouse-transaction"
              render={() =>
                localStorage.access_token ? (
                  <WarehouseTransactionPage />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              path="/super-admin-admins"
              render={() =>
                localStorage.access_token ? (
                  <SuperAdminMenuPage />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              path="/super-admin-warehouse"
              render={() =>
                localStorage.access_token ? (
                  <SuperAdminWarehousePage />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              path="/super-admin-shops"
              render={() =>
                localStorage.access_token ? (
                  <SuperAdminShopsPage />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />

            <Route
              path="/admin-detail/:id"
              render={() =>
                localStorage.access_token ? (
                  <UserDetail />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route path="/account" component={AccountPage} />
          </Switch>
        </MainLayout>
      </Switch>
    </>
  );
}
