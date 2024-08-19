import { Link, Navigate, redirect, useLoaderData } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import getFormData from "get-form-data";
import { toast, ToastContainer } from "react-toastify";
import { useState } from "react";

// Loader function to handle redirection and error messages
export const loginLoader = ({ request }, user) => {
  if (user) {
    return redirect("../favourite-movies"); // Redirect to favorite movies if user is already logged in
  }
  const message = new URL(request.url).searchParams.get("message");
  return message || "";
};

const Login = ({ auth, setUser }) => {
  const [signed, setSigned] = useState(false); // Track login status
  const message = useLoaderData(); // Get error message from loader

  // Handle form submission for login
  const handleLogin = (e) => {
    e.preventDefault(); // Prevent default form submission
    const form = e.target;
    const data = getFormData(form); // Extract form data
    const { email, password } = data;

    signInWithEmailAndPassword(auth, email, password) // Sign in with Firebase
      .then((userCredential) => setUser(userCredential.user)) // Set user on successful login
      .then(() => setSigned(true)) // Update state to reflect successful login
      .catch((err) => toast.error(err.message)) // Show error message if login fails
      .finally(() => form.reset()); // Reset the form fields
  };

  return (
    <>
      {signed && <Navigate to="../favourite-movies" replace={true} />}{" "}
      {/* Redirect to favorite movies on successful login */}
      <ToastContainer position="top-center" /> {/* Toast notifications */}
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        {message && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-md mb-6 w-full max-w-md">
            <strong className="font-bold">Error:</strong>
            <span className="block mt-1">{message}</span>
          </div>
        )}
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
            Login
          </h2>
          {/* Login form */}
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your password"
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              >
                Log In
              </button>
            </div>
          </form>
          <p className="text-center text-gray-600 text-sm mt-4">
            Don't have an account?{" "}
            <Link to="../register" className="text-blue-500 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
