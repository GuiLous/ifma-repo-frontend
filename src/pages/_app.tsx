import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import { ChakraProvider } from '@chakra-ui/react';
import { AppProps } from 'next/app';

import { AuthProvider } from '../contexts/AuthContext';
import { HideAndShowHeaderProvider } from '../contexts/HideAndShowHeaderContext';
import { LoadingProgressProvider } from '../contexts/ProgressBarContext';
import { SidebarDrawerProvider } from '../contexts/SidebarDrawerContext';
import { queryClient } from '../services/queryClient';
import { theme } from '../styles/theme';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <AuthProvider>
          <LoadingProgressProvider>
            <HideAndShowHeaderProvider>
              <SidebarDrawerProvider>
                <Component {...pageProps} />
              </SidebarDrawerProvider>
            </HideAndShowHeaderProvider>
          </LoadingProgressProvider>
        </AuthProvider>
      </ChakraProvider>

      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default MyApp;
