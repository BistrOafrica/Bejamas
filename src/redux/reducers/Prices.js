
const prices = (state=[], action) => {
    switch (action.type){
        case "SET_PRICES":
            const prices=action.payload
            const priceArr=prices.sort();
            let largest=0;
            for (let i=0;i<priceArr.length;i++){
                if(priceArr[i]>largest){
                    largest=priceArr[i]
                }
            }
            const ranges=5;
            const gap=Math.floor(largest/ranges);
            let pricesArr=[];
            for (let i=0;i<ranges;i++){
                const diff=numberToCeil(gap);
                const rangeEnd=numberToCeil(i*gap+gap);
                const rangeStart=numberToCeil(i*gap);
                pricesArr.push({
                    value:i===ranges-1?largest:rangeEnd,
                    previous:rangeStart,
                    label:rangeEnd===diff?`Less than ${diff}`:i===ranges-1?`More than ${numberToCeil(largest-diff)}`:`${rangeStart}-${rangeEnd}`
                })
            }
            return pricesArr
        default:
            return state
    }
}
const numberToCeil = (number) => {
    const num = number.toString().split("");
    let newNum = []
    for (let i = 0; i < num.length; i++) {
        const digit = num[i];
        if (i === 0) {
            newNum.push(digit)
        } else {
            newNum.push(0)
        }
    }
    return parseInt(newNum.join(""));
}
export default prices;