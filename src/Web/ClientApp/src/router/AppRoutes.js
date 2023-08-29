import { Counter } from "../pages/Counter";
import { Home } from "../pages/Home";
import { Login, Register } from "../pages/userAccount";
import { SeriesList, SeriesCreate, SeriesUpdate } from "../pages/tvSeries";
import { EpisodeList, EpisodeCreate, EpisodeUpdate } from "../pages/tvSeriesEpisode";

const AppRoutes = [
  {
    index: true,
    anonymous: true,
    element: <Home />
  },
  {
    anonymous: true,
    path: '/counter',
    element: <Counter />
  },
  {
    anonymous: true,
    path: '/account/login',
    element: <Login />
  },
  {
    anonymous: true,
    path: '/account/register',
    element: <Register />
  },
  {
    path: '/series',
    element: <SeriesList />
  },
  {
    path: '/series/create',
    element: <SeriesCreate />
  },
  {
    path: '/series/:seriesId',
    element: <SeriesUpdate />
  },
  {
    path: '/episode/series/:seriesId',
    element: <EpisodeList />
  },
  {
    path: '/series/:seriesId/episode/create',
    element: <EpisodeCreate />
  },
  {
    path: '/series/:seriesId/episode/:episodeId',
    element: <EpisodeUpdate />
  }
];

export { AppRoutes };
