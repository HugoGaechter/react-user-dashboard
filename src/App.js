import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';

import HomePage from './pages/Home';
import UserDetails from './pages/UserDetails';

const router = createBrowserRouter([
  { path: '/', element: <HomePage/>},
  { path: '/user/:index', element: <UserDetails/>},
  { path: '*', element: <Navigate to="/" />},
]);

function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
