function Vue(options){
    this.data = options.data;
    var id = options.el;
    var dom = nodeToFragment(document.getElementById(id), this);
    // after compiled return dom to app
    document.getElementById(id).appendChild(dom);
}

function nodeToFragment(node){
    var flag = document.createDocumentFragment();
    var child;
    while(child = node.firstChild){
        compile(child, vm);
        flag.append(child);
    }
    return flag;
}

function compile(node, vm){
    var reg = /\{\{(.*)\}\}/;

    // element node 
    if(node.nodeType === 1){
        var attr = node.attributes;
        // compile 
        for(var i = 0; i < attr.length; i++){
            if(attr[i].nodeName == 'v-model'){
                // get attr name of v-model
                var name = attr[i].nodeValue;
                // anti binding
                // node.addEventListener('input', e => vm[name] = e.target.value);
                // data => node
                node.value = vm.data[name];
                // removeAttribute
                node.removeAttribute('v-model');
            }
        }
    }

    //text node
    if(node.NodeType === 3){
        if(reg.test(node.nodeValue)){
            // get matched string by regexp
            var name = RegExp.$1; 
            // string format
            name = name.trim();
            // vm data => node
            node.nodeValue = vm.data[name];
        }
    }
}


var vm = new Vue({
    el: 'app',
    data: {
        text: "hello vue"
    }
})