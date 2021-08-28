//line=readline()
//print(line)
function cpString(str) {
    if(!str){
        return null;
    }
    const arr = [];
    let char = str[0];
    let count = 1;
    for(let i = 1; i <= str.length; i++){
        if(str[i] == char){
            count++;
        } else {
            arr.push(char);
            arr.push(count);
            count = 1;
            char = str[i];
        }
    }
    return arr.join("") + "";
}
console.log(cpString("aaaccaad")) // a3c2a2d1
console.log(cpString("aaa00cc222"))
console.log(cpString(""))
console.log(cpString(null))