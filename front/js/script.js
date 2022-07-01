// // // // // request API
fetch('http://localhost:3000/api/products')
    .then(response => response.json())
    .then(data => {
        displayProducts (data);

        console.log(data)})

// // // // // Function who display the products on the homepage
function displayProducts (fetchedData) {

    fetchedData.forEach(product => {
        
        let sectionItems = document.getElementById("items");
        let link = document.createElement("a");
        link.href = `./product.html?id=${product._id}`;
        sectionItems.appendChild(link);
        
        let card = document.createElement("article");
        link.appendChild(card);
        
        let image = document.createElement("img");
        image.src = `${product.imageUrl}`;
        image.alt = `${product.altTxt}`;
        card.appendChild(image);

        let productName = document.createElement("h3");
        productName.className = "productName";
        productName.innerText = `${product.name}`; 
        card.appendChild(productName);

        let productDescription = document.createElement("p");
        productDescription.className = "productDescription";
        productDescription.innerText = `${product.description}`; 
        card.appendChild(productDescription);

    });
}

