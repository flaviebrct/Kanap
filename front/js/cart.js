//Local storage
//Sauvegarder le panier
function saveBasket(basket) {
    localStorage.setItem("basket", JSON.stringify(basket))
}

//Afficher le panier
function getBasket() {
    let basket = localStorage.getItem("basket")
    console.log(basket)
    if (basket == null) {
        return []
    } else {
        return JSON.parse(basket)
    }
}

//Ajouter au panier
export function addBasket(product) {
    let basket = getBasket()
    let foundProduct = basket.find(p => p.id == product.id && p.color == product.color)
    let index = basket.findIndex((p) => (p.id == product.id && p.color == product.color))
    if (foundProduct != undefined) {
        let total = product.quantity + foundProduct.quantity
        console.log(total);
        if (total > 100) {
            alert('Erreur')
        } else {
            product.quantity += foundProduct.quantity
            basket.splice(index, 1)
            basket.push(product)
        }
    }
    else {
        basket.push(product)
    }
    saveBasket(basket)
}

let basket = getBasket()

basket.forEach(cartProduct => {

    //Request API
    const id = cartProduct.id
    const color = cartProduct.color
    const quantity = cartProduct.quantity
    fetch('http://localhost:3000/api/products/' + id)
        .then(response => response.json())
        .then(data => {
            cartProductInfos(data, color, quantity);
        })
});

function cartProductInfos(data, color, quantity) {
    const dataInfo = data
    console.log(dataInfo);
    console.log(quantity);

    //Balise article 
    let sectionEl = document.getElementById("cart__items")
    let articleEl = document.createElement("article")
    articleEl.className = "cart__item"
    articleEl.dataset.id = dataInfo._id
    articleEl.dataset.color = color
    sectionEl.appendChild(articleEl)

        //Div .cart__item__img
        let divImg = document.createElement("div")
        divImg.className = "cart__item__img"
        articleEl.appendChild(divImg)

            //Image
            let imgEl = document.createElement("img")
            imgEl.src = dataInfo.imageUrl
            imgEl.alt = dataInfo.altTxt
            divImg.appendChild(imgEl)

        //Div .cart__item__content
        let divContentEl = document.createElement("div")
        divContentEl.className = "cart__item__content"
        articleEl.appendChild(divContentEl)

            //Div .cart__item__content__description
            let divContentDescription = document.createElement("div")
            divContentDescription.className = "cart__item__content__description"
            divContentEl.appendChild(divContentDescription)

                //Titre h2
                let titleProductName = document.createElement("h2")
                titleProductName.innerHTML = dataInfo.name
                divContentDescription.appendChild(titleProductName)

                //Color
                let colorParagraph = document.createElement("p")
                colorParagraph.innerHTML = color
                divContentDescription.appendChild(colorParagraph)

                //Price
                let priceParagraph = document.createElement("p")
                priceParagraph.innerHTML = dataInfo.price
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
                quantityInput.value = quantity
                divContentSettingsQuantity.appendChild(quantityInput)

            //Div .cart__item__content__settings__delete
            let divContentSettingsDelete = document.createElement("div")
            divContentSettingsDelete.className = "cart__item__content__settings__delete"
            divContentSettings.appendChild(divContentSettingsDelete)

                //deleteItem
                let deleteItemParagraph = document.createElement("p")
                deleteItemParagraph.className = "deleteItem"
                deleteItemParagraph.innerHTML =  "Supprimer"
                divContentSettingsDelete.appendChild(deleteItemParagraph)
}