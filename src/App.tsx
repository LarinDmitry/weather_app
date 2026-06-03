import {Suspense} from 'react';
import {RouterProvider} from 'react-router';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import {ThemeProvider} from 'styled-components';
import {ErrorBoundary} from 'react-error-boundary';
import {QueryClientProvider} from '@tanstack/react-query';
import Loader from 'components/GeneralComponents/Loader/Loader';
import NotificationsContainer from 'components/GeneralComponents/NotificationsContainer/NotificationsContainer';
import {router} from 'components/GeneralComponents/Routers';
import ErrorFallback from 'components/GeneralComponents/ErrorFallback/ErrorFallback';
import {persistor, reduxStore} from 'services/reduxStore';
import {queryClient} from 'services/queryClient';
import MainTheme from 'theme/index';
import {OverrideStyles} from 'theme/overrideStyles';

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Provider store={reduxStore}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={MainTheme}>
          <OverrideStyles />
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Suspense fallback={<Loader />}>
              <NotificationsContainer hideProgressBar={false} pauseOnHover autoClose={5000} />
              <RouterProvider router={router} />
            </Suspense>
          </ErrorBoundary>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </QueryClientProvider>
);

export default App;
