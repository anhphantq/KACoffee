
function addProduct(products) {
    var productBlock = document.querySelector('#products');
    var htmls = products.map(function(product) {
        return `
            <tr role="row" class="product-${product._id}">
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>
                <button onclick="deleteProduct(${product._id})">Delete</button>
            </td>
            </tr>
        `;
    })
    productBlock.innerHTML = htmls.join('');
}

async function getProduct(category) {
    var myJSON;
    const data = await fetch('/product/view',{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then((data) => data.json())
        .then((data) => {
            myJSON = data
        })
    addProduct(myJSON);
}
getProduct();


async function deleteProduct(id) {
    fetch('/product/delete', 
            {method:'POST',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify({id:id})})
        .then(data => data.json())
        .then(function() {
            var product = document.querySelector('.product-' + id);
            product.remove();
        })
}