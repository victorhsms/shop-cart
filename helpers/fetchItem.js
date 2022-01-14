const fetchItem = async (itemId) => {
  const url = `https://api.mercadolibre.com/items/${itemId}`;
  return fetch(url)
    .then((item) => item.json())
    .catch(new Error('You must provide an url'));
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
