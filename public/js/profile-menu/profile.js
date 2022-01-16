const links = document.querySelectorAll('.link')

links.forEach((e) => {
    e.addEventListener('click', () => {
        window.location = e.getAttribute('href')
    })
})
