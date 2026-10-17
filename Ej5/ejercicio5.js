var actividades = [
    { nombre: "Spinning", instructor: "Ana Lopez", plazas: 15 },
    { nombre: "Yoga", instructor: "Carmen Ruiz", plazas: 12 },
    { nombre: "Pilates", instructor: "Miguel Moya", plazas: 10 },
    { nombre: "Zumba", instructor: "Laura Martin", plazas: 20 },
    { nombre: "CrossFit", instructor: "David Garcia", plazas: 8 },
    { nombre: "Aqua Aerobicos", instructor: "Elena Sanchez", plazas: 18 },
    { nombre: "BodyCombat", instructor: "Carlos Vega", plazas: 16 },
    { nombre: "TRX", instructor: "Maria Gonzalez", plazas: 6 },
    { nombre: "Boxeo", instructor: "Pablo Romero", plazas: 14 },
    { nombre: "Funcional", instructor: "Sara Diaz", plazas: 12 }
];


function mostrarActividades() {

    var texto = "ACTIVIDADES DISPONIBLES:\n\n";

    for (var i = 0; i < actividades.length; i++) {

        texto += actividades[i].nombre + ": " +
            actividades[i].instructor + " - " +
            actividades[i].plazas + " plazas\n";
    }

    alert(texto);
}


function reservarPlaza() {

    var nombre = prompt("Introduce el nombre de la actividad");

    if (nombre === null) {
        return;
    }

    var encontrada = false;

    for (var i = 0; i < actividades.length; i++) {

        if (
            actividades[i].nombre.toLowerCase() ===
            nombre.toLowerCase()
        ) {

            encontrada = true;

            if (actividades[i].plazas > 0) {

                actividades[i].plazas--;

                alert(
                    "Plaza reservada con exito en " +
                    actividades[i].nombre
                );

            } else {

                alert("ERROR: No quedan plazas disponibles");
            }

            break;
        }
    }

    if (encontrada === false) {
        alert("ERROR: La actividad no existe");
    }
}


function liberarPlaza() {

    var nombre = prompt("Introduce el nombre de la actividad");

    if (nombre === null) {
        return;
    }

    var encontrada = false;

    for (var i = 0; i < actividades.length; i++) {

        if (
            actividades[i].nombre.toLowerCase() ===
            nombre.toLowerCase()
        ) {

            encontrada = true;

            actividades[i].plazas++;

            alert(
                "Plaza liberada con exito en " +
                actividades[i].nombre
            );

            break;
        }
    }

    if (encontrada === false) {
        alert("ERROR: La actividad no existe");
    }
}


function agregarActividad() {

    var nombre = prompt("Introduce el nombre de la nueva actividad");

    if (nombre === null) {
        return;
    }

    var instructor = prompt("Introduce el nombre del instructor");

    if (instructor === null) {
        return;
    }

    var plazas = parseInt(
        prompt("Introduce el numero de plazas")
    );

    if (isNaN(plazas) || plazas < 0) {

        alert("ERROR: Numero de plazas incorrecto");
        return;
    }

    actividades.push({
        nombre: nombre,
        instructor: instructor,
        plazas: plazas
    });

    alert("Actividad agregada correctamente");
}


var opcion = "";

do {

    opcion = prompt(
        "Que operacion desea realizar?\n\n" +
        "1. Mostrar actividades\n" +
        "2. Reservar plaza\n" +
        "3. Liberar plaza\n" +
        "4. Agregar actividad\n" +
        "5. Salir"
    );

    if (opcion === null) {
        break;
    }

    if (opcion === "1") {

        mostrarActividades();

    } else if (opcion === "2") {

        reservarPlaza();
        mostrarActividades();

    } else if (opcion === "3") {

        liberarPlaza();
        mostrarActividades();

    } else if (opcion === "4") {

        agregarActividad();
        mostrarActividades();

    } else if (opcion === "5") {

        alert("Programa finalizado");

    } else {

        alert("ERROR: Opcion incorrecta");
    }

} while (opcion !== "5");