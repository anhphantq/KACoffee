'use strict'

// Get element from html
const loginbutton = document.querySelector('#submit_login')
const warning = document.querySelector('#warning')
const registerbutton = document.querySelector('#submit_register')

// Hien thi mat khau
function showpass() {
    const x = document.getElementById('password_login')
    const y = document.getElementById('hide1')
    const z = document.getElementById('hide2')
    if (x.type === 'password') {
        x.type = 'text'
        y.style.display = 'block'
        z.style.display = 'none'
    } else {
        x.type = 'password'
        y.style.display = 'none'
        z.style.display = 'block'
    }
}
// Phan login
loginbutton.addEventListener('click', loginUser)
async function loginUser(e) {
    e.preventDefault()
    const email = document.querySelector('#email_login').value
    const password = document.querySelector('#password_login').value
    if (email == '' || password == '') {
        warning.classList.remove('d-none')
        document.querySelector('#email_login').style.backgroundColor = '#ff8080'
        document.querySelector('#password_login').style.backgroundColor =
            '#ff8080'
    } else {
        await fetch('/log_in', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email, password}),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data != 'log in accepted') {
                    warning.classList.remove('d-none')
                    document.querySelector(
                        '#email_login'
                    ).style.backgroundColor = '#ff8080'
                    document.querySelector(
                        '#password_login'
                    ).style.backgroundColor = '#ff8080'
                } else {
                    localStorage.setItem('login', 'true')
                    fetchState()
                    window.location = '/'
                }
            })
    }
}

// Phan dang ky tai khoan
registerbutton.addEventListener('click', registerUser)
function checkbefore(
    firstName,
    lastName,
    email,
    password_signup,
    password_signup_cf,
    phoneNumber
) {
    if (password_signup != password_signup_cf) {
        document
            .querySelector('#warn-password_confirm')
            .classList.remove('d-none')
        return false
    }
    if (firstName.length == 0) {
        document.querySelector('#firstName').style.backgroundColor = '#ff8080'
        document.querySelector('#warn-firstname').classList.remove('d-none')
        return false
    }
    if (lastName.length == 0) {
        document.querySelector('#lastName').style.backgroundColor = '#ff8080'
        document.querySelector('#warn-lastname').classList.remove('d-none')
    }
    if (!email.includes('@gmail.com')) {
        document.querySelector('#email').style.backgroundColor = '#ff8080'
        document.querySelector('#warn-email').classList.remove('d-none')
        return false
    }
    if (password_signup_cf.length < 6) {
        document.querySelector('#password_signup').style.backgroundColor =
            '#ff6666'
        document.querySelector('#warn-password').classList.remove('d-none')
        return false
    }
    if (password_signup_cf.length == 0) {
        document.querySelector('#password_signup_cf').style.backgroundColor =
            '#ff8080'
        document
            .querySelector('#warn-password_confirm')
            .classList.remove('d-none')
        return false
    }
    if (phoneNumber.length < 10) {
        document.querySelector('#phoneNumber').style.backgroundColor = '#ff8080'
        document.querySelector('#warn-phonenumber').classList.remove('d-none')
        return false
    }

    return true
}

async function registerUser(e) {
    e.preventDefault()
    const firstName = document.querySelector('#firstName').value
    const lastName = document.querySelector('#lastName').value
    const email = document.querySelector('#email').value
    const password = document.querySelector('#password_signup').value
    const password_cf = document.querySelector('#password_signup_cf').value
    const phone = document.querySelector('#phoneNumber').value

    if (checkbefore(firstName, lastName, email, password, password_cf, phone)) {
        await fetch('/addCustomer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'first name': firstName,
                'last name': lastName,
                phone: phone,
                email: email,
                password: password,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data == 'account added') window.location = '/'
                if (data == 'email existed') {
                    document.querySelector('#warn-email').innerHTML =
                        'This email number has been used'
                    document.querySelector('#email').style.backgroundColor =
                        '#ff8080'
                    document
                        .querySelector('#warn-email')
                        .classList.remove('d-none')
                }
                if (data == 'phone existed') {
                    document.querySelector('#warn-phonenumber').innerHTML =
                        'This phone number has been used'
                    document.querySelector(
                        '#phoneNumber'
                    ).style.backgroundColor = '#ff8080'
                    document
                        .querySelector('#warn-phonenumber')
                        .classList.remove('d-none')
                    document
                        .querySelector('#warn-email')
                        .classList.add('d-none')
                }
            })
    }
}
