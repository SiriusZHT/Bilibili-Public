const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const categorySchema = new Schema({
name:{
    unique:true,
    type:String
},
movies:[{
    type: ObjectId,
    ref:'Movie'
}],

meta: {
    createdAt: {
    type: Date,
    Default: Date.now()
},

     updatedAt:{
    type: Date,
    Default: Date.now()
}
}
})

categorySchema.pre('save', function(next) {

    if (this.isNew){
        this.meta.createdAt = this. meta.updatedAt = Date.now()
    
    }else{
        this. meta.updatedAt = Date.now()
    }
    next()
})

mongoose.model('Category',categorySchema)