const existance = (value, key) => {
  if (value == undefined) throw `Error al intentar agregar ${value} al producto, el valor de "${key}" no existe.`
}
const sht5 = (value, key) => { // String Higher Than 5
  if (typeof value != "string" || value.length < 5) throw `Error al agregar ${value} al producto, el valor de "${key}" debe ser de tipo <<String>> y su tamaño igual a 5.`
}
const nht0 = (value, key) => { // Number Higher Than 0
  if (typeof value != "number" || value <= 0) throw `Error al agregar ${value} al producto, el valor de "${key}" debe ser de tipo <<Number>> y mayor de 0.`
}
const b = (value, key) => { // Boolean
  if (typeof value != "boolean") throw `Error al agregar ${value} al producto, el valor de "${key}" debe ser de tipo <<Boolean>>.`
}
const sdt12 = (value, key) => { // String Lenght Different Than 12
  if (typeof value != "string" || value.length !== 12) throw `Error al agregar ${value} al producto, el valor de "${key}" debe ser de tipo <<String>> y su tamaño igual a 12.`
}
const aht0 = (value, key) => { // Array Higher Than 0
  if (!Array.isArray(value) || value.length <= 0) throw `Error al agregar ${value} al producto, el valor de "${key}" debe ser de tipo <<Array>> y su tamaño mayor de 1.`
}

export const evalUserInfo = (userinfo) => {
  const keys = Object.keys(userinfo)
  let rejected = []
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (key == 'first_name' || key == 'last_name') {
      if (userinfo[key].length < 3) rejected.push(JSON.parse(`{"${key == 'first_name' ? 'Nombre' : "Apellido"}":"Debe contener 3 caracteres o mas."}`))
    }
    if (key == 'age') {
      if (typeof userinfo[key] != 'number') rejected.push(JSON.parse(`{"Edad":"No es de tipo numero"}`))
      if (userinfo[key] < 16) rejected.push(JSON.parse(`{"Edad":"Debe contener 16 caracteres o mas."}`))
    }
    if (key == 'email') {
      if (!new RegExp('[\\w-]+@[\\w-]+\\.[\\w]{2,}', 'ug').test(userinfo[key])) rejected.push(JSON.parse(`{"Email":"No cumple con el formato."}`))
    }
    if (key == 'password') {
      if (userinfo[key].length < 8) rejected.push(JSON.parse(`{"Contraseña":"Debe contener 8 caracteres o mas."}`))
    }
  }
  if (rejected.length > 0) throw new Error('User Info Format is invalid.', { cause: rejected })
  return userinfo
}

export const newEntry = (prodInfo) => {
  for (const key in prodInfo) {
    this.existance(prodInfo[key], key)
    if (key == "title" || key == "description") this.sht5(prodInfo[key], key)
    if (key == "code") this.sdt12(prodInfo[key], key)
    if (key == "price" || key == "stock") this.nht0(prodInfo[key], key)
    if (key == "status") this.b(prodInfo[key], key)
    if (key == "thumbnails") this.aht0(prodInfo[key], key)
  }
  return prodInfo
}

export const updateEntry = (infoToUpdate) => {
  let newInfo = {}
  for (const key in infoToUpdate) {
    if (infoToUpdate[key] != undefined) {
      if (key == "title" || key == "description") this.sht5(infoToUpdate[key], key)
      if (key == "code") this.sdt12(infoToUpdate[key], key)
      if (key == "price" || key == "stock") this.nht0(infoToUpdate[key], key)
      if (key == "status") this.b(infoToUpdate[key], key)
      if (key == "thumbnails") this.aht0(infoToUpdate[key], key)
      console.log(key, infoToUpdate[key]);
      const formattedInfo = JSON.parse(`{"${key}":${typeof infoToUpdate[key] == 'string' ? `"${infoToUpdate[key]}"` : infoToUpdate[key]}}`)
      console.log(formattedInfo);
      Object.assign(newInfo, formattedInfo)
    }
  }
  return newInfo
}