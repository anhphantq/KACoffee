if (document.querySelector('.orderHA')) {
    document.querySelector('.order-on').addEventListener('click', () => {
        window.location = '/orderonline'
    })
    document.querySelector('.order-off').addEventListener('click', () => {
        document.querySelector('.orderHA').style.display = 'block'
        document.querySelector('.account-info27').style.display = 'none'
    })
}
if (document.querySelector('.order-online')) {
    document.querySelector('.order-off').addEventListener('click', () => {
        window.location = '/employee'
    })
    document.querySelector('.order-on').addEventListener('click', () => {
        document.querySelector('.order-online').style.display = 'block'
        document.querySelector('.account-info27').style.display = 'none'
    })
}

document.querySelector('.order-history').addEventListener('click', () => {
    window.location = '/orderhistory'
})

document.querySelector('.order-b5g1').addEventListener('click', () => {
    window.location = '/buy5get1'
})
