import { getStoredCart } from "./fakeDb";

export const getCartData = async () => {
  const productsData = await fetch("http://localhost:5000/products");
  const { products } = await productsData.json();

  const storedCart = getStoredCart();
  const cart = [];

  for (const id in storedCart) {
    const addedProduct = products.find((product) => product._id === id);
    if (addedProduct) {
      const quantity = storedCart[id];
      addedProduct.quantity = quantity;
      cart.push(addedProduct);
    }
  }
  return cart;
};
