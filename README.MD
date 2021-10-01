### Using a programming language of your choice, write a resource endpoint that receives a userId as query string parameter and that returns that user’s email address and profile picture uri, both information available from 2 different external services

### write a function that reads and combines values of two server calls before continuing execution.

# DEV NOTES:

- Run npm install
- Run npm start to start server at 3434

I attempted to answer both questions on one repository. The first one is answered in the route /people. I'm taking advantage of express's middleware pattern to take the id, check if it is valid (sorry - really very rudimentory check - I could potentially have finished the database section and had a user table with credentials and perhaps done something more elaborate with sessions etc - I ran out of time and just wanted to submit it by Friday). I also wanted to set up a more elaborate error handler with a log property for logging error on the console for the dev and another property more suited/tailored for error to return to client.

I assume the second question wants to see how I handle asynchronicity. For both api calls I'm resolving the promises at the same time with Promise.all() to reduce load on server and get response faster too.

Additionally, you would need to use two APIs, one from faker cloud, and one from randomuser.me/api. I implemented best practices and put them in my .env. I'll the api info for you to test in the doc. Please let me know if things don't work in the links.

I thought I'd do these last but these ended up being hurried.
I look forward to your feedback.
