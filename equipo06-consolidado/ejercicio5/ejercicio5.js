/**
 * EPD 3 - Ejercicio 5: Gestión de actividades deportivas en un gimnasio
 * Asignatura: Programación Avanzada
 * Responsable: Alejandro García Gutiérrez (Equipo 06)
 * Consolidación: Jonathan Javier Quishpe Maldonado
 */

// Vector de actividades deportivas del gimnasio (mínimo 10 actividades según guión)
var actividades = [
    { nombre: "Spinning", instructor: "Ana López", plazas: 15 },
    { nombre: "Yoga", instructor: "Carmen Ruiz", plazas: 12 },
    { nombre: "Pilates", instructor: "Miguel Moya", plazas: 10 },
    { nombre: "Zumba", instructor: "Laura Martín", plazas: 20 },
    { nombre: "CrossFit", instructor: "David García", plazas: 8 },
    { nombre: "Aqua Aeróbicos", instructor: "Elena Sánchez", plazas: 18 },
    { nombre: "BodyCombat", instructor: "Carlos Vega", plazas: 16 },
    { nombre: "TRX", instructor: "María González", plazas: 6 },
    { nombre: "Boxeo", instructor: "Pablo Romero", plazas: 14 },
    { nombre: "Funcional", instructor: "Sara Díaz", plazas: 12 }
];

/**
 * Recorre el vector y muestra la información de cada actividad en formato:
 * "Nombre: Instructor - Plazas disponibles"
 */
function mostrarActividades() {
    var texto = "ACTIVIDADES DISPONIBLES:\n\n";

    for (var i = 0; i < actividades.length; i++) {
        texto += actividades[i].nombre + ": " +
            actividades[i].instructor + " - " +
            actividades[i].plazas + " plazas\n";
    }

    alert(texto);
    actualizarTablaDOM();
}

/**
 * Solicita el nombre de una actividad y reduce en 1 las plazas disponibles.
 * Si no hay plazas disponibles o la actividad no existe, muestra un mensaje de error.
 */
function reservarPlaza() {
    var nombre = prompt("Introduce el nombre de la actividad para reservar:");

    if (nombre === null || nombre.trim() === "") {
        return;
    }

    var encontrada = false;

    for (var i = 0; i < actividades.length; i++) {
        if (actividades[i].nombre.toLowerCase() === nombre.trim().toLowerCase()) {
            encontrada = true;

            if (actividades[i].plazas > 0) {
                actividades[i].plazas--;
                alert("Plaza reservada con éxito en " + actividades[i].nombre + ".\nPlazas restantes: " + actividades[i].plazas);
            } else {
                alert("ERROR: No quedan plazas disponibles en " + actividades[i].nombre);
            }

            break;
        }
    }

    if (!encontrada) {
        alert("ERROR: La actividad '" + nombre + "' no existe");
    }

    actualizarTablaDOM();
}

/**
 * Solicita el nombre de una actividad e incrementa en 1 las plazas disponibles.
 * Si la actividad no existe, muestra un mensaje de error.
 */
function liberarPlaza() {
    var nombre = prompt("Introduce el nombre de la actividad para liberar plaza:");

    if (nombre === null || nombre.trim() === "") {
        return;
    }

    var encontrada = false;

    for (var i = 0; i < actividades.length; i++) {
        if (actividades[i].nombre.toLowerCase() === nombre.trim().toLowerCase()) {
            encontrada = true;
            actividades[i].plazas++;
            alert("Plaza liberada con éxito en " + actividades[i].nombre + ".\nPlazas actuales: " + actividades[i].plazas);
            break;
        }
    }

    if (!encontrada) {
        alert("ERROR: La actividad '" + nombre + "' no existe");
    }

    actualizarTablaDOM();
}

/**
 * Solicita nombre de la actividad, instructor y número de plazas, y añade la nueva actividad al array.
 */
function agregarActividad() {
    var nombre = prompt("Introduce el nombre de la nueva actividad:");
    if (nombre === null || nombre.trim() === "") {
        return;
    }

    var instructor = prompt("Introduce el nombre del instructor:");
    if (instructor === null || instructor.trim() === "") {
        return;
    }

    var plazasInput = prompt("Introduce el número inicial de plazas disponibles:");
    if (plazasInput === null) {
        return;
    }

    var plazas = parseInt(plazasInput.trim(), 10);
    if (isNaN(plazas) || plazas < 0) {
        alert("ERROR: Número de plazas incorrecto (debe ser un número entero >= 0)");
        return;
    }

    actividades.push({
        nombre: nombre.trim(),
        instructor: instructor.trim(),
        plazas: plazas
    });

    alert("Actividad '" + nombre.trim() + "' agregada correctamente con " + plazas + " plazas.");
    actualizarTablaDOM();
}

/**
 * Actualiza la tabla visual en el DOM para que el usuario pueda ver el estado actual del gimnasio.
 */
function actualizarTablaDOM() {
    var contenedor = document.getElementById("tabla-actividades");
    if (!contenedor) return;

    var html = `
        <table class="tabla-gimnasio">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Actividad</th>
                    <th>Instructor</th>
                    <th>Plazas disponibles</th>
                </tr>
            </thead>
            <tbody>
    `;

    for (var i = 0; i < actividades.length; i++) {
        var estadoPlazas = actividades[i].plazas > 0
            ? `<span class="badge-disponible">${actividades[i].plazas} plazas</span>`
            : `<span class="badge-agotado">Agotadas</span>`;

        html += `
            <tr>
                <td>${i + 1}</td>
                <td><strong>${actividades[i].nombre}</strong></td>
                <td>${actividades[i].instructor}</td>
                <td>${estadoPlazas}</td>
            </tr>
        `;
    }

    html += `</tbody></table>`;
    contenedor.innerHTML = html;
}

/**
 * Bucle interactivo principal con menú do-while tal como exige el guión.
 */
function iniciarMenuInteractivo() {
    var opcion = "";

    do {
        opcion = prompt(
            "¿Qué operación desea realizar?\n\n" +
            "1. Mostrar actividades\n" +
            "2. Reservar plaza\n" +
            "3. Liberar plaza\n" +
            "4. Agregar actividad\n" +
            "5. Salir\n\n" +
            "Opción (1-5):"
        );

        if (opcion === null || opcion.trim() === "5") {
            alert("Programa finalizado. ¡Gracias por usar la gestión de actividades!");
            break;
        }

        switch (opcion.trim()) {
            case "1":
                mostrarActividades();
                break;
            case "2":
                reservarPlaza();
                mostrarActividades();
                break;
            case "3":
                liberarPlaza();
                mostrarActividades();
                break;
            case "4":
                agregarActividad();
                mostrarActividades();
                break;
            default:
                alert("ERROR: Opción incorrecta. Debe introducir un valor del 1 al 5.");
                break;
        }

    } while (opcion !== "5");
}

// Inicialización de la vista al cargar
window.addEventListener("DOMContentLoaded", function () {
    actualizarTablaDOM();

    // Si no se deshabilita por query param, lanza el menú tras medio segundo
    var params = new URLSearchParams(window.location.search);
    if (!params.has("noprompt")) {
        setTimeout(iniciarMenuInteractivo, 300);
    }
});
