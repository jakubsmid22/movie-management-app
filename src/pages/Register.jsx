import { Link, Navigate, redirect } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import getFormData from "get-form-data";
import { toast, ToastContainer } from "react-toastify";
import { useContext, useState } from "react";
import { db } from "../config/firebase";
import { doc, setDoc } from "firebase/firestore";
import AuthContext from "../AuthContext";

// Loader function to redirect if user is already authenticated
export const registerLoader = (user) => {
  if (user) {
    return redirect("../favourite-movies");
  }
  return null;
};

const Register = ({ auth, setUser }) => {
  const [signed, setSigned] = useState(false); // State to handle successful registration
  const user = useContext(AuthContext); // Access the current user from context

  // Function to handle form submission and user registration
  const handleRegistration = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    const form = e.target;
    const data = getFormData(form); // Extract form data
    const { name, email, password } = data;
    const confirmPassword = data["confirm-password"];

    // Check if passwords match
    if (password !== confirmPassword) {
      toast.error("The passwords don't match!");
      return;
    }

    // Register the user with Firebase
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Set display name for the user
        await userCredential.user.updateProfile({ displayName: name });
        // Save user to Firestore
        await setDoc(doc(db, "users", userCredential.user.uid), {
          id: userCredential.user.uid,
        });
        setUser(userCredential.user); // Update context with the new user
      })
      .then(() => setSigned(true)) // Set signed state to true
      .catch((err) => toast.error(err.message)); // Display error message if registration fails
  };

  return (
    <>
      {signed && <Navigate to="../favourite-movies" replace={true} />}{" "}
      {/* Redirect to favorites on successful registration */}
      <ToastContainer position="top-center" /> {/* Toast notifications */}
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
            Register
          </h2>
          <form onSubmit={handleRegistration}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your name"
                required
              />
            </div>
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="mb-4">
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your password"
                required
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="confirm-password"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirm-password"
                name="confirm-password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
                placeholder="Confirm your password"
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              >
                Register
              </button>
            </div>
          </form>
          <p className="text-center text-gray-600 text-sm mt-4">
            Already have an account?{" "}
            <Link to="../login" className="text-blue-500 hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
