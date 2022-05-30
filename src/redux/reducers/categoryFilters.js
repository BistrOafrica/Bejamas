
const categoryFilters = (state=[], action) => {
    switch (action.type){
        case "SET_CATEGORY_FILTERS":
            return [
                ...action.payload.filter
            ]
        case "CLEAR_CATEGORY_FILTERS":
            return state=[]
        default:
            return state
    }
}
export default categoryFilters;