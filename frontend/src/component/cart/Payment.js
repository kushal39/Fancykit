import {useEffect, useRef } from "react";
import CheckoutSteps from "./CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../../more/Metadata";
import { Typography } from "@material-ui/core";
import "./payment.css";
import { createOrder, clearErrors } from "../../actions/OrderAction";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from "../../more/Loader";

const Payment = ({ history }) => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

  const dispatch = useDispatch();
    const payBtn = useRef(null);

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { error,loading } = useSelector((state) => state.order);


  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
    name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              country: shippingInfo.country,
            },
            
  };
  console.log(cartItems)

  const submitHandler = async (e) => {
  e.preventDefault();

  payBtn.current.disabled = true;

  try {
    if (error) {
      payBtn.current.disabled = false;

      toast.error(error.message);
    } else {
      if (order) {
        console.log("order:", order);
        dispatch(createOrder(order));

        history.push("/success");
      } else {
        toast.error("There's some issue while processing payment ");
      }
    }
  } catch (error) {
    payBtn.current.disabled = false;
    toast.error(error.response.data.message);
  }
};

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, toast]);

  return (
   <>
   {loading ? (
     <Loading />
   ) : (
    <>
    <MetaData title="Payment" />
    <CheckoutSteps activeStep={2} />
    <div className="paymentContainer">
      <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
        <Typography>Card Info</Typography>
        

        <input
          type="submit"
          value={`Pay - ₹ ${orderInfo && orderInfo.totalPrice}`}
          ref={payBtn}
          className="paymentFormBtn"
        />
      </form>
    </div>
    <ToastContainer 
     position="bottom-center"
     autoClose={5000}
     hideProgressBar={false}
     newestOnTop={false}
     closeOnClick
     rtl={false}
     pauseOnFocusLoss
     draggable
     pauseOnHover
     />
  </>
   )}
   </>
  );
};

export default Payment;