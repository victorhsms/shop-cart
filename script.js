const cartItems = document.querySelector('.cart__items');

const sumPrices = () => {
  let price = 0;
  for (let i = 0; i < cartItems.children.length; i += 1) {
    const searchPrice = cartItems.children[i].innerText;
    const findPrice = searchPrice.search(/PRICE: \$/); // referência .search: https://ricardo-reis.medium.com/search-string-javascript-edd7557846d5 e referência ReGex: https://aiqon.com.br/blog/expressoes-regulares-para-iniciantes/
    const priceProduct = searchPrice.substring(findPrice + 8, searchPrice.length); // referência: https://www.devmedia.com.br/javascript-substring-selecionando-parte-de-uma-string/39232
    price += parseFloat(priceProduct);
  }
  const totalPrices = document.querySelector('.total-price').children[0];
  totalPrices.innerHTML = parseFloat(price);
  // .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }); // referência: https://www.alura.com.br/artigos/formatando-numeros-no-javascript
};

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

const saveItem = () => {
  saveCartItems(cartItems.innerHTML);
};

function cartItemClickListener(event) {
  cartItems.removeChild(event.path[0]);
  saveItem();
  sumPrices();
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
  cartItems.appendChild(itemCompleted);
  saveItem();
  sumPrices();
};

const onLoading = () => {
  const listItemHtml = document.querySelector('.items');
  const load = document.createElement('p');
  load.className = 'loading';
  load.innerText = 'carregando...';
  listItemHtml.appendChild(load);
};

const selectProducts = async () => {
  onLoading();
  const products = await fetchProducts('computador');
  const productResults = products.results;
  const listItemHtml = document.querySelector('.items');
  listItemHtml.removeChild(listItemHtml.children[0]);
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

const getStorage = () => {
  cartItems.innerHTML = getSavedCartItems();
  for (let i = 0; i < cartItems.children.length; i += 1) { // cartItems.children não é um array, daí não consegui usar .forEach.
    cartItems.children[i].addEventListener('click', cartItemClickListener);
  }
  sumPrices();
};

window.onload = () => { 
  selectProducts();
  sumPrices();

  if (localStorage.length > 0) getStorage();
 };
