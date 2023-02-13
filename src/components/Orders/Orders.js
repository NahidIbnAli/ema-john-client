import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { clearDb, removeFromDb } from "../../utilities/fakeDb";
import Cart from "../Cart/Cart";
import CartItem from "../CartItem/CartItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";

const Orders = () => {
  const products = useLoaderData();
  const [cart, setCart] = useState(products);

  const handleRemoveItem = (id) => {
    const remaining = cart.filter((product) => product._id !== id);
    setCart(remaining);
    removeFromDb(id);
  };

  const clearCart = () => {
    setCart([]);
    clearDb();
  };

  return (
    <div className="row m-0">
      <div className="col-lg-9 p-5">
        <div className="row">
          {cart.map((product) => (
            <CartItem
              key={product._id}
              product={product}
              handleRemoveItem={handleRemoveItem}
              clearCart={clearCart}
            ></CartItem>
          ))}
        </div>
      </div>
      <div className="col-lg-3 bg-custom">
        <Cart cart={cart} clearCart={clearCart}>
          <Button
            onClick={clearCart}
            variant="danger"
            className="w-100 mb-3 py-2"
          >
            Clear Cart <FontAwesomeIcon icon={faTrashCan}></FontAwesomeIcon>
          </Button>
        </Cart>
      </div>
    </div>
  );
};

export default Orders;
