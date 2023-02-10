export default class Currencies {
  static getUSExchangeRates() {
    return fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/latest/USD`)
      .then(function(response) {
        if (!response.ok) {
        throw new Error(response.statusText);
      } else {
        return response.json();
      }
  })
  .catch(function(error) {
    return error;
  });
}

static async getAnyExchangeRate(convertFrom){
  try{
    const response = await fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/latest/${convertFrom}`);
    if(response.status === 404){
      throw Error("Please enter an existing currency!");
    }
    if(!response.ok){
      throw Error(response.status);
    }
    return await response.json();
  } catch(error) {
    $('#error').innerHTML = error;
    $('#output-area').show();
    $('#error').show();
  }
}
}
