function cargarCarrito() {
    return JSON.parse(localStorage.getItem('carrito')) || {};
}

async function obtenerProductos() {
    const res = await fetch("../data/productos.json");
    return await res.json();
}

async function renderCheckout() {
    const carrito = cargarCarrito();
    const productos = await obtenerProductos();

    const contenedor = document.getElementById("checkout");
    contenedor.className = "contenedor-checkout";

    let total = 0;
    let itemsHTML = "";

    Object.keys(carrito).forEach(id => {
        const producto = productos.find(p => p.id == id);
        const cantidad = carrito[id];

        if (!producto) return;

        const subtotal = producto.precio * cantidad;
        total += subtotal;

        itemsHTML += `
            <div class="resumen-item">
                <img src="${producto.imagen}" alt="${producto.nombre}" class="resumen-img">
                <span>${producto.nombre} (x${cantidad})</span>
                <span>$${subtotal.toLocaleString()}</span>
            </div>
        `;
    });

    contenedor.innerHTML = `
        <div class="checkout-container">

            <form id="checkout-form" class="checkout-form">
                <h2> Datos de comprador </h2>

                <div class="form-group">
                    <label>Nombre Completo *</label>
                    <input type="text" name="nombre" required placeholder="Ej: Patricio Segarra">
                </div>

                <div class="form-group">
                    <label>Email *</label>
                    <input type="email" name="email" required placeholder="Ej: patricio@example.com">
                </div>

                <div class="form-group">
                    <label>Tarjeta *</label>
                    <input type="text" name="tarjeta" required placeholder="Ej: 1234-5678-9012-3456">
                </div>

                <div class="form-group">
                    <label>Teléfono *</label>
                    <input type="tel" name="telefono" required placeholder="Ej: 4545-7890">
                </div>

                <div class="form-group">
                    <label>Dirección *</label>
                    <input type="text" name="direccion" required placeholder="Ej: Calle 123, Ciudad">
                </div>

                <div class="form-group">
                    <label>Ciudad *</label>
                    <input type="text" name="ciudad" required placeholder="Ej: Buenos Aires">
                </div>

                            <div class="resumen-carrito">
                <h3>Resumen de compra</h3>
                <div class="resumen-items">
                    ${itemsHTML}
                </div>
                <div class="resumen-total">
                    <strong>Total: $${total.toLocaleString()}</strong>
                </div>
            </div>

                <button type="submit" class="btn-pagar">
                    Finalizar Compra
                </button>
            </form>


            <div class="volver-carrito">
                <a href="./carrito.html">← Volver al carrito</a>
            </div>

        </div>
    `;

    let form = document.getElementById("checkout-form");
    form.addEventListener("submit", procesarCompra);
}

async function procesarCompra(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const datos = Object.fromEntries(formData);

    const carrito = cargarCarrito();
    const productos = await obtenerProductos();

    let total = 0;

    Object.keys(carrito).forEach(id => {
        const producto = productos.find(p => p.id == id);
        if (!producto) return;

        total += producto.precio * carrito[id];
    });


    const pedido = {
        cliente: datos,
        productos: carrito,
        total: total,
        fecha: new Date().toLocaleString()
    };

    localStorage.setItem("ultimoPedido", JSON.stringify(pedido));

    localStorage.removeItem("carrito");

    Toastify({
        text: "¡Compra realizada con éxito! 🎉",
        duration: 4000,
        gravity: "top",
        position: "right",
        style: {
            background: "#10b981"
        }
    }).showToast();

    setTimeout(() => {
        window.location.href = "./confirmacion.html";
    }, 2000);
}

document.addEventListener("DOMContentLoaded", renderCheckout);