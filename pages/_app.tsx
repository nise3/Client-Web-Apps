import React from 'react';
import {NextComponentType} from 'next';
import {AppContext, AppInitialProps, AppProps} from 'next/app';
import {Provider} from 'react-redux';
import {useStore} from '../redux/store';
import ContextProvider from '../@crema/utility/ContextProvider';
import CssBaseline from '@mui/material/CssBaseline';
import AuthRoutes from '../@crema/utility/AuthRoutes';
import PageMeta from '../@crema/core/PageMeta';
import {LocaleProvider} from '../@crema';
import {SnackbarProvider} from 'notistack';
import Nprogress from '../@softbd/utilities/Nprogress';
import 'react-perfect-scrollbar/dist/css/styles.css';
import '../styles/index.css';
import '../@crema/services/index';
import {SWRConfig} from 'swr';
import {CookiesProvider} from 'react-cookie';
import DefaultThemeProvider from '../@softbd/layouts/themes/default/DefaultThemeProvider';

const Nise3AdminApp: NextComponentType<AppContext, AppInitialProps, AppProps> =
  ({Component, pageProps}: any) => {
    const store = useStore(pageProps.initialReduxState);

    return (
      <React.Fragment>
        <PageMeta />
        <Nprogress />
        <CookiesProvider>
          <ContextProvider>
            <Provider store={store}>
              <SWRConfig
                value={{
                  provider: () => new Map(),
                  revalidateIfStale: true,
                  revalidateOnFocus: false,
                  revalidateOnReconnect: false,
                }}>
                <LocaleProvider>
                  <DefaultThemeProvider>
                    <AuthRoutes>
                      <CssBaseline />
                      <SnackbarProvider
                        maxSnack={20}
                        anchorOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                        }}>
                        <Component {...pageProps} />
                      </SnackbarProvider>
                    </AuthRoutes>
                  </DefaultThemeProvider>
                </LocaleProvider>
              </SWRConfig>
            </Provider>
          </ContextProvider>
        </CookiesProvider>
      </React.Fragment>
    );
  };
export default Nise3AdminApp;
