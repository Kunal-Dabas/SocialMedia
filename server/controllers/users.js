import User from "../models/User.js";

export const getUser = async( req , res ) => {
    try{
        const { id } = req.params;
        const user = User.findById(id);
        res.status(200).json(user);

    }catch(err){
        res.status(404).json({ message : err.message});
    }
}

export const getUserFriends = async( req , res ) =>{
    try{
        const { id } = req.params;
        const user = await User.findById(id);
        
        const friends = await Promise.all(
            user.friends.map( (id) => User.findById(id)) // .map() iterates over each friend and finds friend's data by its id and the data is then stored in friends variable in which this function is called 
        );
        const formattedFriends = friends.map(
            ({ _id , firstName , lastName ,occupation , location , picturePath }) =>{
                return { _id , firstName , lastName ,occupation , location , picturePath };
            }
        )

        res.status(200).json(formattedFriends);

    }catch(err){
        res.status(404).json({ message : err.message});
    }
}

export const addRemoveFriend = async( req , res ) => {
    try{

        const { id , friendId } = req.params ;
        const user = await User.findById(id) ;
        const friend = await User.findById(friendId);

        if( user.friends.includes(friendId)){
            user.friends = user.friends.filter( (id) => id !== friendId);
            friend.friends = user.friends.filter( (id) => id !== id);
        }else{
            user.friends.push(id);
            user.friends.push(friendId);
        }
        await user.save();
        await friend.save();

        const friends = await Promise.all(
            user.friends.map( (id) => User.findById(id)) // .map() iterates over each friend and finds friend's data by its id and the data is then stored in friends variable in which this function is called 
        );
        const formattedFriends = friends.map(
            ({ _id , firstName , lastName ,occupation , location , picturePath }) =>{
                return { _id , firstName , lastName ,occupation , location , picturePath };
            }
        )

        res.status(200).json(formattedFriends);

    }catch(err){
        res.status(404).json({ message : err.message});
    }
}