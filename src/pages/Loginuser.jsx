import { useEffect, useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { TfiEmail } from "react-icons/tfi";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../redux/slices/userApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setcredentials } from "../redux/slices/userSlice";
import { PulseLoader } from "react-spinners";

const Loginuser = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loginuser, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo, navigate]);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginuser({
        email: formData.email,
        password: formData.password,
      }).unwrap();
      dispatch(setcredentials(response));
      navigate("/");
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <form
        onSubmit={handleSubmit}
        className="max-w-sm mx-auto p-5 border rounded-md shadow-sm"
      >
        <h1 className="text-2xl font-bold text-center mb-5">Welcome Back!!</h1>

        <div className="my-2 relative">
          <TfiEmail className="absolute text-lg top-1/2 -translate-y-1/2 left-3" />
          <input
            className="w-full pl-10 px-4 py-2 rounded-md outline-none border focus:border-gray-600"
            type="email"
            placeholder="Enter Your Email"
            name="email"
            onChange={handleChange}
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
            name="password"
            onChange={handleChange}
          />
        </div>

        <button
          disabled={isLoading}
          className={`w-full  px-4 py-2 rounded-md bg-gray-700 text-white text-lg font-semibold my-2 hover:bg-gray-800  ${
            isLoading ? "cursor-not-allowed opacity-50" : ""
          }`}
        >
          {isLoading ? <PulseLoader color="#ffffff" size={10} /> : "Login"}
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
