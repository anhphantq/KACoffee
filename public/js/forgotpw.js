const square = document.getElementById('square-1')
const sendmailbtn = document.querySelector('#email-submit')
const email = document.querySelector('#email')

sendmailbtn.addEventListener('click', async (e) => {
    e.preventDefault()

    if (email.value != '') {
        await fetch('/send_email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email.value,
                emailType: 'password_change',
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                if (data == 'email not exist') {
                    warning.classList.add('d-none')
                    warning1.classList.remove('d-none')
                } else if (data == 'email sent') {
                    alert(
                        'A verification email has been sent to the address provided. If you don’t receive it in the next 30 minutes, please contact us. '
                    )

                    window.location = '/login'
                }
            })
    } else {
        if (!warning1.classList.contains('d-none'))
            warning1.classList.add('d-none')
        warning.classList.remove('d-none')
    }
})
