import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-4xl font-bold text-red-500 mb-4">Oops!</h1>
        <p className="text-gray-700 text-lg mb-6">Something went wrong.</p>
        <p className="text-gray-500 mb-8">
          The page you are looking for might have been removed or is temporarily
          unavailable.
        </p>
        {/* Button to navigate back to the home page */}
        <Link
          to="/"
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Go Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Error;
