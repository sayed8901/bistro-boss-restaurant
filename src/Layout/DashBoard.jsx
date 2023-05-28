import { Link, Outlet } from "react-router-dom";
import { FaShoppingCart, FaWallet, FaCalendarAlt, FaHome } from "react-icons/fa";

const DashBoard = () => {
  return (
    <div className="drawer drawer-mobile">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        {/* Page content here */}
        <Outlet></Outlet>
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden"
        >
          Open drawer
        </label>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 bg-base-100 text-base-content">
          {/* Sidebar content here */}
          <li><Link><FaHome/> User Home </Link> </li>
          <li><Link><FaCalendarAlt/> Reservations </Link> </li>
          <li><Link><FaWallet/> Payment History </Link></li>
          <li><Link><FaShoppingCart/> My Cart </Link> </li>
          <div className="divider">OR</div>
          <li><Link to={'/'}><FaHome/> Home </Link> </li>
          <li><Link to={'/menu'}><FaHome/> menu </Link> </li>
          <li><Link to={'/order/salad'}><FaHome/> Order Food </Link> </li>
        </ul>
      </div>
    </div>
  );
};

export default DashBoard;
