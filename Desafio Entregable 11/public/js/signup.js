const $SigUpForm = document.getElementById('SigUpForm')
$SigUpForm.addEventListener('submit', async (e) => {
  e.preventDefault()
  const { first_name, last_name, age, email, password } = e.target
  let formData = {
    first_name: first_name.value,
    last_name: last_name.value,
    age: parseInt(age.value),
    email: email.value,
    password: password.value
  }

  const res = await fetch('/api/users', {
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      "Content-Type": "application/json"
    }
  })
  
  if (res.status == 201) {
    Swal.fire({
      title: 'Usuario creado satisfactoriamente!',
      icon: 'success',
      timer: 2000,
      timerProgressBar: true,
      showConfirmButton: false
    })
    setTimeout(() => {
      window.location.href = '/login'
    }, 2000)
  } else {
    rej = await res.json()
    let msg = ''
    if (rej.cause) {
      for (const i of rej.cause) {
        const key = Object.keys(i)[0]
        msg += `${key}: ${i[key]} \n `
      }
    }
    Swal.fire({
      title: 'Error al intentar crear usuario',
      text: msg ? msg : '',
      icon: 'warning',
      showConfirmButton: true
    })
  }
})
