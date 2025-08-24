import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {type:String, required:true},
    email: {type:String, required:true, unique: true},
    password: {type:String, required:true},
    image: {type:String},
    address: {type:Object},
    gender:{type:String},
    dob: {type: String},
    phone: {type:String},
    questionnaire: {type:Object}
})

const userModel = mongoose.models.user || mongoose.model('user',userSchema)

export default userModel