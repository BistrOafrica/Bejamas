export const addToCart=(cart=[])=> {
    return {
        type: "ADD_TO_CART",
        payload:cart
    }
};
export const clearCart=()=>{
    return{
        type:"CLEAR_CART",
    }
}
export const openCart = () => {
    return{
        type:"OPEN_CART"
    }
}
export const closeCart = () => {
    return{
        type:"CLOSE_CART"
    }
}
export const sortAsc=()=>{
    return{
        type:"SORT_ASCENDING"
    }
}
export const sortDesc=()=>{
    return{
        type:"SORT_DESCENDING"
    }
}
export const countPages=(count)=>{
    return{
        type:"COUNT_PAGES",
        payload:{
            count:count,
        }
    }
}
export const setCurrentPage=(page)=>{
    return{
        type:"SET_CURRENT_PAGE",
        payload:{
            currentPage:page,
        }
    }
}
export const orderByField=(field)=>{
    let f=field==="price"?"ORDER_BY_PRICE":"ORDER_BY_NAME"
    return{
        type:f
    }
}
export const categoryFiltersArr=(filter)=>{
    return{
        type:"SET_CATEGORY_FILTERS",
        payload: {
            filter:filter,
        }
    }
}

export const clearCategoryFilters=()=>{
    return{
        type:"CLEAR_CATEGORY_FILTERS"
    }
}
export const setPrices = (prices) => {
    return {
        type: "SET_PRICES",
        payload: prices
    }
}
export const setPriceFilter = (range) => {
    return {
        type: "SET_PRICE_FILTER",
        payload: [...range]
    }
}