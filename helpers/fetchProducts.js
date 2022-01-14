const fetchProducts = (itemSearch) => {
  // seu código aqui
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${itemSearch}`;
  return fetch(url)
    .then((item) => item.json())
    .catch(new Error('You must provide an url'));
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
