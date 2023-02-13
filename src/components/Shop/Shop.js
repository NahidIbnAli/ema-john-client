import React, { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { addToDb, getStoredCart, clearDb } from "../../utilities/fakeDb";
import Cart from "../Cart/Cart";
import Product from "../Product/Product";
import Button from "react-bootstrap/Button";
import "./Shop.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faArrowRight } from "@fortawesome/free-solid-svg-icons";

// Pagenation
/*
total data count
per page data
page index
*/

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [count, setCount] = useState(0);
  const [size, setSize] = useState(10);
  const [page, setPage] = useState(0);

  const pages = Math.ceil(count / size);

  useEffect(() => {
    const url = `http://localhost:5000/products?page=${page}&&size=${size}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setCount(data.count);
      });
  }, [page, size]);

  useEffect(() => {
    const storedCart = getStoredCart();
    let savedCart = [];
    const ids = Object.keys(storedCart);

    fetch("http://localhost:5000/productsByIds", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(ids),
    })
      .then((res) => res.json())
      .then((data) => {
        for (const id in storedCart) {
          const addedProduct = data.find((product) => product._id === id);
          if (addedProduct) {
            const quantity = storedCart[id];
            addedProduct.quantity = quantity;
            savedCart.push(addedProduct);
          }
        }
        setCart(savedCart);
      });
  }, [products]);

  const handleAddToCart = (selectedProduct) => {
    let newCart = [];
    const exists = cart.find((product) => product._id === selectedProduct._id);
    if (!exists) {
      selectedProduct.quantity = 1;
      newCart = [...cart, selectedProduct];
    } else {
      const rest = cart.filter(
        (product) => product._id !== selectedProduct._id
      );
      exists.quantity = exists.quantity + 1;
      newCart = [...rest, exists];
    }
    setCart(newCart);
    addToDb(selectedProduct._id);
  };

  const clearCart = () => {
    setCart([]);
    clearDb();
  };

  return (
    <div className="row m-0">
      <div className="col-lg-9 p-5">
        <div className="row g-4">
          {products.map((product) => (
            <Product
              product={product}
              key={product._id}
              handleAddToCart={handleAddToCart}
            ></Product>
          ))}
        </div>
        {/* pagenation */}
        <p className="mt-3 text-center">Currently selected page : {page}</p>
        <nav className="d-flex justify-content-center mt-5 align-items-center">
          <ul className="pagination pagination-md mb-0">
            <li className="page-item">
              <button onClick={() => setPage(page - 1)} className="page-link">
                Prev
              </button>
            </li>
            {[...Array(pages).keys()].map((number) => (
              <li
                key={number}
                className={`page-item ${page === number && "active"}`}
              >
                <button onClick={() => setPage(number)} className="page-link">
                  {number + 1}
                </button>
              </li>
            ))}
            <li className="page-item">
              <button onClick={() => setPage(page + 1)} className="page-link">
                Next
              </button>
            </li>
          </ul>
          <select
            className="form-select w-auto ms-2"
            onChange={(event) => setSize(event.target.value)}
          >
            <option value="5">5</option>
            <option value="10" selected>
              10
            </option>
            <option value="15">15</option>
            <option value="20">20</option>
          </select>
        </nav>
      </div>
      <div className="col-lg-3 bg-custom">
        <Cart cart={cart}>
          <Button
            onClick={clearCart}
            variant="danger"
            className="w-100 mb-3 py-2"
          >
            Clear Cart <FontAwesomeIcon icon={faTrashCan}></FontAwesomeIcon>
          </Button>
          <Link to="/orders">
            <Button variant="warning" className="w-100 mb-3 py-2">
              Review Order{" "}
              <FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon>
            </Button>
          </Link>
        </Cart>
      </div>
    </div>
  );
};

export default Shop;
