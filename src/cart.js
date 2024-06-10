const cartItems = document.querySelector('.cart-items')
const totalBill = document.querySelector('.total-bill')
const cartButtons = document.querySelector('.cart-buttons')

let Basket = JSON.parse(localStorage.getItem('data')) || []

const updateCartQuantity = () => {
    let count = 0

    for(let items of Basket) count += items.item

    document.querySelector('.cartAmount').innerText = count
}


const clearCart = () => {
    Basket.length = 0 // EMPTYING THE ARRAY
    localStorage.setItem('data', JSON.stringify(Basket))
    updateCartQuantity()
    generateCartItems()
}

const removeItem = (id) => {
    let selectedId = id.id
    Basket = Basket.filter(item => item.id !== selectedId )
    localStorage.setItem('data', JSON.stringify(Basket))
    updateCartQuantity()
    generateCartItems()
}

const increment = id => {
    let selectedId = id.id
    for (let item of Basket) {
        if (item.id === selectedId)
            item.item++;
    }
    updateCartQuantity()
    generateCartItems()
}

const decrement = id => {
    let selectedId = id.id
    
    let decrementItem = Basket.find(item => item.id === selectedId)
    if (!--decrementItem.item) {
        removeItem(decrementItem)
    }
    updateCartQuantity()
    generateCartItems()
}

const generateCartItems = () => {

    if (!Basket.length){
        totalBill.innerText = 'Cart is Empty'
        cartButtons.innerHTML = `<a href="index.html" class="btn btn-dark mt-2 px-2 py-1">Go back Home</a>`
    }
    else{
        totalBill.innerHTML = `Total Amount is $<strong>${updateTotalPrice()}</strong>`
        cartButtons.innerHTML = `<button class="btn btn-success px-2 py-1">Checkout</button>
                                <button onclick="clearCart()" class="btn btn-danger px-2 py-1">Clear Cart</button>`
    }
    cartItems.innerHTML = Basket.map(item => {
        const {id, img, name, price, } = shopItemsData.find(i=>{
            return i.id === item.id
        })
        return `<div class="d-flex h-75 gap-2 item my-2 border border-dark rounded-3">
                <img class="rounded-start" src="${img}" width="100">
                <div class="item-info p-2">
                <div class="h-25 d-flex justify-content-between gap-4">
                    <div class="d-flex gap-2">
                        <p class="fs-5 fw-bold">${name}</p>
                        <h5 class="fs-5 h-100 bg-dark text-white rounded-1 fw-semibold px-1">
                        $ ${price}</h5>
                    </div>
                    <i onclick="removeItem(${id})" class="bi bi-x-lg text-danger"></i>
                    </div>
                    <div class="options d-flex gap-2 mt-2">
                        <i onclick="decrement(${id})" class="bi bi-dash-lg text-success fs-5"></i>
                        <div id="${id}" class="quantity fs-5">${item.item}</div>
                        <i onclick="increment(${id})" class="bi bi-plus-lg text-danger fs-5"></i>
                    </div>
                    <div class="mt-2">
                        <h5 class="item-total-price fs-5 fw-bold">$ ${shopItemsData.find(i=>{
                            return i.id === item.id
                        }).price * item.item}</h5>
                    </div>
                </div>
            </div>`
    }).join('')
}


const updateTotalPrice = () => {
    var totalPrice = 0
    for (let item of Basket) {
        totalPrice += shopItemsData.find(i => i.id === item.id).price * item.item
    }
    return totalPrice
}


generateCartItems()
updateCartQuantity()
