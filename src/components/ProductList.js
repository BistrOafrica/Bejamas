import React, {useEffect, useId, useState} from "react";
import {Col, Row} from "react-bootstrap";
import {HiOutlineArrowNarrowDown, HiOutlineArrowNarrowUp} from "react-icons/hi";
import {Divider, Empty} from "antd";
import {GoSettings} from "react-icons/go";
import {addProductToCart, checkPrevCart, notify} from "../Services";
import {
    clearCategoryFilters,
    openCart,
    orderByField, categoryFiltersArr,
    setCurrentPage,
    sortAsc,
    sortDesc, setPriceFilter
} from "../redux/actions";
import {useDispatch, useSelector} from "react-redux";
import {BiChevronLeft, BiChevronRight} from "react-icons/bi";
import {useForm} from "react-hook-form";
import priceFilter from "../redux/reducers/priceFilter";


const ProductList = ({categories,products}) => {
    const catId=useId();
    const productID=useId();
    const priceId=useId();
    const pageId=useId();
    const {register,watch,reset}=useForm();
    const {register:registerPrice,reset:resetPrice}=useForm();
    const dispatch=useDispatch();
    const prevCart=useSelector((state)=>state.myCart)
    const sortDir=useSelector((state)=>state.orderDir);
    const [update,setUpdate]=useState(false);
    const currentPage=useSelector((state)=>state.currentPage);
    const pageCount=useSelector((state)=>state.pages);
    const prices=useSelector((state)=>state.priceFilters);
    const filters=useSelector((state)=>state.categoryFilters);
    const [pages,setPages]=useState([]);
    const [pageBatch,setPageBatch]=useState([]);
    const [checked,setChecked]=useState([]);
    const [showFilters,setShowFilters]=useState(true);
    const categoryFilters = watch();
    const clearFilters = () => {
      reset();
      resetPrice();
      dispatch(setPriceFilter([]))
      dispatch(clearCategoryFilters());
      setChecked([])
    }
    useEffect(()=>{

        dispatch(clearCategoryFilters());
        let fields=Object.keys(categoryFilters)
        let filtered=[];
        fields.map((field)=> {
            if (categoryFilters[field]){
                filtered.push(field);
            }
        });
        if (filtered.length!==0){
            dispatch(categoryFiltersArr(filtered))
            return
        }else{
            dispatch(categoryFiltersArr(fields));

        }

    },[update]);
    useEffect(()=>{
        let end=currentPage*6
        let start=end-6
        setPageBatch([start,end])
    },[currentPage])

    useEffect(()=>{
        const paginator=()=> {
            let pages = []
            for (let i = 1; i <= pageCount; i++) {
                pages.push(i);
            }
            return pages
        }
        setPages(paginator());
    },[pageCount]);
    const switchPriceFilter = (value) => {
        let val=value.split("-");
        if(val[1]!==checked[1]){
            setChecked(val);
        }else{
            setChecked([0,0]);
        }
    }
    useEffect(()=>{
        dispatch(setPriceFilter(checked));
    },[checked])
    const onAddProduct = (x) => {
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
    useEffect(()=>{
        setShowFilters(false)
    },[filters,priceFilter])

    const toggleFilters=()=>setShowFilters(!showFilters);

    return(
        <>
            <div className={"product-list"}>
                <Row className={"list-header"}>
                    <Col md={8}>
                        <div className={"header"}>
                            <h2>Photography<span>/ Premium Photos</span></h2>
                            <div className={"filterBtn"} onClick={()=>toggleFilters()}>
                                <GoSettings/>
                            </div>
                        </div>
                    </Col>
                    <Col md={4}>
                        <div className={"sort"}>
                            <HiOutlineArrowNarrowDown color={sortDir==="asc"?"blue":null} onClick={()=> {
                                dispatch(clearCategoryFilters())
                                reset()
                                dispatch(sortAsc())
                            }}/>
                            <HiOutlineArrowNarrowUp color={sortDir==="desc"?"blue":null} onClick={()=> {
                                dispatch(clearCategoryFilters())
                                reset()
                                dispatch(sortDesc())
                            }}/>
                            <p className={"sort-by"}> Sort By</p>
                            <select  onChange={(e)=> {
                                dispatch(clearCategoryFilters())
                                reset()
                                dispatch(orderByField(e.target.value))
                            }}>
                                <option value={"price"}>Price</option>
                                <option value={"name"}>Name</option>
                            </select>
                        </div>
                    </Col>
                </Row>
                <Row className={"products-section"}>
                    <Col md={3} className={!showFilters?"hideFilters filters":"showAsModal filters"}>
                        <p className={"section-title"}>Category</p>
                        <form>
                            {categories.map((category,index)=>
                                <div key={catId+index} className={"catFilter"}>
                                    <label htmlFor={category}>
                                        {category}
                                        <input
                                            type={"checkbox"}
                                            id={category} {...register(category,{onChange:()=>setUpdate((prevState)=>!prevState)})}
                                        />
                                        <span className="checkmark"></span>
                                    </label>
                                </div>
                            )}

                        </form>
                        <Divider/>
                        <p className={"section-title"}>Price Range</p>
                        <form>
                            {prices.map((price,index)=>
                                <div key={priceId+index} className={"catFilter"}>
                                    <label htmlFor={price.value}>
                                        {price.label}
                                        <input
                                            type={"checkbox"}
                                            checked={checked[1]===price.value?true:false}
                                            id={`${price.value}`}
                                            {...registerPrice(`${price.previous}-${price.value}`,
                                                {onChange:()=>switchPriceFilter(`${price.previous}-${price.value}`)}
                                            )}
                                        />
                                        <span className="checkmark"></span>
                                    </label>
                                </div>
                            )}
                        </form>
                        {<button className={"clearBtn"} onClick={()=>clearFilters()}>Clear Filters</button> }
                    </Col>
                    <Col md={9} className={"products"}>
                            <div className={"list"}>
                                {products.length===0?
                                    <div>
                                        <Empty style={{

                                        }}>
                                            <p>No data Found matching your Filters</p>
                                        </Empty>
                                    </div>


                                    :(products.slice(pageBatch[0],pageBatch[1])||[]).map((product,index)=>
                                    <div className={"product"} key={`${productID}-${product.id}`}>
                                        <div className={"product-image"} style={{
                                            backgroundImage: `url("${product.image.src}")`,

                                        }}>
                                            {product.bestseller&&<div className={"product-flag"}><p>Best Seller</p></div>}
                                            <button className={"btn inlineATC"} onClick={()=>onAddProduct(product)}>ADD TO CART</button>
                                        </div>
                                        <div>
                                            <h2 className={"product-category"}>{product.category}</h2>
                                            <h1 className={"product-name"}>{product.name}</h1>
                                            <p className={"product-price"}>{new Intl.NumberFormat("en-US",{style:"currency",currency:`${product.currency}`}).format(product.price)}</p>
                                        </div>
                                    </div>
                                )}
                            </div>

                        <div className={"pagination"}>
                            <div>
                                {currentPage !== 1 &&
                                    <BiChevronLeft onClick={() => dispatch(setCurrentPage(currentPage - 1))}/>
                                }
                            </div>
                            {(pages||[]).map((page,index)=>
                                <div
                                    key={`${pageId}-${index}`}
                                    className={currentPage===page?"current-page":""}
                                    onClick={()=>dispatch(setCurrentPage(page))}
                                >{page}</div>
                            )}
                            <div>
                                {currentPage !== pageCount &&
                                    <BiChevronRight onClick={() => dispatch(setCurrentPage(currentPage + 1))}/>
                                }
                            </div>
                        </div>
                    </Col>

                </Row>

            </div>
        </>
    )
}
export default ProductList;