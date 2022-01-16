const submitbtn = document.querySelector('#submit')
const password1 = document.querySelector('#password')
const password2 = document.querySelector('#confirm_password')
const mesPassword = document.querySelector('#mes-password')
const mesPassword1 = document.querySelector('#mes-password1')
const mesPassword2 = document.querySelector('#mes-password2')

submitbtn.addEventListener('click', async (e) => {
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
