import React from "react";

const Cart = ({ cart, children }) => {
  let total = 0;
  let shipping = 0;
  let quantity = 0;
  for (const product of cart) {
    quantity = quantity + product.quantity;
    total = total + product.price * product.quantity;
    shipping += product.shipping;
  }
  const tax = parseFloat((total * 0.1).toFixed(2));
  const grandTotal = (total + shipping + tax).toFixed(2);

  return (
    <div className="sticky-top">
      <h3 className="pt-4 pb-3 text-center">Order Summary</h3>
      <div className="p-4">
        <p>Selected Items: {quantity}</p>
        <p>Total Price: ${total}</p>
        <p>Total Shipping Charge: ${shipping}</p>
        <p>Tax: ${tax}</p>
        <h4>Grand Total: ${grandTotal}</h4>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
};

export default Cart;
