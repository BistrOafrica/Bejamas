import React, {useEffect, useLayoutEffect, useState} from "react";
import ProductsList from "../data";
import {database} from "../firebase/firebase-config";
import {collection,getDocs,addDoc} from 'firebase/firestore';
import products from "./Products";
import {Space, Spin} from "antd";
import {Col, Row} from "react-bootstrap";
import {useForm} from "react-hook-form";

const Featured = () => {
    const [products,setProducts]=useState({});
    const [featuredProduct,setFeaturedProduct]=useState({
        name:"",
        id:"",
        image:{
            src:"",
            alt:"",
        },
        details: {
            description:"",
            recommendations:[],
        },
        bestseller:"",
        featured:"",
        category:"",
        price:""
    });
    const firestoreRef=collection(database,"products");
    const {register,handleSubmit,reset}=useForm();
    const createProduct = (product) => {
      let p=({
          details: null,
          image:{
              src:product.src,
              alt:product.alt
          },
          dimensions:{
              width:product.width,
              height:product.height
          },
          name:product.name,
          price:product.price,
          category:product.category,
          bestseller:product.bestseller,
          featured: product.featured
      });
        console.log(p);
        addDoc(firestoreRef,p).then(()=>{
            reset();
        });

    }
    useEffect(()=>{
        const getProducts=async()=>{
            const products=await getDocs(firestoreRef);
            return products.docs.map((doc)=>({...doc.data(),id:doc.id}));
        }
        getProducts().then((res)=>{
            console.log(res);
            setProducts(res);
            for (let i in res){
                console.log("got it",res[i]);
                if (res[i].featured){
                    setFeaturedProduct(res[i]);
                }
            };
        });
    },[])

    const{
        name,
        id,
        image,
        details,
        bestseller,
        featured,
        category,
        price
    }=featuredProduct

    const featuredTag="Photo of the Day";
    return(
       <>
           <Spin spinning={!featured} size={"large"}>
           <div className={"Featured-heading"}>
                <h1 className={"title"}>{name}</h1>
               {featured&&<button className={"btn display-desktop"}>ADD TO CART</button>}
            </div>
            <div className={"Featured-image"}
                //Used inline styles to add dynamic Featured Image Background
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
                {featured?<div className={"image-tag"}><p className={"tag"}>{featuredTag}</p></div>:null}

            </div>
            <button className={"btn display-mobile"}>ADD TO CART</button>

           {featured&&<div className={"Featured-details"}>
                <Row className={"row"}>
                    <Col className={"col-md-6 col"}>
                        <h2>About the {name}</h2>
                        <h3>{category}</h3>
                        <p className={"text"}>{details.description}</p>
                    </Col>
                    <div className={"col-md-6 col"}>
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
               <div style={{padding:"100px 0"}}>
                   <form onSubmit={handleSubmit(createProduct)}>
                       <Space direction="horizontal" wrap size={"large"}>
                       <input placeholder={"name"} id={"name"}{...register("name")} type={"text"}/>
                       <input placeholder={"category"} id={"category"}{...register("category")} type={"text"}/>
                       <input placeholder={"price"} id={"price"}{...register("price")} type={"number"}/>
                       <input placeholder={"currency"} id={"currency"}{...register("currency")} type={"text"}/>
                       <input placeholder={"width"} id={"width"}{...register("width")} type={"number"}/>
                       <input placeholder={"height"} id={"height"}{...register("height")} type={"number"}/>
                       <input placeholder={"src"} id={"src"}{...register("src")} type={"text"}/>
                       <input placeholder={"alt"} id={"alt"}{...register("alt")} type={"text"}/>
                       <input placeholder={"bestseller"} id={"bestseller"}{...register("bestseller")} type={"checkbox"}/>
                       <input placeholder={"featured"} id={"featured"}{...register("featured")} type={"checkbox"}/>
                       <input placeholder={"details"} id={"details"}{...register("details")} type={"text"}/>
                           <input type={"submit"}/>
                       </Space>
                   </form>
               </div>
        </>
    )
}
export default Featured;