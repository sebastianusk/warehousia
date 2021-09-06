import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation, ApolloError } from '@apollo/client';

import { GET_ME, POST_LOGIN } from '../../graph';
import { isLoggedInVar } from '../../config/cache';

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
  const history = useHistory();

  const [postLogin, { loading, error }] = useMutation(POST_LOGIN, {
    onCompleted({ login }) {
      setUsername('');
      setPassword('');

      if (login) {
        localStorage.setItem('token', login.session as string);
        isLoggedInVar(true);
        history.push('/');
      }
    },
  });

  const handleSubmit = () => {
    postLogin({
      variables: { username, password },
      // refetchQueries: [{ query: GET_ME }],
    });
  };

  return {
    loading,
    error,
    handleSubmit,
    setUsername,
    setPassword,
  };
}
