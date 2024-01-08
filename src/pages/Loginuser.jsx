import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { TfiEmail } from "react-icons/tfi";
import { Link } from "react-router-dom";

const Loginuser = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container mx-auto mt-10">
      <form className="max-w-sm mx-auto p-5 border rounded-md shadow-sm">
        <h1 className="text-2xl font-bold text-center mb-5">Welcome Back!!</h1>

        <div className="my-2 relative">
          <TfiEmail className="absolute text-lg top-1/2 -translate-y-1/2 left-3" />
          <input
            className="w-full pl-10 px-4 py-2 rounded-md outline-none border focus:border-gray-600"
            type="email"
            placeholder="Enter Your Email"
          />
        </div>
        <div className="my-2 relative">
          {showPassword ? (
            <FaRegEye
              onClick={handleShowPassword}
              className="absolute cursor-pointer text-lg top-1/2 -translate-y-1/2 left-3"
            />
          ) : (
            <FaRegEyeSlash
              onClick={handleShowPassword}
              className="absolute cursor-pointer text-lg top-1/2 -translate-y-1/2 left-3"
            />
          )}
          <input
            className="w-full pl-10 px-4 py-2 rounded-md outline-none border focus:border-gray-600"
            type={showPassword ? "text" : "password"}
            placeholder="Enter Password"
          />
        </div>

        <button className="w-full  px-4 py-2 rounded-md bg-gray-700 text-white text-lg font-semibold my-2 hover:bg-gray-800">
          Login
        </button>
        <div className="text-center my-2 text-lg">
          <p>
            New User ?
            <Link
              to={"/register"}
              className="text-blue-600 ml-3 hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Loginuser;
