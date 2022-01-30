import React from 'react';
import ReactDOM from 'react-dom';
import { ChakraProvider } from '@chakra-ui/react';
import App from './App';
import customTheme from './theme/customTheme';
import AuthContextProvider from './contexts/AuthContext';
import DashboardContextProvider from './contexts/DashboardContext';
import '@fontsource/readex-pro/400.css';
import '@fontsource/roboto-condensed/300.css';
import '@fontsource/roboto-condensed/700.css';

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={customTheme}>
      <AuthContextProvider>
        <DashboardContextProvider>
          <App />
        </DashboardContextProvider>
      </AuthContextProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
