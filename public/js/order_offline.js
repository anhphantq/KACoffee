function Filter_coffee() {
    var all = document.getElementsByClassName('product-item-li')

    for (var i = 0; i < all.length; i++) {
        all[i].style.display = 'none'
    }
    var coffee = document.getElementsByClassName('coffee')
    for (var i = 0; i < coffee.length; i++) {
        coffee[i].style.display = 'block'
    }
}
function Filter_tea() {
    var all = document.getElementsByClassName('product-item-li')
    var tea = document.getElementsByClassName('tea')
    for (var i = 0; i < all.length; i++) {
        all[i].style.display = 'none'
    }
    for (var i = 0; i < tea.length; i++) {
        tea[i].style.display = 'block'
    }
}
function Filter_iceblended() {
    var all = document.getElementsByClassName('product-item-li')
    var iceblended = document.getElementsByClassName('iceblended')
    for (var i = 0; i < all.length; i++) {
        all[i].style.display = 'none'
    }
    for (var i = 0; i < iceblended.length; i++) {
        iceblended[i].style.display = 'block'
    }
}
function Filter_shippingonly() {
    var all = document.getElementsByClassName('product-item-li')
    var shippingonly = document.getElementsByClassName('shippingonly')
    for (var i = 0; i < all.length; i++) {
        all[i].style.display = 'none'
    }
    for (var i = 0; i < shippingonly.length; i++) {
        shippingonly[i].style.display = 'block'
    }
}
function Filter_snack() {
    var all = document.getElementsByClassName('product-item-li')
    var snack = document.getElementsByClassName('snack')
    for (var i = 0; i < all.length; i++) {
        all[i].style.display = 'none'
    }
    for (var i = 0; i < snack.length; i++) {
        snack[i].style.display = 'block'
    }
}
function Filter_gift() {
    var all = document.getElementsByClassName('product-item-li')
    var gift = document.getElementsByClassName('gift')
    for (var i = 0; i < all.length; i++) {
        all[i].style.display = 'none'
    }
    for (var i = 0; i < gift.length; i++) {
        gift[i].style.display = 'block'
    }
}
var myJSON
async function get_info_product() {
    const data = await fetch('/product/view', {
        method: 'GET',
    })
        .then((data) => data.json())
        .then((data) => {
            myJSON = data
        })
    Add_info(myJSON)
}

function Add_info(product_info) {
    var a = document.getElementById('Sample')
    for (var i = 0; i < product_info.length - 1; i++) {
        var clone = document.querySelector('#Sample').cloneNode(true)
        a.insertAdjacentElement('afterend', clone)
    }
    var product_item = document.getElementsByClassName('product-item-li')
    var product_img = document.getElementsByClassName('product-img')
    var product_name = document.getElementsByClassName('product-name')
    var product_cost = document.getElementsByClassName('product-cost')

    for (var i = 0; i < product_info.length; i++) {
        var type = product_info[i].type
        product_item[i].classList.add(type)
        var src = product_info[i].image
        product_img[i].src = src
        product_name[i].innerHTML = product_info[i].name
        var price = product_info[i].price
        price = String(price) + ' VNĐ'
        product_cost[i].innerHTML = price
    }
    Add_add()
}

function Add_add() {
    var add_product = document.getElementsByClassName('add')
    for (var i = 0; i < add_product.length; i++) {
        let j = i
        add_product[i].onclick = function () {
            get_info(j)
        }
    }
}
class a_product {
    constructor(id, size, sugar, ice, num) {
        this.id = id
        this.size = size
        this.sugar = sugar
        this.ice = ice
        this.num = num
    }
}
let order = []

function Add_new_order() {
    let new_order_object = []
    order.push(new_order_object)
    var container_order = document.getElementById('container-order')
    var clone = document.querySelector('#accordionFlushExample').cloneNode(true)
    clone.style.display = 'block'
    container_order.appendChild(clone)

    let new_order = document.getElementsByClassName('new-order')
    let l = new_order.length
    var name_customer = document.getElementsByClassName('name-order')
    var tel_email = document.getElementsByClassName('tel-email')
    name_customer[l - 1].innerHTML =
        document.getElementById('customer-name').value
    tel_email[l - 1].innerHTML = document.getElementById('tel-email').value
    document.getElementById('customer-name').value = ''
    document.getElementById('tel-email').value = ''
    Reset_order()
    delete_order()
    complete_order()
}

function Reset_order() {
    var list_order = document.getElementById('select-order')
    $('#select-order').empty()
    let new_order = document.getElementsByClassName('new-order')
    var name_customer = document.getElementsByClassName('name-order')
    for (let i = 1; i < new_order.length; i++) {
        var text = i + '. ' + name_customer[i].innerHTML
        if (i > 0) {
            let option = new Option(text, i)
            list_order.append(option)
        }
    }
    display_current()
    delete_order()
    complete_order()
}

