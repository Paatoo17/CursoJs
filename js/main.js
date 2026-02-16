// function saludar () {
//     console.log("Hola coder!!")
// }

// saludar()

 
let contenedor = document.getElementById("saludo")
contenedor.className = "header"
contenedor.innerHTML = "<h2>Hola profes soy <span>Patricio Segarra</span></h2>"


const productos= [
    {
        id: 1, 
        nombre: "Adidas campus", 
        precio: 120000
    },
    {
        id: 2, 
        nombre: "Nike air force", 
        precio: 140000
    },
    {
        id: 3, 
        nombre: "puma suede", 
        precio: 95000
    },
    {
        id: 4, 
        nombre: "vans old skool", 
        precio: 115000
    },
    {
        id: 5, 
        nombre: "dc shoes", 
        precio: 130000
    },
]




let products = document.getElementById("productos")
 	productos.forEach(producto => {
     let card = document.createElement("div")
     card.className = "card"
     card.innerHTML = `<span> ${producto.nombre}</span>
                     <h3 class="card-product">Precio: $${producto.precio}</h3>`
     products.appendChild(card)
})  