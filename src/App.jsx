import Home from "./components/Home";
import { Route, Routes } from "react-router";
import Trending from "./components/Trending";
import Popular from "./components/Popular";
import Movies from "./components/Movies";
import TV from "./components/TV";
import People from "./components/People";
import MovieDetails from "./components/partials/MovieDetails";
import PersonDetails from "./components/partials/PersonDetails";
import TvShowDetails from "./components/partials/TvShowDetails";
import Trailer from "./components/partials/Trailer";
import MovieTypes from "./components/partials/MovieTypes";
import TvTypes from "./components/partials/TvTypes";
import User from "./components/partials/User";
import NotFound from "./components/partials/NotFound";

const App = () => {
  return (
    <div className="w-screen min-h-screen flex bg-[#000000]">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/movie" element={<Movies />} />
        <Route path="/movie-types/:name/:genreId" element={<MovieTypes />} />
        <Route path="/movie/details/:id" element={<MovieDetails />}>
          <Route path="/movie/details/:id/trailer" element={<Trailer />} />
        </Route>
        <Route path="/tv" element={<TV />} />
        <Route path="/tv-types/:name/:genreId" element={<TvTypes />} />
        <Route path="/tv/details/:id" element={<TvShowDetails />}>
          <Route path="/tv/details/:id/trailer" element={<Trailer />} />
        </Route>
        <Route path="/person" element={<People />} />
        <Route path="/person/details/:id" element={<PersonDetails />} />
        <Route path="/user" element={<User />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
