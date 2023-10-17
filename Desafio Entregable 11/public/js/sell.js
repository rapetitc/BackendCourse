const $SellForm = document.getElementById('SellForm')
$SellForm.addEventListener('submit', async (e) => {
  e.preventDefault()
  const res = await fetch('/api/products', {
    method: "POST",
    body: new FormData(e.target)
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
      for (const i of data.cause) {
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