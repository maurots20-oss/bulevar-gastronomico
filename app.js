// Base de datos simulada de menús por restaurante y sus números de WhatsApp
const datosRestaurantes = {
    pizzeria: {
        nombre: "La Pizzería Artesanal",
        whatsapp: "573001234567", // Reemplazar por el número real del local
        menu: [
            { id: 1, nombre: "Pizza Hawaiana Mediana", precio: 35000, desc: "Jamón, piña y queso mozzarella fundido." },
            { id: 2, nombre: "Pizza Pepperoni", precio: 38000, desc: "Doble pepperoni italiano y orégano." },
            { id: 3, nombre: "Gaseosa 1.5 Litros", precio: 7000, desc: "Manzana o 4 Espíritus." }
        ]
    },
    asador: {
        nombre: "El Asador del Bulevar",
        whatsapp: "573009876543",
        menu: [
            { id: 4, nombre: "Hamburguesa Artesanal Angus", precio: 28000, desc: "Carne 100% res, queso cheddar, tocino crujiente." },
            { id: 5, nombre: "Picada Familiar (2 Personas)", precio: 65000, desc: "Carne de res, cerdo, chorizo, arepa y papas criollas." },
            { id: 6, nombre: "Cerveza Artesanal Rubia", precio: 10000, desc: "Botella 330ml fría." }
        ]
    }
};

let carrito = [];
let localActual = null;
let numeroMesa = "1";

// Inicializar la página de restaurante al cargar
window.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const tipoLocal = params.get("local") || "pizzeria";
    numeroMesa = params.get("mesa") || "General";

    localActual = datosRestaurantes[tipoLocal];

    if (localActual) {
        document.getElementById("titulo-restaurante").innerText = localActual.nombre;
        document.getElementById("badge-mesa").innerText = `Mesa: #${numeroMesa}`;
        renderizarMenu();
    }
});

function renderizarMenu() {
    const container = document.getElementById("menu-container");
    container.innerHTML = "";

    localActual.menu.forEach(item => {
        container.innerHTML += `
            <div class="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center">
                <div>
                    <h3 class="font-bold text-gray-800">${item.nombre}</h3>
                    <p class="text-sm text-gray-500 my-1">${item.desc}</p>
                    <p class="text-amber-600 font-semibold">$${item.precio.toLocaleString()}</p>
                </div>
                <button onclick="agregarAlCarrito(${item.id})" class="bg-amber-100 hover:bg-amber-200 text-amber-800 font-bold px-4 py-2 rounded-lg transition">
                    + Agregar
                </button>
            </div>
        `;
    });
}

function agregarAlCarrito(id) {
    const plato = localActual.menu.find(p => p.id === id);
    const itemCarrito = carrito.find(p => p.id === id);

    if (itemCarrito) {
        itemCarrito.cantidad += 1;
    } else {
        carrito.push({ ...plato, cantidad: 1 });
    }

    actualizarCarritoUI();
}

function actualizarCarritoUI() {
    const barra = document.getElementById("carrito-bar");
    const totalElemento = document.getElementById("total-precio");

    if (carrito.length > 0) {
        barra.classList.remove("hidden");
        const total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
        totalElemento.innerText = `$${total.toLocaleString()}`;
    } else {
        barra.classList.add("hidden");
    }
}

function enviarPedidoWhatsApp() {
    let mensaje = `🛎️ *NUEVO PEDIDO - MESA #${numeroMesa}* \n`;
    mensaje += `📍 *Restaurante:* ${localActual.nombre}\n\n`;
    mensaje += `*Detalle del pedido:*\n`;

    let total = 0;
    carrito.forEach(item => {
        const subtotal = item.precio * item.cantidad;
        total += subtotal;
        mensaje += `• ${item.cantidad}x ${item.nombre} - $${subtotal.toLocaleString()}\n`;
    });

    mensaje += `\n💰 *TOTAL ESTIMADO: $${total.toLocaleString()}*`;
    mensaje += `\n\n_Pedido generado digitalmente desde el Bulevar._`;

    // Codificar mensaje para URL de WhatsApp
    const urlWhatsApp = `https://wa.me/${localActual.whatsapp}?text=${encodeURIComponent(mensaje)}`;
    
    // Abrir WhatsApp en una pestaña nueva
    window.open(urlWhatsApp, "_blank");
}