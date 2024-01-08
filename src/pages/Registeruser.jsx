import { FaRegUser, FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { TfiEmail } from "react-icons/tfi";

const Registeruser = () => {
  return (
    <div className="container mx-auto mt-10">
      <form className="max-w-sm mx-auto p-5 border rounded-md shadow-sm">
        <h1 className="text-2xl font-bold text-center mb-5">
          Create New Account
        </h1>
        <div className="my-2 relative">
          <FaRegUser className="absolute text-lg top-1/2 -translate-y-1/2 left-3" />
          <input
            className="w-full pl-10 px-4 py-2 rounded-md outline-none border focus:border-gray-600"
            type="text"
            placeholder="Enter Your Name"
          />
        </div>
        <div className="my-2 relative">
          <TfiEmail className="absolute text-lg top-1/2 -translate-y-1/2 left-3" />
          <input
            className="w-full pl-10 px-4 py-2 rounded-md outline-none border focus:border-gray-600"
            type="email"
            placeholder="Enter Your Email"
          />
        </div>
        <div className="my-2 relative">
          <FaRegEye className="absolute text-lg top-1/2 -translate-y-1/2 left-3" />
          <input
            className="w-full pl-10 px-4 py-2 rounded-md outline-none border focus:border-gray-600"
            type="password"
            placeholder="Enter Password"
          />
        </div>
        <div className="my-2 relative">
          <FaRegEyeSlash className="absolute text-lg top-1/2 -translate-y-1/2 left-3" />
          <input
            className="w-full pl-10 px-4 py-2 rounded-md outline-none border focus:border-gray-600"
            type="password"
            placeholder="Confirm Password"
          />
        </div>
        <button className="w-full  px-4 py-2 rounded-md bg-gray-700 text-white text-lg font-semibold my-2 hover:bg-gray-800">
          Register
        </button>
        <div className="text-center my-2 text-lg">
          <p>
            Already have an Account ?
            <span className="text-blue-600 hover:underline">Login</span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Registeruser;