import { Link, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="p-10 w-8/12 mx-auto">
      <Link to="/">
        <h1 className="text-3xl font-bold text-center">Web Speech API</h1>
      </Link>
      <Outlet />
    </div>
  );
};

export default Layout;
