import { ApolloError, useMutation } from '@apollo/client';
import Form from 'antd/lib/form/Form';
import { useState } from 'react';
import { CHANGE_PASSWORD } from '../../graph';

interface AccountState {
  loading: boolean;
  error: ApolloError | undefined;
  onFinish(values: {
    oldPass: string;
    newPass: string;
    confirmPass: string;
  }): void;
}

export default function useAccountPageHooks(): AccountState {
  const [changePassword, { loading, error }] = useMutation(CHANGE_PASSWORD, {
    onCompleted() {},
  });

  const onFinish = (values: {
    oldPass: string;
    newPass: string;
    confirmPass: string;
  }) => {
    if (values.oldPass && values.newPass) {
      changePassword({
        variables: {
          input: { oldPassword: values.oldPass, newPassword: values.newPass },
        },
      });
    }
  };
  return {
    loading,
    error,
    onFinish,
  };
}
