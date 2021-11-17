/* eslint-disable import/prefer-default-export */
import { gql } from '@apollo/client';

export const POST_LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      session
    }
  }
`;

export const GET_ME = gql`
  query me {
    me {
      username
      role
      warehouses
      createdAt
      updatedAt
    }
  }
`;

export const GET_ADMINS = gql`
  query Admins($query: String, $limit: Int, $offset: Int) {
    admins(query: $query, limit: $limit, offset: $offset) {
      username
      role
      warehouses
      active
      updatedAt
    }
  }
`;

export const ADD_ADMIN = gql`
  mutation addAdmin($input: AddAdminInput) {
    addAdmin(input: $input) {
      username
    }
  }
`;

export const EDIT_ADMIN = gql`
  mutation editAdmin($input: EditAdminInput) {
    editAdmin(input: $input) {
      username
    }
  }
`;

export const GET_ADMIN_LOG = gql`
  query AdminLog($username: String, $limit: Int, $offset: Int) {
    adminLogs(username: $username, limit: $limit, offset: $offset) {
      id
      action
      createdAt
      remarks
    }
  }
`;

export const CHANGE_PASSWORD = gql`
  mutation AddAdmin($input: ChangeMyPasswordInput) {
    changeMyPassword(input: $input) {
      username
    }
  }
`;

export const GET_WAREHOUSES = gql`
  query warehouses($query: String, $offset: Int, $limit: Int) {
    warehouses(query: $query, offset: $offset, limit: $limit) {
      id
      name
      active
      features
      createdAt
      updatedAt
    }
  }
`;

export const ADD_WAREHOUSE = gql`
  mutation addWarehouse($input: AddWarehouseInput) {
    addWarehouse(input: $input) {
      id
    }
  }
`;

export const EDIT_WAREHOUSE = gql`
  mutation editWarehouse($input: EditWarehouseInput) {
    editWarehouse(input: $input) {
      id
    }
  }
`;

export const GET_SHOPS = gql`
  query shops($query: String) {
    shops(query: $query) {
      id
      name
      active
    }
  }
`;

export const ADD_SHOP = gql`
  mutation addShop($input: AddShopInput) {
    addShop(input: $input) {
      id
    }
  }
`;

export const EDIT_SHOP = gql`
  mutation editShop($input: EditShopInput) {
    editShop(input: $input) {
      id
    }
  }
`;

export const GET_PRODUCTS = gql`
  query products(
    $warehouseId: String!
    $query: String
    $limit: Int
    $offset: Int
  ) {
    products(
      warehouseId: $warehouseId
      query: $query
      limit: $limit
      offset: $offset
    ) {
      id
      name
      price
      stock {
        amount
        all
        topWarehouse
        topAmount
      }
    }
  }
`;

export const ADD_PRODUCTS = gql`
  mutation addProducts($input: [ProductInput]) {
    addProducts(input: $input) {
      count
    }
  }
`;

export const EDIT_PRODUCT = gql`
  mutation editProduct($input: ProductInput) {
    editProduct(input: $input) {
      id
    }
  }
`;

export const EDIT_PRODUCT_STOCK = gql`
  mutation editProductStock($input: StockProductInput) {
    editProductStock(input: $input) {
      id
    }
  }
`;

export const GET_INBOUNDS = gql`
  query inbounds($warehouseId: String!, $pagination: PaginationInput) {
    inbounds(warehouseId: $warehouseId, pagination: $pagination) {
      data {
        id
        warehouse
        items {
          id
          product
          amount
        }
        createdAt
        createdBy
      }
    }
  }
`;

export const ADD_INBOUND = gql`
  mutation addInbound($warehouseId: String!, $items: [ProductAmountInput]!) {
    addInbound(warehouseId: $warehouseId, items: $items) {
      id
    }
  }
`;

export const EDIT_INBOUND = gql`
  mutation editProductStock($input: StockProductInput) {
    editProductStock(input: $input) {
      id
    }
  }
`;

export const ADD_OUTBOUND = gql`
  mutation AddOutbound(
    $warehouseId: String!
    $shopId: String!
    $items: [ProductAmountInput]!
  ) {
    addOutbound(warehouseId: $warehouseId, shopId: $shopId, items: $items) {
      demands {
        id
      }
      outbounds {
        id
      }
    }
  }
`;

export const GET_OUTBOUNDS = gql`
  query Outbounds($warehouseId: String!) {
    outbounds(warehouseId: $warehouseId) {
      id
      createdAt
      createdBy
      amount
      productId
      shopId
      warehouseId
    }
  }
`;

export const ADD_PREPARATION = gql`
  mutation AddPreparation($warehouseId: String!, $shopId: [String]!) {
    addPreparation(warehouseId: $warehouseId, shopId: $shopId) {
      id
    }
  }
`;

export const GET_PREPARATION = gql`
  query Preparation($query: String, $warehouseId: String) {
    preparations(query: $query, warehouseId: $warehouseId) {
      data {
        id
        warehouseId
        createdAt
        createdBy
        items {
          productId
          expected
          actual
        }
      }
    }
  }
`;

export const ADD_TRANSACTION = gql`
  mutation AddTransaction($preparationId: String!) {
    addTransaction(preparationId: $preparationId) {
      id
      shopId
      warehouseId
      createdAt
      createdBy
      items {
        id
        productId
        amount
      }
      failed {
        amount
        productId
      }
    }
  }
`;

export const GET_PRODUCT_LOGS = gql`
  query ProductLog($productId: String!, $offset: Int, $limit: Int) {
    productLog(productId: $productId, offset: $offset, limit: $limit) {
      id
      warehouse
      createdBy
      action
      amount
      createdAt
    }
  }
`;

export const GET_PRODUCT_STOCK = gql`
  query ProductStock($productId: String!) {
    productStock(productId: $productId) {
      id
      name
      price
      updatedAt
      stocks {
        warehouseId
        amount
      }
    }
  }
`;

export const UPDATE_PRODUCT_STOCK = gql`
  mutation EditProductStock($input: StockProductInput) {
    editProductStock(input: $input) {
      id
    }
  }
`;

export const SEARCH_PRODUCT = gql`
  query SearchProduct($query: String!, $offset: Int, $limit: Int) {
    searchProduct(query: $query, offset: $offset, limit: $limit) {
      id
      name
    }
  }
`;

export const ADD_TRANSFER = gql`
  mutation AddTransfer(
    $warehouseId: String!
    $destinationId: String!
    $items: [ProductAmountInput]!
  ) {
    addTransfer(
      warehouseId: $warehouseId
      destinationId: $destinationId
      items: $items
    ) {
      id
    }
  }
`;

export const GET_DEMANDS = gql`
  query Demands($warehouseId: String!, $limit: Int, $offset: Int) {
    demands(warehouseId: $warehouseId, limit: $limit, offset: $offset) {
      id
      createdAt
      createdBy
      amount
      productId
      shopId
      warehouseId
      expiredAt
    }
  }
`;

export const ADD_MISSING = gql`
  mutation AddMissing(
    $preparationId: String!
    $productId: String!
    $amount: Int!
  ) {
    addMissing(
      preparationId: $preparationId
      productId: $productId
      amount: $amount
    ) {
      id
    }
  }
`;

export const UPDATE_DEMAND = gql`
  mutation UpdateDemand($demandId: String!, $amount: Int, $expiredAt: String) {
    updateDemand(demandId: $demandId, amount: $amount, expiredAt: $expiredAt) {
      id
    }
  }
`;
