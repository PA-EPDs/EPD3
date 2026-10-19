function reserva() {

    var url = prompt("Introduce la URL del código QR:");
    if (url === null) {
        return;
    }

    // Extraer los datos de la URL
    var partes = url.split("?");
    var parametros = partes[1].split("&");

    var actividad = parametros[0].split("=")[1];
    var duracion = parseInt(parametros[1].split("=")[1]);
    var participante = parseInt(parametros[2].split("=")[1]);

    // Validar actividad
    var validarActividad = "Correcta";

    if (actividad !== "spinning" && actividad !== "yoga" &&
        actividad !== "pilates" && actividad !== "zumba" &&
        actividad !== "crossfit" && actividad !== "aqua" &&
        actividad !== "bodycombat" && actividad !== "trx") {

        validarActividad = "Incorrecto - Actividad no reconocida";
    }

    // Validar duración
    var validarDuracion = "Correcta";

    if (isNaN(duracion) || duracion < 30 || duracion > 120) {
        validarDuracion = "Incorrecto - Duración no válida";
    }

    // Validar participante
    var validarParticipante = "Correcta";

    if (isNaN(participante) || participante < 1 || participante > 50) {
        validarParticipante = "Incorrecto - Participante no válido";
    }

    // Calcular coste
    var coste = 1.50;
    var resultado = "RESERVA RECHAZADA";

    if (validarActividad === "Correcta" &&
        validarDuracion === "Correcta" &&
        validarParticipante === "Correcta") {

        if (duracion > 30) {
            coste = coste + 0.50;
        }

        if (participante >= 1 && participante <= 15) {
            coste = coste - coste * 0.10;
        }

        resultado = "RESERVA REALIZADA";
    }

    // Mostrar tabla
    document.write("<h2>Resultado de la reserva</h2>");

    document.write("<table border='1'>");
    document.write("<tr><th>Parámetro</th><th>Valor</th><th>Validación</th></tr>");

    document.write("<tr><td>Actividad</td><td>" + actividad +
                   "</td><td>" + validarActividad + "</td></tr>");

    document.write("<tr><td>Duración</td><td>" + duracion +
                   "</td><td>" + validarDuracion + "</td></tr>");

    document.write("<tr><td>Identificador del participante</td><td>" +
                   participante + "</td><td>" + validarParticipante + "</td></tr>");

    if (resultado === "RESERVA REALIZADA") {
        document.write("<tr><td>Coste total</td><td>" +
                       coste.toFixed(2) + " €</td><td>" +
                       resultado + "</td></tr>");
    } else {
        document.write("<tr><td>Coste total</td><td></td><td>" +
                       resultado + "</td></tr>");
    }

    document.write("</table>");
}

reserva();