function display_current() {
    var list_order = document.getElementById('select-order')
    if (list_order.options.length > 0) {
        let j = list_order.options[list_order.selectedIndex].value
        if (j > 0) {
            let new_order = document.getElementsByClassName('new-order')
            for (let i = 0; i < new_order.length; i++) {
                new_order[i].style.display = 'none'
            }
            new_order[j].style.display = 'block'
        }
    }
}

function get_info(j) {
    var size = document.getElementsByClassName('size-selected')
    var sugar = document.getElementsByClassName('sugar-selected')
    var ice = document.getElementsByClassName('ice-selected')
    var number = document.getElementsByClassName('number-product')

    var list_order = document.getElementById('select-order')
    let k = list_order.options[list_order.selectedIndex].value
    var clone = document.querySelector('#sample-a-product').cloneNode(true)
    var list_products = document.getElementsByClassName('list-products')

    var prd_name = document.createElement('p')
    prd_name.innerHTML = myJSON[j].name
    prd_name.style.minWidth = '400px'
    var prd_size = document.createElement('div')
    prd_size.innerHTML = 'Size : ' + size[j].value
    var prd_sugar = document.createElement('div')
    prd_sugar.innerHTML = 'Đường : ' + sugar[j].value
    var prd_ice = document.createElement('div')
    prd_ice.innerHTML = 'Đá : ' + ice[j].value
    var prd_num = document.createElement('div')
    prd_num.innerHTML = 'Số lượng : ' + number[j].value
    var prd_cost = document.createElement('div')
    let cost = Number(myJSON[j].price)
    if (size[j].value === 'M') cost = cost + 5000
    if (size[j].value === 'L') cost = cost + 10000
    cost = cost * number[j].value
    cost = String(cost)
    prd_cost.innerHTML =
        'Giá : ' +
        String(cost).toLocaleString('en-US', {
            style: 'currency',
            currency: 'VND',
        }) +
        ' VNĐ'

    var tmp = document.createElement('div')
    tmp.innerHTML = '<button class = "delete">Xóa</button>'

    tmp.onclick = function () {
        var parent = tmp.parentNode
        var grandparent = parent.parentNode
        grandparent.removeChild(parent)
    }

    let total_bill = document.getElementsByClassName('total-bill')
    total_bill[k].innerHTML = Number(total_bill[k].innerHTML) + Number(cost)

    list_products[k].appendChild(clone)
    clone.style.display = "block"
    clone.appendChild(prd_name)
    clone.appendChild(prd_size)
    clone.appendChild(prd_sugar)
    clone.appendChild(prd_ice)
    clone.appendChild(prd_num)
    clone.appendChild(prd_cost)
    clone.style.display = 'flex'
    clone.style.justifyContent = 'space-between'
    clone.style.flexWrap = 'wrap'

    var a_new_product = new a_product(
        myJSON[j]._id,
        size[j].value,
        sugar[j].value,
        ice[j].value,
        number[j].value
    )
    order[k - 1].push(a_new_product)
}

function delete_order() {
    var cancel_order = document.getElementsByClassName('cancel-order')
    for (let i = 0; i < cancel_order.length; i++) {
        cancel_order[i].onclick = function () {
            let parent = cancel_order[i].parentNode
            let grand = parent.parentNode
            let great = grand.parentNode
            let great_great = great.parentNode
            alert('Đã hủy đơn hàng')
            order.splice(i - 1, 1)
            great_great.removeChild(great)
            Reset_order()
        }
    }
}

function complete_order() {
    var complete_order = document.getElementsByClassName('complete-order')
    for (let i = 1; i < complete_order.length; i++) {
        complete_order[i].onclick = function () {
            let parent = complete_order[i].parentNode
            let grand = parent.parentNode
            let great = grand.parentNode
            let great_great = great.parentNode

            let name_customer = document.getElementsByClassName('name-order')
            let tel_email = document.getElementsByClassName('tel-email')
            console.log(order[i-1])
            post_to_database(name_customer[i], tel_email[i].value, order[i-1])
            alert('Đã hoàn tất đơn hàng')
            order.splice(i - 1, 1)
            great_great.removeChild(great)
            Reset_order()
        }
    }
}

function post_to_database(name_customer, tel_email, order_i) {
    // name_customer : Tên khách hàng
    // tel_email : email hoặc số điện thoại
    // order_i : list gồm các object là các sản phẩm gồm các thuộc tính (id, size, sugar, ice, number)
}
