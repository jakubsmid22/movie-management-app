import axios from "axios";

// API key for OMDB API, loaded from env
const API_KEY = import.meta.env.VITE_OMD_API_KEY;

// Function to fetch movies based on title, type, and year
export const getMovies = async (title, type, year) => {
  try {
    // Make a GET request to the OMDB API with the provided parameters
    const response = await axios.get(
      `https://www.omdbapi.com/?s=${title}&type=${type}&y=${year}&apikey=${API_KEY}`
    );

    // Check if the response indicates an error
    if (response.data.Response === "False") {
      return { error: response.data.Error, movies: [] };
    }

    // Return the movies data if the request is successful
    return { error: null, movies: response.data.Search };
  } catch (error) {
    // Catch and return any errors that occur during the request
    return { error: error.message, movies: [] };
  }
};

// Function to fetch details of a single movie by its ID
export const getMovie = async (id) => {
  try {
    // Make a GET request to the OMDB API with the movie ID
    const response = await axios.get(
      `https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`
    );

    // Check if the response indicates an error
    if (response.data.Response === "False") {
      console.log(response.data.Error);
      return null;
    }

    // Return the detailed movie data if the request is successful
    return response.data;
  } catch (error) {
    // Log and return null if an error occurs during the request
    console.log(error);
    return null;
  }
};
