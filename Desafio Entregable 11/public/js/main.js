let user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {}
let cid = localStorage.getItem('cid') ? localStorage.getItem('cid') : ''
let cstorage = localStorage.getItem('cstorage') ? JSON.parse(localStorage.getItem('cstorage')) : []

// Carts Fuctions
const newCart = async () => {
  const res = await fetch('/api/carts', {
    method: 'POST'
  })
  return await res.json()
}
const getCart = async () => {
  const res = await fetch(`/api/carts/${cid}`)
  if (res.status == 404) return null
  const { storage } = await res.json()
  return storage
}

// const init = async () => {
//   cstorage = await getCart()
//   if (cid == null || cstorage == null) {
//     cid = await newCart()
//     localStorage.setItem('cid', cid)
//     cstorage = await getCart()
//   }
//   localStorage.setItem('cstorage', JSON.stringify(cstorage))
// }

// init()