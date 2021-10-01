const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

mongoose.Promise = global.Promise;

mongoose.connect(process.env.URI, {
  useUnifiedTopology:true,
  useNewUrlParser: true,
})
  .then(() => console.log('connected to mongodb database'))
  .catch((err) => console.log('error in database connection',err));

const Schema = mongoose.Schema;

const PersonSchema = new Schema({
  email: { type: String, required: true },
  photo: { type: String, required: true },
});

const Person = mongoose.model('Person', PersonSchema);

module.exports = { Person }; 