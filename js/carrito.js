
function cargarCarrito(){
    return JSON.parse(localStorage.getItem('carrito')) || {};
}

async function obtenerProductos(){
    const res = await fetch("../data/productos.json");
    return await res.json();
}

async function renderCart(){
    const carrito = cargarCarrito();
    const productos = await obtenerProductos();

    const tbody = document.getElementById('cart-body');
    const empty = document.getElementById('empty');
    const table = document.querySelector('.cart-list');

    tbody.innerHTML = '';

    const ids = Object.keys(carrito);

    if(ids.length === 0){
        empty.hidden = false;
        table.style.display = 'none';
        document.getElementById('cart-total').textContent = '$0';
        return;
    }

    empty.hidden = true;
    table.style.display = '';

    let total = 0;

    ids.forEach(id => {
        const producto = productos.find(p => p.id == id);
        const qty = carrito[id];

        if(!producto) return;

        const subtotal = producto.precio * qty;
        total += subtotal;

        const tr = document.createElement('tr');

        tr.innerHTML = `
            <td>${producto.nombre}</td>
            <td>${qty}</td>
            <td>$${producto.precio}</td>
            <td class="right">$${subtotal}</td>
        `;

        tbody.appendChild(tr);
    });

    document.getElementById('cart-total').textContent = `$${total}`;
}

renderCart();