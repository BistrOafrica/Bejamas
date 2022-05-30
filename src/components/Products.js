import React,{useEffect, useState} from "react";
import Brand from "./Brand";
import Cart from "./Cart";
import Featured from "./Featured";
import ProductList from "./ProductList";
import {collection, getDocs,where, limit, orderBy, query} from "firebase/firestore";
import {database} from "../firebase/firebase-config";
import {Divider} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {countPages, setCurrentPage, setPrices} from "../redux/actions";



const NavBar=()=>(
    <div className={"nav-bar"}>
        <Brand/>
        <Cart/>
    </div>
);


const Products = () => {
    const firestoreRef=collection(database,"products");
    const [products,setProducts]=useState([]);
    const [filteredProducts,setFilteredProducts]=useState([]);
    const [categories,setCategories]=useState([]);
    const sortBy=useSelector((state)=>state.sortBy);
    const orderDir=useSelector((state)=>state.orderDir);
    const filters=useSelector((state)=>state.categoryFilters);
    const priceFilter=useSelector((state)=>state.priceFilter);
    const dispatch=useDispatch();
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

    const getCategories = (productList) => {
        let cats=[];
        for (let i=0;i<productList.length;i++){
            let category=productList[i].category.toLowerCase();
            let categories=JSON.stringify(cats);
            if (!categories.includes(category)){
                cats.push(category);
            }
        };
        return cats;
    }
    const getPrices=(productList)=>{
        let newPrices =[];
        for (let i=0;i<productList.length;i++){
            let price=productList[i].price;
            newPrices.push(price);
        };
        return newPrices;
    }
    const getProductList=async()=>{
        const p=await query(firestoreRef,orderBy(sortBy,orderDir));
        const products=await getDocs(p);
        return products.docs.map((product)=>({...product.data(),id:product.id}));
    }
    const getFeaturedProduct=async()=>{
        const fp=await query(firestoreRef,where("featured","==",true),limit(1));
        const fpr=await getDocs(fp);
        return fpr.docs.map((product)=>({...product.data(),id:product.id}));
    }
    const getFiltered=async(filter)=> {
        const fc = await query(firestoreRef, where("category", "in", filter));
        const fcr = await getDocs(fc);
        return fcr.docs.map((product) => ({...product.data(), id: product.id}));
    }
    const filterByPrice=()=>{
        let newProducts=[];
        for (let i=0;i<products.length;i++){
            let price=products[i].price;
            if(priceFilter[1]===0){
                return
            }
            if(price>=priceFilter[0]&&price<=priceFilter[1]){
                newProducts.push(products[i]);
            }
        }
        if(newProducts.length!==0){
            setFilteredProducts(newProducts.sort());
            dispatch(countPages(newProducts.length));
        }else{
            dispatch(countPages(products.length))
            setFilteredProducts([])
        }
    }
    useEffect(()=>{
        setTimeout(()=>{
            filterByPrice();
        },100);
    },[priceFilter])
    useEffect(()=>{
        if (filters.length<10&&filters.length!==0){
            getFiltered(filters)
                .then((productList) => {
                    setProducts(productList);
                    dispatch(countPages(productList.length))
                    dispatch(setPrices(getPrices(productList)));
                    dispatch(setCurrentPage(1))
                }).catch(err => {
            })
        }
    },[filters])
    useEffect(()=>{
        if (filters.length>10||filters.length===0){
            getProductList()
                .then((productList) => {
                    setProducts(productList);
                    dispatch(countPages(productList.length))
                    dispatch(setPrices(getPrices(productList)));
                    setCategories([...getCategories(productList)]);
                    dispatch(setCurrentPage(1))
                }).catch(err => {
            })
        }
    },[sortBy,orderDir,filters])

    useEffect(()=>{
        getFeaturedProduct()
            .then((fp)=>{
                setFeaturedProduct(fp[0]);
            }).catch(err=>{
        })
    },[])

    return(
      <>
          <NavBar/>
          <Featured featuredProduct={featuredProduct}/>
          <Divider/>
          <ProductList products={priceFilter.length!==0?filteredProducts:products} categories={categories}/>
      </>
  )
}

export default Products;