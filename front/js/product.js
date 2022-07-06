const id = location.search.split('id=')[1]
console.log(id)
// // // // // Request API
fetch('http://localhost:3000/api/products/'+id)
    .then(response => response.json())
    .then(data => {
        productInfos(data);
    })
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
    
    product.colors.forEach(colorValue => { 
        let element = document.createElement("option")
        element.value = `${colorValue}`
        element.innerHTML = `${colorValue}`
        colorsList.appendChild(element)
    })
}   
