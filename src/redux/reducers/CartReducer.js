
const cartItems = (state=[], action) => {
  switch (action.type){
      case "ADD_TO_CART":
          state=action.payload
          return state
      case "CLEAR_CART":
          return state=[]
      default:
          return state
  }
}
export default cartItems