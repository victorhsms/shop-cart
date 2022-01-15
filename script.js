function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
  const cartItems = document.querySelector('.cart__items');
  cartItems.removeChild(event.path[0]);
}

function createCartItemElement({ sku = id, name = title, salePrice = price }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const eventButton = async (event) => {
  const itemSelected = event.path[1].querySelector('.item__sku').innerText;
  const itemSearch = await fetchItem(itemSelected);
  const itemTreatment = {
    sku: itemSearch.id,
    name: itemSearch.title,
    salePrice: itemSearch.price,
  };
  const itemCompleted = createCartItemElement(itemTreatment);
  const cartItems = document.querySelector('.cart__items');
  cartItems.appendChild(itemCompleted);
};

const selectProducts = async () => {
  const products = await fetchProducts('computador');
  const productResults = products.results;
  const listItemHtml = document.querySelector('.items');
  productResults.forEach((item) => {
    const itemSend = {
      sku: item.id,
      name: item.title,
      image: item.thumbnail,
    };
    const section = createProductItemElement(itemSend);
    const buttonEvent = section.querySelector('.item__add');
    buttonEvent.addEventListener('click', eventButton);
    listItemHtml.appendChild(section);
  });
};

window.onload = () => { 
  selectProducts();
 };
