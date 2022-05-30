
const orderBy = (state="name", action) => {
    switch (action.type){
        case "ORDER_BY_NAME":
            return state="name"
        case "ORDER_BY_PRICE":
            return state="price"
        default:
            return state
    }
}
export default orderBy;