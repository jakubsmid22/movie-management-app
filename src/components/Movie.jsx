import { Link} from "react-router-dom";
import placeholderImg from "../assets/movie-placeholder.jpg";

const Movie = ({ title, image, id, params }) => {

  return (
    // Create a clickable link to the movie's page
    <Link
      to={params ? `movie/${id}` : `../movie/${id}`}
      className="relative group"
      state={
        params
          ? { search: `?${params.toString()}` } // Pass search params if available
          : null
      }
    >
      {/* Display movie image or a placeholder if the image is not available */}
      <img
        src={image === "N/A" ? placeholderImg : image}
        alt={title}
        className="w-full h-full object-cover rounded-lg shadow-md transition-transform transform group-hover:scale-105"
      />
      {/* Overlay that shows the movie title on hover */}
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
        <span className="text-white text-lg font-semibold">{title}</span>
      </div>
    </Link>
  );
};

export default Movie;
