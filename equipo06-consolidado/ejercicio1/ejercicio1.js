/**
 * EPD 3 - Ejercicio 1: Registro dinámico y análisis estadístico de calificaciones
 * Asignatura: Programación Avanzada
 * Responsable: Daniel Limones Arredondo (Equipo 06)
 * Consolidación: Jonathan Javier Quishpe Maldonado
 */

/**
 * Solicita los datos de las calificaciones, aplica validaciones y calcula estadísticas.
 */
function registrarCalificaciones() {
    let N;
    let inputN;

    // Validación de N: número entero mayor que 0
    do {
        inputN = prompt("¿Cuántas calificaciones desea introducir? (Número entero > 0):", "5");
        if (inputN === null) {
            return; // Usuario canceló
        }
        N = Number(inputN.trim());
    } while (isNaN(N) || !Number.isInteger(N) || N <= 0);

    let notas = [];
    let desgloseTexto = "<h3>Calificaciones introducidas y clasificación:</h3><ul>";

    // Recogida secuencial de cada una de las N notas con validación
    for (let i = 0; i < N; i++) {
        let nota;
        let inputNota;
        do {
            inputNota = prompt(`Introduce la calificación ${i + 1} de ${N} (valor entre 0 y 10, admite decimales):`);
            if (inputNota === null) {
                return;
            }
            nota = parseFloat(inputNota.trim().replace(",", "."));
        } while (isNaN(nota) || nota < 0 || nota > 10);

        // Se redondea a un máximo de dos decimales para visualización limpia
        nota = Math.round(nota * 100) / 100;
        notas.push(nota);

        // Clasificación por rendimiento según el guión:
        // Sobresaliente: De 8.0 a 10.0 puntos (8 <= x <= 10)
        // Notable: De 6.0 a menos de 8.0 puntos (6 <= x < 8)
        // Aprobado: De 4.0 a menos de 6.0 puntos (4 <= x < 6)
        // Suspenso: Menor a 4.0 puntos (0 <= x < 4)
        let nivel = "";
        if (nota >= 8.0 && nota <= 10.0) {
            nivel = "Sobresaliente";
        } else if (nota >= 6.0 && nota < 8.0) {
            nivel = "Notable";
        } else if (nota >= 4.0 && nota < 6.0) {
            nivel = "Aprobado";
        } else {
            nivel = "Suspenso";
        }

        desgloseTexto += `<li>Calificación ${i + 1}: <strong>${nota}</strong> &rarr; Nivel: <span class="tag-${nivel.toLowerCase()}">${nivel}</span></li>`;
    }
    desgloseTexto += "</ul>";

    // Cálculos estadísticos
    const maxNota = Math.max(...notas);
    const minNota = Math.min(...notas);

    let suma = 0;
    for (let j = 0; j < notas.length; j++) {
        suma += notas[j];
    }
    // Para el redondeo use Math.round() a dos decimales
    const media = Math.round((suma / N) * 100) / 100;

    // Recuento por niveles
    let contadorSobresaliente = 0;
    let contadorNotable = 0;
    let contadorAprobado = 0;
    let contadorSuspenso = 0;

    for (let k = 0; k < notas.length; k++) {
        const n = notas[k];
        if (n >= 8.0) contadorSobresaliente++;
        else if (n >= 6.0) contadorNotable++;
        else if (n >= 4.0) contadorAprobado++;
        else contadorSuspenso++;
    }

    // Porcentajes redondeados con Math.round()
    const calcPorcentaje = (cant) => Math.round((cant / N) * 100);

    // Ordenamiento numérico exigido: sort() con función de comparación (a, b) => a - b
    const ordenadasMenorMayor = [...notas].sort((a, b) => a - b);
    const ordenadasMayorMenor = [...notas].sort((a, b) => b - a);

    // Generación de salida en el contenedor
    const resumenTexto = `
        <h3>Resumen estadístico final:</h3>
        <div class="bloque-metricas">
            <p><strong>Calificación máxima:</strong> ${maxNota}</p>
            <p><strong>Calificación mínima:</strong> ${minNota}</p>
            <p><strong>Calificación media:</strong> ${media.toFixed(2)}</p>
        </div>

        <h3>Distribución de niveles:</h3>
        <ul class="lista-niveles">
            <li><strong>Sobresaliente:</strong> ${contadorSobresaliente} estudiante${contadorSobresaliente === 1 ? "" : "s"} (${calcPorcentaje(contadorSobresaliente)}%)</li>
            <li><strong>Notable:</strong> ${contadorNotable} estudiante${contadorNotable === 1 ? "" : "s"} (${calcPorcentaje(contadorNotable)}%)</li>
            <li><strong>Aprobado:</strong> ${contadorAprobado} estudiante${contadorAprobado === 1 ? "" : "s"} (${calcPorcentaje(contadorAprobado)}%)</li>
            <li><strong>Suspenso:</strong> ${contadorSuspenso} estudiante${contadorSuspenso === 1 ? "" : "s"} (${calcPorcentaje(contadorSuspenso)}%)</li>
        </ul>

        <h3>Ordenación de calificaciones:</h3>
        <p><strong>Calificaciones ordenadas (Mayor a menor):</strong> ${ordenadasMayorMenor.join(", ")}</p>
        <p><strong>Calificaciones ordenadas (Menor a mayor):</strong> ${ordenadasMenorMayor.join(", ")}</p>
    `;

    const contenedorResultados = document.getElementById("resultados");
    if (contenedorResultados) {
        contenedorResultados.innerHTML = desgloseTexto + resumenTexto;
    }
}

