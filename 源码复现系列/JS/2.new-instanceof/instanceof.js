function isInstanceOf(left, right){
    let leftProto = left.__proto__;
    let rightPrototype = right.prototype;
    while(true){
        if(leftProto === null) return false;
        if(leftProto === rightPrototype) return true;
        leftProto = leftProto.__proto__;
    }
}

console.log(isInstanceOf(Array, Function))
