const saveCartItems = (itemToSave) => {
  // seu código aqui
  localStorage.setItem('cartItems', itemToSave);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
