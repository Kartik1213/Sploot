const profileService = require("../services/profileService");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
        
        const { name, email, password, age } = req.body;
    
        // Validate user input
        if (!(email && password && name && age)) {
          res.status(400).json({statusCode:400 , message:"All inputs are required"});
        }
    
        // Check if user exists in our database
        const oldUser = await profileService.findProfile( email );
    
        if (oldUser) {
          return res.status(409).json({statusCode:409 , message:"User Already Exist. Please Login"});
        }
    
        encryptedUserPassword = await bcrypt.hash(password, 10);
    
        // Create user in db
        const profile = await profileService.createProfile( email.toLowerCase() , name , age ,  encryptedUserPassword )
        // Create token
        const token = jwt.sign(
          { profile_id: profile._id, email },
          "splootAssignment",
          {
            expiresIn: "5h",
          }
        );
        profile.token = token;
    
        // return new user
        res.status(201).json({statusCode:201 , data:profile});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate user input
        if (!(email && password)) {
          res.status(400).json({statusCode:400 , message:"All inputs are required"});
        }
        // Validate if user exist in our database
        const profile = await profileService.findProfile( email );
        if (profile && (await bcrypt.compare(password, profile.password))) {
          // Create token
          const token = jwt.sign(
            { profile_id: profile._id, email },
            "splootAssignment",
            {
              expiresIn: "5h",
            }
          );
    
          // save user token
          profile.token = token;
    
          // user
          return res.status(200).json({statusCode:200 , data:profile});
        }
        return res.status(400).json({statusCode:400 , message:"Invalid Credentials"});
    } catch (err) {
        res.status(500).json({ error: err.message });
    } 
};

exports.updateProfile = async (req, res) => {
  try {
      const { name, age } = req.body;

      if (!name && !age) {
        return res.status(400).json({statusCode:400 , message:"Atleast one out of name and age is required"});
      }

      if(req.params && !req.params.userId){
        return res.status(400).json({statusCode:400 , message:"id required to update"});
      }

      payload = {
        name:null,
        age:null
      }
      if(name){
        payload['name'] = name
      }
      if(age){
        payload['age'] = age
      }
      // Validate user input
      const userId = req.params.userId
      
      // Validate if user exist in our database
      const isUpdated = await profileService.updateProfile( userId, payload['name'] , payload['age'] );
      return res.status(201).json({statusCode:201 , message:"Profile Updated"});
  } catch (err) {
      res.status(500).json({ error: err.message });
  } 
};
