const articleService = require("../services/articleService");
 
exports.createArticle = async (req, res) => {
  try {
        const { title, description } = req.body;

        if (!(title && description)) {
          return res.status(400).json({statusCode:400 , message:"All inputs are required"}); 
        }
        const userId = req.params.userId
        const article = await articleService.createArticle(userId, title , description )
        res.status(201).json({statusCode:201 , message:null , data:article});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getArticles = async (req, res) => {
  try {
        const articles = await articleService.getArticles( )
        res.status(200).json({statusCode:200 , message:null , data:articles});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
 
