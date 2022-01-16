document
    .querySelector('.create-form')
    .addEventListener('submit', async (event) => {
        event.preventDefault()

        const data = new FormData(event.target)

        const value = Object.fromEntries(data.entries())

        console.log(JSON.stringify(value))

        try {
            const res = await fetch('/voucher/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify(value),
            })
            alert('Voucher added, reloading...')
            window.location.reload()
        } catch {
            alert('Some thing went wrong')
        }
    })

const voucherList = document.querySelector('.voucher-list')

async function hdDelete(vId) {
    await fetch('/voucher/delete', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({id_voucher: vId}),
    })

    alert('Deleted! Reload...')
    window.location.reload()
}

async function hdActive(vId) {
    await fetch('/voucher/release', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({id_voucher: vId}),
    })

    alert('Release! Reload...')
    window.location.reload()
}

fetch('/voucher/view', {method: 'GET'})
    .then((data) => data.json())
    .then((data) => {
        console.log(data)
        data.forEach((e, i) => {
            const div = document.createElement('tr')
            div.innerHTML = `
            <th scope="row">${i}</th>
            <td> ${e.name}</td>
            <td>${e.code}</td>
            <td>${e.activeDate.slice(0, 10)}</td>
            <td>${e.expireDate.slice(0, 10)}</td>
            <td>${e.minPaid} VND</td>
            <td>${e.money} VND</td>
            <td><button onClick='hdDelete("${e._id}")'>DELETE</button></td>
            <td><button onClick='hdActive("${e._id}")'>ACTIVE</button></td>
            `
            voucherList.appendChild(div)
        })
    })
