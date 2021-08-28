//line=readline()
//print(line)
//console.log('Hello World!');
const arr1 = [];
const arr2 = [];
function addQueue(num){
    arr1.push(num);
}
function deleteQueue(){
    if(arr2.length === 0){
        for(let i = 0; i < arr1.length; i++){
            arr2.push(arr1.pop());
        }
    }
    return arr2.pop();
}





var CQueue = function() {
    this.stack1 = [];
    this.stack2 = [];
};

/** 
 * @param {number} value
 * @return {void}
 */
CQueue.prototype.appendTail = function(value) {
    this.stack1.push(value);
};

/**
 * @return {number}
 */
CQueue.prototype.deleteHead = function() {
    if(this.stack2.length == 0){
        while(this.stack1.length){
            this.stack2.push(this.stack1.pop());
        }
    }
    if(this.stack2.length == 0){
        return -1;
    } else {
        return this.stack2.pop();
    }
};

/**
 * Your CQueue object will be instantiated and called as such:
 * var obj = new CQueue()
 * obj.appendTail(value)
 * var param_2 = obj.deleteHead()
 */