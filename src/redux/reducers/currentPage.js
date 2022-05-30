
const currentPage = (state=1, action) => {
    switch (action.type){
        case "SET_CURRENT_PAGE":
            state=action.payload.currentPage
            return state
        default:
            return state
    }
}
export default currentPage;