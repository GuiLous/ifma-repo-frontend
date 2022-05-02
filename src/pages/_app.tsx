import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import { ChakraProvider } from '@chakra-ui/react';
import { AppProps } from 'next/app';

import { AuthProvider } from '../context/AuthContext';
import { HideAndShowHeaderProvider } from '../context/HideAndShowHeaderContext';
import { queryClient } from '../services/queryClient';
import { theme } from '../styles/theme';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <AuthProvider>
          <HideAndShowHeaderProvider>
            <Component {...pageProps} />
          </HideAndShowHeaderProvider>
        </AuthProvider>
      </ChakraProvider>

      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default MyApp;
