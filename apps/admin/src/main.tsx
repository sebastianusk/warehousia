import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';

import './styles.css';
import { GlobalProvider } from 'app/components/GlobalState';
import App from './app/app';
import useGraphQLClient from './app/config/client';

function Initializer(): React.ReactElement {
  const { client, contextHolder } = useGraphQLClient();

  return (
    <ApolloProvider client={client}>
      {contextHolder}
      <GlobalProvider>
        <App />
      </GlobalProvider>
    </ApolloProvider>
  );
}

ReactDOM.render(
  <StrictMode>
    <BrowserRouter>
      <Initializer />
    </BrowserRouter>
  </StrictMode>,
  document.getElementById('root')
);
