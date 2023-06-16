import { useQuery } from "@tanstack/react-query";
// import { useEffect, useState } from "react";

const useMenu = () => {
  // normal fetching
  
  // const [menu, setMenu] = useState([]);
  // const [loading, setLoading] = useState(true);
  
  // useEffect(() => {
  //   fetch(`${import.meta.env.VITE_API_URL}/menu`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //         setMenu(data);
  //         setLoading(false);
  //     });
  // }, []);
  // return [menu, loading]


  // fetching using react query
  const {data: menu = [], isLoading: loading, refetch} = useQuery({
    queryKey: ['menu'],
    queryFn: async() => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/menu`);
      return res.json();
    },
  });
  return [menu, loading, refetch]
};

export default useMenu;
