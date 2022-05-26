import React from "react";
import Brand from "./Brand";
import Cart from "./Cart";
import Featured from "./Featured";



const NavBar=()=>(
    <div className={"nav-bar"}>
        <Brand/>
        <Cart/>
    </div>
);


const Products = () => {

  return(
      <>
          <NavBar/>
          <Featured/>
      </>
  )
}

export default Products;