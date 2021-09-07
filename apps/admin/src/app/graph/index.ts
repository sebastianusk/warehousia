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
  query me {
    username
    role
    warehouses
    createdAt
    updatedAt
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