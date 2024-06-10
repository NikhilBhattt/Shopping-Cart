const shop = document.querySelector('.shop')


var Basket = JSON.parse(localStorage.getItem('data')) || []


const appendShopItems = () => {
        
    shop.innerHTML = shopItemsData.map(item => {
        let search = Basket.find(x => x.id == item.id) || []
        return `
        <div id="product-id-${item.id}" class="shop-item rounded-2">
            <img src="${item.img}">
            <div class="details p-2">
                <h3 class="h5 mt-2">${item.name}</h3>
                <p>${item.desc}</p>
                <div class="price-quantity d-flex justify-content-between">
                    <h3>$ ${item.price}</h3>
                    <div class="buttons gap-2 d-flex ">
                        <i onclick="decrement(${item.id})" class="bi bi-dash-lg text-success fs-5"></i>
                        <div id="${item.id}" class="quantity">${ search.item || 0 }</div>
                        <i onclick="increment(${item.id})" class="bi bi-plus-lg text-danger fs-5"></i>
                    </div>
                </div>
            </div>
        </div>
        `
    }).join('')
}

appendShopItems()


const increment = id => {   
    const selectedItem = id

    let search = Basket.find(x => x.id == selectedItem.id)

    if (!search) {
        Basket.push({
            id: selectedItem.id,
            item: 1
        })
        updateQuantity(1, id)
    }else {
        search.item++
        updateQuantity(search.item, id)
    }

    localStorage.setItem('data', JSON.stringify(Basket))
}


const decrement = id => {
    const selectedItem = id
    
    let search = Basket.find(x => x.id == selectedItem.id)

    if (search) {
        if (--(search.item)==0)
            Basket = Basket.filter(item => item.id != selectedItem.id)
        updateQuantity(search.item, id)
    }
    localStorage.setItem('data', JSON.stringify(Basket))
}


const updateQuantity = (itemQuantity, id) => {
    id.innerHTML = itemQuantity
    UpdateCartQuantity()
}


const UpdateCartQuantity = () => {
    let count = 0

    for(let items of Basket) count += items.item

    document.querySelector('.cartAmount').innerText = count
}

UpdateCartQuantity()