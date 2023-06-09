import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";
import { useContext } from "react";
import { FaShoppingCart } from "react-icons/fa";
import useCart from "../../../Hooks/useCart";
import useAdmin from "../../../Hooks/useAdmin";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isAdmin] = useAdmin();
  const [cart] = useCart();

  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.log(error.message));
  };

  const navOptions = (
    <>
      <li>
        <NavLink to={"/"}
          className={({ isActive }) => (isActive ? "active" : "")}
        > Home </NavLink>
      </li>
      <li>
        <NavLink to={"/menu"}
          className={({ isActive }) => (isActive ? "active" : "")}
        > Our Menu </NavLink>
      </li>
      <li>
        <NavLink to={"/order/salad"}
          className={({ isActive }) => (isActive ? "active" : "")}
        > Order Food </NavLink>
      </li>
      <li>
        <NavLink
          to={isAdmin ? "/dashboard/adminHome" : "/dashboard/userHome"}
          className={({ isActive }) => (isActive ? "active" : "")}
        > Dashboard </NavLink>
      </li>
    </>
  );

  return (
    <>
      <div className="navbar fixed top-0 z-10 bg-black bg-opacity-30 text-white max-w-7xl">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navOptions}
            </ul>
          </div>
          <Link to={"/"} className="btn btn-ghost normal-case text-xl">
            Bistro Boss
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navOptions}</ul>
        </div>
        <div className="navbar-end gap-8">
          <Link to={"/dashboard/myCart"}>
            <button className="btn btn-xs gap-2">
              <FaShoppingCart />
              <div className="badge badge-secondary">+{cart?.length || 0}</div>
            </button>
          </Link>

          {user ? (
            <div className="flex gap-2 items-center">
              <div
                className="tooltip tooltip-bottom"
                data-tip={user?.displayName}
              >
                <img
                  className="rounded-full w-12"
                  src={user?.photoURL}
                  alt=""
                />
              </div>
              <button onClick={handleLogOut} className="btn btn-sm btn-info">
                Log Out
              </button>
            </div>
          ) : (
            <Link className="btn btn-primary" to={"/login"}>
              Log in
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
