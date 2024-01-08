const Header = () => {
  return (
    <div className="bg-gray-600 text-white p-4">
      <div className="flex justify-between items-center container mx-auto">
        <h1 className="text-3xl font-bold">MERN-AUTH</h1>
        <nav className="space-x-5 font-semibold text-lg">
          <button className="hover:underline">Login</button>
          <button className="hover:underline">Register</button>
        </nav>
      </div>
    </div>
  );
};

export default Header;
