/**
 * EPD 3 - Ejercicio 2: Cálculo de coste de envío de un paquete
 * Asignatura: Programación Avanzada
 * Alumno: Jonathan Javier Quishpe Maldonado (Equipo 06)
 */

/**
 * Realiza las validaciones y cálculos del coste de envío de un paquete.
 *
 * @param {number|string} pesoReal - Peso del paquete en kilogramos.
 * @param {number|string} largo - Largo del paquete en centímetros.
 * @param {number|string} ancho - Ancho del paquete en centímetros.
 * @param {number|string} alto - Alto del paquete en centímetros.
 * @param {string} destino - Tipo de destino ('LOCAL', 'NACIONAL' o 'INTERNACIONAL').
 * @returns {Object} Desglose del envío si los datos son válidos o { error: string } si son incorrectos.
 */
function calcular(pesoReal, largo, ancho, alto, destino) {
    // 1. Validación del peso real: valor numérico (acepta un decimal), > 0 y <= 30 kg
    if (pesoReal === null || pesoReal === undefined || String(pesoReal).trim() === "") {
        return { error: "ERROR: DATOS INCORRECTOS - El peso del paquete es obligatorio" };
    }
    const strPeso = String(pesoReal).trim().replace(",", ".");
    const pReal = parseFloat(strPeso);
    if (isNaN(pReal) || pReal <= 0 || pReal > 30) {
        return { error: "ERROR: DATOS INCORRECTOS - El peso debe ser mayor que 0 y menor o igual a 30 kg" };
    }
    if (!/^\d+(\.\d)?$/.test(strPeso)) {
        return { error: "ERROR: DATOS INCORRECTOS - El peso solo acepta como máximo un decimal" };
    }

    // 2. Validación de las tres dimensiones: enteros mayores que 0 y menores o iguales a 120 cm
    const dimensiones = [
        { nombre: "largo", valor: largo },
        { nombre: "ancho", valor: ancho },
        { nombre: "alto", valor: alto }
    ];

    for (const d of dimensiones) {
        if (d.valor === null || d.valor === undefined || String(d.valor).trim() === "") {
            return { error: `ERROR: DATOS INCORRECTOS - La dimensión ${d.nombre} es obligatoria` };
        }
        const strVal = String(d.valor).trim();
        if (!/^\d+$/.test(strVal)) {
            return { error: `ERROR: DATOS INCORRECTOS - La dimensión ${d.nombre} debe ser un número entero` };
        }
        const numVal = parseInt(strVal, 10);
        if (numVal <= 0 || numVal > 120) {
            return { error: `ERROR: DATOS INCORRECTOS - La dimensión ${d.nombre} debe ser mayor que 0 y menor o igual a 120 cm` };
        }
    }

    const l = parseInt(String(largo).trim(), 10);
    const a = parseInt(String(ancho).trim(), 10);
    const h = parseInt(String(alto).trim(), 10);

    // 3. Validación del tipo de destino: LOCAL, NACIONAL o INTERNACIONAL (insensible a mayúsculas/minúsculas)
    if (!destino || typeof destino !== "string" || destino.trim() === "") {
        return { error: "ERROR: DATOS INCORRECTOS - El tipo de destino es obligatorio" };
    }
    const dest = destino.trim().toLowerCase();
    const tarifas = {
        "local": 2.50,
        "nacional": 4.00,
        "internacional": 8.50
    };

    if (!tarifas.hasOwnProperty(dest)) {
        return { error: "ERROR: DATOS INCORRECTOS - El destino debe ser LOCAL, NACIONAL o INTERNACIONAL" };
    }

    // Reglas de cálculo especificadas en el guión:
    // a) Peso volumétrico: (largo * ancho * alto) / 5000
    const pesoVolumetrico = (l * a * h) / 5000;

    // b) Peso facturable: mayor valor entre peso real y peso volumétrico, redondeado al kg superior (Math.ceil)
    const pesoFacturable = Math.ceil(Math.max(pReal, pesoVolumetrico));

    // c) Subtotal base por tarifa según destino
    const tarifa = tarifas[dest];
    const costeBase = pesoFacturable * tarifa;

    // d) Suplemento fijo internacional (12.00 €)
    const suplemento = dest === "internacional" ? 12.00 : 0.00;
    const subtotal = costeBase + suplemento;

    // e) Recargo por peso elevado: 15% sobre el subtotal si el peso facturable supera los 20 kg
    const recargo = pesoFacturable > 20 ? subtotal * 0.15 : 0.00;

    // f) Precio total del envío
    const precioTotal = subtotal + recargo;

    // Retorna el objeto requerido con el desglose del envío
    return {
        pesoReal: pReal,
        pesoVolumetrico: pesoVolumetrico,
        pesoFacturable: pesoFacturable,
        suplemento: suplemento,
        recargo: recargo,
        precioTotal: precioTotal
    };
}

/**
 * Genera el resumen textual exacto con formato de dos decimales (toFixed(2)),
 * ajustado rigurosamente al formato de salida de los ejemplos del guión.
 *
 * @param {Object} resumen - Objeto devuelto por la función calcular().
 * @returns {string} Texto formateado del desglose.
 */
