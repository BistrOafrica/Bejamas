
const paginator = (state=0, action) => {
    switch (action.type){
        case "COUNT_PAGES":
            let c=action.payload.count;
            let pages=Math.floor(c/6);
            let spill=0;
            if(pages<c/6) {
                spill = 1
            }
            return state=pages+spill
        default:
            return state
    }
}
export default paginator;