


function addEvent () {
    var warning = document.querySelector('#warning')
    var registerbutton = document.querySelector('#submit_register')
    registerbutton.addEventListener('click', registerUser)
}

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
        await fetch('/addEmployee', {
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
                if (data == 'account added') {
                    alert("Thêm tài khoản nhân viên thành công")
                    window.location = '/adminmain'
                }
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
