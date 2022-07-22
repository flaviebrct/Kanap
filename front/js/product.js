const id = location.search.split('id=')[1]
console.log(id)
// // // // // Request API
fetch('http://localhost:3000/api/products/' + id)
    .then(response => response.json())
    .then(data => {
        productInfos(data);
    })


// // // // // Imports from cart.js
import { addBasket } from './cart.js'




// // // // // Function who display the product info
function productInfos(data) {

    const product = data

    // // Image
    let imageContainer = document.querySelector(".item__img");
    let image = document.createElement("img")
    image.src = `${product.imageUrl}`;
    image.alt = `${product.altTxt}`;
    imageContainer.appendChild(image);

    // // Title
    let title = document.querySelector("#title")
    title.innerHTML = `${product.name}`

    // // Price
    let price = document.querySelector("#price")
    price.innerHTML = `${product.price}`

    // // Description
    let info = document.querySelector("#description")
    info.innerHTML = `${product.description}`

    // // Colors
    let colorsList = document.getElementById("colors")
    colorsList.setAttribute("required", "")

    product.colors.forEach(colorValue => {
        let element = document.createElement("option")
        element.value = `${colorValue}`
        element.innerHTML = `${colorValue}`
        colorsList.appendChild(element)
    })

    addToCart.addEventListener("click", () => {
        let quantity = parseInt(document.getElementById('quantity').value);
        let color = document.getElementById('colors').value;
        let check = true;
        if (quantity <= 0 || quantity > 100 || isNaN(quantity)) {
            check = false
            alert(`Vous devez selectionner une quantité valide de ${product.name} pour continuer`)
        }
        if (color == "") {
            check = false
            alert(`Vous devez selectionner une couleur de ${product.name} pour continuer`)
        }
        if (check == true) {
            addBasket({ id: `${product._id}`, name: `${product.name}`, quantity: quantity, color: `${color}` })
            alert(`Vous avez ajouté ${quantity} ${product.name} au panier !`);
        }
    });

}   
