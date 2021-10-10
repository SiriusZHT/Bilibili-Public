// 实现一个发牌函数，
// 输入是count，
// 输出是随机的对应数量的牌，可以反复调用，直到一堆牌全部发完；
// 若牌不够count，则输出剩下的所有牌，若牌堆为空，则洗牌后重新发
// // heart 红桃；spade 黑桃；club 梅花；diamond 方块
// function dealCard(count: Number): Array<string>
// dealCard(5) => ['heart4', 'club8', 'heart k', 'diamond2', 'spade5']
//line=readline()
//print(line)

// 生成无序的牌
function sendColor(name){
    let pokers = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    let res = [];
    pokers.forEach(item => res.push(name + item + ""));
    return res;
}
function sendCard(){
    let heart = sendColor("heart");
    let club = sendColor("club");
    let diamond = sendColor("diamond");
    let spade = sendColor("spade");
    let arr = heart.concat(club).concat(diamond).concat(spade);
    arr.sort((a, b) => Math.random() - 0.5);
    return arr;
}
const card = sendCard();
// 发牌
function dealCard(count){
    if(count > 52){
        return null;
    }
    let result = [];
    if(card.length <= count){
        return card;
    } else {
        for(let i = 0; i < count; i++){
            result.push(card.pop());
        }
    }
    return result;
}

console.log(dealCard(5));

