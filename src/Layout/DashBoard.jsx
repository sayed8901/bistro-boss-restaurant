import { NavLink, Outlet } from "react-router-dom";
import { FaShoppingCart, FaWallet, FaCalendarAlt, FaHome, FaBars, FaShoppingBasket, FaUtensils, FaBook, FaUsers } from "react-icons/fa";
import useCart from "../Hooks/useCart";
import useAdmin from "../Hooks/useAdmin";

const DashBoard = () => {
  const [cart] = useCart();

  // ToDo: temporarily creating admin. later on, need to load data from the server to have dynamic isAdmin based of data..
  // const isAdmin = true;
  const [isAdmin] = useAdmin();

  return (
    <div className="drawer drawer-mobile">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center pt-8">
        {/* Page content here */}
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden ml-auto mr-16"
        >
          Open drawer
        </label>
        <Outlet></Outlet>
      </div>
      <div className="drawer-side  bg-[#D1A054]">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 ">
          {/* Sidebar content here */}

          {
            isAdmin 
              ? <>
                  <li><NavLink to={'/dashboard/adminHome'}><FaHome/> Admin Home </NavLink> </li>
                  <li><NavLink to={'/dashboard/addItems'}><FaUtensils/> Add Items </NavLink> </li>
                  <li><NavLink to={'/dashboard/manageItems'}><FaWallet/> Manage Items </NavLink></li>
                  <li><NavLink to={'/dashboard/manageBookings'}><FaBook/> Manage Bookings </NavLink></li> 
                  <li><NavLink to={'/dashboard/allUsers'}><FaUsers/> All Users </NavLink></li> 
                </> 
              : <>
                  <li><NavLink to={'/dashboard/home'}><FaHome/> User Home </NavLink> </li>
                  <li><NavLink to={'/dashboard/reservations'}><FaCalendarAlt/> Reservations </NavLink> </li>
                  <li><NavLink to={'/dashboard/history'}><FaWallet/> Payment History </NavLink></li>
                  <li><NavLink to={'/dashboard/mycart'}><FaShoppingCart/> 
                    My Cart 
                    <span className="badge badge-secondary">+{cart?.length || 0}</span>  
                  </NavLink></li>
                </>
          }

          
          

          <div className="divider"></div>

          <li><NavLink to={'/'}><FaHome/> Home </NavLink> </li>
          <li><NavLink to={'/menu'}><FaBars/> Our Menu </NavLink> </li>
          <li><NavLink to={'/order/salad'}><FaShoppingBasket/> Order Food </NavLink> </li>
        </ul>
      </div>
    </div>
  );
};

export default DashBoard;
