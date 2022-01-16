//Get element from html
var i = 0
var u = 0
// Filter
function Add_active(string) {
    var delete_active = document.getElementsByClassName('active')
    delete_active[0].classList.remove('active')
    var active = document.getElementById(string)
    active.classList.add('active')
}

function All() {
    var all = document.getElementsByClassName('accordion-item')
    for (var i = 0; i < all.length; i++) {
        all[i].style.display = 'block'
    }
    Add_active('all_filter')
}

function Filter_1() {
    var all = document.getElementsByClassName('accordion-item')
    var to_pay = document.getElementsByClassName('Verifying')
    for (var i = 0; i < all.length; i++) {
        all[i].style.display = 'none'
    }
    for (var i = 0; i < to_pay.length; i++) {
        to_pay[i].style.display = 'block'
    }
    Add_active('verifying_filter')
}

function Filter_2() {
    var all = document.getElementsByClassName('accordion-item')
    var to_receive = document.getElementsByClassName('Processing')
    for (var i = 0; i < all.length; i++) {
        all[i].style.display = 'none'
    }
    for (var i = 0; i < to_receive.length; i++) {
        to_receive[i].style.display = 'block'
    }
    Add_active('processing_filter')
}

function Filter_3() {
    var all = document.getElementsByClassName('accordion-item')
    var completed = document.getElementsByClassName('Shipping')
    for (var i = 0; i < all.length; i++) {
        all[i].style.display = 'none'
    }
    for (var i = 0; i < completed.length; i++) {
        completed[i].style.display = 'block'
    }
    Add_active('shipping_filter')
}
function Filter_4() {
    var all = document.getElementsByClassName('accordion-item')
    var completed = document.getElementsByClassName('Completed')
    for (var i = 0; i < all.length; i++) {
        all[i].style.display = 'none'
    }
    for (var i = 0; i < completed.length; i++) {
        completed[i].style.display = 'block'
    }
    Add_active('completed_filter')
}

function search_name() {
    var name_search = document.getElementById('search-name').value
    var name = document.querySelectorAll('.order-name')
    for (var i = 1; i < name.length; i++) {
        name[i].parentElement.parentElement.parentElement.style.display =
            'block'
    }
    console.log(name[1].innerHTML)

    for (var i = 1; i < name.length; i++) {
        console.log(name[i].innerHTML)
        if (!name[i].innerHTML.includes(name_search)) {
            name[i].parentElement.parentElement.parentElement.style.display =
                'none'
        }
    }
}

function reset() {
    var name = document.querySelectorAll('.order-name')
    for (var i = 1; i < name.length; i++) {
        name[i].parentElement.parentElement.parentElement.style.display =
            'block'
    }
}

function timeCompare(datetime1, datetime2) {
    date1 = datetime1.substring(0, 10)
    date2 = datetime2.substring(0, 10)
    time1 = datetime1.substring(11, 19)
    time2 = datetime2.substring(11, 19)
    if (date1 != date2) {
        date1 = date1.split('-').reverse().join('')
        date2 = date2.split('-').reverse().join('')
        return date1 > date2 ? -1 : 1
    } else {
        time1 = time1.split(':').reverse().join('')
        time2 = time2.split(':').reverse().join('')
        return time1 > time2 ? -1 : 1
    }
}

//Cac ham request

async function changestatus(id, status) {
    if (status == 'Verifying') a = 'Processing'
    else if (status == 'Processing') a = 'Shipping'
    else a = 'Completed'
    await fetch('/store/status_order', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id_order: id,
            status_order: a,
        }),
    })
        .then((res) => res.json())
        .then((data) => {
            location.reload()
        })
}

