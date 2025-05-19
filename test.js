require('dotenv').config();
const { handler } = require('./index');

const token = process.env.CLERK_TEST_TOKEN;

const testEvent = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

console.log("Testing with valid session token...");
handler(testEvent)
  .then((result) => {
    console.log('Result:', JSON.stringify(result, null, 2));
  })
  .catch((err) => {
    console.error('Error:', JSON.stringify(err, null, 2));
  });
