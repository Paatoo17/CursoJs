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
            crearCardProducto(producto)
        })
    })

function crearCardProducto(producto) {
    let card = document.createElement("div")
    card.className = "card"
    card.dataset.productoId = producto.id

    actualizarContenidoCard(card, producto)
    contenedorProductos.appendChild(card)

    agregarEventosACard(card, producto.id)
}

function actualizarContenidoCard(card, producto) {
    let contadorActual = carrito[producto.id] || 0

    card.innerHTML =
        `<div class="card">
      <img src="${producto.imagen}" class="card-imagen" alt="${producto.nombre}">
        <div class="card-body">
          <h3 class="card-title">${producto.nombre}</h3>
          <h3 class="card-precio">$ ${producto.precio}</h3>
                <div class="contador-container">
                    ${contadorActual === 0
            ? `<button class="btn" data-id="${producto.id}">Agregar al carrito</button>`
            : `
                            <button class="restar-boton">-</button>
                            <span class="contador">${contadorActual}</span>
                            <button class="sumar-boton">+</button>
                          `
        }
            </div>
      </div>
    </div>`
}

function agregarEventosACard(card, productoId) {
    card.addEventListener("click", function (e) {
        if (e.target.classList.contains("btn")) {
            carrito[productoId] = 1
            guardarCarrito(carrito)
            actualizarCard(productoId)
            Toastify({
                text: `Producto agregado al carrito`,
                duration: 3000,
                gravity: "top",
                position: "right",
                style: {
                    background: "linear-gradient(to right, #00b032ff, #01C535ff)",
                }
            }).showToast()
        }

        if (e.target.classList.contains("sumar-boton")) {
            let counter = card.querySelector(".contador")
            let contador = parseInt(counter.innerHTML) + 1
            counter.innerHTML = contador
            carrito[productoId] = contador
            guardarCarrito(carrito)
        }

        if (e.target.classList.contains("restar-boton")) {
            let counter = card.querySelector(".contador")
            let contador = parseInt(counter.innerHTML)
            if (contador > 0) {
                contador--
                counter.innerHTML = contador

                if (contador === 0) {
                    delete carrito[productoId]
                } else {
                    carrito[productoId] = contador
                }
                guardarCarrito(carrito)
                setTimeout(() => actualizarCard(productoId), 100)
            }
        }
    })
}

function actualizarCard(productoId) {
    let card = document.querySelector(`[data-producto-id="${productoId}"]`)
    if (card) {
        fetch("../data/productos.json")
            .then(response => response.json())
            .then(productos => {
                let producto = productos.find(p => p.id === productoId)
                if (producto) {
                    actualizarContenidoCard(card, producto)
                }
            })
    }
}

