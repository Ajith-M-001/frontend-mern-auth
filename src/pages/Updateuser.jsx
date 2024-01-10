import { useEffect, useState } from "react";
import { FaRegUser, FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { TfiEmail } from "react-icons/tfi";
import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../redux/slices/userApiSlice";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const Updateuser = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
  });
  const { userInfo } = useSelector((state) => state.user);
  const [registerUser, { isLoading }] = useRegisterMutation();
  const navigate = useNavigate();

  useEffect(() => {
    setFormData(userInfo);
  }, [userInfo]);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmpassword) {
      toast.error("password didn't match");
    } else {
      try {
        const response = await registerUser({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }).unwrap();
        toast.success(response.message);
        setFormData({
          name: "",
          email: "",
          password: "",
          confirmpassword: "",
        });

        setTimeout(() => {
          navigate("/login");
        }, 6000);
      } catch (error) {
        toast.error(error?.data?.message || error.message);
      }
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <form
        onSubmit={handleSubmit}
        className="max-w-sm mx-auto p-5 border rounded-md shadow-sm"
      >
        <h1 className="text-2xl font-bold text-center mb-5">Update</h1>
        <div className="flex justify-center items-center my-2">
          <img
            className="h-20 w-20 rounded-full object-cover cursor-pointer"
            src={userInfo.image}
            alt="profile pic"
          />
        </div>
        <div className="my-2 relative">
          <FaRegUser className="absolute text-lg top-1/2 -translate-y-1/2 left-3" />
          <input
            onChange={handleChange}
            className="w-full pl-10 px-4 py-2 rounded-md outline-none border focus:border-gray-600"
            type="text"
            placeholder="Enter Your Name"
            name="name"
            value={formData.name}
          />
        </div>
        <div className="my-2 relative">
          <TfiEmail className="absolute text-lg top-1/2 -translate-y-1/2 left-3" />
          <input
            onChange={handleChange}
            className="w-full pl-10 px-4 py-2 rounded-md outline-none border focus:border-gray-600"
            type="email"
            placeholder="Enter Your Email"
            name="email"
            value={formData.email}
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
            onChange={handleChange}
            className="w-full pl-10 px-4 py-2 rounded-md outline-none border focus:border-gray-600"
            type={showPassword ? "text" : "password"}
            placeholder="Enter Password"
            name="password"
          />
        </div>
        <div className="my-2 relative">
          {showConfirmPassword ? (
            <FaRegEye
              onClick={handleShowConfirmPassword}
              className="absolute cursor-pointer text-lg top-1/2 -translate-y-1/2 left-3"
            />
          ) : (
            <FaRegEyeSlash
              onClick={handleShowConfirmPassword}
              className="absolute cursor-pointer text-lg top-1/2 -translate-y-1/2 left-3"
            />
          )}
          <input
            onChange={handleChange}
            className="w-full pl-10 px-4 py-2 rounded-md outline-none border focus:border-gray-600"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            name="confirmpassword"
          />
        </div>
        <button
          disabled={isLoading}
          className={`w-full  px-4 py-2 rounded-md bg-gray-700 text-white text-lg font-semibold my-2 hover:bg-gray-800 ${
            isLoading ? "cursor-not-allowed opacity-50" : ""
          }`}
        >
          {isLoading ? "Loading..." : "Update"}
        </button>
      </form>
    </div>
  );
};

export default Updateuser;
