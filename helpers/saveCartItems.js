const saveCartItems = (itemToSave) => {
  localStorage.setItem('cartItems', itemToSave);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
