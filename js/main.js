
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
// Buscador dinamico de cursos

document.addEventListener("DOMContentLoaded", () => {

    const buscador = document.getElementById("input-busqueda");
    const cursos = document.querySelectorAll(".course-card");

    function filtrarCursos() {
        const busqueda = buscador.value.toLowerCase().trim();

        cursos.forEach(curso => {
            const nombre = curso.querySelector("h3")
                .textContent.toLowerCase();

            const coincide = nombre.includes(busqueda);

            curso.hidden = !coincide;
            curso.style.display = coincide ? "" : "none";
        });
    }

    buscador?.addEventListener("input", filtrarCursos);

});
// Carrito de compras dinamico

document.addEventListener("DOMContentLoaded", () => {

    const catalogo = {
        js: {
            nombre: "JavaScript para principiantes",
            precio: 200,
            imagen: "./assets/javascript.png"
        },
        python: {
            nombre: "Python para principiantes",
            precio: 200,
            imagen: "./assets/python.png"
        },
        c: {
            nombre: "C para principiantes",
            precio: 200,
            imagen: "./assets/c_logo.png"
        }
    };

    const contenedor = document.querySelector(".cart-items");
    const resumen = document.querySelector(".cart-summary");

    if (!contenedor || !resumen) return;

    let carrito = [];

    try {
        const guardado = JSON.parse(
            localStorage.getItem("abitslearn-carrito") || "[]"
        );

        if (Array.isArray(guardado)) {
            carrito = [...new Set(guardado)]
                .filter(id => Object.hasOwn(catalogo, id));
        }
    } catch {
        carrito = [];
    }

    const botonPago = resumen.querySelector("button");

    function guardarCarrito() {
        try {
            localStorage.setItem(
                "abitslearn-carrito",
                JSON.stringify(carrito)
            );
        } catch {
            console.warn("No se pudo guardar el carrito.");
        }
    }

    function actualizarCarrito() {

        contenedor.querySelectorAll(".cart-item, .cart-empty")
            .forEach(elemento => elemento.remove());

        if (carrito.length === 0) {
            const mensaje = document.createElement("p");
            mensaje.className = "cart-empty";
            mensaje.textContent = "Tu carrito esta vacio.";
            contenedor.appendChild(mensaje);
        }

        carrito.forEach(id => {

            const curso = catalogo[id];
            const tarjeta = document.createElement("article");

            tarjeta.className = "cart-item";

            tarjeta.innerHTML = `
                <img src="${curso.imagen}"
                     alt="${curso.nombre}"
                     class="cart-item-img">

                <div class="cart-item-info">
                    <h4 class="cart-item-title">
                        ${curso.nombre}
                    </h4>
                    <span class="cart-item-price">
                        ${curso.precio} MX$
                    </span>
                </div>

                <button type="button" class="btn btn-danger">
                    Eliminar
                </button>
            `;

            tarjeta.querySelector("button")
                .addEventListener("click", () => {
                    carrito = carrito.filter(item => item !== id);
                    guardarCarrito();
                    actualizarCarrito();
                });

            contenedor.appendChild(tarjeta);
        });

        const subtotal = carrito.reduce(
            (total, id) => total + catalogo[id].precio, 0
        );

        const descuento = subtotal * 0.25;
        const total = subtotal - descuento;

        resumen.querySelector(".summary-row span:last-child")
            .textContent = subtotal + " MX$";

        resumen.querySelector(".discount span:last-child")
            .textContent = "-" + descuento + " MX$";

        resumen.querySelector(".summary-total span:last-child")
            .textContent = total + " MX$";

        botonPago.disabled = carrito.length === 0;
    }

    function abrirCarrito() {
        document.querySelectorAll(".view-section")
            .forEach(pantalla => {
                pantalla.hidden =
                    pantalla.id !== "pantalla-carrito";
            });

        actualizarCarrito();
        window.scrollTo(0, 0);
    }

    document.querySelectorAll(".btn-add-cart")
        .forEach(boton => {

            boton.addEventListener("click", () => {

                const id = boton.dataset.curso;

                if (!Object.hasOwn(catalogo, id)) return;

                if (carrito.includes(id)) {
                    alert("Este curso ya esta en tu carrito.");
                    return;
                }

                carrito.push(id);
                guardarCarrito();
                actualizarCarrito();

                if (confirm("Curso agregado. ¿Deseas ver tu carrito?")) {
                    abrirCarrito();
                }
            });
        });

    document.querySelectorAll("#pantalla-area-usuario button")
        .forEach(boton => {
            if (boton.textContent.trim() === "Ver carrito") {
                boton.addEventListener("click", abrirCarrito);
            }
        });

    botonPago.addEventListener("click", () => {

        if (carrito.length === 0) return;

        if (confirm("¿Deseas confirmar el pago simulado?")) {
            carrito = [];
            guardarCarrito();
            actualizarCarrito();
            alert("Compra de demostracion completada.");
        }
    });

    actualizarCarrito();

});
// Paneles interactivos y ventanas modales

