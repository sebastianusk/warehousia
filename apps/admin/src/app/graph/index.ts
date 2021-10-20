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
  query admins($query: String, $pagination: PaginationInput) {
    admins(query: $query, pagination: $pagination) {
      data {
        username
        role
        warehouses
        active
      }
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
  query adminLog($username: String, $pagination: PaginationInput) {
    adminLogs(username: $username, pagination: $pagination) {
      data {
        action
        createdAt
        remarks
      }
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
  query shops($query: String, $pagination: PaginationInput) {
    shops(query: $query, pagination: $pagination) {
      data {
        id
        name
        active
      }
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

export const GET_OUTBOUNDS = gql`
  query outbounds(
    $warehouseId: String!
    $shopId: String!
    $pagination: PaginationInput
  ) {
    outbounds(
      warehouseId: $warehouseId
      shopId: $shopId
      pagination: $pagination
    ) {
      id
      createdAt
      createdBy {
        username
      }
      shop {
        id
        name
        active
      }
      warehouse {
        id
        name
        active
        features
      }
      items {
        id
        product
        amount
      }
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
      data {
        id
      }
      failed {
        shopId
        items {
          amount
          productId
        }
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
