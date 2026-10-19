/**
 * EPD 3 - Ejercicio 3: Procesamiento de códigos de actividades deportivas
 * Asignatura: Programación Avanzada
 * Responsable: Paola Lillo Jiménez (Equipo 06)
 * Consolidación: Jonathan Javier Quishpe Maldonado
 */

/**
 * Procesa un código de actividad deportiva según las reglas del guión:
 * - Posición 0: par -> Mayúscula (según especificación del ejemplo oficial).
 * - Para posiciones i > 0:
 *   * Múltiplos de 5: Reemplazar por asterisco '*' (prioridad alta).
 *   * Múltiplos de 3: Minúscula (prioridad sobre par).
 *   * Posiciones pares: Mayúscula.
 *   * Resto de posiciones: Sin cambio.
 *
 * Emplea obligatoriamente el método charAt() para recuperar caracteres.
 *
 * @param {string} codigo - Cadena de entrada.
 * @returns {string} Cadena procesada.
 */
function procesarCodigo(codigo) {
    if (typeof codigo !== "string") {
        return "";
    }

    let resultado = "";
    for (let i = 0; i < codigo.length; i++) {
        let caracter = codigo.charAt(i);

        if (i === 0) {
            // Posición 0: par -> mayúscula (según ejemplo: Posición 0 (n): par : N)
            caracter = caracter.toUpperCase();
        } else if (i % 5 === 0) {
            // Múltiplos de 5: reemplazo por '*' (prioridad sobre par, ej. pos 10)
            caracter = "*";
        } else if (i % 3 === 0) {
            // Múltiplos de 3: minúscula (prioridad sobre par, ej. pos 6)
            caracter = caracter.toLowerCase();
        } else if (i % 2 === 0) {
            // Posiciones pares: mayúscula
            caracter = caracter.toUpperCase();
        }

        resultado += caracter;
    }

    return resultado;
}

/**
 * Genera el desglose paso a paso carácter por carácter para visualización en pantalla.
 *
 * @param {string} codigoOriginal - Cadena inicial.
 * @param {string} codigoProcesado - Cadena resultante.
 * @returns {string} HTML con el desglose.
 */
function generarExplicacion(codigoOriginal, codigoProcesado) {
    let html = `<table class="tabla-desglose">
        <thead>
            <tr>
                <th>Posición</th>
                <th>Carácter</th>
                <th>Regla aplicada</th>
                <th>Resultado</th>
            </tr>
        </thead>
        <tbody>`;

    for (let i = 0; i < codigoOriginal.length; i++) {
        const orig = codigoOriginal.charAt(i);
        const res = codigoProcesado.charAt(i);
        let regla = "";

        if (i === 0) {
            regla = "Posición 0 (par) &rarr; Mayúscula";
        } else if (i % 5 === 0 && i % 2 === 0) {
            regla = "Par + Múltiplo de 5 &rarr; '*' (prioridad asterisco)";
        } else if (i % 5 === 0) {
            regla = "Múltiplo de 5 &rarr; '*' (asterisco)";
        } else if (i % 3 === 0 && i % 2 === 0) {
            regla = "Par + Múltiplo de 3 &rarr; Minúscula (prioridad minúscula)";
        } else if (i % 3 === 0) {
            regla = "Múltiplo de 3 &rarr; Minúscula";
        } else if (i % 2 === 0) {
            regla = "Posición par &rarr; Mayúscula";
        } else {
            regla = "No cumple reglas &rarr; Sin cambio";
        }

        html += `<tr>
            <td><strong>Posición ${i}</strong></td>
            <td><code>${orig}</code></td>
            <td>${regla}</td>
            <td><code><strong>${res}</strong></code></td>
        </tr>`;
    }

    html += "</tbody></table>";
    return html;
}

/**
 * Solicita el código al usuario mediante prompt(), procesa y muestra alerta y tabla.
 */
function ejecutarEjercicio3() {
    const codigo = prompt("Introduce el código de la actividad deportiva:", "natacion2025");
    if (codigo === null) return; // Cancelado por el usuario

    if (codigo.trim() === "") {
        alert("ERROR: La cadena no puede estar vacía.");
        return;
    }

    const resultado = procesarCodigo(codigo);

    // Requisito del guión: Imprima en una alerta el resultado obtenido
    alert("Resultado obtenido:\n\n" + resultado);

    // Visualización en pantalla
    const contenedor = document.getElementById("resultado");
    if (contenedor) {
        contenedor.innerHTML = `
            <div class="tarjeta-resultado">
                <h3>Resultado del procesamiento</h3>
                <p><strong>Entrada original:</strong> <code>${codigo}</code></p>
                <p><strong>Salida obtenida:</strong> <code class="res-destacado">${resultado}</code></p>

                <h3 style="margin-top: 20px;">Explicación detallada por posición:</h3>
                ${generarExplicacion(codigo, resultado)}
            </div>
        `;
    }
}

/**
 * Carga directa del ejemplo del guión ('natacion2025' -> 'NAtAc*On2025').
 */
function probarEjemploGuion() {
    const codigo = "natacion2025";
    const resultado = procesarCodigo(codigo);
    alert("Ejemplo del Guión ('natacion2025'):\n\n" + resultado);

    const contenedor = document.getElementById("resultado");
    if (contenedor) {
        contenedor.innerHTML = `
            <div class="tarjeta-resultado">
                <h3>Ejemplo Oficial del Guión</h3>
                <p><strong>Entrada:</strong> <code>natacion2025</code></p>
                <p><strong>Salida esperada y obtenida:</strong> <code class="res-destacado">${resultado}</code></p>

                <h3 style="margin-top: 20px;">Explicación detallada por posición:</h3>
                ${generarExplicacion(codigo, resultado)}
            </div>
        `;
    }
}

// Carga automática inicial si no tiene 'noprompt'
window.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    if (!params.has("noprompt")) {
        ejecutarEjercicio3();
    }
});
