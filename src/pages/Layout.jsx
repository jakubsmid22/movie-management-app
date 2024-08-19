import { Outlet, NavLink } from "react-router-dom";
import AuthContext from "../AuthContext";
import { useContext } from "react";

const Layout = ({ setUser }) => {
  const user = useContext(AuthContext); // Get the current user from context

  return (
    <>
      {/* Navigation bar */}
      <nav className="bg-gray-800 p-4">
        {/* Link to the home page */}
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-white px-3 py-2 rounded-md text-sm font-medium bg-gray-900"
              : "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
          }
        >
          Home
        </NavLink>
        {/* Link to the favorite movies page */}
        <NavLink
          to="favourite-movies"
          className={({ isActive }) =>
            isActive
              ? "text-white px-3 py-2 rounded-md text-sm font-medium bg-gray-900"
              : "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
          }
        >
          My Favourite Movies
        </NavLink>
        {/* Conditional rendering based on user authentication */}
        {user ? (
          // Sign Out button if user is logged in
          <button
            onClick={() => setUser(null)}
            className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Sign Out
          </button>
        ) : (
          // Log In link if user is not logged in
          <NavLink
            to="login"
            className={({ isActive }) =>
              isActive
                ? "text-white px-3 py-2 rounded-md text-sm font-medium bg-gray-900"
                : "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            }
          >
            Log In
          </NavLink>
        )}
      </nav>
      {/* Render nested routes */}
      <Outlet />
    </>
  );
};

export default Layout;
