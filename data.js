// Cargar datos guardados en el navegador o usar los predeterminados
let bulevarData = JSON.parse(localStorage.getItem("bulevarRestaurantes")) || {
    pizzeria: {
        id: "pizzeria",
        nombre: "La Pizzería Artesanal",
        categoria: "Comida Italiana",
        colorBg: "bg-amber-600",
        logo: "🍕",
        whatsapp: "573001234567",
        redes: { instagram: "@lapizzeria_bulevar" },
        menu: [
            { id: 101, nombre: "Pizza Hawaiana Mediana", precio: 35000, desc: "Jamón, piña y queso mozzarella fundido." },
            { id: 102, nombre: "Pizza Pepperoni", precio: 38000, desc: "Doble pepperoni italiano y orégano." }
        ]
    },
    asador: {
        id: "asador",
        nombre: "El Asador del Bulevar",
        categoria: "Carnes y Asados",
        colorBg: "bg-red-600",
        logo: "🥩",
        whatsapp: "573009876543",
        redes: { instagram: "@elasador_bulevar" },
        menu: [
            { id: 201, nombre: "Hamburguesa Artesanal Angus", precio: 28000, desc: "Carne 100% res, queso cheddar, tocino." }
        ]
    }
};

// Función global para guardar cambios permanentemente en este computador
function guardarBulevarDB() {
    localStorage.setItem("bulevarRestaurantes", JSON.stringify(bulevarData));
}