import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="bg-gray-600 text-white p-4">
      <div className="flex justify-between items-center container mx-auto">
        <Link to={"/"}>
          <h1 className="text-3xl font-bold">MERN-AUTH</h1>
        </Link>
        <nav className="space-x-5 font-semibold text-lg">
          <Link to={"/login"} className="hover:underline">
            Login
          </Link>
          <Link to={"/register"} className="hover:underline">
            Register
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Header;
