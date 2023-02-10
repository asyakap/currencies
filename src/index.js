import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import Currencies from './js/ExchangeRate.js';

// Business Logic

// UI Logic
function populateSelects(reference) {
  let currencies = Object.keys(reference.conversion_rates);
  let exchangeFrom = document.querySelector("select#exchange-from");
  let exchangeTo = document.querySelector("select#exchange-to");
  let currenciesArray = [];
  for (let i = 0; i < currencies.length; i++) {
    let opt = document.createElement('option');
    opt.value = currencies[i];
    opt.innerHTML = currencies[i];
    exchangeFrom.appendChild(opt);
    currenciesArray.push(currencies[i]);
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

async function callForAnyRate(convertFrom, convertTo, amount) {
  const response = await Currencies.getAnyExchangeRate(convertFrom);
  let currencies = Object.keys(response.conversion_rates);
  let conversion = response.conversion_rates[convertTo] * amount;
  if (currencies.includes(convertFrom) === false || currencies.includes(convertTo) === false) {
    document.getElementById("showError").innerText = "Please enter an existing currency!";
  } else {
    document.getElementById("showResponse").innerText = amount + " " + convertFrom + " equals to " + conversion + " " + convertTo;
  }
  return conversion;
}


function handleFormSubmission(event) {
  event.preventDefault();
  let convertFrom = document.querySelector("select#exchange-from").value;
  let convertTo = document.querySelector("select#exchange-to").value;
  //let convertTo = "AAA";
  let exchangeAmount = document.querySelector("input#amount").value;
  callForAnyRate(convertFrom, convertTo, exchangeAmount);
}

window.addEventListener("load", function () {
  callForCurrencies();
  document.querySelector("form#form-conversion").addEventListener("submit", handleFormSubmission);
});