import { useState } from 'react';

import { useHistory } from 'react-router-dom';

interface LoginState {
  loading: boolean;
  error: string;
  handleSubmit(): Promise<void>;
  setUsername(inputtedUsername: string): void;
  setPassword(inputtedPassword: string): void;
}

const loginApi = 'localhost:4200/login'

export default function useCheckLogin(): LoginState {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory();

  const resetForm = (): void => {
    setUsername('')
    setPassword('')
  }

  const handleSubmit = async (): Promise<void> => {
    setLoading(true);
    try {
      const response = await fetch(loginApi, {
        method: 'POST',
        body: JSON.stringify({username, password}),
        headers: {'Content-Type': 'application/json'},
      })
      if (!response.ok) {
        throw Error(response.statusText)
      } else {
        const data = await response.json()
        localStorage.setItem("access_token", data.access_token);
        resetForm()
        history.push('/')
      }
    } catch (err) {
        setLoading(false);
        setError(err);
    };
  };
  return {
    loading,
    error,
    handleSubmit,
    setUsername,
    setPassword
  };
}
