import {
  Link,
  useLoaderData,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { getMovie } from "../api";
import placeholderImg from "../assets/movie-placeholder.jpg";
import AuthContext from "../AuthContext";
import { useContext } from "react";
import { doc, getDoc, setDoc, deleteDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { toast, ToastContainer } from "react-toastify";

// Loader function to fetch movie details based on ID
export const movieLoader = async ({ params }) => {
  const { id } = params;
  const movie = await getMovie(id);
  return movie || null;
};

const Movie = () => {
  const location = useLocation(); // Get location object for back navigation
  const movie = useLoaderData(); // Load movie data from the loader
  const user = useContext(AuthContext); // Get the current user from context
  const navigate = useNavigate(); // Hook to programmatically navigate

  // Function to decode HTML entities in text
  const decodeHtmlEntities = (text) => {
    if (!text) return text;
    const textarea = document.createElement("textarea");
    textarea.innerHTML = text;
    return textarea.value;
  };

  // Extract movie details from the data
  const {
    Actors,
    Awards,
    BoxOffice,
    Country,
    Director,
    Genre,
    Language,
    Metascore,
    Plot,
    Poster,
    Runtime,
    Title,
    Type,
    Writer,
    Year,
    imdbRating,
    imdbID,
    imdbVotes,
  } = movie;

  // Render a detail section if the value is not "N/A"
  const renderDetail = (label, value) => {
    if (value && value !== "N/A") {
      return (
        <p>
          <span className="font-semibold">{label}:</span> {value}
        </p>
      );
    }
    return null;
  };

  // Add movie to user's favorites
  const addMovieToFavourite = async (id) => {
    if (!user) {
      navigate("/login?message=You must log in first", { replace: true });
      return;
    }

    const movieRef = doc(db, "users", user.uid, "movies", id);

    try {
      const movieDoc = await getDoc(movieRef);

      if (movieDoc.exists()) {
        toast.info("This movie is already in your favorites.");
      } else {
        await setDoc(movieRef, { id });
        toast.success("Movie added to your favorites.");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Remove movie from user's favorites
  const removeMovieFromFavourites = async (id) => {
    if (!user) {
      navigate("/login?message=You must log in first", { replace: true });
      return;
    }

    const movieRef = doc(db, "users", user.uid, "movies", id);

    try {
      const movieDoc = await getDoc(movieRef);

      if (movieDoc.exists()) {
        await deleteDoc(movieRef);
        toast.success("Movie removed from your favorites.");
        navigate("../../favourite-movies"); // Navigate back to favorite movies
      } else {
        toast.info("This movie is not in your favorites.");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="container mx-auto p-4 flex flex-col items-center">
      <ToastContainer position="top-center" /> {/* Toast notifications */}
      <div className="w-full max-w-4xl">
        {location.state ? (
          // Link to go back to search results
          <Link
            to={`../..${location.state?.search || ""}`}
            relative="path"
            className="text-blue-500 hover:underline mb-4"
          >
            &larr; Back to Search Results
          </Link>
        ) : (
          // Link to go back to favorite movies
          <Link
            to="../../favourite-movies"
            relative="path"
            className="text-blue-500 hover:underline mb-4"
          >
            &larr; Back to Favourite Movies
          </Link>
        )}
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl">
        <div className="flex flex-col md:flex-row items-center md:items-start">
          <div className="w-full md:w-1/3 mb-4 md:mb-0">
            {/* Display movie poster */}
            <img
              src={Poster === "N/A" ? placeholderImg : Poster}
              alt={`${Title} Poster`}
              className="rounded-lg shadow-md w-full"
            />
          </div>

          <div className="w-full md:w-2/3 md:pl-6 space-y-4">
            <h1 className="text-3xl font-bold text-gray-800">{Title}</h1>
            <p className="text-lg text-gray-600">
              {Plot === "N/A" ? "" : decodeHtmlEntities(Plot)}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
              {/* Display movie details */}
              {renderDetail("Starring", Actors)}
              {renderDetail("Directed by", Director)}
              {renderDetail("Written by", Writer)}
              {renderDetail("Genre", Genre)}
              {renderDetail("Year", Year)}
              {renderDetail("Runtime", Runtime)}
              {renderDetail("Language", Language)}
              {renderDetail("Country", Country)}
              {renderDetail("Awards", Awards)}
              {renderDetail("Box Office", BoxOffice)}
              {renderDetail("Metascore", Metascore)}
              {renderDetail(
                "IMDb Rating",
                `${imdbRating} (${imdbVotes} votes)`
              )}
              {renderDetail("Type", Type)}
            </div>
          </div>
        </div>

        {location.state ? (
          // Button to add movie to favorites if coming from search results
          <div className="flex justify-center mt-6">
            <button
              onClick={() => addMovieToFavourite(imdbID)}
              className="bg-blue-500 text-white font-bold py-2 px-6 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 transition-colors duration-300"
            >
              Add to Favourite
            </button>
          </div>
        ) : (
          // Button to remove movie from favorites if coming from favorites
          <div className="flex justify-center mt-6">
            <button
              onClick={() => removeMovieFromFavourites(imdbID)}
              className="bg-red-500 text-white font-bold py-2 px-6 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600 transition-colors duration-300"
            >
              Remove
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Movie;
