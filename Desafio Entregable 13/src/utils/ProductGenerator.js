import { faker } from '@faker-js/faker';

export default (q = 10) => {
  const products = []

  const generateUrls = (n) => {
    const urls = []
    for (let i = 0; i < n; i++) {
      urls.push(faker.image.url())
    }
    return urls
  }

  for (let i = 0; i < q; i++) {
    products.push({
      _id: faker.database.mongodbObjectId(),
      title: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      code: faker.string.alphanumeric({ length: 12 }),
      price: faker.commerce.price({ min: 10, max: 1500, symbol: "$" }),
      status: faker.datatype.boolean({ probability: 0.7 }),
      stock: faker.number.int({ min: 35, max: 350 }),
      category: faker.commerce.department(),
      thumbnails: generateUrls(faker.number.int({ min: 1, max: 3 }))
    })
  }
  return products
}