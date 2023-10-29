const $LogInForm = document.getElementById('LogInForm')
$LogInForm.addEventListener('submit', async (e) => {
  e.preventDefault()
  const { email, password } = e.target
  let formData = {
    username: email.value,
    password: password.value
  }

  const res = await fetch('/api/sessions/login', {
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      "Content-Type": "application/json"
    }
  })

  if (res.status == 200) {
    Swal.fire({
      title: 'Sesion iniciada satisfactoriamente!',
      icon: 'success',
      timer: 2000,
      timerProgressBar: true,
      showConfirmButton: false
    })
    setTimeout(() => {
      window.location.href = '/'
    }, 2000)
  } else {
    const data = await res.text()
    console.log(data);
    let msg = ''
    if (data.cause) {
      for (const i of rej.cause) {
        const key = Object.keys(i)[0]
        msg += `${key}: ${i[key]} \n `
      }
    }
    Swal.fire({
      title: 'Error al intentar iniciar sesion',
      text: msg ? msg : '',
      icon: 'warning',
      showConfirmButton: true
    })
  }
})