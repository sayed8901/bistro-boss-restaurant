import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../../components/SectionTitle/SectionTitle";
import { FaTrashAlt, FaUserShield } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

const AllUsers = () => {
  const [axiosSecure] = useAxiosSecure();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const handleMakeAdmin = (user) => {
    fetch(`${import.meta.env.VITE_API_URL}/users/admin/${user._id}`, {
        method: "PATCH"
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
        if(data.modifiedCount){
            refetch();
            Swal.fire({
                position: "center",
                icon: "success",
                title: `${user.name} is an Admin now!!`,
                showConfirmButton: false,
                timer: 1500,
              });
        }
    })
  };

  const handleDelete = (user) => {
    Swal.fire({
        title: "Are you sure?",
        text: `This will delete ${user.name} from the DB`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          fetch(`${import.meta.env.VITE_API_URL}/carts/${user._id}`, {
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
        <title>Bistro Boss | All Users</title>
      </Helmet>

      <SectionTitle
        heading={"Manage All Users"}
        subHeading={"How Many??"}
      ></SectionTitle>

      <h3 className="text-2xl font-semibold text-center mb-8">Total Users: {users.length}</h3>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full mb-8">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}

            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{1 + index}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role ? 'Admin' : 
                    <button
                      onClick={() => {handleMakeAdmin(user)}}
                      className="btn btn-error bg-yellow-600 text-white text-3xl"
                    > <FaUserShield />
                    </button>}
                </td>
                <td>
                    <button
                      onClick={() => {handleDelete(user)}}
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
  );
};

export default AllUsers;
