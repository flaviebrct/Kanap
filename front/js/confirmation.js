// Get the id in the url 
const id = location.search.split('id=')[1]
// modify the DOM
let spanId = document.getElementById("orderId")
spanId.innerHTML = id
//Remove basket after the order
localStorage.removeItem("basket")