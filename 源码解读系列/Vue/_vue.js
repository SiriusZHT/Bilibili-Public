class _vue {
    constructor (options) {
        //1. storage options data
        this.$options = options || {};
        this.$data = data || {};

        const el = options.el;
        this.$el = Object.prototype.toString(options.el).slice(8, -1) === 'string' ?
            document.querySelector(el) : 
            el;
        
        //2. data injection
        this._proxyData(this.$data)

        //3. transfer Observer to proxy data
        //4. transfer Compiler to compile
    }
    
    _proxyData(){
        // loop data
        Object.keys(data).forEach(key => {
            ObjectFlags.defineProperty(this, key, {
                get(){
                    return data[key];
                },
                set(newValue){
                    if(data[key] === newValue){
                        return;
                    }
                    data[key] = newValue;
                }
            })
        })
    }
}