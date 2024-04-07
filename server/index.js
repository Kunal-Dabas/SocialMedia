import { Express } from "express";
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

// Configurations
const __filename = fileURLToPath( import.meta.url ); // we use (type : modules) in package.json so every file is treated as module thus to get path for that as normal we use this 
const __dirname = path.dirname( __filename ); // we use this to get directory path out of filepath 
dotenv.config();
const app = express();
app.use( express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy( { policy : "cross-origin" } )); // allows you to interact with data from different origins that are domains , sub-domains , ports and set policies/rules for that interactions
app.use(morgan("common")); // setting the HTTP information format to be common 
app.use( bodyParser.json( {limit : "30mb" , extended : true})); // extended = true allows you to parse complex json data structures which includes the commons ones(strings ,integers , etc.) but not limited to them
app.use( bodyParser.urlencoded( { limit :"30mb" , extended: true})); // It is specifically designed to parse URL-encoded data in the request body. URL-encoded data is typically sent by browsers when submitting form data.
app.use( cors()) ; //invokes the cross origin sharing policies in line 20
app.use( "/assets" , express.static(path.join( __dirname , 'public/assets'))); // assigns a subdomain assets and stores files received in there to the directory received from dirname and further path ahead that is public/assets

//STORAGE
const storage = multer.diskStorage({
    destination :   function( req , file , cb){
        cb( null , "public/assets "); //The cb (callback) function is provided with two arguments: err and the path to the destination directory ("public/assets" in this case). If there's an error, you can pass the error to cb(err), otherwise, pass null.
    },
    filename : function( req , file , cb  ){ //This option is a function that determines the name of the uploaded file when it's saved to the server. In your code, the filename is set to file.originalname, which means the uploaded file will retain its original name.
        cb(null , file.originalname);  // he cb function provided to filename is also a callback function that should be called with either an error (if any) or the filename. In your case, you pass null for the error (cb(null, file.originalname)).
    }
})

const upload = multer({storage}); // Variable created to upload a file via variable storage 

// KRnBYopzkRLM1et7 , Kunal_dabas


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://Kunal_Dabas:KRnBYopzkRLM1et7@socialmedia.tbfqkor.mongodb.net/?retryWrites=true&w=majority&appName=SocialMedia";

// MONGOOSE SETUP 
const PORT = process.env.PORT || 6001 ;
mongoose.connect( process.env.MONGO_URL , {
    useNewUrlParse : true , 
    useUnifiedTopology : true ,
}).then( () => {
    app.listen( PORT , () => console.log(`SERVER Port at : ${PORT}`));
}).catch( error => { `${error} did not connect`});
