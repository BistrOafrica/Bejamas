
const toggleCart = (state=false, action) => {
    switch (action.type){
        case "OPEN_CART":
            return state=true
        case "CLOSE_CART":
            return state=false
        default:
            return state
    }
}
export default toggleCart;