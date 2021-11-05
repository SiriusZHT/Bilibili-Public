/**
 *bubbleSort
 *冒泡排序：循环数组，比较当前元素和下一个元素，如果当前元素比下一个元素大，向上冒泡。
这样一次循环之后最后一个数就是本数组最大的数。
下一次循环继续上面的操作，不循环已经排序好的数。
优化：当一次循环没有发生冒泡，说明已经排序完成，停止循环。
#
 *
 * @param {*} array
 * @return {*} 
 */
function bubbleSort(array) {
    for (let j = 0; j < array.length; j++) {
        let complete = true;
        for (let i = 0; i < array.length - 1 - j; i++) {
            // 比较相邻数
            if (array[i] > array[i + 1]) {
                [array[i], array[i + 1]] = [array[i + 1], array[i]];
                complete = false;
            }
        }
        // 没有冒泡结束循环
        if (complete) {
            break;
        }
    }
    return array;
}

/**
 *quickSort
 *快速排序：通过一趟排序将要排序的数据分割成独立的两部分，
 其中一部分的所有数据比另一部分的所有数据要小，
 再按这种方法对这两部分数据分别进行快速排序，
 整个排序过程可以递归进行，使整个数据变成有序序列。
 * @param {*} array
 * @param {*} start
 * @param {*} end
 * @return {*} 
 */
function quickSort(array) {
    if (array.length < 2) {
        return array;
    }
    const target = array[0];
    const left = [];
    const right = [];
    for (let i = 1; i < array.length; i++) {
        if (array[i] < target) {
            left.push(array[i]);
        } else {
            right.push(array[i]);
        }
    }
    return quickSort(left).concat([target], quickSort(right));
}

/**
 *map 
 *接收一个数组 返回一个新数组 新数组对原数组每项进行callback处理
 * @param {Array} arr
 * @param {function} callback
 * @return {Array} new arr 
 */
function map(arr, callback){
    //创建一个空数组
    let result = [];
    //遍历数组
    for(let i = 0; i < arr.length; i++){
        result.push(callback(arr[i]));
    }
    return result;
}
 
/**
 *reduce
 *接收一个数组和初始值 对这个数组每项和前面的结果进行callback处理 并累加到最终的result返回
 * @param {Array} arr
 * @param {function} callback
 * @param {any} initValue
 * @return {any} 
 */
function reduce(arr, callback, initValue){
    //声明变量
    let result = initValue;
    for(let i = 0; i < arr.length; i++){
        //执行回调
        result = callback(result, arr[i]);
    }
    //返回最终结果
    return result;
}

/**
 *filter 
 *返回过滤后的新数组
 * @param {Array} arr
 * @param {function} callback
 * @return {Array} new arr 
 */
function filter(arr, callback){
    //创建空数组
    let result = [];
    //遍历数组
    for(let i = 0; i < arr.length; i++){
        //执行回调 参数加上角标
        let res = callback(arr[i], i);
        if(res){
            result.push(arr[i]);
        }
    }
    //返回结果
    return result;
}

/**
 *find 
 *找到符合callback条件的arr第一个元素
 * @param {*} arr
 * @param {*} callback
 * @return {} arr[i] ? arr[i] : undefined
 */
function find(arr, callback){
    for(let i = 0; i < arr.length; i++){
        let res = callback(arr[i], i);
        if(res){
            return arr[i];
        }
    }
    //如果遍历完了还是没有满足条件的 返回 undefined
    return undefined;
}

/**
 *findIndex
 *找到符合callback的第一个下标
 * @param {Array} arr
 * @param {functin } callback
 * @return {number} i ? i : -1
 */
function findIndex(arr, callback){
    for(let i = 0; i < arr.length; i++){
        let res = callback(arr[i], i);
        if(res){
            return i;
        }
    }
    return -1;
}

/**
 *every
 *对arr每个元素进行遍历执行callback判断，只有都满足条件才返回true
 * @param {Array} arr
 * @param {function} callback
 * @return {boolean}  
 */
function every(arr, callback){
    for(let i = 0; i < arr.length; i++){
        //如果回调执行结果是false 就返回false
        if(!callback(arr[i], i)){
            return false;
        }
    }
    //遍历完毕 也就是都满足条件
    return true;
}

/**
 *some
 *只要有一项arr元素满足callback就返回true 都不满足返回false
 * @param {Array} arr
 * @param {function} callback
 * @return {boolean} 
 */
function some(arr, callback){
    for(let i = 0; i < arr.length; i++){
        if(callback(arr[i], i)){
            return true;
        }
    }
    return false;
}

/**
 *uniqueByIndexOf
 *数组去重 通过indexof是不是为-1来判断 生成新数组
 * @param {Array} arr
 * @return {Array} new arr 
 */
function uniqueByIndexOf(arr){
    const result = [];
    arr.forEach(element => {
        if(result.indexOf(element) === -1){
            result.push(element);
        }
    });
    return result;
}

/**
 *uniqueByElement
 *数组去重 通过新建的对象保存遍历的时候的element作为obj的key 
 之后在这个对象里面找有无element 无就push到新建的array里
 * @param {Array} arr
 * @return {Array} new arr 
 */
function uniqueByElement(arr){
    const result = [];
    const obj = {};
    arr.forEach(element => {
        if(obj[element] === undefined){
            obj[element] = true;
            result.push(element)
        }
    })
    return result;
}

