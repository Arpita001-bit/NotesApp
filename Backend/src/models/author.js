import mongoose,{ Schema } from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";


const authorSchema = new Schema({
    email:{
        type:String,
        required:true,
        unique :true,
    },
    
});

authorSchema.plugin(passportLocalMongoose,{
    usernameField:"email"
});

const Author = mongoose.model("Author", authorSchema);

export default Author;