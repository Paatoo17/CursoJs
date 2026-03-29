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
    let innerHTML = "";

    Object.keys(carrito).forEach(id => {
        const producto = productos.find(p => p.id == id);
        const cantidad = carrito[id];

        if (!producto) return;

        const subtotal = producto.precio * cantidad;
        total += subtotal;

        innerHTML += `
            <div class="resumen-item">
                <img src="${producto.imagen}" alt="${producto.nombre}" class="resumen-imagen">
                <span>${producto.nombre} (x${cantidad})</span>
                <span>$${subtotal.toLocaleString()}</span>
            </div>
        `;
    });

    contenedor.innerHTML = `
        <div class="container">

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
                    ${innerHTML}
                </div>
                <div class="resumen-total">
                    <strong>Total: $${total.toLocaleString()}</strong>
                </div>
            </div>

                <button type="submit" class="btn">
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
document.addEventListener("DOMContentLoaded", function () {

    let pedido = JSON.parse(localStorage.getItem("ultimoPedido"));

    if (!pedido) return;

    let contenedor = document.getElementById("confirmacion");

    let div = document.createElement("div");
    div.className = "confirmacion-detalle";

    div.innerHTML = `
        <h3>Datos de Envío</h3>

        <div class="detail-item">
            <span>Nombre:</span>
            <strong>${pedido.cliente.nombre}</strong>
        </div>

        <div class="detail-item">
            <span>Email:</span>
            <strong>${pedido.cliente.email}</strong>
        </div>

        <div class="detail-item">
            <span>Teléfono:</span>
            <strong>${pedido.cliente.telefono}</strong>
        </div>

        <div class="detail-item">
            <span>Dirección:</span>
            <strong>${pedido.cliente.direccion}</strong>
        </div>

        <div class="detail-item">
            <span>Ciudad:</span>
            <strong>${pedido.cliente.ciudad}</strong>
        </div>

        <div class="detail-item">
            <span>Total:</span>
            <strong>$${pedido.total.toLocaleString()}</strong>
        </div>

        <div class="detail-item">
            <span>Fecha:</span>
            <strong>${pedido.fecha}</strong>
        </div>
    `;

    contenedor.appendChild(div);
});