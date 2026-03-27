async function obtenerProductos() {
    const res = await fetch("../data/productos.json");
    return await res.json();
}

function cargarCarrito() {
    return JSON.parse(localStorage.getItem('carrito')) || {};
}

function guardarCarrito(carrito) {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function vaciarCarrito() {
    localStorage.removeItem('carrito');
    renderCart();

    Toastify({
        text: "Vaciaste tu carrito",
        duration: 2500,
        gravity: "top",
        position: "right",
        style: {
            background: "linear-gradient(to right, #ef4444, #eb2b2b)"
        }
    }).showToast();
}

async function renderCart() {
    const carrito = cargarCarrito();
    const productos = await obtenerProductos();
    const container = document.getElementById('cart-container');

    container.innerHTML = '';
    let total = 0;

    let carritoVacio = Object.keys(carrito).length === 0;

    if (carritoVacio) {
        container.innerHTML =
            '<div class="empty-cart"><p>Tu carrito está vacío</p></div>';

        document.getElementById('total-row').style.display = 'none';
        return;
    }

    document.getElementById('total-row').style.display = 'flex';

    Object.keys(carrito).forEach(id => {
        const producto = productos.find(p => p.id == id);
        const cantidad = carrito[id];

        if (!producto) return;

        const subtotal = producto.precio * cantidad;
        total += subtotal;

        let div = document.createElement("div");
        div.className = "cart-item";

        div.innerHTML = `
            <div class="cart-item-image">
                <img src="${producto.imagen}" alt="${producto.nombre}">
            </div>
            <div class="cart-item-info">
                <h3 class="card-title">${producto.nombre}</h3>
                <p class="card-precio">$${producto.precio.toLocaleString()}</p>
            </div>
            <div class="cart-item-carrito">
                <button class="restar-boton">-</button>
                <span class="contador">${cantidad}</span>
                <button class="sumar-boton">+</button>
            </div>
            <div class="cart-item-subtotal">$${subtotal.toLocaleString()}</div>
        `;

        container.appendChild(div);

        let botonSumar = div.querySelector(".sumar-boton");
        let botonRestar = div.querySelector(".restar-boton");

        botonSumar.addEventListener("click", () => {
            let carrito = cargarCarrito();
            let contador = carrito[id] || 0;

            contador++;
            carrito[id] = contador;

            guardarCarrito(carrito);
            renderCart();
        });

        botonRestar.addEventListener("click", () => {
            let carrito = cargarCarrito();
            let contador = carrito[id] || 0;

            if (contador > 1) {
                contador--;
                carrito[id] = contador;
            } else {
                delete carrito[id];
            }

            guardarCarrito(carrito);
            renderCart();
        });
    });

    document.getElementById('cart-total').textContent =
        `$${total.toLocaleString()}`;
}

document.addEventListener('DOMContentLoaded', () => {
    document
        .getElementById('vaciar-carrito')
        .addEventListener("click", vaciarCarrito);

    renderCart();
});