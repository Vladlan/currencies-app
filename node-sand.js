const apiKey = 'fca_live_d3lRHY5YaBiBrfk4nnm3FMFsGK9AYpFisO5c9gU6'
const startDate = '2021-12-31'
const baseCurrency = 'USD'
const currencies = 'EUR,CAD'

const url = `https://api.freecurrencyapi.com/v1/historical?apikey=${apiKey}&date=${startDate}&base_currency=${baseCurrency}&currencies=${currencies}`

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    console.log('Historical exchange rates:')
    console.log(data)
  })
  .catch((error) => {
    console.error('Error:', error)
  })
