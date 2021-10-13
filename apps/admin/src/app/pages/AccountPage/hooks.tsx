import { ApolloError, useMutation } from '@apollo/client';
import { CHANGE_PASSWORD } from '../../graph';

interface AccountState {
  loading: boolean;
  error: ApolloError | undefined;
  onSubmit(values: {
    oldPass: string;
    newPass: string;
    confirmPass: string;
  }): void;
}

export default function useAccountPageHooks(): AccountState {
  const [changePassword, { loading, error }] = useMutation(CHANGE_PASSWORD);

  const onSubmit = (values: {
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
    onSubmit,
  };
}
