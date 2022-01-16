function Filter_coffee() {
    var all = document.getElementsByClassName('product-item-li')

    for (var i = 0; i < all.length; i++) {
        all[i].style.display = 'none'
    }
    var coffee = document.getElementsByClassName('coffee')
    for (var i = 0; i < coffee.length; i++) {
        coffee[i].style.display = 'block'
    }
}
function Filter_tea() {
    var all = document.getElementsByClassName('product-item-li')
    var tea = document.getElementsByClassName('tea')
    for (var i = 0; i < all.length; i++) {
        all[i].style.display = 'none'
    }
    for (var i = 0; i < tea.length; i++) {
        tea[i].style.display = 'block'
    }
}
function Filter_iceblended() {
    var all = document.getElementsByClassName('product-item-li')
    var iceblended = document.getElementsByClassName('iceblended')
    for (var i = 0; i < all.length; i++) {
        all[i].style.display = 'none'
    }
    console.log(iceblended.length)
    for (var i = 0; i < iceblended.length; i++) {
        iceblended[i].style.display = 'block'
    }
}
function Filter_shippingonly() {
    var all = document.getElementsByClassName('product-item-li')
    var shippingonly = document.getElementsByClassName('shippingonly')
    for (var i = 0; i < all.length; i++) {
        all[i].style.display = 'none'
    }
    for (var i = 0; i < shippingonly.length; i++) {
        shippingonly[i].style.display = 'block'
    }
}
function Filter_snack() {
    var all = document.getElementsByClassName('product-item-li')
    var snack = document.getElementsByClassName('snack')
    for (var i = 0; i < all.length; i++) {
        all[i].style.display = 'none'
    }
    for (var i = 0; i < snack.length; i++) {
        snack[i].style.display = 'block'
    }
}
function Filter_gift() {
    var all = document.getElementsByClassName('product-item-li')
    var gift = document.getElementsByClassName('gift')
    for (var i = 0; i < all.length; i++) {
        all[i].style.display = 'none'
    }
    for (var i = 0; i < gift.length; i++) {
        gift[i].style.display = 'block'
    }
}

function Add_info(product_info) {
    var a = document.getElementById('Sample')
    for (var i = 0; i < product_info.length; i++) {
        var clone = document.querySelector('#Sample').cloneNode(true)
        a.insertAdjacentElement('afterend', clone)
    }
    a.remove()
    var product_item = document.getElementsByClassName('product-item-li')
    var product_img = document.getElementsByClassName('product-img')
    var product_name = document.getElementsByClassName('product-name')
    var product_cost = document.getElementsByClassName('product-cost')
    var rateNumber = document.getElementsByClassName('rateNumber')
    var ratingStars = document.getElementsByClassName('ratingStars')
    var linkProduct = document.getElementsByClassName('link_product')

    for (var i = 0; i < product_info.length; i++) {
        const tmp = document.createElement('div')
        if (
            window.localStorage.getItem('login') &&
            window.localStorage.getItem('login') == 'true'
        )
            tmp.innerHTML = `
        <button class = "AddCart" type = "button" data-toggle="modal"
        data-target="#Modal${i}">
                                    <i class="fas fa-cart-plus"></i>
                                    Thêm vào giỏ hàng
                                </button>
    <div
        class="modal fade"
        id="Modal${i}"
        tabindex="-1"
        role="dialog"
        aria-labelledby="ModalLabel${i}"
        aria-hidden="true"
    >
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="ModalLabel${i}">Add to cart</h5>
                </div>
                <div class="modal-body">
                    <form class="form${i}">
                        <div style="margin-bottom: 5px">
                            <label for="quantity" class="col-sm-2">Quantity</label>
                            <input
                                type="number"
                                id="quantity"
                                name="quantity"
                                value="1"
                                min="1"
                                max="20"
                            />
                        </div>
                        <fieldset class="row mb-3">
                            <legend class="col-form-label col-sm-2 pt-0">
                                Size
                            </legend>
                            <div class="col-sm-10">
                                <div class="form-check form-check-inline">
                                    <input
                                        class="form-check-input"
                                        type="radio"
                                        name="size"
                                        id="sizeS"
                                        value="S"
                                        checked
                                    />
                                    <label class="form-check-label" for="sizeS">
                                        S
                                    </label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input
                                        class="form-check-input"
                                        type="radio"
                                        name="size"
                                        id="sizeM"
                                        value="M"
                                    />
                                    <label class="form-check-label" for="sizeM">
                                        M (+ 5000 VND)
                                    </label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input
                                        class="form-check-input"
                                        type="radio"
                                        name="size"
                                        id="sizeL"
                                        value="L"
                                    />
                                    <label class="form-check-label" for="sizeL">
                                        L (+ 10000 VND)
                                    </label>
                                </div>
                            </div>
                        </fieldset>
                        <div class="row" style="margin-bottom: 7px">
                            <div class="col-md-6">
                                <label for="sugar" class="form-label">Sugar</label>
                                <select id="sugar" class="form-select" name="sugar">
                                    <option value="100" selected>100%</option>
                                    <option value="70">70%</option>
                                    <option value="50">50%</option>
                                    <option value="30">30%</option>
                                    <option value="0">0%</option>
                                </select>
                            </div>
                            <div class="col-md-6">
                                <label for="ice" class="form-label">Ice</label>
                                <select id="ice" class="form-select" name="ice">
                                    <option value="100" selected>100%</option>
                                    <option value="70">70%</option>
                                    <option value="50">50%</option>
                                    <option value="30">30%</option>
                                    <option value="0">0%</option>
                                </select>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button
                                type="button"
                                class="btn btn-secondary"
                                data-dismiss="modal"
                            >
                                Close
                            </button>
                            <button
                                class="btn btn-primary"
                                onClick = "addButtonClickHandle('${product_info[i]._id}','.form${i}',${product_info[i].price})"
                                value="Add"
                                data-dismiss="modal"
                            >Add</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    
        `
        else
            tmp.innerHTML = `<button class = "AddCart" type = "button" data-toggle="modal"
        data-target="#Modal${i}">
                                    <i class="fas fa-cart-plus"></i>
                                    Thêm vào giỏ hàng
                                </button>
    <div
        class="modal fade"
        id="Modal${i}"
        tabindex="-1"
        role="dialog"
        aria-labelledby="ModalLabel${i}"
        aria-hidden="true"
    >
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="ModalLabel${i}">Add to cart</h5>
                </div>
                <div class="modal-body">
                    <div>PLEASE LOGIN</div>
                </div>
                <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>
            </div>
        </div>
    </div>
    
        `
        product_item[i].childNodes[1].childNodes[3].appendChild(tmp)
        var type = product_info[i].type
        product_item[i].classList.add(type)
        var src = product_info[i].image
        product_img[i].src = src
        product_name[i].innerHTML = product_info[i].name
        product_cost[i].innerHTML = product_info[i].price
        rateNumber[i].innerHTML = product_info[i].rateNumber

        var link = 'http://localhost:3000/viewproduct?id='
        var id = product_info[i]._id
        var Id = String(id)
        link = link + Id
        linkProduct[i].href = link

        var rateLevel = product_info[i].rateLevel
        rateLevel = 5
        for (var j = 0; j < rateLevel - 1; j++) {
            var SampleStar = document
                .querySelector('#SampleStar')
                .cloneNode(true)
            ratingStars[i].appendChild(SampleStar)
        }
    }
}

async function get_info_product(category) {
    var myJSON
    const data = await fetch('/product/view', {
        method: 'GET',
    })
        .then((data) => data.json())
        .then((data) => {
            myJSON = data
        })
    Add_info(myJSON)
}
