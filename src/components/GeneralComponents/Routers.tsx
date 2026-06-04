import {Fragment, lazy} from 'react';
import {createBrowserRouter, createRoutesFromChildren, Route} from 'react-router';
import PageLayout from './PageLayout';
import ErrorFallback from './ErrorFallback';

const Main = lazy(() => import('pages/Main/MainView'));
const NotFound = lazy(() => import('pages/NotFound/NotFoundView'));

const Routers = () => (
  <Fragment>
    <Route element={<PageLayout />} errorElement={<ErrorFallback />}>
      <Route path="/" element={<Main />} />
    </Route>

    <Route path="*" element={<NotFound />} />
  </Fragment>
);

export const router = createBrowserRouter(createRoutesFromChildren(Routers()));
