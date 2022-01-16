fetch('voucher/view', {method: 'GET'})
    .then((data) => data.json())
    .then(({vouchers}) => {
        vouchers.forEach((e) => {
            let div = document.createElement('div')
            div.style.border = '1px solid black'
            div.style.padding = '2px'
            div.style.margin = '2px'
            div.innerHTML = `
                <div> CODE: <span style="font-weight:bold;">${e.code}</span> discount ${e.money} VND for Min. ${e.minPaid} VND</div>
            `
            document.querySelector('#vouchers-display').appendChild(div)
        })
    })
