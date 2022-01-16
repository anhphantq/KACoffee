document.querySelector('.phoneForm').addEventListener('submit', async (e) => {
    e.preventDefault()
    console.log(document.querySelector('#phoneNUMBER').value)
    const res = await fetch('/voucher/get_5t1_voucher', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            phone: document.querySelector('#phoneNUMBER').value,
        }),
    }).then((data) => data.json())
    alert(res)
})
