import React from 'react';

interface UsersListState {
  placeholder: boolean;
}

export default function useUsersListHook(): UsersListState {
  return {
    placeholder: true,
  };
}
