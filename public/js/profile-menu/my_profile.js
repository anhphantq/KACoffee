'use strict'

// INFORMATION
const container = document.querySelector('.account-info')
const title = document.querySelector('.account-title')
const firstName = document.querySelector('#firstName')
const lastName = document.querySelector('#lastName')
const phone = document.querySelector('#phone')
const email = document.querySelector('.email')
const saveInfoBtn = document.querySelector('.save-info-btn')
// PASSWORD
const password1 = document.querySelector('#password1')
const password2 = document.querySelector('#password2')
const savePassBtn = document.querySelector('.save-password-btn')
// SHIPPING ADDRESS
const curAddress = document.querySelector('.address')
const newAddress = document.querySelector('#new_address')
const saveAddBtn = document.querySelector('.save-address-btn')

// MESSAGE

const mesFirstName = document.querySelector('.mes-firstname')
const mesPhone = document.querySelector('.mes-phone')
const mesPassword1 = document.querySelector('.mes-password1')
const mesPassword2 = document.querySelector('.mes-password2')
const mesPassword = document.querySelector('.mes-password')
const mesAddress = document.querySelector('.mes-address')

mesFirstName.classList.add('mes-none')
mesPhone.classList.add('mes-none')
mesPassword1.classList.add('mes-none')
mesPassword2.classList.add('mes-none')
mesPassword.classList.add('mes-none')
mesAddress.classList.add('mes-none')

fetchState().then((User) => {
    if (User) {
        // INFORMATION
        console.log(title)
        title.textContent = `${User['first name'].toUpperCase()}'S ACCOUNT`
        firstName.value = User['first name']
        lastName.value = User['last name']
        phone.value = User['phone']
        email.textContent = User['email']

        saveInfoBtn.addEventListener('click', async (e) => {
            e.preventDefault()
            if (firstName.value.trim() == '') {
                mesFirstName.classList.remove('mes-none')
                mesFirstName.classList.add('mes-display')
            } else if (phone.value.trim() == '') {
                mesFirstName.classList.add('mes-none')
                mesFirstName.classList.remove('mes-display')
                mesPhone.classList.remove('mes-none')
                mesPhone.classList.add('mes-display')
            } else {
                const data = {
                    'first name': firstName.value,
                    'last name': lastName.value,
                    phone: phone.value,
                }
                const res = await fetch('/edit_self_profile', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                })

                location.reload()
            }
        })

        // PASSWORD

        savePassBtn.addEventListener('click', async (e) => {
            e.preventDefault()
            if (password1.value == '') {
                mesPassword1.classList.remove('mes-none')
                mesPassword1.classList.add('mes-display')
            } else if (password2.value == '') {
                mesPassword1.classList.add('mes-none')
                mesPassword1.classList.remove('mes-display')
                mesPassword2.classList.remove('mes-none')
                mesPassword2.classList.add('mes-display')
            } else if (password1.value !== password2.value) {
                mesPassword1.classList.add('mes-none')
                mesPassword1.classList.remove('mes-display')
                mesPassword2.classList.add('mes-none')
                mesPassword2.classList.remove('mes-display')
                mesPassword.classList.remove('mes-none')
                mesPassword.classList.add('mes-display')
            } else {
                const data = {
                    password: password1.value,
                }
                const res = await fetch('/edit_self_profile', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                })

                location.reload()
            }
        })

        // ADDRESS
        if (User['address'].trim() == '')
            curAddress.textContent =
                'You have not updated your address. Please update!'
        else curAddress.textContent = User['address'].trim()

        saveAddBtn.addEventListener('click', async (e) => {
            e.preventDefault()
            if (newAddress.value.trim() == '') {
                mesAddress.classList.remove('mes-none')
                mesAddress.classList.add('mes-display')
            } else {
                const data = {
                    address: newAddress.value,
                }
                const res = await fetch('/edit_self_profile', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                })

                location.reload()
            }
        })
    } else {
        container.textContent = 'PLEASE LOG IN'
    }
})
