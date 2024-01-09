import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../redux/slices/userApiSlice";
import { useNavigate } from "react-router-dom";
import { clearCredentails } from "../redux/slices/userSlice";
import { toast } from "react-toastify";

const Profile = () => {
  const { userInfo } = useSelector((state) => state.user);
  const [logoutuser] = useLogoutMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await logoutuser().unwrap();
      dispatch(clearCredentails());
      navigate("/login");
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };
  return (
    <div className="max-w-sm mx-auto mt-10">
      <h1 className="text-center bg-gray-300 p-5 border rounded-sm text-lg font-semibold">
        User Profile
      </h1>
      <div className="border p-5  space-y-4 text-center">
        <img src={userInfo.image} alt="profile pic" />
        <p>
          Name : <strong>{userInfo.name}</strong>
        </p>
        <p>
          email : <strong>{userInfo.email}</strong>
        </p>
      </div>
      <div className=" border p-5 mb-10 text-red-600 text-lg font-semibold flex justify-between items-center">
        <p className="hover:underline cursor-pointer">Update</p>
        <p className="hover:underline cursor-pointer">delete</p>
        <p onClick={handleLogout} className="hover:underline cursor-pointer">
          Logout
        </p>
      </div>
    </div>
  );
};

export default Profile;
