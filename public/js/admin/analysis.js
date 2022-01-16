'use strict'

const revenues = document.querySelector('#revenues')
const budget = document.querySelector('#Budget')
const orders = document.querySelector('#order_nums')
const members = document.querySelector('#Members')
const order_list = document.querySelector('#order_list')
var i = 0

const date = new Date()

const today =
    date.getFullYear() + '/' + date.getMonth() + 1 + '/' + date.getDate()

function endOfMonth(date) {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
}

const monthstart = date.getFullYear() + '/' + date.getMonth() + 1 + '/' + '1'
const monthend =
    date.getFullYear() + '/' + date.getMonth() + 1 + '/' + endOfMonth(date)

const test = '2022/1/8'

function timeCompare(datetime1, datetime2) {
    var date1 = datetime1.substring(0, 10)
    var date2 = datetime2.substring(0, 10)
    var time1 = datetime1.substring(11, 19)
    var time2 = datetime2.substring(11, 19)
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
async function getrevenues() {
    await fetch('/stats/by_date', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            start: test,
        }),
    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            var x = 0
            for (var u of data) {
                x += u.price
            }
            const child = document.createElement('div')
            child.innerHTML = `<p class="card-title">${x}</p><p class="card-title">VND</p>`
            revenues.appendChild(child)
        })
}

async function getbudget() {
    await fetch('/stats/by_date', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            start: monthstart,
            end: monthend,
        }),
    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            var x = 0
            for (var u of data) {
                x += u.price
            }
            const child = document.createElement('div')
            child.innerHTML = `<p class="card-title">${x}</p><p class="card-title">VND</p>`
            budget.appendChild(child)
        })
}
async function getorders() {
    await fetch('/stats/by_date', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            start: monthstart,
            end: monthend,
        }),
    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            const child = document.createElement('div')
            child.innerHTML = `<p class="card-title">${data.length}<p>`
            orders.appendChild(child)
        })
}

async function getorderlist(e) {
    var data = await fetch('/stats/by_date', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            start: monthstart,
            end: monthend,
        }),
    }).then((res) => res.json())
    i = 0
    console.log(data[0].createAt)
    data.sort(function (a, b) {
        return timeCompare(a.createAt, b.createAt)
    })
    order_list.innerHTML = ''
    const bars = document.createElement('div')
    bars.innerHTML = `   <div class="fixed-container">
                <div class="order-list-header text-center">
                    <span class="order-time fw-bold">Thời gian</span>
                    <span class="order-address fw-bold">Địa chỉ</span>
                    <span class="order-price fw-bold">Giá tiền</span>
                </div>
            </div>`
    order_list.appendChild(bars)
    data.forEach((order) => {
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
                <span class="order-address">${order.address} </span>
                <span class="order-price">${order.total} VNĐ</span>
                </div>
            </button>
          </h2>
            <div id="flush-collapse${i}" class="accordion-collapse collapse" aria-labelledby="flush-heading${i}" data-bs-parent="#accordionFlushExample">
            <div class="accordion-body">
                <div class="item-infor-${i}">
                    <div class="row">
                        <div class="col-sm fw-bold text-center">Sản phẩm</div>
                        <div class="col-sm fw-bold text-center">Số lượng</div>
                        <div class="col-sm fw-bold text-center">Thành tiền</div>
                    </div>  
                </div>
            </div>
          </div>
        </div>
      </div>
        `
        order_list.appendChild(itemContainer)
        i++
    })
}
async function getorderdata(e) {
    var data = await fetch('/stats/by_date', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            start: monthstart,
            end: monthend,
        }),
    }).then((res) => res.json())
    i = 0
    console.log(data)
    data.sort(function (a, b) {
        return timeCompare(a.createAt, b.createAt)
    })
    //data = data.filter((x) => x.type === 1)

    data.forEach((order) => {
        const itemInfo = document.createElement('div')
        const temp = document.querySelector(`.item-infor-${i}`)
        for (let j = 0; j < order.products.length; j++) {
            const item = document.createElement('div')
            item.innerHTML = `
                <div class="row">
                    <div class="col-sm text-center">${
                        order.products[j].info.name
                    }</div>
                    <div class="col-sm text-center">${
                        order.products[j].amount
                    }</div>
                    <div class="col-sm text-center">${
                        order.products[j].info.price * order.products[j].amount
                    }VNĐ</div>
                </div>    
            `
            itemInfo.appendChild(item)
        }
        const item = document.createElement('div')
        item.innerHTML = `
        <div class="row">
            <div class="col-sm text-center">Giảm giá</div>
            <div class="col-sm text-center"></div>
            <div class="col-sm text-center">${
                parseInt(order.total) - parseInt(order.price)
            }VNĐ</div>
        </div>    
    `
        itemInfo.appendChild(item)
        temp.appendChild(itemInfo)
        i++
    })
}

getrevenues()
getbudget()
getorders()
getorderlist()
setTimeout(getorderdata(), 1000)
