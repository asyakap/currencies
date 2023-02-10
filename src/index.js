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
    opt.value = i;
    opt.innerHTML = currencies[i];
    exchangeFrom.appendChild(opt);
    opt = document.createElement('option');
    opt.value = i;
    opt.innerHTML = currencies[i];
    exchangeTo.appendChild(opt);
    
  }
}

async function callForCurrencies() {
  const response = await Currencies.getUSExchangeRates();
  console.log(response);
  populateSelects(response);
}

async function callForAnyRate(convertFrom, convertTo, amount) {
  const response = await Currencies.getAnyExchangeRate(convertFrom);
  let conversion = response.conversion_rates[convertTo] * amount;
  return conversion;
}


function handleFormSubmission(event) {
  event.preventDefault();
  let convertFrom = document.getElementById("#exchange-from").val();
  let convertTo = document.getElementById("#exchange-to").val();
  let exchangeAmount = document.getElementById("#amount").val();
  document.getElementById("showResponse").innerText = callForAnyRate(convertFrom, convertTo, exchangeAmount);
}

window.addEventListener("load", function () {
  callForCurrencies();
  document.querySelector("form#form-conversion").addEventListener("submit", handleFormSubmission);
});