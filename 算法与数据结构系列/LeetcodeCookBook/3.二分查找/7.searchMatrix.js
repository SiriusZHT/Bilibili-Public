// 240：Search a 2D Matrix II
// 编写一个高效的算法来搜索 m x n 矩阵 matrix 中的一个目标值 target 。该矩阵具有以下特性：

// 每行的元素从左到右升序排列。
// 每列的元素从上到下升序排列。

// [
//   [1,   4,  7, 11, 15],
//   [2,   5,  8, 12, 19],
//   [3,   6,  9, 16, 22],
//   [10, 13, 14, 17, 24],
//   [18, 21, 23, 26, 30]
// ]
// Given target = 5, return true.

// Given target = 20, return false.

// 
function searchMatrix(matrix, target){
    if(!matrix.length || matrix[0].length){
        return false;
    }
    let row = matrix.length, col = matrix[0].length;
    let i = 0, j = col - 1;
    while(i < row && j >= 0){
        if(matrix[i][j] == target){
            return true;
        } else if(matrix[i][j] > target){
            --j;
        } else if(matrix[i][j] < target){
            ++i;
        }
    }
    return false;
}

// 二分法
function searchMatrix_binary(matrix, target){
    if(!matrix.length || matrix[0].length){
        return false;
    }
    let row = matrix.length, col = matrix[0].length;
    let low = 0, high = row - 1;
    
    // 目标值 可能所在行的上限
    while(low <= high){
        let mid = low + (high - low) / 2;
        if(target == matrix[mid][0]){
            return true;
        } else if(target > matrix[mid][0]){
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    if(low == 0){
        return false;
    }
    // 每行查找 
    for(let i = 0; i < low; i++){
        let l = 0, r = col - 1;
        while(l <= r){
            let mid = l + (r - l) / 2;
            if(matrix[i][mid] == target){
                return true;
            } else if(matrix[i][mid] > target){
                r = mid - 1;
            } else {
                l = mid + 1;
            }
        }
    }
    return false;
}