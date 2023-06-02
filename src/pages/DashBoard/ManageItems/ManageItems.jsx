import { Helmet } from "react-helmet-async";
import useMenu from "../../../Hooks/useMenu";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const ManageItems = () => {
  const [menu, , refetch] = useMenu();
  const [axiosSecure] = useAxiosSecure();

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
        axiosSecure.delete(`/menu/${item._id}`).then((res) => {
          console.log("deleted res:", res.data);
          if (res.data.deletedCount > 0) {
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
    <div className="w-full px-8 min-h-full mb">
      <Helmet>
        <title>Bistro Boss | Manage Items</title>
      </Helmet>

      <SectionTitle
        heading={"Manage All Items"}
        subHeading={"Hurry up!"}
      ></SectionTitle>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full mb-8">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Items Image</th>
              <th>Item Name</th>
              <th>Price</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}

            {menu.map((item, index) => (
              <tr key={item._id}>
                <td>{1 + index}</td>
                <td>
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img
                        src={item.image}
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                </td>
                <td>
                  {item.name} <br />
                  <span className="text-sm">Category: </span>
                  <span className="badge badge-ghost badge-sm font-bold">
                    {item.category}
                  </span>
                </td>
                <td className="text-right">{item.price}</td>
                <td>
                  <button
                    onClick={() => {
                      //   handleDelete(item);
                    }}
                    className="btn btn-error bg-yellow-600 text-white text-xl"
                  >
                    <FaRegEdit />
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => {
                      handleDelete(item);
                    }}
                    className="btn btn-error bg-red-600 text-white text-xl"
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageItems;
