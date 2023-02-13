const addToDb = (id) => {
  let shoppingCart = {};
  const storedCart = localStorage.getItem("shopping-cart");
  if (storedCart) {
    shoppingCart = JSON.parse(storedCart);
  }
  let quantity = shoppingCart[id];
  if (quantity) {
    const newQuantity = ++quantity;
    shoppingCart[id] = newQuantity;
  } else {
    shoppingCart[id] = 1;
  }
  localStorage.setItem("shopping-cart", JSON.stringify(shoppingCart));
};

const getStoredCart = () => {
  let shoppingCart = {};
  const storedCart = localStorage.getItem("shopping-cart");
  if (storedCart) {
    shoppingCart = JSON.parse(storedCart);
  }
  return shoppingCart;
};

const removeFromDb = (id) => {
  const storedCart = getStoredCart();
  if (id in storedCart) {
    delete storedCart[id];
    localStorage.setItem("shopping-cart", JSON.stringify(storedCart));
  }
};

const clearDb = () => {
  localStorage.clear();
};

export { addToDb, getStoredCart, removeFromDb, clearDb };
