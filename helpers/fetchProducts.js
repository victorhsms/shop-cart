const fetch = require('node-fetch');

const fetchProducts = (itemSearch) => {
  // seu código aqui
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${itemSearch}`;
  return fetch(url)
    .then((item) => item.json())
    .then((item) => item.results);
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
