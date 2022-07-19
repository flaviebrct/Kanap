// // // // // Local storage
// Sauvegarder le panier
function saveBasket(basket) {
    localStorage.setItem("basket", JSON.stringify(basket))
}

// Afficher le panier
function getBasket() {
    let basket = localStorage.getItem("basket")
    if (basket == null) {
        return []
    } else {
        return JSON.parse(basket)
    }
}

// Ajouter au panier
export function addBasket(product) {
    let basket = getBasket()
    let foundProduct = basket.find(p => p.id == product.id && p.color == product.color)
    let index = basket.findIndex((p) => (p.id == product.id && p.color == product.color))
    if (foundProduct != undefined) {
        product.quantity += foundProduct.quantity
        basket.splice(index, 1)
        basket.push(product)
        alert(`Vous avez ajouté vieux au panier !`);
    }
    else {
        basket.push(product)
        alert(`Vous avez ajouté un nouveau au panier !`);
    }
    saveBasket(basket)
}
