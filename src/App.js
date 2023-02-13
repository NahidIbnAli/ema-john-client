import "./App.css";
import Shop from "./components/Shop/Shop";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./layout/Main";
import Orders from "./components/Orders/Orders";
import Inventory from "./components/Inventory/Inventory";
import About from "./components/About/About";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import { getCartData } from "./utilities/getCartData";
import PrivateRoutes from "./components/PrivateRoutes/PrivateRoutes";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
          path: "/",
          element: <Shop></Shop>,
        },
        {
          path: "shop",
          element: <Shop></Shop>,
        },
        {
          path: "orders",
          loader: getCartData,
          element: (
            <PrivateRoutes>
              <Orders></Orders>
            </PrivateRoutes>
          ),
        },
        {
          path: "inventory",
          element: (
            <PrivateRoutes>
              <Inventory></Inventory>
            </PrivateRoutes>
          ),
        },
        {
          path: "about",
          element: <About></About>,
        },
        {
          path: "login",
          element: <Login></Login>,
        },
        {
          path: "signup",
          element: <SignUp></SignUp>,
        },
      ],
    },
  ]);
  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
