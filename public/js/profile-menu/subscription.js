fetch('check_self_profile', {method: 'GET'})
    .then((res) => res.json())
    .then((data) => {
        let div = document.createElement('div')
        div.innerHTML = `
            <div> TOTAL MONEY PAID: ${data.totalMoney} VND</div>
            <div> RANK: ${data.rank} </div>
        `
        document.querySelector('#point-display').appendChild(div)
    })
