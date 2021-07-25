import React, { Switch, Route } from 'react-router-dom';
import LoginPage from './components/pages/LoginPage';
// import HomePage from './components/pages/HomePage';
import MainLayout from './components/pages/MainLayout';

export default function App() {
  return (
    <Switch>
      <Route path="/login" component={LoginPage} />
      <Route path="/" component={MainLayout} />
    </Switch>
  );
}
