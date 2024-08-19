import Movie from "./Movie";

const MovieList = ({ movies, params }) => {
  return (
    <div className="mt-8 w-full max-w-4xl mx-auto">
      {/* Heading for the movie list */}
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
        Movies
      </h2>

      {/* Grid layout for displaying movies */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {
          // Loop through the movies and render a Movie component for each one
          movies.map((movie) => {
            const { Poster, Title, imdbID } = movie;
            return (
              <Movie
                params={params}
                key={imdbID}
                title={Title}
                image={Poster}
                id={imdbID}
              />
            );
          })
        }
      </div>
    </div>
  );
};

export default MovieList;