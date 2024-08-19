import getFormData from "get-form-data";
import MovieList from "../components/MovieList";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getMovies } from "../api";
import { useLoaderData, useSearchParams } from "react-router-dom";

// Loader function to fetch movies based on URL search parameters
export const homeLoader = async ({ request }) => {
  const url = new URL(request.url);
  const title = url.searchParams.get("title");
  const type = url.searchParams.get("type");
  const year = url.searchParams.get("year");

  if (title) {
    const { error, movies } = await getMovies(title, type, year);
    if (error) {
      return [];
    }
    return movies || [];
  }
  return [];
};

const Home = () => {
  const today = new Date().getFullYear(); // Current year for the placeholder
  const initialMovies = useLoaderData(); // Initial movie data from the loader
  const [movies, setMovies] = useState(initialMovies); // State to store searched movies
  const [searchParams, setSearchParams] = useSearchParams(); // Manage search parameters

  // Handle form submission to search for movies
  const handleMovieSearch = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = getFormData(form);
    const { title, type, year } = data;

    if (!title) {
      toast.info("Please fill the title");
      return;
    }

    // Update search parameters in the URL
    setSearchParams({
      title,
      type: type || "",
      year: year || "",
    });

    // Fetch movies based on the search criteria
    const { error, movies } = await getMovies(title, type, year);

    if (error) {
      toast.error(error);
      setMovies([]); // Clear movies if there's an error
    } else {
      setMovies(movies); // Update state with fetched movies
    }

    form.reset(); // Reset the form fields
  };

  // Reset the movie list and search parameters
  const reset = () => {
    setMovies([]);
    setSearchParams("");
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <ToastContainer position="top-center" /> {/* Toast notifications */}
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">
          Search
        </h1>
        {/* Form to search for movies */}
        <form className="space-y-4" onSubmit={handleMovieSearch}>
          <div>
            <label
              htmlFor="title"
              className="block text-gray-700 text-sm font-semibold mb-2"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Search By Title"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="type"
              className="block text-gray-700 text-sm font-semibold mb-2"
            >
              Type
            </label>
            <select
              name="type"
              id="type"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a type</option>
              <option value="movie">Movie</option>
              <option value="series">Series</option>
              <option value="episode">Episode</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="year"
              className="block text-gray-700 text-sm font-semibold mb-2"
            >
              Year
            </label>
            <input
              type="number"
              id="year"
              name="year"
              placeholder={today}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Search
          </button>
        </form>
      </div>
      {/* Reset button to clear search and results */}
      <button
        onClick={reset}
        className="mt-4 px-4 py-2 bg-red-500 text-white font-bold rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
      >
        Reset
      </button>
      {/* Display the list of movies */}
      <MovieList movies={movies} params={searchParams} />
    </main>
  );
};

export default Home;