async function getorder(e) {
    var data = await fetch('/store/view_order', {
        method: 'GET',
    }).then((data) => data.json())
    i = 0
    data.sort(function (a, b) {
        return timeCompare(a.createAt, b.createAt)
    })
    data = data.filter((x) => x.type === 1)
    console.log(data)
    const orderlists = document.querySelector('.order-list-section')
    orderlists.innerHTML = ''
    const bars = document.createElement('div')
    bars.innerHTML = `   <div class="fixed-container">
                <div class="order-list-header text-center">
                    <span class="order-time fw-bold">Thời gian</span>
                    <span class="order-name fw-bold">Người mua</span>
                    <span class="order-status fw-bold">Trạng thái</span>
                    <span class="order-phone fw-bold">Số điện thoại</span>
                    <span class="order-address fw-bold">Địa chỉ</span>
                    <span class="order-price fw-bold">Giá tiền</span>
                </div>
            </div>`
    orderlists.appendChild(bars)
    data.forEach((order) => {
        user = {
            firstname: 'Unknown',
            lastname: 'customer',
            phone: '00',
            address: 'None',
        }
        if (order.user != null) {
            user = {
                firstname: order.user['first name'],
                lastname: order.user['last name'],
                phone: order.user.phone,
                address: order.address,
            }
        }
        const itemContainer = document.createElement('div')
        itemContainer.innerHTML = `
        <div class="accordion accordion-flush" id="accordionFlushExample">
        <div class="accordion-item ${
            order.status
        }"> <!-- sua lai khi them database -->
          <h2 class="accordion-header" id="flush-heading${i}">
            <button class="accordion-button accordion-cus collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse${i}" aria-expanded="false" aria-controls="flush-collapseOne">
                <div class="order-list-data text-center">
                <span class="order-time fw-bold">${order.createAt.substring(
                    0,
                    10
                )}</span>
                <span class="order-name name">${
                    user.firstname + ' ' + user.lastname
                }</span>
                <span class="order-status">${order.status}</span>
                <span class="order-phone">${user.phone}</span>
                <span class="order-address">${order.address} </span>
                <span class="order-price">${order.total} VNĐ</span>
                </div>
            </button>
          </h2>
            <div id="flush-collapse${i}" class="accordion-collapse collapse" aria-labelledby="flush-heading${i}" data-bs-parent="#accordionFlushExample">
            <div class="accordion-body">
                <div class="item-infor-${i}">
                    <div class="row">
                        <div class="col-sm fw-bold">Sản phẩm</div>
                        <div class="col-sm fw-bold">Size</div>
                        <div class="col-sm fw-bold">Đá</div>
                        <div class="col-sm fw-bold">Đường</div>
                        <div class="col-sm fw-bold">Số lượng</div>
                        <div class="col-sm fw-bold">Thành tiền</div>
                    </div>  
                </div>
                <p class="button" id ='${order.status}'>
                <button onclick ="changestatus('${order._id}','${
            order.status
        }')" class="d-block btn btn-warning mr-0 ml-auto" >Done</button>
                </p>
            </div>
          </div>
        </div>
      </div>
        `
        orderlists.appendChild(itemContainer)
        i++
    })
}
async function getorderdata(e) {
    var data = await fetch('/store/view_order', {
        method: 'GET',
    }).then((data) => data.json())
    data = data.sort(function (a, b) {
        return timeCompare(a.createAt, b.createAt)
    })
    data = data.filter((x) => x.type === 1)

    i = 0
    data.forEach((order) => {
        const itemInfo = document.createElement('div')
        const temp = document.querySelector(`.item-infor-${i}`)
        for (let j = 0; j < order.products.length; j++) {
            const item = document.createElement('div')
            item.innerHTML = `
                <div class="row">
                    <div class="col-sm">${order.products[j].info.name}</div>
                    <div class="col-sm">${order.products[j].size}</div>
                    <div class="col-sm">${order.products[j].ice_level}</div>
                    <div class="col-sm">${order.products[j].sugar_level}</div>
                    <div class="col-sm">${order.products[j].amount}</div>
                    <div class="col-sm">${
                        order.products[j].info.price * order.products[j].amount
                    }VNĐ</div>
                </div>    
            `
            itemInfo.appendChild(item)
        }
        const item = document.createElement('div')
        item.innerHTML = `
        <div class="row">
            <div class="col-sm">Giảm giá</div>
            <div class="col-sm"></div>
            <div class="col-sm"></div>
            <div class="col-sm"></div>
            <div class="col-sm"></div>
            <div class="col-sm">${
                parseInt(order.total) - parseInt(order.price)
            }VNĐ</div>
        </div>    
    `
        itemInfo.appendChild(item)
        temp.appendChild(itemInfo)
        i++
    })
}

