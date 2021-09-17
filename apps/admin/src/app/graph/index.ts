/* eslint-disable import/prefer-default-export */
import { gql } from '@apollo/client';

export const POST_LOGIN = gql`
  mutation Login($username: String, $password: String) {
    login(username: $username, password: $password) {
      session
    }
  }
`;

export const ADD_ADMIN = gql`
  mutation AddAdmin($input: AddAdminInput) {
    addAdmin(input: $input) {
      username
    }
  }
`;

export const GET_ME = gql`
  query Me {
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
  query Admins($query: String, $pagination: OffsetPaginationInput) {
    admins(query: $query, pagination: $pagination) {
      data {
        username
        role
      }
    }
  }
`;

export const GET_ADMIN_LOG = gql`
  query AdminLog($username: String, $pagination: PaginationInput) {
    adminLogs(username: $username, pagination: $pagination) {
      data {
        action
        createdAt
        remarks
      }
    }
  }
`;

export const GET_WAREHOUSES = gql`
  query Warehouses($query: String, $pagination: PaginationInput) {
    warehouses(query: $query, pagination: $pagination) {
      data {
        name
        active
        features
        createdAt
        updatedAt
      }
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
