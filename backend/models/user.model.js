import mongoose, { mongo } from "mongoose";    
const user=new mongoose.Schema({
  sender :{
    type: String,
  require:true,
  enum:["user","admin","superadmin"],
  },
  text :{
    type: String,
    require:true
  },
  timestamp:{
    type: Date,
    default: Date.now   
  }
});
const User = mongoose.model("User", user);
export default User;