async function getpendingorder(e) {
    var data = await fetch('/store/view_pending_order', {
        method: 'GET',
    }).then((data) => data.json())

    data.sort(function (a, b) {
        return timeCompare(a.createAt, b.createAt)
    })
    data = data.filter((x) => x.type === 1)
    console.log(data)
    u = i
    const orderlists = document.querySelector('.order-list-section')
    data.forEach((order) => {
        const itemContainer = document.createElement('div')
        user = {
            firstname: 'Unknown',
            lastname: 'customer',
            phone: '00',
            address: 'None',
        }
        if (order.user != null) {
            user = {
                firstname: order.user['first name'],
                lastname: order.user['last name'],
                phone: order.user.phone,
                address: order.address,
            }
        }

        itemContainer.innerHTML = `
        <div class="accordion accordion-flush" id="accordionFlushExample">
        <div class="accordion-item ${
            order.status
        }"> <!-- sua lai khi them database -->
          <h2 class="accordion-header" id="flush-heading${i}">
            <button class="accordion-button accordion-cus collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse${i}" aria-expanded="false" aria-controls="flush-collapseOne">
                <div class="order-list-data text-center">
                <span class="order-time fw-bold">${order.createAt.substring(
                    0,
                    10
                )}</span>
                <span class="order-name name">${
                    user.firstname + ' ' + user.lastname
                }</span>
                <span class="order-status">${order.status}</span>
                <span class="order-phone">${user.phone}</span>
                <span class="order-address">${order.address} </span>
                <span class="order-price">${order.total} VNĐ</span>
                </div>
            </button>
          </h2>
            <div id="flush-collapse${i}" class="accordion-collapse collapse" aria-labelledby="flush-heading${i}" data-bs-parent="#accordionFlushExample">
            <div class="accordion-body">
                <div class="item-infor-${i}">
                    <div class="row">
                        <div class="col-sm fw-bold">Sản phẩm</div>
                        <div class="col-sm fw-bold">Size</div>
                        <div class="col-sm fw-bold">Đá</div>
                        <div class="col-sm fw-bold">Đường</div>
                        <div class="col-sm fw-bold">Số lượng</div>
                        <div class="col-sm fw-bold">Thành tiền</div>
                    </div>  
                </div>
                <p class="button" id ='${order.status}'>
                <button onclick ="changestatus('${order._id}','${
            order.status
        }')" class="d-block btn btn-warning mr-0 ml-auto" >Done</button>
                </p>
            </div>
          </div>
        </div>
      </div>
        `
        orderlists.appendChild(itemContainer)
        i++
    })
}
async function getpendingorderdata(e) {
    var data = await fetch('/store/view_pending_order', {
        method: 'GET',
    }).then((data) => data.json())

    data.sort(function (a, b) {
        return timeCompare(a.createAt, b.createAt)
    })
    data = data.filter((x) => x.type === 1)

    i = u
    data.forEach((order) => {
        const itemInfo = document.createElement('div')
        const temp = document.querySelector(`.item-infor-${i}`)
        for (let j = 0; j < order.products.length; j++) {
            const item = document.createElement('div')
            item.innerHTML = `
                <div class="row">
                    <div class="col-sm">${order.products[j].info.name}</div>
                    <div class="col-sm">${order.products[j].size}</div>
                    <div class="col-sm">${order.products[j].ice_level}</div>
                    <div class="col-sm">${order.products[j].sugar_level}</div>
                    <div class="col-sm">${order.products[j].amount}</div>
                    <div class="col-sm">${
                        order.products[j].info.price * order.products[j].amount
                    }VNĐ</div>
                </div>    
            `
            itemInfo.appendChild(item)
        }
        const item = document.createElement('div')
        item.innerHTML = `
            <div class="row">
                <div class="col-sm">Giảm giá</div>
                <div class="col-sm"></div>
                <div class="col-sm"></div>
                <div class="col-sm"></div>
                <div class="col-sm"></div>
                <div class="col-sm">${
                    parseInt(order.total) - parseInt(order.price)
                }VNĐ</div>
            </div>    
        `
        itemInfo.appendChild(item)
        temp.appendChild(itemInfo)
        i++
    })
    document.querySelector('#numsofOrders').innerHTML = `${i} Đơn hàng`
}

//Gui request lien tuc de cap nhat
async function a() {
    setTimeout(getorder, 1000)
    setTimeout(getorderdata, 2000)
    setTimeout(getpendingorder, 3000)
    setTimeout(getpendingorderdata, 4000)
}
setTimeout(a, 1000)
setInterval(a, 1000 * 60)
