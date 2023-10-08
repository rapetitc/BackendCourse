class EvalProdInfo { //TODO Evaluar el tipo de dato, especialemente en Status
  newEntry = (prodInfo) => {
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
  updateEntry = (infoToUpdate) => {
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
  existance = (value, key) => {
    if (value == undefined) throw `Error al intentar agregar ${value} al producto, el valor de "${key}" no existe.`
  }
  sht5 = (value, key) => { // String Higher Than 5
    if (typeof value != "string" || value.length < 5) throw `Error al agregar ${value} al producto, el valor de "${key}" debe ser de tipo <<String>> y su tamaño igual a 5.`
  }
  nht0 = (value, key) => { // Number Higher Than 0
    if (typeof value != "number" || value <= 0) throw `Error al agregar ${value} al producto, el valor de "${key}" debe ser de tipo <<Number>> y mayor de 0.`
  }
  b = (value, key) => { // Boolean
    if (typeof value != "boolean") throw `Error al agregar ${value} al producto, el valor de "${key}" debe ser de tipo <<Boolean>>.`
  }
  sdt12 = (value, key) => { // String Lenght Different Than 12
    if (typeof value != "string" || value.length !== 12) throw `Error al agregar ${value} al producto, el valor de "${key}" debe ser de tipo <<String>> y su tamaño igual a 12.`
  }
  aht0 = (value, key) => { // Array Higher Than 0
    if (!Array.isArray(value) || value.length <= 0) throw `Error al agregar ${value} al producto, el valor de "${key}" debe ser de tipo <<Array>> y su tamaño mayor de 1.`
  }
}

export default EvalProdInfo