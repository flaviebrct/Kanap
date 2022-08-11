import { saveBasket, getBasket } from "./functions.js";

basket()

//Modify quantity
function modifyQuantity(product) {
    let basket = getBasket()
    let foundProduct = basket.find(p => p.id == product.id && p.color == product.color)
    let index = basket.findIndex((p) => (p.id == product.id && p.color == product.color))
    let newQuantity = parseInt(document.querySelector(`article[data-id='${product.id}'][data-color='${product.color}']`).getElementsByTagName('input')[0].value)

    if (foundProduct != undefined) {
        if (newQuantity <= 0 || newQuantity > 100 || isNaN(newQuantity)) {
            document.querySelector(`article[data-id='${product.id}'][data-color='${product.color}']`).getElementsByTagName('input')[0].value = foundProduct.quantity
        } else {
            foundProduct.quantity = newQuantity
            basket.splice(index, 1)
            basket.push(foundProduct)
        }
        saveBasket(basket)
    }
}

//Total of items in basket
function totalProducts() {
    let basket = getBasket()
    let number = 0
    for (let product of basket) {
        number += product.quantity
    }
    let totalQuantity = document.getElementById("totalQuantity")
    totalQuantity.innerHTML = number
}

//Total price of the basket
async function totalProductsPrice() {
    let basket = getBasket()
    let price = 0
    for (let product of basket) {
        await fetch('http://localhost:3000/api/products/' + product.id)
            .then(response => response.json())
            .then(data => {
                price += product.quantity * data.price
            })
    }
    let totalPrice = document.getElementById("totalPrice")
    totalPrice.innerHTML = new Intl.NumberFormat().format(price)
}


//Delete item from cart
function deleteFromCart(id, color) {
    let basket = getBasket()
    basket.forEach(function (product, index) {
        if (id == product.id && color == product.color) {
            basket.splice(index, 1)
            let deletedEl = document.querySelector(`article[data-id='${product.id}'][data-color='${color}']`)
            deletedEl.parentElement.removeChild(deletedEl)
        }
    })
    saveBasket(basket)
}

//Get product info + sort by id
async function basket() {
    let basket = getBasket()

    basket.sort((a, b) => {
        if (a.id < b.id)
            return -1;
        if (a.id > b.id)
            return 1;
        return 0;
    })

    for (let i = 0; i < basket.length; i++) {
        let cartProduct = basket[i]
        //Request API
        const id = cartProduct.id
        const color = cartProduct.color
        const quantity = cartProduct.quantity
        await fetch('http://localhost:3000/api/products/' + id)
            .then(response => response.json())
            .then(data => {
                cartProductInfos(data, color, quantity);
            })
    };
    totalProducts()
    totalProductsPrice()
}

//Display product info
function cartProductInfos(data, color, quantity) {
    const product = data
    const storageQuantity = quantity

    //Article
    let sectionEl = document.getElementById("cart__items")
    let articleEl = document.createElement("article")
    articleEl.className = "cart__item"
    articleEl.dataset.id = product._id
    articleEl.dataset.color = color
    sectionEl.appendChild(articleEl)

    //Div .cart__item__img
    let divImg = document.createElement("div")
    divImg.className = "cart__item__img"
    articleEl.appendChild(divImg)

    //Image
    let imgEl = document.createElement("img")
    imgEl.src = product.imageUrl
    imgEl.alt = product.altTxt
    divImg.appendChild(imgEl)

    //Div .cart__item__content
    let divContentEl = document.createElement("div")
    divContentEl.className = "cart__item__content"
    articleEl.appendChild(divContentEl)

    //Div .cart__item__content__description
    let divContentDescription = document.createElement("div")
    divContentDescription.className = "cart__item__content__description"
    divContentEl.appendChild(divContentDescription)

    //Title h2
    let titleProductName = document.createElement("h2")
    titleProductName.innerHTML = product.name
    divContentDescription.appendChild(titleProductName)

    //Color
    let colorParagraph = document.createElement("p")
    colorParagraph.innerHTML = color
    divContentDescription.appendChild(colorParagraph)

    //Price
    let priceParagraph = document.createElement("p")
    priceParagraph.innerHTML = new Intl.NumberFormat().format(product.price) + ("€")
    divContentDescription.appendChild(priceParagraph)

    //Div .cart__item__content__settings
    let divContentSettings = document.createElement("div")
    divContentSettings.className = "cart__item__content__settings"
    divContentEl.appendChild(divContentSettings)

    //Div .cart__item__content__settings__quantity
    let divContentSettingsQuantity = document.createElement("div")
    divContentSettingsQuantity.className = "cart__item__content__settings__quantity"
    divContentSettings.appendChild(divContentSettingsQuantity)

    //Quantity
    let quantityParagraph = document.createElement("p")
    quantityParagraph.innerHTML = "Qté :"
    divContentSettingsQuantity.appendChild(quantityParagraph)

    //Input number
    let quantityInput = document.createElement("input")
    quantityInput.type = "number"
    quantityInput.className = "itemQuantity"
    quantityInput.name = "itemQuantity"
    quantityInput.min = "1"
    quantityInput.max = "100"
    quantityInput.value = storageQuantity
    divContentSettingsQuantity.appendChild(quantityInput)

    //event modify quantity
    quantityInput.addEventListener("input", (e) => {
        modifyQuantity({ id: product._id, color: color })
        totalProducts()
        totalProductsPrice()
    })

    //Div .cart__item__content__settings__delete
    let divContentSettingsDelete = document.createElement("div")
    divContentSettingsDelete.className = "cart__item__content__settings__delete"
    divContentSettings.appendChild(divContentSettingsDelete)

    //deleteItem
    let deleteItemParagraph = document.createElement("p")
    deleteItemParagraph.className = "deleteItem"
    deleteItemParagraph.innerHTML = "Supprimer"
    divContentSettingsDelete.appendChild(deleteItemParagraph)

    //event delete
    deleteItemParagraph.addEventListener("click", () => {
        deleteFromCart(product._id, color)
        totalProducts()
        totalProductsPrice()
    })
}


