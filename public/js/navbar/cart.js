'use strict'

const cartChangeAmount = async () => {}

const cart = document.querySelector('.cart')

const dropdown = document.createElement('div')

dropdown.classList.add('cartdropdown')

if (checkMedia.matches) {
    dropdown.style.display = 'none'
    cart.addEventListener('click', () => {
        if (dropdown.style.display == 'none') dropdown.style.display = 'block'
        else dropdown.style.display = 'none'
    })
}

dropdown.innerHTML = `
        <div class = 'title'>CHECK YOUR CART</div>
        <div class = 'productList'></div>
    `
cart.appendChild(dropdown)

const productList = document.querySelector('.productList')

const cartAddItem = async (
    id_user,
    id_product,
    size,
    sugar_level,
    ice_level,
    amount,
    price,
    storeID = 1
) => {
    try {
        const total =
            price + (size == 'M' ? 5000 : 0) + (size == 'L' ? 10000 : 0)
        const data = {
            id_user,
            id_product,
            size,
            sugar_level,
            ice_level,
            amount,
            storeID,
            price: total,
        }
        await fetch('/cart/add_product', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })

        await cartRender(id_user)

        return true
    } catch {
        return false
    }
}

async function addButtonClickHandle(id_product, id_form, price) {
    //console.log(id_form)
    const form = document.querySelector(id_form)
    const sugar = form.elements['sugar'].value
    const ice = form.elements['ice'].value
    const amount = form.elements['quantity'].value
    const size = form.elements['size'].value
    //console.log(id_product, id_form, sugar, ice, amount, price)
    await cartAddItem(
        window.localStorage.getItem('id'),
        id_product,
        size,
        sugar,
        ice,
        amount,
        price
    )
}

const adjustAmountHandler = async (id_cart, id_item, amount, id_user) => {
    let data = {id_cart, id_item, amount}
    if (amount == 0) {
        console.log(id_cart, id_item)
        await fetch('/cart/delete_product', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({id_cart, id_item}),
        })
        await cartRender(id_user)
        return false
    }
    await fetch('/cart/change_amount', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data),
    })

    await cartRender(id_user)
}

const cartRender = async (id_user) => {
    const data = {id_user}
    let items = await fetch('/cart/view', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data),
    }).then((data) => data.json())

    console.log(data)

    const productList = document.querySelector('.productList')
    productList.innerHTML = ''

    const id_cart = items._id

    items = items.products

    let total = 0
    let qty = 0

    items.forEach((item) => {
        const itemContainer = document.createElement('div')
        qty += item.amount
        //console.log(item)
        let price =
            Number(item.info.price) +
            (item.size == 'M' ? 5000 : 0) +
            (item.size == 'L' ? 10000 : 0)
        //console.log(item.info.price)
        total += price * item.amount
        itemContainer.innerHTML = `
            <div class = "cart-item row">
                <div class = "col-6 col-md-6">
                    <div> ${item.info.name.toUpperCase()} </div>
                    <div> 
                        <span class="badge rounded-pill bg-secondary ">${
                            'Size: ' + item.size
                        }</span>
                        <span class="badge rounded-pill bg-secondary ">${
                            'Sugar: ' + item.sugar_level + '%'
                        }</span>
                        <span class="badge rounded-pill bg-secondary ">${
                            'Ice: ' + item.ice_level + '%'
                        }</span>
                    </div>
                </div>
                <div class = "col-3 col-md-2" style = "color:black">
                    <i class="fas fa-minus change-amount" onClick="adjustAmountHandler('${id_cart}','${
            item._id
        }', '${item.amount - 1}','${id_user}')"></i>
                    <span> ${item.amount} </span>
                    <i class="fas fa-plus change-amount" onClick="adjustAmountHandler('${id_cart}','${
            item._id
        }', '${item.amount + 1}','${id_user}')"></i>
                </div>
                <div class = "col-2 col-md-3 secondary" style = "color:grey; font-weight:bold">${
                    price * item.amount
                } VND</div>
                <div class = "col-1" style = "color:black">
                <i class="fas fa-trash-alt" onClick="adjustAmountHandler('${id_cart}','${
            item._id
        }', '${0}','${id_user}')"></i>
                </div>
            </div>
        `
        productList.appendChild(itemContainer)
    })

    const mess = document.createElement('div')
    if (items.length > 0) {
        mess.innerHTML = `<div style = "color:black; font-weight:bold; text-align: right" >TOTAL: ${total} VND</div>
        <div style = "text-align: center"><button class="checkout-btn">CHECK OUT</button> </div>`
    } else mess.innerHTML = `YOUR CART IS EMPTY`

    productList.appendChild(mess)

    document.querySelector('.checkout-btn')?.addEventListener('click', () => {
        window.location = '/checkout'
    })

    document.querySelector('.product-count').textContent = qty

    console.log(items)
}

if (localStorage.getItem('login')) {
    cartRender(localStorage.getItem('id'))
} else {
    const mess = document.createElement('div')
    mess.textContent = `* PLEASE LOGIN TO VIEW YOUR CART AND ORDER!`
    productList.appendChild(mess)
    productList.appendChild(document.createElement('hr'))
}
