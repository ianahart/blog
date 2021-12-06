import React from 'react';
import ReactDOM from 'react-dom';
import { ChakraProvider } from '@chakra-ui/react'
import App from './App';
import customTheme from './Theme/customTheme';

import '@fontsource/readex-pro/400.css';
import '@fontsource/roboto-condensed/300.css';
import '@fontsource/roboto-condensed/700.css';



ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={customTheme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

