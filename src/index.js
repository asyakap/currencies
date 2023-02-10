import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import Currencies from './js/ExchangeRate.js';

// Business Logic

// UI Logic
function populateSelects(reference) {
  console.log(reference.conversion_rates);
  let currencies = Object.keys(reference.conversion_rates);
  console.log(currencies);
  let exchangeFrom = document.querySelector("select#exchange-from");
  let exchangeTo = document.querySelector("select#exchange-to");
  for (let i = 0; i < currencies.length; i++) {
    let opt = document.createElement('option');
    opt.value = currencies[i];
    opt.innerHTML = currencies[i];
    exchangeFrom.appendChild(opt);
    opt = document.createElement('option');
    opt.value = currencies[i];
    opt.innerHTML = currencies[i];
    exchangeTo.appendChild(opt);
  }
}

async function callForCurrencies() {
  const response = await Currencies.getUSExchangeRates();
  populateSelects(response);
}

async function callForAnyRate(convertTo, amount) {
  const response = await Currencies.getUSExchangeRates();
  console.log(response);
  console.log(convertTo);
  console.log(response.conversion_rates[convertTo]);
  let conversion = response.conversion_rates[convertTo] * amount;
  console.log(conversion);
  document.getElementById("showResponse").innerText = conversion;
  return conversion;
}


function handleFormSubmission(event) {
  event.preventDefault();
  //let convertFrom = document.querySelector("select#exchange-from").value;
  let convertTo = document.querySelector("select#exchange-to").value;
  console.log(convertTo);
  let exchangeAmount = document.querySelector("input#amount").value;
  callForAnyRate(convertTo, exchangeAmount);
}

window.addEventListener("load", function () {
  callForCurrencies();
  document.querySelector("form#form-conversion").addEventListener("submit", handleFormSubmission);
});