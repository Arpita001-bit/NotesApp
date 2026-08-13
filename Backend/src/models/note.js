import mongoose, { Schema } from "mongoose";

const notesSchema = new Schema({
    title:{
       type:String,
        required:true
    },
    note:{
        type:String,
    required:true},

    author:{
        type:String,
        required:true,
    }
})

const Note = mongoose.model("Note",notesSchema);
export default Note;
