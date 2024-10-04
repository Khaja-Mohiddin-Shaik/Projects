const User = require("../model/userSchema")

const login = async (req, res) => { 
    const credentials = req.body;
    const user = await User.findOne({userId : credentials.userId});
    if(user){    
      if(user.password == credentials.password){
          return res.status(201).json({status : "Logged in", role : user.role, userId : user.userId, branch : user.branch})
      }    
      else{
          return res.status(201).json({status : "Password incorrect"})
      }
  }
  else{
      return  res.status(201).json({status : "User doesn't exists"})
  }
    
    }  


module.exports = {login};



/* if (!Object.keys(models).includes(collection)) {
      return res.status(404).json(`Collection ${collection} not found`);
    }
  
    try {
      const data = await models[collection].findOne({ userId });
      if (!data) {
        return res.status(404).json(`User not found in collection ${collection}`);
      }
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json('Error fetching data');
    } */