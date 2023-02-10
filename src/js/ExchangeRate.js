export default class Currencies {
  static getUSExchangeRates() {
    return fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/latest/USD`)
      .then(function (response) {
        if (!response.ok) {
          throw new Error(response.statusText);
        } else {
          return response.json();
        }
      })
      .catch(function (error) {
        return error;
      });
  }

  static getAnyExchangeRate(convertFrom) {
    return fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/latest/${convertFrom}`)
      .then(function (response) {
        if (response.ok === false) {
          throw Error(response.status);
        }
        return response.json();
      })
      .catch(function (Error) {
        document.getElementById("showError").innerText = Error;
      });
  }
}
