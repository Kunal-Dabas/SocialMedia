import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User";

//  REGISTER USER FUNCTION 
// AUTHENTICATION 
export const register = async( req , res ) => {
    try{
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation,
          } = req.body;

          const salt = await bcrypt.genSalt();   // getting a random salt from bcrypt to hash the password 
          const passwordHash = await bcrypt.hash(password , salt); // using salt received from above for hashing and thus encrypting the password

          const newUser = new User([
            firstName,
            lastName,
            email,
            passwordHash,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile = Math.floor( Math.random() * 10000),
            impressions = Math.floor( Math.random() * 10000),
          ])

          const savedUser = await newUser.save();
          res.status(201).json(savedUser);

    } catch(err){
        res.status(500).json({ error: err.message }); // Returns the error that nodejs is showing  
    }
}



export const login = async( req , res) =>{
  try{
    const { email , password }  = req.body;
    const User = await User.findOne( { email : email });
    if( !User ){
      return res.status(400).json( {msg : "User does not exist"} );
    }

    const isMatch = await bcrypt.compare( password , User.password );
    if( !isMatch ){
      return res.status(400).json( {msg : "Invalid credentials ! "} );
    }

    const token = jwt.sign( { id : User._id } , process.env.JWT_SECRET );
    delete User.password ; // Making sure that password doesn't get sent back to front end
    res.status(200).json({ token , User});

  } catch( err ){
    res.status(500).json({ error: err.message });
  }
}