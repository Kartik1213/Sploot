const profileModel = require("../models/profiles");
 
exports.createProfile = async (email , name , age , password) => {
  return await profileModel.create({
      name: name,
      email: email,
      age: age,
      password: password,
    });
};
 
exports.findProfile = async (email) => {
  return await profileModel.findOne({ email });
};

exports.updateProfile = async (id ,name , age) => {
  payload = {}
  if(name){
    payload['name'] = name
  }
  if(age){
    payload['age'] = age
  }

  return await profileModel.updateOne({_id: id},{
    $set:payload
  });
};
