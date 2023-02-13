import React from "react";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import productStyle from "./Product.module.css";

const Product = ({ product, handleAddToCart }) => {
  const { img, name, price, ratings, seller } = product;
  return (
    <div className="col-lg-4">
      <Card style={{ height: "42rem" }}>
        <div className="p-2">
          <Card.Img className=" rounded-lg" src={img} />
        </div>
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text className="fs-5 fw-medium">Price: ${price}</Card.Text>
          <div className="pt-4">
            <Card.Text className="mb-1">Manufacturer : {seller}</Card.Text>
            <Card.Text>Rating : {ratings} start</Card.Text>
          </div>
        </Card.Body>
        <Button
          size="lg"
          onClick={() => handleAddToCart(product)}
          className={`${productStyle.btnCustom} d-block text-dark w-100 position-absolute bottom-0`}
        >
          Add to Cart <FontAwesomeIcon icon={faCartPlus}></FontAwesomeIcon>
        </Button>
      </Card>
    </div>
  );
};

export default Product;
