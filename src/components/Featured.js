import React from "react";

import {Spin} from "antd";
import {Col, Row} from "react-bootstrap";
import {addProductToCart, checkPrevCart, notify} from "../Services";
import {useDispatch, useSelector} from "react-redux";
import {openCart} from "../redux/actions";

const Featured = ({featuredProduct}) => {
    const prevCart=useSelector((state)=>state.myCart);
    const dispatch=useDispatch();

    const onAdd = (x) => {
        let product={};
        product={id:x.id,name:x.name,image:x.image.src,price:x.price, currency:x.currency}
        const duplicate=checkPrevCart(prevCart,product.id);
        if(!duplicate){
            addProductToCart(prevCart,product,dispatch)
                .then(() => {
                    dispatch(openCart());
                }).catch(err => {
            })
            notify("success","topLeft","Success",`${product.name} has been added to your Cart`)
        }else{
            notify("info","topLeft","Notice",`${product.name} is already in your Cart`)
        }
    }
    const{
        name,
        image,
        details,
        featured,
        category
    }=featuredProduct
    const featuredTag="Photo of the Day";
    return(
       <>
           <Spin spinning={!featured} size={"large"}>
           <div className={"featured-heading"}>
               <h1 className={"title"}>{name}</h1>
               <button className={"btn display-desktop"} onClick={()=>onAdd(featuredProduct)}>ADD TO CART</button>
            </div>
            <div className={"featured-image"}
                 label={name}
                 style={{
                     position: "relative",
                     width: "100%",
                     height: "550px",
                     backgroundImage: `url("${image.src}")`,
                     backgroundRepeat: "no-repeat",
                     backgroundSize: "cover",
                     backgroundPosition: "center",
                 }}
            >
                <div className={"product-flag featured"}><p className={"tag"}>{featuredTag}</p></div>

            </div>
            <button className={"btn display-mobile"} onClick={()=>onAdd(featuredProduct)}>ADD TO CART</button>

           {featured&&<div className={"featured-details"}>
                <Row className={"row"}>
                    <Col md={7} className={"col"}>
                        <h2>About the {name}</h2>
                        <h3>{category}</h3>
                        <p className={"text"}>{details.description}</p>
                    </Col>
                    <div  md={5} className={"col"}>
                        <h2>People also buy</h2>
                        <div className={"recommendations"}>
                            {(details.recommendations||[]).map((product,index)=>
                                <div key={`recommendation-${index}`}
                                     className={"recommendation"}
                                     style={{
                                         position: "relative",
                                         width: "120px",
                                         height: "150px",
                                         backgroundImage: `url("${product.src}")`,
                                         backgroundRepeat: "no-repeat",
                                         backgroundSize: "cover",
                                         backgroundPosition: "center",
                                     }}></div>
                            )}
                        </div>
                    </div>
                </Row>
            </div>}
           </Spin>

        </>
    )
}
export default Featured;