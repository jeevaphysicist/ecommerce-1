import { Schema , model , models } from "mongoose";

const UserSchema = new Schema({
     email:{ 
          type: String,
          required : [true,"Please provide your Email"],
          unique:[true,'Email already exists']
         },
    username:{ 
            type: String,
            required : [true,"Please provide your username"]
           },
    photo:{
        type:String
    },
    cart:{
        type:Array
    },
    wishlist:{
         type:Array
     }
})

const User = models .Users ||  model('Users',UserSchema);

export default  User;