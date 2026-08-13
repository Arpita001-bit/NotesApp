import express from "express";
import "dotenv/config";
import session from "express-session";
import localStrategy from "passport-local";
import mongoose from "mongoose";
import  ejs     from "ejs";
import {createServer} from "node:http";
import path from "path";
import { fileURLToPath } from "url";
import Note from "./models/note.js";
import Author from "./models/author.js";
import httpStatus from "http-status";
import methodOverride from "method-override";
import passport from "passport";

const app = express();
app.use(express.json());

const connectionDB = async()=>{
    try{
        const connectDB = mongoose.connect(process.env.MONGO_URI);
        console.log(`MONGO connected DB Host : ${connectionDB.connection.host}`);
    }catch(err){
          console.log("MongoDB connection faild ." , err.message);
          process.exit(1);
    }
};

connectDB();



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../../frontend/views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
passport.use(Author.createStrategy());
passport.serializeUser(Author.serializeUser());
passport.deserializeUser(Author.deserializeUser());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());



app.get("/",(req,res)=>{
    res.send("Home");
});
app.get("/showNote", async (req, res) => {
    const notes = await Note.find({});
    res.render("notes/showNote", { notes });
});

app.get("/author", async (req, res) => {
    res.render("author");
});
app.get("/note", async (req, res) => {
    const notes = await Note.find({});
     res.status(httpStatus.OK).json(notes);
});

app.get("/note/:id/updateNotes", async (req, res) => {
    const note = await Note.findById(req.params.id);
    res.render("notes/updateNotes", { note });
});

app.get("/note/createNote",async(req,res)=>{

    res.render("notes/createNote");
})

app.post("/register", async (req, res) => {
    try {
        const author = await Author.register(
            new Author({ email: req.body.email }),
            req.body.password
        );
        req.login(author, (err) => {
            if (err) {
                console.error(err);
                return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: "Login after register failed" });
            }
            res.status(httpStatus.CREATED).json({ message: "Registered and logged in", author });
        });
    } catch (err) {
        console.error(err);
        res.status(httpStatus.BAD_REQUEST).json({ message: err.message });
    }
});

app.post("/login",passport.authenticate("local",{
    failureRedirect: "/login",
}),(req,res)=>{
    res.status(httpStatus.OK).json({ message: "Logged in", author: req.user });
});



app.get("/home",(req,res)=>{
    return res.json({
        "hello":"world"
    })
});

app.post("/author",async(req,res)=>{
    try{
        const author = await Author.create(req.body);
        res.status(httpStatus.CREATED).json(author);
    }catch(err){
        console.error(err);
        res.status(httpStatus.BAD_REQUEST).json({ message: "Author creation failed" });
        
    }
})

app.post("/note/createNote",async(req,res)=>{
    try{
        const note = await Note.create(req.body);
        
        res.redirect("/showNote");
    }catch(err){
        console.error(err);
        res.status(httpStatus.BAD_REQUEST).json({ message: "Note creation failed" });
         

    }
    
})

app.post("/note/:id",async(req,res)=>{
    await Note.findByIdAndDelete(req.params.id);
    res.redirect("/showNote");
})

app.put("/note/:id/updateNotes", async (req, res) => {
    let { id } = req.params;
    await Note.findByIdAndUpdate(id, req.body);
    res.redirect("/showNote");
});








    app.listen(8080,()=>{
        console.log("LISTENING TO PORT 8080");
    })
