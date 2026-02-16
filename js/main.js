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
//store localStorage
function obtenerCarrito() {
    return JSON.parse(localStorage.getItem("carrito")) || {}
}
function guardarCarrito(carrito) {
    localStorage.setItem("carrito", JSON.stringify(carrito))
}

let products = document.getElementById("productos")
let carrito = obtenerCarrito()

productos.forEach(producto => {

    let card = document.createElement("div")
    card.className = "card"

    card.innerHTML = `
        <span>${producto.nombre}</span>
        <h3 class="card-product">Precio: $${producto.precio}</h3> 
     <div class="contador-container">
        <button class="restar-boton">-</button>
        <span class="contador">0</span>
        <button class="sumar-boton">+</button>
    </div>  `
    products.appendChild(card)

let sumar = card.querySelector(".sumar-boton")
let restar = card.querySelector(".restar-boton")
let counter = card.querySelector(".contador")
let contador = carrito[producto.id] || 0
    counter.innerHTML = contador

    sumar.addEventListener("click", () => {
        contador++
        counter.innerHTML = contador
        carrito[producto.id] = contador
        guardarCarrito(carrito)
    })

    restar.addEventListener("click", () => {
        if (contador === 0) {
            delete carrito[producto.id]
        } else {
            carrito[producto.id] = contador
        }

        guardarCarrito(carrito)
    })
})
