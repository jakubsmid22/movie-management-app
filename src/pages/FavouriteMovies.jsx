import { redirect, useLoaderData } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import { useEffect, useState } from "react";
import { getMovie } from "../api";
import MovieList from "../components/MovieList";

export const favouriteMoviesLoader = async (user) => {
  if (!user) {
    return redirect("/login?message=You must log in first");
  }

  const moviesRef = collection(db, "users", user.uid, "movies");

  try {
    const querySnapshot = await getDocs(moviesRef);
    const movies = querySnapshot.docs.map((doc) => doc.data());

    return movies;
  } catch (error) {
    toast.error(error.message);
    return [];
  }
};

const FavouriteMovies = () => {
  const [movies, setMovies] = useState([]);
  const data = useLoaderData();

  const getMovies = async (data) => {
    const moviesArray = [];
    for (const e of data) {
      const movie = await getMovie(e.id);
      moviesArray.push(movie);
    }
    setMovies(moviesArray);
  };

  useEffect(() => {
    getMovies(data);
  }, [data]);


  return (
    <>
      <ToastContainer position="top-center" />
      <MovieList movies={movies}/>
    </>
  );
};

export default FavouriteMovies;
