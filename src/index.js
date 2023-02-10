import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import Currencies from './js/ExchangeRate.js';

// Business Logic
function getUSExchangeRates() {
  Currencies.getUSExchangeRates()
    .then(function (response) {
      if (response.main) {
        printElements(response);
      } else {
        printError(response);
      }
    });
}

// UI Logic
function populateSelects(reference){
  let currencies = Object.keys(reference.conversion_rates);
  for(let i = 0; i < currencies.length; i++){
    $("#exchange-from").append("<option>" + currencies[i] + "</option>");
    $("#exchange-to").append("<option>" + currencies[i] + "</option>");
  }
}

async function callForCurrencies(){
  const response = await Currencies.getUSExchangeRates();
  populateSelects(response);
}

function printElements(response) {

}

function printError(response) {
  document.querySelector('#showResponse').innerText = `There was an error accessing the currencies exchange data: ADD ERROR.`;
}






function handleFormSubmission(event) {
  event.preventDefault();
  let convertFrom = $('#exchange-from').val();
  let convertTo = $('#exchange-to').val();
  let exchangeAmount = $('#amount').val();
  callForAnyRate(convertFrom, convertTo, exchangeAmount);
}

window.addEventListener("load", function () {
  callForCurrencies("exchange-from");
  document.querySelector('form#form-conversion').addEventListener("submit", handleFormSubmission);
});