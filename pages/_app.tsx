import React from 'react';
import {NextComponentType} from 'next';
import {AppContext, AppInitialProps, AppProps} from 'next/app';
import {Provider} from 'react-redux';
import {useStore} from '../redux/store';
import ContextProvider from '../@crema/utility/ContextProvider';
import CremaThemeProvider from '../@crema/utility/CremaThemeProvider';
import CremaStyleProvider from '../@crema/utility/CremaStyleProvider';
import CssBaseline from '@material-ui/core/CssBaseline';
import 'react-perfect-scrollbar/dist/css/styles.css';
import '../styles/index.css';
import '../@crema/services/index';
import AuthRoutes from '../@crema/utility/AuthRoutes';
import PageMeta from '../@crema/core/PageMeta';
import {LocaleProvider} from '../@crema';
import {SnackbarProvider} from 'notistack';
import Nprogress from '../@softbd/utilities/Nprogress';
import {SWRConfig} from 'swr';

const CremaApp: NextComponentType<AppContext, AppInitialProps, AppProps> = ({
  Component,
  pageProps,
}: any) => {
  const store = useStore(pageProps.initialReduxState);

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <PageMeta />
      <Nprogress />
      <ContextProvider>
        <Provider store={store}>
          <SWRConfig
            value={{
              provider: () => new Map(),
              revalidateIfStale: false,
              revalidateOnFocus: false,
              revalidateOnReconnect: false,
            }}>
            <CremaThemeProvider>
              <CremaStyleProvider>
                <LocaleProvider>
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
                </LocaleProvider>
              </CremaStyleProvider>
            </CremaThemeProvider>
          </SWRConfig>
        </Provider>
      </ContextProvider>
    </React.Fragment>
  );
};
export default CremaApp;
