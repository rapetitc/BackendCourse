let products = []

const addItem = async (pid, quantity) => {
  const URL = `http://localhost:8080/api/carts/${cid}/products/${pid}`
  const res = await fetch(URL, {
    method: 'PUT',
    body: JSON.stringify({ quantity: quantity + 1 }),
    headers: {
      "Content-Type": "application/json",
    }
  })
  cstorage = await getCart()
  console.log("inside", cstorage);
  $ProdListC()
}
const removeItem = async (pid, quantity) => {
  const URL = `http://localhost:8080/api/carts/${cid}/products/${pid}`
  const res = await fetch(URL, {
    method: 'PUT',
    body: JSON.stringify({ quantity: quantity - 1 }),
    headers: {
      "Content-Type": "application/json",
    }
  })
  cstorage = await getCart()
  console.log("inside", cstorage);
  $ProdListC()
}

const $ProdListC = () => {
  // console.log("here");
  const $prodList = document.getElementById('prodList')
  if (products.length > 0) {
    let doc = ''
    // console.log(cstorage);
    products.forEach(({ _id, title, description, price, thumbnails }) => {
      const isInCart = cstorage.find((item) => item.pid._id == _id)
      const quantity = isInCart ? isInCart.quantity : 0
      const $buttons = `
        <button class="m-1 px-4 py-2 text-white bg-red-500 rounded" onclick="removeItem('${_id}', ${quantity})">-</button>
        <input type="text" class="w-16 h-10 text-center border-2 rounded outline-none" value="${quantity}" disabled />
        <button class="m-1 px-4 py-2 text-white bg-green-500 rounded" onclick="addItem('${_id}', ${quantity})">+</button>
      `
      const $addButton = `
          <button class="m-1 px-4 py-2 text-white bg-green-400 rounded" onclick="addItem('${_id}', ${quantity})">Añadir a la canasta</button>
      `
      doc += `
        <div class="flex flex-wrap w-[280px] m-1 bg-gray-100 border-2 rounded">
          <div class="flex justify-center items-center h-[280px] w-full bg-white rounded-sm overflow-hidden">
            <img src="${thumbnails[0]}" alt="${title}" class="max-h-full max-w-full"/>
          </div>
          <div class="w-full h-42 px-2">
            <div class="h-[128px]">
              <h2 class="w-full font-bold">${title}</h2>
              <p class="w-full line-clamp-3">${description}</p>
              <p class="w-full my-1">Precio: $${price}</p>
            </div>
            <div class="flex justify-center items-center w-full">
              ${isInCart ? $buttons : $addButton}
            </div>
          </div>
        </div>
      `
    });
    $prodList.innerHTML = doc
  } else {
    $prodList.innerHTML = `
      <p>Sin Productos</p>
    `
  }
}

const $PaginationC = ({ page, totalPages }) => {
  const $pagination = document.getElementById('pagination')
  $pagination.innerHTML = `
  <a href="http://localhost:8080/products?page=${page - 1}" class="${page > 1 ? '' : 'hidden'} h-min w-max m-1 px-2 py-1 bg-white border-2 border-blue-400 rounded">Anterior</a>
  <div class="flex my-1 bg-white border-2 rounded-sm">
    <input type="text" value="${page}" class="h-min w-9 py-1 text-center bg-transparent focus:bg-gray-100 rounded-sm outline-none" /><p class="h-min w-min py-1 text-center">/<span class="mx-2 px-2">${totalPages}</span></p>
  </div>
  <a href="http://localhost:8080/products?page=${page + 1}" class="${page >= totalPages ? 'hidden' : ''} h-min w-max m-1 px-2 py-1 bg-white border-2 border-blue-400 rounded">Siguiente</a>
  `
}

const $ProdPageC = async () => {
  const pageParams = new URLSearchParams(window.location.search).get('page')
  if (!pageParams) window.location.href = '/products?page=1'
  const { payload, page, totalPages } = await getProducts({ page: pageParams })
  products = payload
  $ProdListC()
  $PaginationC({ page, totalPages })
}

$ProdPageC()