/**
 *uniqueBySet
 *返回new Set集合处理后的展开后的Array
 * @param {Array} arr
 * @return {Array} [...new Set(arr)]
 */
function uniqueBySet(arr){
    //let set = new Set(arr);
    //let array = [...Set];
    //return array;
    return [...new Set(arr)];
}

/**
 *concat
 *数组的连接，如果参数包含数组就展开连接
 *例如：const result = concat(arr, [4, 5, 6], 7, 8);
 * @param {Array} arr
 * @param {Array} args
 * @return {Array} new arr 
 */
function concat(arr, ...args){
    const result = [...arr];
    args.forEach( element => {
        if(Array.isArray(element)){
            result.push(...element);
        }else{
            result.push(element)
        }
    })
    return result;
}

/**
 *slice
 *数组切片
 * @param {Array} arr
 * @param {number} begin
 * @param {number} end
 * @return {Array} new arr 
 */
function slice(arr, begin, end){
    //如果arr长度为0
    if(arr.length === 0){
        return [];
    }
    //begin可加可不加
    begin = begin || 0;
    //判断begin是否越界
    if(begin >= arr.length){
        return [];
    }
    //end可加可不加
    end = end || arr.length;
    //判断end是否小于begin，小于就设为数组长度
    if(end < begin){
        end = arr.length
    }

    const result = [];
    for(let i = 0; i < arr.length; i++){
        //注意begin是要取 end不取
        if(i >= begin && i < end){
            result.push(arr[i]);
        }
    }
    return result;
}

/**
 *flattenByRecurrence
 *递归法实现数组扁平化，递归出口是判断参数无数组
 * @param {Array} arr
 * @return {Array} new arr 
 */
function flattenByRecurrence(arr){
    let result = [];
    arr.forEach(element => {
        if(Array.isArray(item)){
            result = result.concat(flattenByRecurrence(element));
        }else{
            result = result.concat(element);
        }
    });
    return result;
}

/**
 *flattenByWhileSome
 *扁平化数组 while进行元素遍历 从外到内 每层判断此层有无数组 通过some判断
 * @param {Array} arr
 * @return {Array} new arr 
 */
function flattenByWhileSome(arr){
    let result = [...arr];
    while(result.some(element => Array.isArray(element))){
        //concat 能够进行一层扁平
        //例如：const result = concat(arr, [4, 5, 6], 7, 8);
        result = [].concat(...result);
    }
    return result;
}


/**
chunk([1,2,3,4,5,6,7],3) => [[1,2,3],[4,5,6],[7]]
数组分块
 * @param {Array} arr
 * @param {number} [size=1]
 * @return {Array} new arr
 */
function chunk(arr, size = 1){
    if(arr.length === 0){
        return [];
    }
    //创建两个变量
    let result = [];
    let temp = [];//result.push([1,2,3])
    arr.forEach(element => {
        //先压入空数组temp 再把分的值压入temp
        if(temp.length === 0){
            result.push(temp)
        }
        //[[],] => [[1,2,3],]
        temp.push(element);
        if(temp.length === size){
            temp = [];
        }
    });
    return result;
}


/**
 * difference([1,3,5,7],[5,8]) => [1,3,7
 *
 * @param {Array} arr1
 * @param {Array} [arr2=[]]
 * @return {Array} new arr 
 */
function difference(arr1, arr2 = []){
    if(arr1.length === 0){
        return [];
    }
    if(arr2.length === 0){
        return arr1.slice();
    }
    const result = arr1.filter(element => !arr2.includes(element));
    return result;
}


/**
 *pull([1,3,4,3,7],2,7,3,7) => origin arr:[1,5];return new arr:[3,3,7]
 *删除数组元素 参数是any
 * @param {Array} arr [1,3,4,3,7] => [1,5]
 * @param {any} args 2,7,3,7
 * @return {Array} new arr [3,3,7]
 */
function pull(arr, ...args){
    const result = [];
    for(let i = 0;i < arr.length;i++){
        //判断args数组包不包含现在的元素
        if(args.includes(arr[i])){
            result.push(arr[i]);
            //删除当前元素
            arr.splice(i, 1);
            //下标自减
            i--;
        }
    }
    return result;
}
/**
 *pullAll([1,3,4,3,7],[2,7,3,7]) => origin arr:[1,5];return new arr:[3,3,7]
 *删除数组元素 参数是array
 * @param {Array} arr [1,3,4,3,7] => [1,5]
 * @param {Array} deleteArray [2,7,3,7]
 * @return {Array} new arr [3,3,7]
 */
function pullAll(arr, deleteArray){
    return pull(arr, ...deleteArray);
}

/**
 *得到数组某些元素
 *drop([1,2,3,4,5],2) === [1,2]
 * @param {*} arr [1,2,3,4,5]
 * @param {*} size 2
 * @return {*} new arr [1,2]
 */
function drop(arr, size){
    return arr.filter((value, index) => index >= size);
}
/**
 *得到数组某些元素
 *dropRight([1,2,3,4,5],2) === [4,5]
 * @param {*} arr [1,2,3,4,5]
 * @param {*} rightSize 2
 * @return {*} new arr [4,5]
 */
function dropRight(arr, rightSize){
    return arr.filter((value, index) => index < arr.length - rightSize);
}
