'use strict'

const container = document.querySelector('#accordion')

fetch('order/view', {method: 'GET'})
    .then((data) => data.json())
    .then((data) => {
        data = data.sort((e1, e2) => {
            if (
                Number(Date.parse(e1.createAt)) >
                Number(Date.parse(e2.createAt))
            )
                return -1
            else if (
                Number(Date.parse(e1.createAt)) ==
                Number(Date.parse(e2.createAt))
            )
                return 0
            else return 1
        })

        //console.log(data)

        data.forEach((e, i) => {
            const acc = document.createElement('div')
            acc.style.margin = '5px'
            acc.classList.add('card')

            acc.innerHTML = `
            <div class="card-header" id="heading${i}">
                <h5 class="mb-0">
                    <button
                        class="btn"
                        data-toggle="collapse"
                        data-target="#collapse${i}"
                        aria-expanded="true"
                        aria-controls="collapse${i}"
                    >
                        ${e.createAt.slice(0, 10)} | ${e.total} VND | ${
                e.status
            }
                    </button>
                </h5>
            </div>

            <div
                id="collapse${i}"
                class="collapse"
                aria-labelledby="heading${i}"
                data-parent="#accordion"
            >
                <div class="card-body acc${i}">
            
                </div>
            </div>
            `

            container.appendChild(acc)
            e.products.forEach((ee) => {
                let d = document.createElement('div')
                d.innerHTML = `${ee.info.name}    ${ee.ice_level}% ice    ${ee.sugar_level}% sugar    ${ee.size} size x${ee.amount}`
                document.querySelector(`.acc${i}`).appendChild(d)
            })
        })
    })
