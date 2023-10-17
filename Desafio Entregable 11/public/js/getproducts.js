const getProducts = async ({ limit = 9, page = 1, sort = 'asc' }) => {
  const URL = `/api/products?limit=${limit}&page=${page}`
  const res = await fetch('/api/products')
  const data = await res.json()
  return data
}