const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema
const SALT_WORK_FACTOR = 10
const MAX_LOGIN_ATTEMPT = 5
const LOCK_TIME = 2*60*60*1000
const userSchema = new Schema({
doubanID: String,
username:{
    unique:true,
    type:String,
    required:true,
},

email:{
    unique:true,
    type:String,
    required:true,
},

password:{
    unique:true,
    type:String,
    
},
lockUtil:Number,
loginAtempts:{
    type:Number,
    required:true,
    default:0
},


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

userSchema.virtual('islocked').get(function() {
    return !!(this.lockUtil && this.lockUtil > Date.now())
})

userSchema.pre('save', function(next) {

    if (this.isNew){
        this.meta.createdAt = this. meta.updatedAt = Date.now()
    
    }else{
        this. meta.updatedAt = Date.now()
    }
    next()
})


userSchema.pre('save',function(next) {
        if(!user.isModified('password')) return next()
        bcrypt.genSalt(SALT_WORK_FACTOR,(err,salt) => {
            if (err) return next(err)

            bcrypt.hash(this.password,salt,(error,hash) => {
                this.password = hash
                next()
            })
        })
    next()
})

userSchema.methods = {
    comparePassword:(_password,password) =>{
        return new Promise((resolve,reject) => {
            bcrypt.compare(_password,password),(err, isMatch) => {
                if(!err) resolve(isMatch)
                else reject(err)
            }
        })
    },
    incLoginAttempts:(user) => {
        return new Promise((resolve,reject) => {
            if (this.lockUtil && this.lockUtil < Date.now()) {
                this.update({
                    $set:{
                        loginAtempts:1
                    },
                    $unset:{
                        lockUtil:1
                    }
                },(err) => {
                    if (!err) resolve(true)
                    else reject(err)
                })
            }else {
                let updates = {
                    $inc:{
                        loginAtempts:1
                    }
                }

                if (this.loginAtempts+1 >= MAX_LOGIN_ATTEMPT && !this.isLocked){
                    updates.$set = {
                        lockUtil:Date.now() + LOCK_TIME
                    }
                }
                this.update(updates,err => {
                    if(!err) resolve(true)
                    else reject(err)

                })
            }

        })
        
    }
}


mongoose.model('User',userSchema)