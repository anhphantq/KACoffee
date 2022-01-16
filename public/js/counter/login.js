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
                    window.location = '/employee'
                }
            })
    }
}