/**
 * Carga directa del ejemplo del guión (7.5, 9.2, 3.8, 8.1, 5.5).
 */
function cargarEjemploGuion() {
    const notasEjemplo = [7.5, 9.2, 3.8, 8.1, 5.5];
    const N = notasEjemplo.length;

    let desgloseTexto = "<h3>Calificaciones introducidas y clasificación (Ejemplo Guión):</h3><ul>";
    for (let i = 0; i < N; i++) {
        const nota = notasEjemplo[i];
        let nivel = "";
        if (nota >= 8.0 && nota <= 10.0) nivel = "Sobresaliente";
        else if (nota >= 6.0 && nota < 8.0) nivel = "Notable";
        else if (nota >= 4.0 && nota < 6.0) nivel = "Aprobado";
        else nivel = "Suspenso";

        desgloseTexto += `<li>Calificación ${i + 1}: <strong>${nota}</strong> &rarr; Nivel: <span class="tag-${nivel.toLowerCase()}">${nivel}</span></li>`;
    }
    desgloseTexto += "</ul>";

    const maxNota = Math.max(...notasEjemplo);
    const minNota = Math.min(...notasEjemplo);
    const suma = notasEjemplo.reduce((acc, curr) => acc + curr, 0);
    const media = Math.round((suma / N) * 100) / 100;

    let cSob = 0, cNot = 0, cApr = 0, cSus = 0;
    for (const n of notasEjemplo) {
        if (n >= 8.0) cSob++;
        else if (n >= 6.0) cNot++;
        else if (n >= 4.0) cApr++;
        else cSus++;
    }

    const calcPorcentaje = (cant) => Math.round((cant / N) * 100);
    const ordenadasMenorMayor = [...notasEjemplo].sort((a, b) => a - b);
    const ordenadasMayorMenor = [...notasEjemplo].sort((a, b) => b - a);

    const resumenTexto = `
        <h3>Resumen estadístico final:</h3>
        <div class="bloque-metricas">
            <p><strong>Calificación máxima:</strong> ${maxNota}</p>
            <p><strong>Calificación mínima:</strong> ${minNota}</p>
            <p><strong>Calificación media:</strong> ${media.toFixed(2)}</p>
        </div>

        <h3>Distribución de niveles:</h3>
        <ul class="lista-niveles">
            <li><strong>Sobresaliente:</strong> ${cSob} estudiantes (${calcPorcentaje(cSob)}%)</li>
            <li><strong>Notable:</strong> ${cNot} estudiante (${calcPorcentaje(cNot)}%)</li>
            <li><strong>Aprobado:</strong> ${cApr} estudiante (${calcPorcentaje(cApr)}%)</li>
            <li><strong>Suspenso:</strong> ${cSus} estudiante (${calcPorcentaje(cSus)}%)</li>
        </ul>

        <h3>Ordenación de calificaciones:</h3>
        <p><strong>Calificaciones ordenadas (Mayor a menor):</strong> ${ordenadasMayorMenor.join(", ")}</p>
        <p><strong>Calificaciones ordenadas (Menor a mayor):</strong> ${ordenadasMenorMayor.join(", ")}</p>
    `;

    document.getElementById("resultados").innerHTML = desgloseTexto + resumenTexto;
}

// Ejecución al cargar si no se desactiva por query param
window.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    if (!params.has("noprompt")) {
        registrarCalificaciones();
    }
});
