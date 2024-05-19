console.log('client.js is sourced!');

function getCalculations() {
    axios({
        method: 'GET',
        url: '/calculations'
    })
        .then(function (response) {
            // console.log('This is the full rsponse object', response)
            let data = response.data;
            console.log('The actual payload we care about', data);
            renderNew(data);
            renderHistory(data);
            // renderToDom(data);
        }).catch(function (error) {
            console.log('error getting calculations', error)
            alert('Cannot get data from server')
        });
}

getCalculations();


function renderNew(calculations) {
    console.log('render newest calculation to DOM', calculations);
    if (calculations.length === 0){
        console.log('No calculations to render')
        return;
    }
    let latestResult = calculations[calculations.length - 1];
    let newResult = document.querySelector('#recentResult');
    newResult.innerHTML = latestResult = `
        <p>${latestResult.numOne} ${latestResult.operator} ${latestResult.numTwo} = ${latestResult.result}
        </p>`
    };


function renderHistory(calculations) {
    console.log('render calculations', calculations);
    let pastResult = document.querySelector('#resultHistory');
    pastResult.innerHTML = '';

    for (let i = 0; i < calculations.length -1; i++) {
        let item = calculations[i];
        pastResult.innerHTML += `
        <p>${item.numOne} ${item.operator} ${item.numTwo} = ${item.result}
        </p>`
    };
}

let calculatorOperator = '';

// listener events for operator

// add
document.getElementById('add').addEventListener('click', function (event) {
    event.preventDefault();
    calculatorOperator = '+';
    document.querySelector('#calculator').value = calculatorOperator;
});
// subtract
document.getElementById('subtract').addEventListener('click', function (event) {
    event.preventDefault();
    calculatorOperator = '-';
    document.querySelector('#calculator').value = calculatorOperator;
});
// multiply
document.getElementById('multiply').addEventListener('click', function (event) {
    event.preventDefault();
    calculatorOperator = '*';
    document.querySelector('#calculator').value = calculatorOperator;
});
// divide
document.getElementById('divide').addEventListener('click', function (event) {
    event.preventDefault();
    calculatorOperator = '/';
    document.querySelector('#calculator').value = calculatorOperator;
});
// }

function submitForm(event) {
    event.preventDefault();
    // console.log('Checking submitForm function');


    // Store numbers and operator in variables
    let numOne = document.getElementById('numOne').value;
    let numTwo = document.getElementById('numTwo').value;

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
    }).then(function (response) {
        console.log('Calculation added');

        // clear the inputs
        numOne.value = '';
        numTwo.value = '';

        // Refresh the calculation history
        getCalculations();
    });

}

// function clear(event) {
//     event.preventDefault();

//     document.querySelector('#calculator').reset();
// }