document.querySelector('.btn-createstaff').addEventListener('click', (e) => {
    e.preventDefault()
    window.location = '/admincreatestaff'
})

document.querySelector('.btn-analysis').addEventListener('click', (e) => {
    e.preventDefault()
    window.location = '/adminanalysis'
})

// document.querySelector('.btn-vieweacc').addEventListener('click', (e) => {
//     e.preventDefault()
//     window.location = '/adminviewemployee'
// })

// document.querySelector('.btn-viewuacc').addEventListener('click', (e) => {
//     e.preventDefault()
//     window.location = '/adminviewuser'
// })

document.querySelector('.btn-voucher').addEventListener('click', (e) => {
    e.preventDefault()
    window.location = '/adminvoucher'
})

document.querySelector('.btn-addproduct').addEventListener('click', (e) => {
    e.preventDefault()
    window.location = '/adminaddproduct'
})

document.querySelector('.btn-deleteproduct').addEventListener('click', (e) => {
    e.preventDefault()
    window.location = '/admindeleteproduct'
})
