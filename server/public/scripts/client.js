console.log('client.js is sourced!');

function getCalculations() {
    axios({
        method: 'GET',
        url: '/calculations'
    })
        .then(function (response) {
            console.log('This is the full rsponse object', response)
            let data = response.data;
            console.log('The actual payload we care about', data);
            // renderToDom(data);
        }).catch(function (error) {
            console.log('error getting calculations', error)
            alert('Cannot get data from server')
        });
}

getCalculations();


// function renderToDom(calculationsFromServer) {
//     let contentDiv = document.querySelector('#resultHistory');
//     contentDiv.innerHTML = ``;
//     for (let result of calculationsFromServer) {
//         contentDiv.innerHTML += `
//                     <p>${result.value}</p>
//                     `;
//     }
// }
let calculatorOperator = '';

// listener events for operator
// function findOperator(event) {
   
// add
document.getElementById('add').addEventListener('click', function(event){
    event.preventDefault();
    calculatorOperator = '+';
    document.querySelector('#calculator').value = calculatorOperator;
    // return calculatorOperator;
});
// subtract
document.getElementById('subtract').addEventListener('click', function(event){
    event.preventDefault();
    calculatorOperator = '-';
    document.querySelector('#calculator').value = calculatorOperator;
    // return calculatorOperator;
});
// multiply
document.getElementById('multiply').addEventListener('click', function(event){
    event.preventDefault();
    calculatorOperator = '*';
    document.querySelector('#calculator').value = calculatorOperator;
    // return calculatorOperator;
});
// divide
document.getElementById('divide').addEventListener('click', function(event){
    event.preventDefault();
    calculatorOperator = '/';
    document.querySelector('#calculator').value = calculatorOperator;
    // return calculatorOperator;
});
// }

function submitForm(event){
    event.preventDefault();
    console.log('Checking submitForm function');

    // findOperator(event);

    // Store numbers and operator in variables
    let numOne = document.getElementById('numOne').value;
    let numTwo = document.getElementById('numTwo').value;
    // let operator = findOperator(event);

    // Create object to send to the server
    let calculations = {
        numOne: numOne,
        numTwo: numTwo,
        operator: calculatorOperator
    }
console.log('Sending calculations to server', calculations)

// Send the calculation to the server
    axios({
        method: 'POST',
        url: '/calculations',
        data: calculations
}).then(function(response){
    console.log('Calculation added');

// clear the inputs
numOne.value = '';
numTwo.value = '';
// operator = '';

// Refresh the calculation history
getCalculations();
});

}