document.addEventListener("DOMContentLoaded", () => {

    const modal = document.createElement("div");

    modal.className = "modal";
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-labelledby", "modal-titulo");
    modal.setAttribute("aria-hidden", "true");

    modal.innerHTML = `
        <div class="modal-content">
            <h2 id="modal-titulo"></h2>
            <p id="modal-mensaje"
               style="margin: 1rem 0;"></p>
            <button type="button"
                    class="btn btn-primary">
                Cerrar
            </button>
        </div>
    `;

    document.body.appendChild(modal);

    const cerrar = modal.querySelector("button");
    let elementoAnterior = null;

    function abrirModal(titulo, mensaje) {

        elementoAnterior = document.activeElement;

        modal.querySelector("#modal-titulo")
            .textContent = titulo;

        modal.querySelector("#modal-mensaje")
            .textContent = mensaje;

        modal.classList.add("active");
        modal.setAttribute("aria-hidden", "false");

        cerrar.focus();
    }

    function cerrarModal() {
        modal.classList.remove("active");
        modal.setAttribute("aria-hidden", "true");
        elementoAnterior?.focus();
    }

    cerrar.addEventListener("click", cerrarModal);

    modal.addEventListener("click", evento => {
        if (evento.target === modal) {
            cerrarModal();
        }
    });

    document.addEventListener("keydown", evento => {
        if (!modal.classList.contains("active")) return;

        if (evento.key === "Escape") {
            cerrarModal();
        }

        if (evento.key === "Tab") {
            evento.preventDefault();
            cerrar.focus();
        }
    });

    // Enlaces informativos

    const informacion = {
        "#nosotros": [
            "Sobre nosotros",
            "ABITSLearn es una plataforma educativa enfocada en el aprendizaje de la programacion."
        ],
        "#certificados": [
            "Certificados",
            "Completa tus cursos para obtener certificados."
        ],
        "#soporte": [
            "Soporte",
            "Bienvenido al centro de ayuda de ABITSLearn."
        ],
        "#recuperar-password": [
            "Recuperar contraseña",
            "La recuperacion de contraseña requiere un servicio de autenticacion."
        ]
    };

    document.querySelectorAll('a[href^="#"]')
        .forEach(enlace => {

            const datos = informacion[
                enlace.getAttribute("href")
            ];

            if (!datos) return;

            enlace.addEventListener("click", evento => {
                evento.preventDefault();
                abrirModal(datos[0], datos[1]);
            });
        });

    // Herramientas del usuario

    document.querySelectorAll("#pantalla-area-usuario button")
        .forEach(boton => {

            const nombre = boton.textContent.trim();

            if (nombre === "Ver carrito") return;

            boton.addEventListener("click", () => {
                abrirModal(
                    nombre,
                    "Esta herramienta forma parte del prototipo de ABITSLearn. Su funcionamiento completo requiere servicios adicionales."
                );
            });
        });

    // Herramientas del administrador

    document.querySelectorAll("#pantalla-area-admin button")
        .forEach(boton => {

            boton.addEventListener("click", () => {

                const nombre = boton.textContent.trim();

                abrirModal(
                    nombre,
                    "Modulo administrativo de demostracion. No se realizaran cambios en datos reales."
                );
            });
        });

});
