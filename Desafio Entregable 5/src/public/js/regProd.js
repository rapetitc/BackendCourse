const regProdForm = document.getElementById("regProdForm");
regProdForm.addEventListener("submit", (e) => {
  e.preventDefault();

  fetch("/api/products/", {
    method: "POST",
    body: new FormData(e.target)
  }).then(() => {
    socket.emit("Client:GetProds")
    e.target.reset()
  })

});