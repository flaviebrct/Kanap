//Local storage
//Save the basket
export function saveBasket(basket) {
    localStorage.setItem("basket", JSON.stringify(basket))
}

//Get items of basket
export function getBasket() {
    let basket = localStorage.getItem("basket")
    if (basket == null) {
        return []
    } else {
        return JSON.parse(basket)
    }
}

//Add product to basket
export function addBasket(product) {
    let basket = getBasket()
    
    let foundProduct = basket.find(p => p.id == product.id && p.color == product.color)
    let index = basket.findIndex((p) => (p.id == product.id && p.color == product.color))
    if (foundProduct != undefined) {
        let total = product.quantity + foundProduct.quantity
        if (total > 100) {
            alert('Erreur')
        } else {
            alert(`Vous avez ajouté ${product.quantity} ${product.name} au panier !`)
            product.quantity += foundProduct.quantity
            basket.splice(index, 1)
            basket.push(product)
        }
    }
    else {
        alert(`Vous avez ajouté ${product.quantity} ${product.name} au panier !`)
        basket.push(product)
    }
    saveBasket(basket)
}