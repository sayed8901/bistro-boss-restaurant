import { Helmet } from "react-helmet-async";
import useCart from "../../../Hooks/useCart";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const MyCart = () => {
  const [cart, refetch] = useCart();
  console.log(cart);
  const total = (cart.reduce((sum, currentItem) => sum + currentItem.price, 0)).toFixed(2);

  const handleDelete = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: `This will delete ${item.name} from the DB`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://bistro-boss-server-virid.vercel.app/carts/${item._id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.deletedCount > 0) {
              refetch();
              Swal.fire(
                "Deleted!",
                "Your food item has been deleted.",
                "success"
              );
            }
          });
      }
    });
  };

  return (
    <div className="w-full px-8 min-h-full">
      <Helmet>
        <title>Bistro Boss | My Cart</title>
      </Helmet>

      <SectionTitle
        heading={"Wanna Add More?"}
        subHeading={"My Cart"}
      ></SectionTitle>

      <div className="my-16">
        <div className="uppercase font-bold flex justify-evenly items-center mb-8">
          <h3 className="text-2xl">Total Orders: {cart.length}</h3>
          <h3 className="text-2xl">Total Price: ${total}</h3>
          <Link to={'/dashboard/payment'} className="btn btn-sm px-4 btn-warning font-semibold text-xl">Pay</Link>
        </div>

        <div className="overflow-x-auto w-full">
          <table className="table w-full mb-8">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Food</th>
                <th>Item Name</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {cart.map((item, index) => (
                <tr key={item._id}>
                  <td>{1 + index}</td>
                  <td>
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={item.image} />
                      </div>
                    </div>
                  </td>
                  <td>{item.name}</td>
                  <td className="text-end">${item.price}</td>
                  <td>
                    <button
                      onClick={() => {handleDelete(item)}}
                      className="btn btn-error bg-red-600 text-white text-xl"
                    > <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyCart;
