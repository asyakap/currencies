import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import Currencies from './js/ExchangeRate.js';

// Business Logic
function getExchangeRates() {
  Currencies.getExchangeRates()
    .then(function (response) {
      if (response.main) {
        printElements(response);
      } else {
        printError(response);
      }
    });
}

// UI Logic
function printElements(response) {

}

function printError(response) {
  document.querySelector('#showResponse').innerText = `There was an error accessing the currencies exchange data: 
  ${error}.`;
}

