import { useContext } from "react";
import { FaGoogle } from "react-icons/fa";
import { AuthContext } from "../../../providers/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


const SocialLogin = () => {
  const { googleSignIn } = useContext(AuthContext);

  const location = useLocation();
  const navigate = useNavigate();
  const fromLocation = location.state?.from?.pathname || "/";

  const handleGoogleSignin = () => {
    googleSignIn()
      .then((result) => {
        const loggedInUser = result.user;
        console.log(loggedInUser);

        // saving user info to the mongoDB users collection
        const savedUser = {
          name: loggedInUser.displayName,
          email: loggedInUser.email,
        };
        fetch(`${import.meta.env.VITE_API_URL}/users`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(savedUser),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            navigate(fromLocation, { replace: true });
            Swal.fire({
              position: "center",
              icon: "success",
              title: "User login successful",
              showConfirmButton: false,
              timer: 1500,
            });
          });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  return (
    <div>
      <div className="divider"></div>
      <div className="text-center mb-4">
        <button
          onClick={handleGoogleSignin}
          className="btn btn-circle btn-outline"
        >
          <FaGoogle />
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;
