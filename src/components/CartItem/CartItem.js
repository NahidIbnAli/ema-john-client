import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import CardStyle from "./CartItem.module.css";

const CartItem = ({ product, handleRemoveItem }) => {
  const { _id, name, img, price, quantity, shipping } = product;
  return (
    <div className="col-12">
      <div className={`card mb-3 mx-auto ${CardStyle.card}`}>
        <div className="row g-0">
          <div className="col-md-4 p-2">
            <img src={img} className="img-fluid rounded" alt="..." />
          </div>
          <div className={`col-md-8 ${CardStyle.cartItem}`}>
            <div className="card-body ps-3">
              <h5>{name}</h5>
              <p className="card-text m-0">
                Price:{" "}
                <span className="text-warning fw-semibold">${price}</span>
              </p>
              <p className="card-text m-0 my-1">
                Shipping Charge:{" "}
                <span className="text-warning fw-semibold">${shipping}</span>
              </p>
              <p className="card-text m-0">
                Quantity:{" "}
                <span className="text-warning fw-semibold">{quantity}</span>
              </p>
            </div>
            <button
              onClick={() => handleRemoveItem(_id)}
              className={`${CardStyle.btnW}`}
            >
              <FontAwesomeIcon
                className="fs-2 text-danger"
                icon={faTrashCan}
              ></FontAwesomeIcon>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
