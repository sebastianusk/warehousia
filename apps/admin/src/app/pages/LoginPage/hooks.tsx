import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation, ApolloError, useApolloClient } from '@apollo/client';

import { POST_LOGIN } from '../../graph';

interface LoginState {
  loading: boolean;
  error: ApolloError | undefined;
  handleSubmit(): void;
  setUsername(inputtedUsername: string): void;
  setPassword(inputtedPassword: string): void;
}

export default function useCheckLogin(): LoginState {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const client = useApolloClient();
  const history = useHistory();

  const [postLogin, { loading, error }] = useMutation(POST_LOGIN, {
    onCompleted({ login }) {
      if (login) {
        client.resetStore();
        localStorage.access_token = login.session;
        history.push('home');
      }
    },
  });

  const handleSubmit = () => {
    if (username && password) {
      postLogin({
        variables: { username, password },
      }).catch((err) => {
        // eslint-disable-next-line no-console
        console.warn(err);
      });
    }
  };

  return {
    loading,
    error,
    handleSubmit,
    setUsername,
    setPassword,
  };
}
