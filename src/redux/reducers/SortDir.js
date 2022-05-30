
const sortDir = (state="asc", action) => {
    switch (action.type){
        case "SORT_ASCENDING":
            state="asc"
            return state
        case "SORT_DESCENDING":
            state="desc"
            return state
        default:
            return state
    }
}
export default sortDir;