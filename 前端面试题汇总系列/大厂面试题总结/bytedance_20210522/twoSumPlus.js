// function deleteNum(arr, index){
//     return arr.splice(index, 1);
// }

function twoSumPlus(arr, x){
    let count = 0;
    let res = new Array(arr.length).fill(0);
    for(let i in arr){
        let target = x - arr[i];
        if(arr.indexOf(target) !== -1 && res[arr.indexOf(target)] === 0){
            res[i] = 1;
            res[arr.indexOf(target)] = 1;
            count++;
        }
    }

    return count;
}

console.log(twoSumPlus([4,3,8,9,1,3], 11));
