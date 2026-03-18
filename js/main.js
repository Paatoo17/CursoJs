// function saludar () {
//     console.log("Hola coder!!")
// }

// saludar()


let contenedor = document.getElementById("saludo")
contenedor.className = "header"
contenedor.innerHTML = "<h2>Hola profes soy <span>Patricio Segarra</span></h2>"



//store localStorage
function obtenerCarrito() {
    return JSON.parse(localStorage.getItem("carrito")) || {}
}
function guardarCarrito(carrito) {
    localStorage.setItem("carrito", JSON.stringify(carrito))
}

let contenedorProductos = document.getElementById("productos")
let carrito = obtenerCarrito()

fetch("../data/productos.json")
  .then(response => response.json())
  .then(productos => {

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
        </div>`

      contenedorProductos.appendChild(card)

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
          if (contador > 0) {
              contador--
              counter.innerHTML = contador

              if (contador === 0) {
                  delete carrito[producto.id]
              } else {
                  carrito[producto.id] = contador
              }

              guardarCarrito(carrito)
          }
      })

    })

  })
  .catch(error => console.log("Error cargando productos:", error))
