import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import useCart from "../../Hooks/useCart";

const FoodCard = ({ item }) => {
  const { name, image, recipe, price, _id } = item;
  const { user } = useContext(AuthContext);
  const [, refetch] = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const handleAddToCart = (item) => {
    console.log(item);

    if (user && user.email) {
      const cartItem = { menuItemId:_id, name, image, price, email:user.email }
      fetch("http://localhost:5000/carts", {
        method: "POST",
        headers: {
          'content-type': "application/json"
        },
        body: JSON.stringify(cartItem)
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.insertedId) {
            refetch(); // refetch cart to update the number of items in the cart
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Food successfully added to cart.',
              showConfirmButton: false,
              timer: 1500
            })
          }
        });
    }
    else{
      Swal.fire({
        title: 'Please log in to order the food',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Log in Now!'
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login', {state:{from:location}})
        }
      })
    }
  };

  return (
    <div className="card bg-base-100 shadow-xl">
      <figure className="relative">
        <img src={image} alt="Shoes" />
      </figure>
      <p className="absolute right-10 top-5 text-white font-semibold bg-slate-700 bg-opacity-70 rounded-3xl py-2 px-8">
        ${price}
      </p>
      <div className="card-body">
        <h2 className="text-center text-2xl font-bold">{name}</h2>
        <p className="text-start">{recipe}</p>
        <div className="text-center">
          <button
            onClick={() => {
              handleAddToCart(item);
            }}
            className="btn btn-outline border-0 border-b-4 border-yellow-500 bg-slate-200"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
