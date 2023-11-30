import { createBrowserRouter } from 'react-router-dom';
import LandingPage, { MainPage } from '../pages/landing-page/landing-page';
import { GeolocationPage } from '../pages/geolocation/geolocation.-page';
import { ErrorPage } from '../pages/error/error';

export const router = createBrowserRouter([
  {
    element: <LandingPage />,
    children: [
      {
        path: '/',
        element: <MainPage/>
      },
      {
        path: '/geolocation',
        element: <GeolocationPage/>
      }
    ]
  }
]);
