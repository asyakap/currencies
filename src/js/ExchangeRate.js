export default class Currencies {
  static getExchangeRates() {
    return fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/latest/USD`)
      .then(function(response) {
        if (!response.ok) {
          const errorMessage = `${response.status}`;
        throw new Error(errorMessage);
      } else {
        return response.json();
      }
  })
  .catch(function(error) {
    return error;
  });
}
}