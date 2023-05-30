const articleModel = require("../models/articles");
 
exports.createArticle = async (userId , title , description) => {
  return await articleModel.create({
    userId:userId,
    title:title,
    description:description
  });
};
 
exports.getArticles = async () => {
  return await articleModel.find();
};