// // // // // Form Validation

// First and Last name validation 
let regexName = /^[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ-]+$/

function validateName(nameId, errorId) {
    let nameValue = document.getElementById(nameId).value
    let errorMsg = document.getElementById(errorId)

    if (!nameValue.match(regexName)) {
        errorMsg.innerText = "Ce champ n'est pas valide!"
        return false
    } else {
        errorMsg.innerText = ""
        return true
    }
}
let firstNameEl = document.getElementById("firstName")
firstNameEl.addEventListener("input", () => {
    validateName("firstName", "firstNameErrorMsg")
})

let lastNameEl = document.getElementById("lastName")
lastNameEl.addEventListener("input", () => {
    validateName("lastName", "lastNameErrorMsg")
})

// Address validation
let regexAddress = /^([0-9a-zA-Z'àâéèêôùûçÀÂÉÈÔÙÛÇ\s-]{1,50})$/
function validateAdress() {
    let addressValue = document.getElementById("address").value
    let errorMsg = document.getElementById("addressErrorMsg")

    if (!addressValue.match(regexAddress)) {
        errorMsg.innerText = "Ce champ n'est pas valide!"
        return false
    } else {
        errorMsg.innerText = ""
        return true
    }
}
let addressEl = document.getElementById("address")
addressEl.addEventListener("input", () => {
    validateAdress()
})

// City validation
let regexCity = /^[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ-]+$/
function validateCity() {
    let cityValue = document.getElementById("city").value
    let errorMsg = document.getElementById("cityErrorMsg")

    if (!cityValue.match(regexCity)) {
        errorMsg.innerText = "Ce champ n'est pas valide!"
        return false
    } else {
        errorMsg.innerText = ""
        return true
    }
}
let cityEl = document.getElementById("city")
cityEl.addEventListener("input", () => {
    validateCity()
})

// Email validation
let regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
function validateEmail() {
    let emailValue = document.getElementById("email").value
    let errorMsg = document.getElementById("emailErrorMsg")

    if (!emailValue.match(regexEmail)) {
        errorMsg.innerText = "Ce champ n'est pas valide!"
        return false
    } else {
        errorMsg.innerText = ""
        return true
    }
}
let emailEl = document.getElementById("email")
emailEl.addEventListener("input", () => {
    validateEmail()
})


// Order btn behavior
let orderBtn = document.getElementById("order")
orderBtn.addEventListener("click", (e) => {
    e.preventDefault()
    let basket = getBasket()
    if (basket != 0){
        if (validateName("firstName", "firstNameErrorMsg") && validateName("lastName", "lastNameErrorMsg") && validateAdress() && validateCity() && validateEmail()) {
            let productsId = []
            for (let i = 0; i < basket.length; i++) {
                let id = basket[i].id
                productsId.push(id)
            }
    
            const commande = {
                contact: {
                    firstName: firstNameEl.value,
                    lastName: lastNameEl.value,
                    address: addressEl.value,
                    city: cityEl.value,
                    email: emailEl.value
                },
                products: productsId
            };
    
            // POST request using fetch()
            fetch("http://localhost:3000/api/products/order", {
                method: "POST",
                body: JSON.stringify(commande),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then(orderInfo => {
                    location.href = `./confirmation.html?id=${orderInfo.orderId}`
                });
    
    
        } else {
            alert("Veuillez remplir tous les champs requis.")
        }
    } else {
        alert("Votre panier ne contient aucun article.")
    }
})

