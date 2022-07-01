// const xhr = new XMLHttpRequest();

// xhr.open('GET', 'http://localhost:3000/api/products');

// xhr.responseType = 'json';

// xhr.onload = function(){
//     // console.log(JSON.parse(xhr.response));  
//     console.log(xhr.response);
// } 

// xhr.send();

// <a href="./product.html?id=42">
//     <article>
//       <img src=".../product01.jpg" alt="Lorem ipsum dolor sit amet, Kanap name1">
//       <h3 class="productName">Kanap name1</h3>
//       <p class="productDescription">Dis enim malesuada risus sapien gravida nulla nisl arcu. Dis enim malesuada risus sapien gravida nulla nisl arcu.</p>
//     </article>
//   </a>

fetch('http://localhost:3000/api/products')
    .then(response => response.json())
    .then(data => {
        displayProducts (data);

        console.log(data)})

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



    });
}

