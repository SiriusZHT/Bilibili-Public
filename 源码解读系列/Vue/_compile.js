class Compiler {
    constructor(vm) {
        this.vm = vm;
        this.el = el;
        // compile immediately
        this.compile(this.el);
    }
    //compile
    //handle text node and element node
    compile(el){
        const nodes = el.childNodes;
        //create a node array es7???
        Array.from(nodes).forEach(node => {
            // judge text node or element node
            this.isTextNode(node) && this.compileText(node);
            !this.isTextNode(node) && this.isElementNode(node) && this.compileElement(node);
            (code.childNodes && node.childNodes.length) && this.compile(node);
        })
    }
    //judge text node
    isTextNode(node){
        return node.nodeType === 3;
    }
    //judge element node
    isElementNode(node){
        return node.nodeType === 1;
    }
    //judge v- ?
    isDirective(attrName){
        return attrName.startWith('v-');
    }
    //compile text node
    compileText(node){

    }
    //compile element node
    compileElement (node) {}

}
  