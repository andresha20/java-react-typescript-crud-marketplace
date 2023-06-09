import { Suspense, lazy } from 'react';
import Loading from './components/global/Loading';
import type { RouteObject } from 'react-router';
import MainLayout from './layouts/MainLayout';
import SingleVehicle from './pages/SingleVehicle';

const Loadable = (Component: any) => (props: JSX.IntrinsicAttributes) =>
  (
    <Suspense fallback={<Loading />}>
      <Component {...props} />
    </Suspense>
  );

const Home = Loadable(lazy(() => import('./pages/Home')));
const Upload = Loadable(lazy(() => import('./pages/Upload')));
const Catalog = Loadable(lazy(() => import('./pages/Catalog')));

const routes: RouteObject[] = [
  {
    path: '',
    element: <MainLayout />,
    children: [
      {
        path: 'publish',
        element: <Upload />,
      },
      {
        path: 'catalog',
        element: <Catalog />,
      },
      {
        path: 'catalog/post',
        element: <SingleVehicle />,
      },
    ],
  },
  {
    path: '*',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
];

export default routes;