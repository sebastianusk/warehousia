import { ApolloError, useMutation } from '@apollo/client';
import { useState } from 'react';
import { CHANGE_PASSWORD } from '../../graph';

interface AccountState {
  loading: boolean;
  error: ApolloError | undefined;
  handleSubmit(): void;
  setNewPass(input: string): void;
  setOldPass(input: string): void;
}

export default function useAccountPageHooks(): AccountState {
  const [oldPassword, setOldPass] = useState('');
  const [newPassword, setNewPass] = useState('');
  const [changePassword, { loading, error }] = useMutation(CHANGE_PASSWORD, {
    onCompleted({ }) {},
  });

  const handleSubmit = () => {
    if (oldPassword && newPassword) {
      changePassword({
        variables: { input: { oldPassword, newPassword } },
      }).catch(console.warn);
    }
  };
  return {
    loading,
    error,
    handleSubmit,
    setNewPass,
    setOldPass,
  };
}
