const axios = require('axios');

const dotenv = require('dotenv');
dotenv.config();

const fakerAPI = process.env.FAKER_API_KEY;
const photoAPI = process.env.RU_API_KEY;

const getEmail = async (req, res, next) => {    
    try{
      // first external source 
      const fakerData = await (axios.get(fakerAPI));
      const email = fakerData.data.rows[0].email;
      // second external source 

      res.locals.email = email;
      return next();
    } catch(error){
      next(error);
    }
}
const getPhotoURI = async (req, res, next) => {
    try{
      const randomData = await(axios.get(photoAPI));
      const photo = randomData.data.results[0].picture.thumbnail;
      res.locals.photo = photo;
      return next();
    } catch (error) {
      return next(error);
    }
}
module.exports = {
  getEmail,
  getPhotoURI
}