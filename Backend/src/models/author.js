import mongoose,{ Schema } from "mongoose";
import passportLocalMongoosePackage from "passport-local-mongoose";

const passportLocalMongoose = passportLocalMongoosePackage.default;


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