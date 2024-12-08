import { createContext, useState } from "react";
import { axiosCartIn } from "../utils/axiosins";
import { data } from "autoprefixer";
import toast from "react-hot-toast";
import axios from "axios";

export const CartContext = createContext();

export default function CartContextProvider({ children }) {
  const [CartData, setCartData] = useState(null);
  const [numOfCartItems, setnumOfCartItems] = useState(null);
  const [isLoading, setisLoading] = useState({
    getCart: false,
    removeCart: false,
    addSpItem: false,
    removeSpItem: false,
    update : false
   
  });
  const [error, setError] = useState({
    getCart: null,
    removeCart: null,
    addSpItem: null,
    removeSpItem: null,
    update : null
   
  });
  async function getCart() {
    setisLoading((prev) => {
      return { ...prev, getCart: true };
    });

    try {
      const { data } = await axiosCartIn.get();
      setnumOfCartItems(data.numOfCartItems);
      setCartData(data.data);
    } catch (err) {
      setError((prev) => {
        return { ...prev, getCart: err };
      });
    } finally {
      setisLoading((prev) => {
        return { ...prev, getCart: false };
      });
    }
  }
  async function ClearCart() {
    setisLoading((prev) => {
      return { ...prev, ClearCart: true };
    });

    try {
      const { data } = await axiosCartIn.delete();
      setnumOfCartItems(data.numOfCartItems);
      setCartData(data.data);
    } catch (err) {
      setError((prev) => {
        return { ...prev, ClearCart: err };
      });
    } finally {
      setisLoading((prev) => {
        return { ...prev, ClearCart: false };
      });
    }
  }

  async function addToCart(id) {
    setisLoading((prev) => {
      return { ...prev, addSpItem: true };
    });

    try {
      const { data } = await axiosCartIn.post(  '/' ,  {productId: id});
      setnumOfCartItems(data.numOfCartItems);
      setCartData(data.data);
      toast.success('Success' , {
        position: "top-right"
      });
    } catch (err) {
      setError((prev) => {
        return { ...prev, addSpItem: err };
      });
    } finally {
      setisLoading((prev) => {
        return { ...prev, addSpItem: false };
      });
    }
  }
  async function UpdateCart(id , count) {
    setisLoading((prev) => {
      return { ...prev, update: true };
    });

    try {
      const { data } = await axiosCartIn.put(  `/${id}` ,  {count : count});
      setnumOfCartItems(data.numOfCartItems);
      setCartData(data.data);
    } catch (err) {
      setError((prev) => {
        return { ...prev, update: err };
      });
    } finally {
      setisLoading((prev) => {
        return { ...prev, update: false };
      });
    }
  }


  async function checkoutSession(cartId , shippingAddress) {
   const{data}= await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173` , 
      {
        
          "shippingAddress": shippingAddress
      
      } ,
      {
        headers: {
            token : localStorage.getItem("token")
        }
      }
    )

    window.location.href = data.session.url
    
  }
  return (
    <CartContext.Provider
      value={{ UpdateCart, checkoutSession ,ClearCart, getCart, addToCart , isLoading, error, numOfCartItems, CartData }}
    >
      {children}
    </CartContext.Provider>
  );
}
