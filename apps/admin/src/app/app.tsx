import { Switch, Route } from 'react-router-dom';
import LoginPage from './components/pages/LoginPage';

export function App() {
  return (
    <Switch>
      <Route path="/" component={LoginPage} />
      {/* <Route path="/" component={Home} /> */}
    </Switch>
  );
}

export default App;
