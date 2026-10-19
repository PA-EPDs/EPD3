/**
 * EPD 3 - Ejercicio 6: Validación de Reservas vía Código QR
 * Asignatura: Programación Avanzada
 * Responsable: Coraima Fernández Castillo (Equipo 06)
 * Consolidación: Jonathan Javier Quishpe Maldonado
 */

/**
 * Parsea los parámetros de consulta de una URL dada.
 *
 * @param {string} url - URL completa o cadena de consulta.
 * @returns {Object} Diccionario con los parámetros encontrados.
 */
function extraerParametrosURL(url) {
    var params = {};
    if (!url || typeof url !== "string") {
        return params;
    }

    var indiceInterrogacion = url.indexOf("?");
    var queryString = indiceInterrogacion !== -1 ? url.substring(indiceInterrogacion + 1) : url;
    var pares = queryString.split("&");

    for (var i = 0; i < pares.length; i++) {
        var partes = pares[i].split("=");
        if (partes.length === 2) {
            params[decodeURIComponent(partes[0].trim().toLowerCase())] = decodeURIComponent(partes[1].trim());
        }
    }

    return params;
}

/**
 * Procesa la URL de reserva, valida cada parámetro y genera la tabla de resultados.
 *
 * @param {string} url - URL escaneada del código QR.
 */
function procesarReserva(url) {
    var contenedor = document.getElementById("resultado");
    if (!contenedor) return;

    if (!url || url.trim() === "") {
        contenedor.innerHTML = `
            <div class="alerta-error">
                <h3>Lectura cancelada</h3>
                <p>No se ha introducido ninguna URL de reserva.</p>
            </div>
        `;
        return;
    }

    var params = extraerParametrosURL(url);

    var actividad = params["actividad"] || "";
    var duracionRaw = params["duracion"] || "";
    var participanteRaw = params["id_participante"] || params["participante"] || "";

    var duracion = parseInt(duracionRaw, 10);
    var participante = parseInt(participanteRaw, 10);

    // 1. Validar actividad
    var actividadesPermitidas = ["spinning", "yoga", "pilates", "zumba", "crossfit", "aqua", "bodycombat", "trx"];
    var validarActividad = "Correcta";

    if (actividad === "" || actividadesPermitidas.indexOf(actividad.toLowerCase()) === -1) {
        validarActividad = "Incorrecto - Actividad no reconocida";
    }

    // 2. Validar duración (entre 30 y 120 minutos)
    var validarDuracion = "Correcta";
    if (isNaN(duracion)) {
        validarDuracion = "Incorrecto - Duración no numérica";
    } else if (duracion > 120) {
        validarDuracion = "Incorrecto - Duración máxima excedida";
    } else if (duracion < 30) {
        validarDuracion = "Incorrecto - Duración mínima no alcanzada";
    }

    // 3. Validar participante (número entre 1 y 50 inclusive)
    var validarParticipante = "Correcta";
    if (isNaN(participante) || participante < 1 || participante > 50) {
        validarParticipante = "Incorrecto";
    }

    // 4. Calcular coste total si todas las validaciones son correctas
    var coste = 1.50; // Coste base
    var esValida = (validarActividad === "Correcta" &&
                    validarDuracion === "Correcta" &&
                    validarParticipante === "Correcta");

    var estadoFinal = esValida ? "RESERVA REALIZADA" : "RESERVA RECHAZADA";

    if (esValida) {
        // Si la duración es mayor a 30 min: +0.50 €
        if (duracion > 30) {
            coste += 0.50;
        }

        // Si el identificador del participante está entre 1 y 15 (inclusive): descuento 10%
        if (participante >= 1 && participante <= 15) {
            coste = coste * 0.90;
        }
    }

    // 5. Construir y mostrar la tabla de resultados
    var html = `
        <div class="tarjeta-resultado">
            <h3 style="color: #1f4e79; margin-bottom: 15px;">Resultado de la reserva</h3>
            <p style="font-size: 13px; color: #555; margin-bottom: 12px; word-break: break-all;">
                <strong>URL analizada:</strong> <code>${url}</code>
            </p>

            <table class="tabla-reserva">
                <thead>
                    <tr>
                        <th>Parámetro</th>
                        <th>Valor</th>
                        <th>Validación</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><strong>Actividad</strong></td>
                        <td>${actividad || "<em>(vacío)</em>"}</td>
                        <td class="${validarActividad === "Correcta" ? "val-ok" : "val-err"}">${validarActividad}</td>
                    </tr>
                    <tr>
                        <td><strong>Duración</strong></td>
                        <td>${isNaN(duracion) ? (duracionRaw || "<em>(vacío)</em>") : duracion}</td>
                        <td class="${validarDuracion === "Correcta" ? "val-ok" : "val-err"}">${validarDuracion}</td>
                    </tr>
                    <tr>
                        <td><strong>Identificador del participante</strong></td>
                        <td>${isNaN(participante) ? (participanteRaw || "<em>(vacío)</em>") : participante}</td>
                        <td class="${validarParticipante === "Correcta" ? "val-ok" : "val-err"}">${validarParticipante}</td>
                    </tr>
                    <tr class="${esValida ? "fila-aceptada" : "fila-rechazada"}">
                        <td><strong>Coste total</strong></td>
                        <td><strong>${esValida ? coste.toFixed(2) + " €" : ""}</strong></td>
                        <td><strong>${estadoFinal}</strong></td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;

    contenedor.innerHTML = html;
}

/**
 * Solicita la URL mediante prompt() simulando el escaneo del código QR.
 */
function simularLecturaQR() {
    var urlDefecto = "http://gympa.upo/reserva?actividad=spinning&duracion=45&id_participante=15";
    var url = prompt("Simulación de lector QR:\n\nIntroduce la URL del código QR escaneado:", urlDefecto);
    if (url === null) return;
    procesarReserva(url);
}

/**
 * Carga directa de los ejemplos oficiales del guión.
 */
function cargarEjemploQR(tipo) {
    var url = (tipo === 1)
        ? "http://gympa.upo/reserva?actividad=spinning&duracion=45&id_participante=15"
        : "http://gympa.upo/reserva?actividad=ballet&duracion=121&id_participante=51";
    procesarReserva(url);
}

// Ejecución automática al cargar si no se desactiva
window.addEventListener("DOMContentLoaded", function () {
    var params = new URLSearchParams(window.location.search);
    if (!params.has("noprompt")) {
        simularLecturaQR();
    }
});
