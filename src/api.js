//const pathCep = 'https://mercado.carrefour.com.br/api/checkout/pub/regions?country=BRA&'
//const pathProducts = 'https://mercado.carrefour.com.br/api/catalog_system/pub/products/search?'

const pathCep = '/api/checkout/pub/regions?country=BRA&'
const pathProducts = '/api/catalog_system/pub/products/search?'

const headers = {
    method: 'GET',
    mode: 'cors',
    cache: 'default',
}

async function getSellers(cep) {
    const url = `${pathCep}postalCode=${cep}`
    const response = await fetch( url, headers )
    return await response.json();
}

async function getProducts(sellers) {
    const url = `${pathProducts}fq=${sellers}`
    const response = await fetch( url, {mode: 'cors'}, headers )
    return await response.json();
}

const exportedObject = {
    getSellers,
    getProducts
};

export default exportedObject
