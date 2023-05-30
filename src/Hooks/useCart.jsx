import { useQuery } from "@tanstack/react-query";
// import { useContext } from "react";
// import { AuthContext } from "../providers/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useCart = () => {
  const { user } = useAuth();
  // const token = localStorage.getItem('access-token')
  const [axiosSecure] = useAxiosSecure();

  const { refetch, data: cart=[]} = useQuery({
    queryKey: ["carts", user?.email],
    // queryFn: async () => {
    //     const res = await fetch(`http://localhost:5000/carts?email=${user?.email}`, {
    //       method: 'GET',
    //       headers: {
    //         'content-type':"application/json",
    //         authorization:`Bearer ${token}`
    //       }
    //     })
    //     if (!res.ok) {
    //       throw new Error('Network response was not ok')
    //     }
    //     return res.json();
    //   },

    queryFn: async () => {
        const res = await axiosSecure(`/carts?email=${user?.email}`);
        console.log('response from axios', res);
        // if (!res.ok) {
        //   throw new Error('Network response was not ok')
        // }
        return res.data;
      },
  });
  return [cart, refetch]
};

export default useCart;
