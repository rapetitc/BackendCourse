const $prodList = document.getElementById('prodList')
const $buildProdList = (productList) => {
  productList.forEach(({ _id, title, description, price, thumbnails }) => {

    prodList.innerHTML += `
    <div class="flex m-1 p-1 bg-white rounded">
      <div class="h-20 w-20 bg-red-500 rounded overflow-hidden">
        <img src="${thumbnails[0]}" alt="${title}" />
      </div>
      <div class="w-[calc(100%-80px-112px-8px)] m-1">
        <h2 class="w-full font-bold">${title}</h2>
        <p class="w-full">${description}</p>
        <p class="w-full">$${price}</p>
      </div>
      <div class="flex items-center">
      <button class="h-9 w-12 mx-1 text-white bg-red-500 rounded" onclick="removeItem('${_id}')">-</button>
      <button class="h-9 w-12 mx-1 text-white bg-green-500 rounded"  onclick="addItem('${_id}')">+</button>
      </div>
      </div>
      `
  });
}
const getProducts = async () => {
  const data = await fetch('/api/products')
  const productList = await data.json()
  $buildProdList(productList)
}

let cid = localStorage.getItem('cid')
const $counter = document.getElementById('counter')
const $cartList = document.getElementById('cartList')
const $buildCartList = (storage) => {
  $counter.innerHTML = storage.length
  let ui = ''
  storage.forEach(({pid, quantity}) => { 
    ui += `<tr>
    <td>${pid}</td>
    <td class="text-end">$600</td>
    <td class="text-end">${quantity} u.</td>
    <td class="text-end">$1200</td>
  </tr>`
  })
  $cartList.innerHTML = ui
}
const createCart = async () => {
  const data = await fetch('/api/carts', {
    method: 'POST'
  })
  cid = await data.json()
  localStorage.setItem('cid', cid)
}
const getCart = async (cid) => {
  const data = await fetch(`/api/carts/${cid}`)
  const { storage } = await data.json()
  console.log(storage);
  $buildCartList(storage)
}
const addItem = async (pid) => {
  await fetch(`/api/carts/${cid}/product/${pid}`, {
    method: 'PUT',
    body: JSON.stringify({ quantity: 1 }),
    headers: {
      "Content-Type": "application/json",
    }
  })
  await getCart(cid)
}
const removeItem = async (pid) => {
  await fetch(`/api/carts/${cid}/product/${pid}`, {
    method: 'PUT',
    body: JSON.stringify({ quantity: 0 }),
    headers: {
      "Content-Type": "application/json",
    }
  })
  await getCart(cid)
}


const initApp = async () => {
  await getProducts()
  if (cid == null) {
    await createCart()
  }
  await getCart(localStorage.getItem('cid'))
}

initApp()