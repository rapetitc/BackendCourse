const $SellForm = document.getElementById('SellForm')
$SellForm.addEventListener('submit', async (e) => {
  e.preventDefault()
  const { title, description, code, price, stock, category } = e.target
  let formData = {
    title: title.value,
    description: description.value,
    code: code.value,
    price: parseInt(price.value),
    stock: parseInt(stock.value),
    category: category.value
  }

  const res = await fetch('/api/products', {
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      "Content-Type": "application/json"
    }
  })
  const data = await res.json()
  if (res.status == 201) {
    Swal.fire({
      title: 'Productos agregado satisfactoriamente!',
      icon: 'success',
      timer: 2000,
      timerProgressBar: true,
      showConfirmButton: false
    })
    setTimeout(() => {
      window.location.href = `/products/${data.payload}`
    }, 2000)
  } else {
    let msg = ''
    if (data.cause) {
      for (const i of rej.cause) {
        const key = Object.keys(i)[0]
        msg += `${key}: ${i[key]} \n `
      }
    }
    Swal.fire({
      title: 'Error al intentar agregado producto',
      text: msg ? msg : '',
      icon: 'warning',
      showConfirmButton: true
    })
  }
})