import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Layout from "./pages/Layout";
import Home, { homeLoader } from "./pages/Home";
import Movie, { movieLoader } from "./pages/Movie";
import FavouriteMovies, {
  favouriteMoviesLoader,
} from "./pages/FavouriteMovies";
import Login, { loginLoader } from "./pages/Login";
import Register, { registerLoader } from "./pages/Register";
import Error from "./pages/Error";
import AuthContext from "./AuthContext";
import { useState } from "react";
import app from "./config/firebase";
import { getAuth } from "firebase/auth";

const App = () => {
  // Initialize Firebase authentication
  const auth = getAuth(app);

  // State to manage the current user
  const [user, setUser] = useState(null);

  // Create a browser router with the application routes
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout setUser={setUser} />}>
        {/* Home route with loader for fetching movies */}
        <Route
          errorElement={<Error />}
          index
          element={<Home />}
          loader={homeLoader}
        />
        {/* Movie details route with loader for fetching a single movie by ID */}
        <Route
          errorElement={<Error />}
          path="movie/:id"
          element={<Movie />}
          loader={movieLoader}
        />
        {/* Favourite movies route with loader for fetching user's favourite movies */}
        <Route
          path="favourite-movies"
          element={<FavouriteMovies />}
          errorElement={<Error />}
          loader={() => favouriteMoviesLoader(user)}
        />
        {/* Login route with loader for handling login and user state */}
        <Route
          path="login"
          element={<Login auth={auth} setUser={setUser} />}
          errorElement={<Error />}
          loader={(params) => loginLoader(params, user)}
        />
        {/* Register route with loader for handling registration and user state */}
        <Route
          path="register"
          element={
            <Register
              auth={auth}
              errorElement={<Error />}
              setUser={setUser}
              loader={() => registerLoader(user)}
            />
          }
        />
        {/* Catch-all route for displaying errors */}
        <Route path="*" element={<Error />} />
      </Route>
    )
  );

  return (
    // Provide the current user context to the router
    <AuthContext.Provider value={user}>
      <RouterProvider router={router} />
    </AuthContext.Provider>
  );
};

export default App;
