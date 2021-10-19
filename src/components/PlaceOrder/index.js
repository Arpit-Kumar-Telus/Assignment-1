import React from "react";
import { CustomModal } from "../common/Modal";
import { Button } from "react-bootstrap";
import {
  hideModal,
  productsInCart$,
  setAlert,
  setSelectedModal,
} from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart, placeOrder, removeFromCart } from "../../services";

export const PlaceOrder = () => {
  const dispatch = useDispatch();
  const productsInCart = useSelector(productsInCart$);

  const getTotalAmount = () =>
    productsInCart
      .reduce(
        (accumulator, current) => accumulator + current.price * current.count,
        0
      )
      .toFixed(2);

  const handleReset = () => {
    dispatch(hideModal());
    dispatch(setSelectedModal());
  };

  const handleSubmit = () => {
    const order = {
      orderName: `Order`,
      orderItems: productsInCart,
      totalAmount: getTotalAmount(),
      orderAt: new Date().toISOString(),
    };

    dispatch(placeOrder(order)).then(() => {
      productsInCart.forEach(({ id }) => {
        dispatch(removeFromCart(id));
      });

      handleReset();
      dispatch(setAlert("Order placed"));
      dispatch(fetchCart());
    });
  };

  return (
    <CustomModal onHide={handleReset} title="Confirm Order">
      <>
        <div className="place-order-message-container">
          <p>Your total amount is Rs. {getTotalAmount()}.</p>
          <p>Please confirm to place order.</p>
        </div>
        <div className="custom-modal-button-group">
          <Button variant="success" onClick={handleSubmit}>
            Confirm
          </Button>
          <Button variant="outline-success" onClick={handleReset}>
            Close
          </Button>
        </div>
      </>
    </CustomModal>
  );
};
