
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
// Validacion de registro e inicio de sesion

document.addEventListener("DOMContentLoaded", () => {

    const registro = document.getElementById("form-registro");
    const login = document.getElementById("form-login");

    registro?.addEventListener("submit", evento => {
        evento.preventDefault();

        const usuario = document.getElementById("reg-username").value.trim();
        const correo = document.getElementById("reg-email");
        const password = document.getElementById("reg-password").value;

        if (usuario.length < 3) {
            alert("El usuario debe tener al menos 3 caracteres.");
            return;
        }

        if (!correo.checkValidity()) {
            alert("Ingresa un correo electronico valido.");
            return;
        }

        if (password.length < 6) {
            alert("La contraseña debe tener al menos 6 caracteres.");
            return;
        }

        alert("Registro de demostracion completado.");

        registro.reset();

        document.getElementById("log-username").value = usuario;
        document.getElementById("btn-nav-login")?.click();
    });

    login?.addEventListener("submit", evento => {
        evento.preventDefault();

        const usuario = document.getElementById("log-username").value.trim();
        const password = document.getElementById("log-password").value;

        if (usuario.length < 3 || password.length < 6) {
            alert("Revisa tu usuario y contraseña.");
            return;
        }

        alert("Bienvenido a ABITSLearn, " + usuario + ". Acceso de demostracion.");

        login.reset();

        document.querySelector('a[href="#mis-cursos"]')?.click();
    });

});
