const express = require('express');
const dotenv = require('dotenv');
const axios = require('axios');

const { Person } = require('./models/PersonModel');
const { getEmail, getPhotoURI } = require('./controller/personController');
const { rightId } = require('./controller/authController');


const app = express();
dotenv.config();

const PORT = process.env.PORT;

app.use(express.urlencoded({ extended:true }));
app.use(express.json());

//  debugging endpoint
app.use((req, res, next) => {
  console.log('******************');
  console.log('req url', req.url);
  console.log('req method', req.method);
  console.log('req body', req.body);
  console.log('req query', req.query);
  console.log('req params', req.params);
  console.log('******************');
  return next();
})

// route(s)

// route that answers the first question
app.get('/person', rightId, getEmail, getPhotoURI, (req, res, next) => {
  /* receives userId as query string parameter which is going to the first
   middleware rightId 
  */

  const { photo, email } = res.locals;
  if (!photo) return next({ error: 'one or both data are missing for the user provided', statusCode: 418 })

  return res.status(200).json({ photo, email });
  // returns the user's email address and profile picture uri available from two different external services
})

// taking advantage of single server and repo to answer question 4 using AJAX calls

app.get('/api', async (req, res, next) => {
  const input = ['name', 'location'];
  const apiCalls = input.map(item => axios.get(`https://randomuser.me/api/?inc=${item}`))
  try {
    const results = await Promise.all(apiCalls);
    const dataObj = results.reduce((acc, result) => {
      acc = [...acc,...result.data.results];
      return acc;
    }, [])
    return res.status(200).json(dataObj);
  }
  catch (error) {
    return next(error);
  }
})

// catch-all route handler
app.use('*', (req,res) => {
  return res.json('invalid path')
})


// express global error handler
app.use((error, req, res, next) => {
  const defaultErr = {
    error: 'An error occured',
    log: 'developer log',
    statusCode: 400
  }

  const errorObj = { ...defaultErr, ...{error} };
  console.log('the issue and status code',errorObj.statusCode, errorObj.log);
  return res.status(errorObj.statusCode).json(errorObj.error);
})


app.listen(PORT, () => console.log(`app is connected at port ${PORT}`))

