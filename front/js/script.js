// // // // // request API
fetch('http://localhost:3000/api/products')
    .then(response => response.json())
    .then(data => {
        displayProducts(data);
    })


// // // // // Function who display the products on the homepage
function displayProducts(fetchedData) {

    fetchedData.forEach(product => {

        // Select the section with her ID
        let sectionItems = document.getElementById("items");

        // Link to the products pages
        let link = document.createElement("a");
        link.href = `./product.html?id=${product._id}`;
        sectionItems.appendChild(link);

        // Article
        let card = document.createElement("article")
        link.appendChild(card)

        // Image
        let image = document.createElement("img")
        image.src = product.imageUrl
        image.alt = product.altTxt
        card.appendChild(image);

        // Title
        let productName = document.createElement("h3");
        productName.className = "productName";
        productName.innerText = product.name
        card.appendChild(productName);

        // Description
        let productDescription = document.createElement("p");
        productDescription.className = "productDescription";
        productDescription.innerText = product.description
        card.appendChild(productDescription);
    });
}

