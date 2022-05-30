import {addToCart, categoryFiltersArr} from "./redux/actions";
import {notification} from "antd";

export const addProductToCart = async(prevState,product,dispatch) => {
  return await dispatch(addToCart([...prevState,product]));
}
export const checkPrevCart=(prevCart,productID)=>{
  return JSON.stringify(prevCart).includes(productID)
}
export const notify=(type,placement,message,description)=>{
  notification[type]({
    message:message,
    description:description,
    placement:placement
  })
}
