// 406.reconstructQueueByHeight
// 假设有打乱顺序的一群人站成一个队列，数组 people 表示队列中一些人的属性（不一定按顺序）。
// 每个 people[i] = [hi, ki] 表示第 i 个人的身高为 hi ，前面 正好 有 ki 个身高大于或等于 hi 的人。

// 请你重新构造并返回输入数组 people 所表示的队列。
// 返回的队列应该格式化为数组 queue ，其中 queue[j] = [hj, kj] 是队列中第 j 个人的属性（queue[0] 是排在队列前面的人）。

// 输入：people = [[7,0],[4,4],[7,1],[5,0],[6,1],[5,2]]
// 输出：[[5,0],[7,0],[5,2],[6,1],[4,4],[7,1]]
// 解释：
// 编号为 0 的人身高为 5 ，没有身高更高或者相同的人排在他前面。
// 编号为 1 的人身高为 7 ，没有身高更高或者相同的人排在他前面。
// 编号为 2 的人身高为 5 ，有 2 个身高更高或者相同的人排在他前面，即编号为 0 和 1 的人。
// 编号为 3 的人身高为 6 ，有 1 个身高更高或者相同的人排在他前面，即编号为 1 的人。
// 编号为 4 的人身高为 4 ，有 4 个身高更高或者相同的人排在他前面，即编号为 0、1、2、3 的人。
// 编号为 5 的人身高为 7 ，有 1 个身高更高或者相同的人排在他前面，即编号为 1 的人。
// 因此 [[5,0],[7,0],[5,2],[6,1],[4,4],[7,1]] 是重新构造后的队列。

// 输入：people = [[6,0],[5,0],[4,0],[3,2],[2,2],[1,4]]
// 输出：[[4,0],[5,0],[2,2],[3,2],[1,4],[6,0]]

// 思路
// 贪心策略：个子越高的人 前面的个子比他高或相等的人数个数就容易确定 
// 所以先把输入按照个子从高到低排序 对于个子同样高的 就按他前面的人的个数的从小到多的顺序排序
// 比如数组：[[7,0],[4,4],[7,1],[5,0],[6,1],[5,2]]
// 排完序得到：[[7,0],[7,1],[6,1],[5,0],[5,2],[4,4]]
// 然后依次去取出来，结合前面有多少人，判断应该排在什么位置。
// 因为已经排好序的人，个子肯定比他高，所以他只要放到下标为k的地方就可以
// [[7,0]] => [[7,0], [7,1]] => [[7,0], [6,1], [7,1]] => [[5,0], [7,0], [6,1], [7,1]]
// => [[5,0], [7,0], [5,2], [6,1], [7,1]] => [[5,0], [7,0], [5,2], [6,1], [4,4], [7,1]]

function reconstructQueueByHeight(people){
    // 以people[i][0] 也就是每个人的身高 增序排序
    people.sort((a, b) => b[0] - a[0]);
    console.log(people)
    const res = [];
    for(let i of people){
        res.splice(i[1], 0, i); // splice(插入的位置, 从插入位置开始删除的个数(为0就直接插入), 插入的值)
    }
    return res;
}
console.log(reconstructQueueByHeight([[7,0],[4,4],[7,1],[5,0],[6,1],[5,2]]))