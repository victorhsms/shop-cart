require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

 // Referencia do .toBeCalled e .toBeCalledWith foi retirada do README do projeto,
 // no topico 'Pontos importantes para a implementação dos testes' que tem o link: https://jestjs.io/pt-BR/docs/expect#tohavebeencalled.
describe('1 - Teste a função fecthProducts', () => {
  it('Teste se fetchProducts é uma função', () => {
    expect(typeof fetchProducts).toBe('function');
  });
  it('Execute a função fetchProducts com o argumento "computador" e teste se fetch foi chamada', () => {
    fetchProducts('computador');
    expect(fetch).toBeCalled();
  });
  it('Teste se, ao chamar a função fetchProducts com o argumento "computador", a função fetch utiliza o endpoint esperado', () => {
    fetchProducts('computador');
    expect(fetch).toBeCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador');
  });
  it('Teste se o retorno da função fetchProducts com o argumento "computador" é uma estrutura de dados igual ao objeto computadorSearch.', async () => {
    expect(await fetchProducts('computador')).toEqual(computadorSearch);
  });
  it('Teste se, ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem: You must provide an url.', async () => {
    // Referencia do rejects: https://jestjs.io/pt-BR/docs/asynchronous#asyncawait
    await expect(fetchProducts()).rejects.toEqual(new Error('You must provide an url'));
  })
});
