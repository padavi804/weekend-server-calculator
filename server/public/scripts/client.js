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

        }).catch(function (error) {
            console.log('error getting calculations', error)
        });
}

getCalculations();


function renderToDom(calculationsFromServer) {
    let contentDiv = document.querySelector('#resultHistory');
    contentDiv.innerHTML = ``;
    for (let result of calculationsFromServer) {
        contentDiv.innerHTML += `
                    <p>${result.value}</p>
                    `;
    }
}

function submitForm(){
    
}