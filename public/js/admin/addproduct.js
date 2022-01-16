var add_product_button = document.querySelector('#submit_add_product');

add_product_button.addEventListener('click', addProduct);

function checkBeforeSubmit(name, price, type, description){
    console.log(name + " " + type);
    const all_warning = document.querySelectorAll('.warning');
    for(var i = 0; i < all_warning.length; i++)
        all_warning[i].classList.add('d-none');
    if(name == null || name == ""){
        document.querySelector('#warning-name').classList.remove('d-none');
        return false;
    }
    if(price == null || price == ""){
        document.querySelector('#warning-price').classList.remove('d-none');
        return false;
    }
    if(type == null || type ==""){
        document.querySelector('#warning-type').classList.remove('d-none');
        return false;
    }
    if(description == null || description == ""){
        document.querySelector('#warning-description').classList.remove('d-none');
        return false;
    }
    return true;
}

async function addProduct(e){
    e.preventDefault()
    const name = document.querySelector('#name').value;
    const price = document.querySelector('#price').value;
    const type = document.querySelector('#type').value;
    const description = document.querySelector('#description').value;
    const image = document.querySelector('#image').files[0];
    const formData = new FormData();
    formData.append('image_file', image);
    const product = {name: name, price: price, type: type, description: description};
    formData.append('product', JSON.stringify(product));
    if(checkBeforeSubmit(name, price, type, description)){
        console.log(name + ' ' + description);
        await fetch('/product/create', {
            method: 'POST',
            body: formData,   
        })
            .then((res) => res.json())
    }
}
