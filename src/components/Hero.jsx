import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="max-w-xl mx-auto mt-10">
      <h1 className="text-2xl font-bold text-center mb-5">
        Welcome to MERN-AUTH Project by ajith
      </h1>
      <p className="text-justify mb-5">
        MERN-Auth is a full-stack authentication project utilizing the MERN
        stack (MongoDB, Express.js, React, and Node.js), alongside Redux Toolkit
        for state management and React Router Dom for routing. The backend
        handles user data via RESTful APIs, enabling registration, login,
        logout, update and delete functionalities. Secure authentication is
        implemented through JSON Web Tokens. React components drive frontend
        tasks such as user registration, login, user profile, while Firebase
        storage facilitates profile image uploads. Tailwind CSS enriches the
        frontend with visually appealing styles for an enhanced user experience
      </p>
      <div className="text-center space-x-4">
        <Link
          to={"/login"}
          className="bg-gray-600 hover:bg-gray-700 text-white rounded-md px-4 py-2"
        >
          Login
        </Link>
        <Link
          to={"/register"}
          className="bg-gray-600 hover:bg-gray-700 text-white rounded-md px-4 py-2"
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default Hero;
