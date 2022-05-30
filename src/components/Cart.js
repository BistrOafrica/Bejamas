import React, {useId} from "react";
import {AiOutlineShoppingCart} from "react-icons/ai";
import {useDispatch, useSelector} from "react-redux";
import {Col, Row} from "react-bootstrap";
import {Divider} from "antd";
import {VscClose} from "react-icons/vsc";
import { clearCart, closeCart, openCart} from "../redux/actions";

const Cart = () => {
    const cartItems=useSelector((state)=>state.myCart);
    const toggleCart=useSelector((state)=>state.cartToggle);
    const count=cartItems.length;
    const cartItemID=useId();
    const dispatch=useDispatch();


    return(
        <>
            <div className={"shopping-cart"}>
                <AiOutlineShoppingCart onClick={()=>dispatch(openCart())}/>
                {count?<span className={"badge"}>{count}</span>:null}
                {toggleCart&&cartItems.length!==0&&<div className={"cart-drop-down"} >
                    <div className={"cart-header"}>
                        <h2>Cart</h2>
                        <div className={"small-btn"} onClick={()=>dispatch(closeCart())}>
                            <VscClose/>
                        </div>
                    </div>
                    <Divider/>
                    {(cartItems||[]).map((item)=>
                        <div className={"cart-item"} key={`${cartItemID}-${item.id}`}>
                            <Row>
                                <Col xs={8}>
                                    <h1 className={"product-name cart-name"}>{item.name.slice(0,100)}{item.name.slice(0,100).length>35?"...":""}</h1>
                                    <p className={"product-price"}>{new Intl.NumberFormat("en-US",{style:"currency",currency:`${item.currency}`}).format(item.price)}</p>
                                </Col>
                                <Col xs={4} style={{
                                    position:"relative",
                                    background:`url("${item.image}")`,
                                    backgroundPosition:"center",
                                    backgroundSize:"cover",
                                    height:"100px"
                                }}
                                >
                                </Col>
                            </Row>
                            <Divider/>
                        </div>
                    )}
                    {cartItems.length!==0&&<button className={"clearBtn"} onClick={() => dispatch(clearCart())}>
                        <VscClose/> <p>Clear Cart</p>
                    </button>}
                </div>}
            </div>
        </>
    )
}
export default Cart;