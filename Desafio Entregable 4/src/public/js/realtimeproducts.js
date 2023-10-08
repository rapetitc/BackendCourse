socket.on("Server:UpdatedProdList", (products) => {
  const prodList = document.getElementById("prodList");
  let html = ""
  products.forEach(({ id, title, description, price, stock, thumbnails }) => {
    let imgs = ""
    thumbnails.forEach((url) => {
      imgs += `<img src="/imgs/${url}" alt="${title}" class="w-full w-max h-full h-max" />`
    })
    html += `
      <div class="flex h-36 m-2 bg-gray-300">
        <div class="flex items-center w-[200px] m-1">
          ${imgs}
        </div>
        <div class="w-full m-1">
          <p class="text-lg">${title}</p>
          <p>${description}</p>
          <p>Precio: $${price}</p>
          <p>Disponibilidad: ${stock} unidades</p>
        </div>
        <div class="">
          <button class="m-1 p-1" onclick="deleteProd(${id})">
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="h-5" viewBox="0 0 16 16">
            <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
          </svg>
          </button>
        </div>
      </div>
    `;
  });
  prodList.innerHTML = html
});

socket.emit("Client:GetProds")

const deleteProd = (pid) => {
  socket.emit("Client:DeleteProd", pid)
}