
// ABITSLearn - Interactividad dinamica
// Navegacion entre pantallas

document.addEventListener("DOMContentLoaded", () => {

    const pantallas = document.querySelectorAll(".view-section");

    function mostrarPantalla(id) {
        const destino = document.getElementById(id);

        if (!destino) return;

        pantallas.forEach(pantalla => {
            pantalla.hidden = pantalla.id !== id;
        });

        window.scrollTo(0, 0);
    }

    const rutas = {
        "#inicio": "pantalla-inicio",
        "#explorar": "pantalla-explorar",
        "#mis-cursos": "pantalla-area-usuario",
        "#pantalla-login": "pantalla-login",
        "#pantalla-registro": "pantalla-registro",
        "#pantalla-area-admin": "pantalla-area-admin",
        "#carrito": "pantalla-carrito"
    };

    document.querySelectorAll('a[href^="#"]').forEach(enlace => {
        enlace.addEventListener("click", evento => {
            const destino = rutas[enlace.getAttribute("href")];

            if (destino) {
                evento.preventDefault();
                mostrarPantalla(destino);
            }
        });
    });

    document.getElementById("btn-nav-login")
        ?.addEventListener("click", () => {
            mostrarPantalla("pantalla-login");
        });

    document.getElementById("btn-nav-register")
        ?.addEventListener("click", () => {
            mostrarPantalla("pantalla-registro");
        });

    mostrarPantalla("pantalla-inicio");

});