function formatearResumen(resumen) {
    let salida = "";
    salida += `Peso real: ${resumen.pesoReal} kg\n`;
    salida += `Peso volumétrico: ${resumen.pesoVolumetrico.toFixed(2)} kg\n`;
    salida += `Peso facturable: ${resumen.pesoFacturable} kg\n`;
    if (resumen.suplemento > 0) {
        salida += `Suplemento internacional: ${resumen.suplemento.toFixed(2)}€\n`;
    }
    if (resumen.recargo > 0) {
        salida += `Recargo por peso elevado: ${resumen.recargo.toFixed(2)}€\n`;
    }
    salida += `Precio del envío: ${resumen.precioTotal.toFixed(2)}€`;
    return salida;
}

/**
 * Presenta en la interfaz web el resultado del cálculo o el mensaje de error.
 *
 * @param {Object} resultado - Resultado retornado por calcular().
 * @param {Object} entradas - Valores introducidos por el usuario.
 */
function mostrarResultado(resultado, entradas) {
    const contenedor = document.getElementById("resultado");
    if (!contenedor) return;

    if (resultado.error) {
        contenedor.innerHTML = `
            <div class="alerta-error">
                <h3>Error en los datos</h3>
                <p class="mensaje-error">${resultado.error}</p>
                ${entradas ? `<p class="datos-entrada"><strong>Datos introducidos:</strong> Peso: ${entradas.peso ?? "-"}, Largo: ${entradas.largo ?? "-"}, Ancho: ${entradas.ancho ?? "-"}, Alto: ${entradas.alto ?? "-"}, Destino: ${entradas.destino ?? "-"}</p>` : ""}
            </div>
        `;
        return;
    }

    const textoFormateado = formatearResumen(resultado);

    contenedor.innerHTML = `
        <div class="tarjeta-resultado">
            <h3>Resumen del Envío</h3>
            <pre class="resumen-texto">${textoFormateado}</pre>

            <table class="tabla-desglose">
                <thead>
                    <tr>
                        <th>Concepto</th>
                        <th>Detalle / Valor</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Peso Real</td>
                        <td>${resultado.pesoReal.toFixed(resultado.pesoReal % 1 === 0 ? 0 : 1)} kg</td>
                    </tr>
                    <tr>
                        <td>Peso Volumétrico</td>
                        <td>${resultado.pesoVolumetrico.toFixed(2)} kg</td>
                    </tr>
                    <tr>
                        <td>Peso Facturable</td>
                        <td><strong>${resultado.pesoFacturable} kg</strong></td>
                    </tr>
                    ${resultado.suplemento > 0 ? `
                    <tr>
                        <td>Suplemento Internacional</td>
                        <td>${resultado.suplemento.toFixed(2)} €</td>
                    </tr>` : ""}
                    ${resultado.recargo > 0 ? `
                    <tr>
                        <td>Recargo por peso elevado (> 20 kg, +15%)</td>
                        <td>${resultado.recargo.toFixed(2)} €</td>
                    </tr>` : ""}
                    <tr class="fila-total">
                        <td><strong>Precio Total del Envío</strong></td>
                        <td><strong>${resultado.precioTotal.toFixed(2)} €</strong></td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;
}

/**
 * Solicita los datos secuencialmente mediante prompt() tal como solicita el guión.
 */
function solicitarDatosYCalcular() {
    const peso = prompt("Introduzca el peso del paquete en kg (acepta un decimal, máx. 30 kg):", "3");
    if (peso === null) return;

    const largo = prompt("Introduzca el largo del paquete en cm (entero, máx. 120 cm):", "30");
    if (largo === null) return;

    const ancho = prompt("Introduzca el ancho del paquete en cm (entero, máx. 120 cm):", "20");
    if (ancho === null) return;

    const alto = prompt("Introduzca el alto del paquete en cm (entero, máx. 120 cm):", "10");
    if (alto === null) return;

    const destino = prompt("Introduzca el tipo de destino (LOCAL, NACIONAL o INTERNACIONAL):", "local");
    if (destino === null) return;

    const resultado = calcular(peso, largo, ancho, alto, destino);
    mostrarResultado(resultado, { peso, largo, ancho, alto, destino });
}

/**
 * Carga directa de los ejemplos del guión para verificación rápida.
 */
function probarEjemplo(num) {
    let peso, largo, ancho, alto, destino;
    switch (num) {
        case 1:
            peso = 3; largo = 30; ancho = 20; alto = 10; destino = "local";
            break;
        case 2:
            peso = 4.3; largo = 60; ancho = 40; alto = 50; destino = "NACIONAL";
            break;
        case 3:
            peso = 5; largo = 40; ancho = 30; alto = 20; destino = "internacional";
            break;
        case 4:
            peso = -2; largo = 30; ancho = 20; alto = 10; destino = "local";
            break;
        default:
            return;
    }
    const resultado = calcular(peso, largo, ancho, alto, destino);
    mostrarResultado(resultado, { peso, largo, ancho, alto, destino });
}

// Ejecución automática al cargar la página
window.addEventListener("DOMContentLoaded", function () {
    // Si no hay parámetro 'noPrompt' en la URL, solicitamos los datos mediante prompt
    const params = new URLSearchParams(window.location.search);
    if (!params.has("noprompt")) {
        solicitarDatosYCalcular();
    }
});
