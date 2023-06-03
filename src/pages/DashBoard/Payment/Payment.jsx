import { loadStripe } from "@stripe/stripe-js";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "./CheckOutForm";
import useCart from "../../../Hooks/useCart";

// ToDo: provide publishable Key (PK) --- Done.
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
// console.log(import.meta.env.VITE_Payment_Gateway_PK);

const Payment = () => {
  const [cart] = useCart();
  const total = cart.reduce((sum, currentItem) => sum + currentItem.price, 0);
  const price = parseFloat(total.toFixed(2));

  return (
    <div className="w-full px-8">
      <SectionTitle
        heading={"Payment"}
        subHeading={"Please process"}
      ></SectionTitle>

      <Elements stripe={stripePromise}>
        <CheckOutForm cart={cart} price={price}></CheckOutForm>
      </Elements>
    </div>
  );
};

export default Payment;
