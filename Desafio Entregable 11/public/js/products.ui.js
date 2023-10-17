const $ProdListC = (products) => {
  const $ProdList = document.getElementById('ProdList')
  if (products.length > 0) {
    let doc = ''
    products.forEach(({ _id, title, price, thumbnails }) => {
      doc += `
      <a href="/products/${_id}" class="flex flex-wrap w-[230px] m-1 bg-white border rounded">
        <div class="flex justify-center items-center h-[240px] w-full bg-gray-100 border-b rounded overflow-hidden">
          <img src="${thumbnails[0]}" alt="${title}" class="max-h-full max-w-full"/>
        </div>
        <div class="w-full h-42 px-2">
          <div class="my-1 py-1">
            <h2 class="w-full m-1">${title}</h2>
            <p class="w-full m-1 text-xl text-center">$${price}</p>
          </div>
        </div>
      </a>
      `
    });
    $ProdList.innerHTML = doc
  } else {
    $ProdList.innerHTML = `
      <p class="text-center">Sin productos para mostrar</p>
    `
  }
}


const $ProdPageC = async () => {
  const { payload } = await getProducts(false)
  $ProdListC(payload)
}

$ProdPageC()