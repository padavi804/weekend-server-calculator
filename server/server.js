const express = require('express');
const app = express();
let PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.static('server/public'));

// Global variable that will contain all of the
// calculation objects:
let calculations = []
let result;

// Here's a wonderful place to make some routes:

// GET /calculations

app.get('/calculations', (req, res) => {
  res.send(calculations);
});

// POST /calculations

app.post('/calculations', function (req, res) {
  console.log('we heard a request to POST to calculations');
  let data = req.body
  let operator = data.operator;
  let numOne = Number(data.numOne);
  let numTwo = Number(data.numTwo);

  if (operator === '+') {
    result = numOne + numTwo;
    console.log('sum is:', result)
  } else if (operator === '-') {
    result = numOne - numTwo;
    console.log('difference is:', result)
  }else if (operator === '*') {
    result = numOne * numTwo;
    console.log('product is:', result)
  }else if (operator === '/') {
    result = numOne / numTwo;
    console.log('quotient is:', result)
  }

  let mathObject = {
    numOne: numOne,
    numTwo: numTwo,
    operator: operator,
    result: result
  };

  calculations.push(mathObject);
  res.sendStatus(201);
})












// PLEASE DO NOT MODIFY ANY CODE BELOW THESE BEARS:
// 🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸

// Makes it so you don't have to kill the server
// on 5000 in order to run the tests:
if (process.env.NODE_ENV === 'test') {
  PORT = 5001;
}

// This starts the server...but also stores it in a variable.
// This is weird. We have to do it for testing reasons. There
// is absolutely no need for you to reason about this.
const server = app.listen(PORT, () => {
  console.log('server running on: ', PORT);
});

// server.setTimeout(500)

// This is more weird "for testing reasons" code. There is
// absolutely no need for you to reason about this.
app.closeServer = () => {
  server.close();
}

app.setCalculations = (calculationsToSet) => {
  calculations = calculationsToSet;
}

module.exports = app;
