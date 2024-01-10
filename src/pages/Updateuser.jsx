import { useEffect, useRef, useState } from "react";
import { FaRegUser, FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { TfiEmail } from "react-icons/tfi";
import { useNavigate } from "react-router-dom";
import { useUpdateMutation } from "../redux/slices/userApiSlice";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setcredentials } from "../redux/slices/userSlice";
import {
  ref,
  getDownloadURL,
  uploadBytesResumable,
  getStorage,
} from "firebase/storage";
import app from "../firebase";
import { PulseLoader } from "react-spinners";

const Updateuser = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
    image: "",
  });
  const { userInfo } = useSelector((state) => state.user);
  const [updateuser, { isLoading }] = useUpdateMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const imageRef = useRef();
  const [image, setImage] = useState(undefined);
  const [progresspercent, setProgresspercent] = useState(0);

  // for firebase TfiSettings

  //  allow read;
  //   allow write : if
  //   request.resource.size < 5 * 1024 * 1024 &&
  //   request.resource.contentType.matches('image/.*')

  useEffect(() => {
    if (image) {
      handleImageUpload(image);
    }
    setFormData(userInfo);
  }, [userInfo, image]);

  const handleImageUpload = (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgresspercent(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, image: downloadURL });
        });
      }
    );
  };

  console.log(formData.image);

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
        const response = await updateuser({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          image: formData.image,
        }).unwrap();
        toast.success("user updated successfully");
        setFormData({
          name: "",
          email: "",
          password: "",
          confirmpassword: "",
        });
        dispatch(setcredentials(response));
        navigate("/profile");
      } catch (error) {
        toast.error(error?.data?.message || error.message);
      }
    }
  };
  console.log(progresspercent);
  return (
    <div className="container mx-auto mt-10">
      <form
        onSubmit={handleSubmit}
        className="max-w-sm mx-auto p-5 border rounded-md shadow-sm"
      >
        <h1 className="text-2xl font-bold text-center mb-5">Update</h1>
        <div className="flex space-y-3 flex-col justify-center items-center my-2">
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            accept="image/*"
            hidden
            ref={imageRef}
          />
          <img
            className="h-20 w-20 rounded-full object-cover cursor-pointer"
            src={formData.image || userInfo.image}
            alt="profile pic"
            onClick={() => imageRef.current.click()}
          />
          <p>
            {progresspercent > 0 && progresspercent < 100 ? (
              <span className="text-gray-600">{` uploading ${progresspercent} %`}</span>
            ) : progresspercent === 100 ? (
              <span className="text-green-600">Image uploaded Successfully</span>
            ) : (
              ""
            )}
          </p>
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
          {isLoading ? <PulseLoader color="#ffffff" size={10} /> : "Update"}
        </button>
      </form>
    </div>
  );
};

export default Updateuser;
