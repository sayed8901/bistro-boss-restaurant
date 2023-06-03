import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const CheckOutForm = ({ price, cart }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const [cardError, setCardError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);
  const [transactionID, setTransactionID] = useState("");

  useEffect(() => {
    if (price > 0) {
      axiosSecure.post("/create-payment-intent", { price })
      .then((res) => {
        console.log("clientSecret:", res.data.clientSecret);
        setClientSecret(res.data.clientSecret);
      });
    }
  }, [price, axiosSecure]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("error while establishing payment method:", error.message);
      setCardError(error.message);
    } else {
      setCardError("");
      console.log("testing payment method:", paymentMethod);
    }

    setProcessing(true);
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName || "anonymous",
            email: user?.email || "unknown",
          },
        },
      });

    if (confirmError) {
      console.log("confirmError:", confirmError);
      setCardError(confirmError.message);
    }

    console.log("payment intent:", paymentIntent);

    setProcessing(false);
    if (paymentIntent.status === "succeeded") {
      const transactionID = paymentIntent.id;
      setTransactionID(transactionID);

      // Save payment information to the server
      const paymentInfo = {
        user: user?.email,
        transactionID,
        price,
        quantity: cart.length,
        menuItems: cart.map((item) => item.menuItemId),
        cartItems: cart.map((item) => item._id),
        itemNames: cart.map((item) => item.name),
        date: new Date(),
        status: "service pending",
      };
      axiosSecure.post("/payments", paymentInfo).then((res) => {
        console.log(res.data);
        if (res.data.insertedId) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "User login successful",
            showConfirmButton: false,
            timer: 2000,
          });
        }
      });
    }
  };

  return (
    <>
      <form className="w-2/3 mx-auto my-24" onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <div className="text-center">
          <button
            className="btn btn-primary btn-sm mt-8"
            type="submit"
            disabled={!stripe || !clientSecret || processing}
          >
            Pay
          </button>
        </div>
      </form>

      {cardError && (
        <p className="text-error font-bold text-center">{cardError}</p>
      )}
      {transactionID && (
        <p className="text-success font-bold text-center">
          Payment completed with transactionID: <br />{" "}
          <span className="text-info text-2xl">{transactionID}</span>
        </p>
      )}
    </>
  );
};

export default CheckOutForm;
