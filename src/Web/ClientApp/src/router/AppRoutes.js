import { Counter } from "../pages/Counter";
import { Home } from "../pages/Home";
import { Login, Register } from "../pages/userAccount";
import { SeriesList } from "../pages/tvSeries";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/counter',
    element: <Counter />
  },
  {
    path: '/account/login',
    element: <Login />
  },
  {
    path: '/account/register',
    element: <Register />
  },
  {
    restricted: true,
    path: '/series',
    element: <SeriesList />
  }
];

export { AppRoutes };
