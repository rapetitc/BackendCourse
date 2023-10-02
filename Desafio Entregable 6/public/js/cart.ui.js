const $counter = document.getElementById('counter')
const $cartList = document.getElementById('cartList')
const $totalPrice = document.getElementById('totalPrice')

const $CartListC = (storage) => {
  $counter.innerHTML = storage.length
  let $UI = '', totalPrice = 0
  storage.forEach(({ pid, quantity }) => {
    totalPrice += pid.price * quantity
    $UI += `
      <tr>
        <td>${pid.title}</td>
        <td class="text-end">$${pid.price}</td>
        <td class="text-end">${quantity} u.</td>
        <td class="text-end">$${pid.price * quantity}</td>
      </tr>
    `
  })
  $TotalPrice = `
  <tr>
    <td class="w-full text-end border-t-2" colspan="4">Total a pagar: <span class="ms-3">$${totalPrice}</span></td>
  </tr>
  `
  $cartList.innerHTML = $UI + $TotalPrice
}

const $CartPageC = async () => {
  const storage = await getCart()
  $CartListC(storage)
}

$CartPageC()