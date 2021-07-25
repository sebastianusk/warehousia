import { useState } from 'react';

import { useHistory } from 'react-router-dom';
import { postLogin } from '../../../services/login';

interface LoginState {
  loading: boolean;
  error: string;
  handleSubmit(): Promise<void>;
  setUsername(inputtedUsername: string): void;
  setPassword(inputtedPassword: string): void;
}

export default function useCheckLogin(): LoginState {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const resetForm = (): void => {
    setUsername('');
    setPassword('');
  };

  const handleSubmit = async (): Promise<void> => {
    setLoading(true);
    try {
      await postLogin(username, password);
      resetForm();
      history.push('/');
    } catch (err) {
      setLoading(false);
      setError(err);
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
