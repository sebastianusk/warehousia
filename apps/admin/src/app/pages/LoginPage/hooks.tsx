import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation, ApolloError } from '@apollo/client';
import asyncLocalStorage from '../../commons/asyncLocalStorage';

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
  const history = useHistory();

  const handleSuccessLogin = (login: any) => {
    asyncLocalStorage
      .setItem('token', login.session as string)
      .then(() => asyncLocalStorage.getItem('token'))
      .then((val) => {
        history.push('/home');
      });
    // localStorage.setItem('token', login.session as string);
  };

  const [postLogin, { loading, error }] = useMutation(POST_LOGIN, {
    onCompleted({ login }) {
      if (login) {
        handleSuccessLogin(login);
      }
      setUsername('');
      setPassword('');
    },
  });

  const handleSubmit = () => {
    postLogin({
      variables: { username, password },
      // refetchQueries: [{ query: GET_ME }],
    }).catch((err) => {
      // eslint-disable-next-line no-console
      console.warn(err);
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
