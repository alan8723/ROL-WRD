// El "Estado" central de tu personaje
let estado = {
    nivel: 1,
    atributos: { fisico: 1, capacidad: 1, constitucion: 1 },
    subatributos: { fuerza: 0, destreza: 0, carisma: 0, sabiduria: 0, resistencia: 0, canalizacion: 0 },
    reservas: { fisico: 1, capacidad: 1, constitucion: 1 },

    bonosFijosRaza: { fuerza: 0, destreza: 0, carisma: 0, sabiduria: 0, resistencia: 0, canalizacion: 0 },
    bonosFijosClase: { fuerza: 0, destreza: 0, carisma: 0, sabiduria: 0, resistencia: 0, canalizacion: 0, vida: 0, mana: 0 },
    bonosRasgos: { fuerza: 0, destreza: 0, carisma: 0, sabiduria: 0, resistencia: 0, canalizacion: 0, vida: 0, mana: 0 },

    rasgosActivos: [],

    detalles: { tamano: '-', manaBase: 0 }
};

// Mapa de relaciones: Atributo Padre -> [Subatributos Hijos]
const hijosDe = {
    fisico: ['fuerza', 'destreza'],
    capacidad: ['sabiduria', 'carisma'],
    constitucion: ['resistencia', 'canalizacion']
};

function calcularPuntosAtributo(nivel) {
    let puntos = 0;
    for (let i = 1; i <= nivel; i++) {
        puntos++;
    }
    return puntos;
}

function calcularPuntosSubatributo(valorAtributo) {
    let puntos = 0;
    for (let i = 1; i <= valorAtributo; i++) {
        // Al llegar a 10 (maxear), da 2 puntos. Si no, 1.
        puntos += (i === 10) ? 2 : 1;
    }
    return puntos;
}

function calcularPuntosDisponibles() {
    //Calculamos puntos totales
    const totalAtrGanados = calcularPuntosAtributo(estado.nivel);
    const totalAtrGastados = (estado.atributos.fisico - 1) + (estado.atributos.capacidad - 1) + (estado.atributos.constitucion - 1);
    const puntosDisponibles = totalAtrGanados - totalAtrGastados;
    return puntosDisponibles;
}

//actualiza los valores en la pantalla
function actualizarPantalla() {
    const puntosDisponibles = calcularPuntosDisponibles();

    // Mostramos en HTML
    document.getElementById('valor-nivel').innerText = estado.nivel;
    document.getElementById('pts-atr-disp').innerText = puntosDisponibles;

    //actualiza todos los campos con el valor del estado
    //atributos
    if (document.getElementById('valor-atributo-fisico')) {
        document.getElementById('valor-atributo-fisico').innerText = estado.atributos.fisico;
    }
    if (document.getElementById('valor-atributo-capacidad')) {
        document.getElementById('valor-atributo-capacidad').innerText = estado.atributos.capacidad;
    }
    if (document.getElementById('valor-atributo-constitucion')) {
        document.getElementById('valor-atributo-constitucion').innerText = estado.atributos.constitucion;
    }

    //subatributos
    if (document.getElementById('valor-subatributo-fuerza')) {
        const fuerzaTotal = estado.subatributos.fuerza +
            estado.bonosFijosRaza.fuerza +
            estado.bonosFijosClase.fuerza +
            estado.bonosRasgos.fuerza;
        document.getElementById('valor-subatributo-fuerza').innerText = fuerzaTotal;
    }
    if (document.getElementById('valor-subatributo-destreza')) {
        const destrezaTotal = estado.subatributos.destreza +
            estado.bonosFijosRaza.destreza +
            estado.bonosFijosClase.destreza +
            estado.bonosRasgos.destreza;
        document.getElementById('valor-subatributo-destreza').innerText = destrezaTotal;
    }
    if (document.getElementById('valor-subatributo-carisma')) {
        const carismaTotal = estado.subatributos.carisma +
            estado.bonosFijosRaza.carisma +
            estado.bonosFijosClase.carisma +
            estado.bonosRasgos.carisma;
        document.getElementById('valor-subatributo-carisma').innerText = carismaTotal;
    }
    if (document.getElementById('valor-subatributo-sabiduria')) {
        const sabiduriaTotal = estado.subatributos.sabiduria +
            estado.bonosFijosRaza.sabiduria +
            estado.bonosFijosClase.sabiduria +
            estado.bonosRasgos.sabiduria;
        document.getElementById('valor-subatributo-sabiduria').innerText = sabiduriaTotal;
    }
    if (document.getElementById('valor-subatributo-resistencia')) {
        const resistenciaTotal = estado.subatributos.resistencia +
            estado.bonosFijosRaza.resistencia +
            estado.bonosFijosClase.resistencia +
            estado.bonosRasgos.resistencia;
        document.getElementById('valor-subatributo-resistencia').innerText = resistenciaTotal;
    }
    if (document.getElementById('valor-subatributo-canalizacion')) {
        const canalizacionTotal = estado.subatributos.canalizacion +
            estado.bonosFijosRaza.canalizacion +
            estado.bonosFijosClase.canalizacion +
            estado.bonosRasgos.canalizacion;
        document.getElementById('valor-subatributo-canalizacion').innerText = canalizacionTotal;
    }
    //recursos derivados
    const resistenciaTotal = estado.subatributos.resistencia + estado.bonosFijosRaza.resistencia + estado.bonosFijosClase.resistencia;
    const vidaTotal = estado.nivel + estado.atributos.constitucion + (resistenciaTotal * 2) + estado.bonosFijosClase.vida;
    if (document.getElementById('valor-vida')) {
        document.getElementById('valor-vida').value = vidaTotal;
    }
    if (document.getElementById('valor-mana')) {
        const manaTotal = estado.detalles.manaBase + estado.bonosFijosClase.mana;
        document.getElementById('valor-mana').value = manaTotal;
    }


}
function reiniciarPuntos() {
    // 1. Devolvemos los atributos a su valor base
    estado.atributos = { fisico: 1, capacidad: 1, constitucion: 1 };

    // 2. Devolvemos los subatributos a cero
    estado.subatributos = { fuerza: 0, destreza: 0, carisma: 0, sabiduria: 0, resistencia: 0, canalizacion: 0 };

    // 3. Vaciamos las reservas hijas
    estado.reservas = { fisico: 1, capacidad: 1, constitucion: 1 };

    // 4. Mostramos una pequeña alerta (opcional, pero buena para el usuario)
    console.log("Puntos reiniciados debido a un cambio de nivel.");

    // 5. Llamamos a actualizarPantalla para que el HTML refleje estos cambios
    actualizarPantalla();
}

// Función genérica para SUMAR cualquier atributo
function sumarAtributo(nombreAtributo) {
    const puntosDisponibles = calcularPuntosDisponibles();

    if (puntosDisponibles > 0 && estado.atributos[nombreAtributo] < 10) {

        estado.atributos[nombreAtributo]++; // Suma al atributo dinámico

        // Calcula la ganancia para la reserva dinámica
        let gananciaHija = (estado.atributos[nombreAtributo] === 10) ? 2 : 1;
        estado.reservas[nombreAtributo] += gananciaHija;

        actualizarPantalla();
    } else {
        console.warn(`No puedes sumar más a ${nombreAtributo}.`);
    }
}

// Función genérica para RESTAR cualquier atributo
function restarAtributo(nombreAtributo) {
    if (estado.atributos[nombreAtributo] > 1) {
        // Bajamos el atributo padre y las reservas
        estado.atributos[nombreAtributo]--;
        estado.reservas[nombreAtributo] = estado.atributos[nombreAtributo];

        // Buscamos quiénes son los hijos usando nuestro mapa
        const subatributosHijos = hijosDe[nombreAtributo];
        // Reiniciamos a 0 a cada uno de los hijos encontrados
        subatributosHijos.forEach(hijo => {
            estado.subatributos[hijo] = 0;
        });

        console.log(`Se restó un punto de ${nombreAtributo}. Sus reservas y subatributos se reiniciaron por seguridad.`);

        actualizarPantalla();
    } else {
        console.warn(`No puedes restar más puntos de ${nombreAtributo}.`);
    }
}
// Función para SUMAR a un subatributo
function sumarSubatributo(nombreSub, nombrePadre) {
    // REGLA: Debe haber reservas en el padre y el subatributo no pasar de 10
    if (estado.reservas[nombrePadre] > 0 && estado.subatributos[nombreSub] < 10) {

        const valorSubactual = estado.subatributos[nombreSub] +
            estado.bonosFijosRaza[nombreSub] +
            estado.bonosFijosClase[nombreSub] +
            estado.bonosRasgos[nombreSub];
        if (valorSubactual < 10) {
            estado.subatributos[nombreSub]++; // Subimos el hijo
            estado.reservas[nombrePadre]--;   // Gastamos la reserva del padre
        }

        actualizarPantalla();
    } else {
        console.warn(`No tienes reservas en ${nombrePadre} o ${nombreSub} está al máximo.`);
    }
}

// Función para RESTAR a un subatributo
function restarSubatributo(nombreSub, nombrePadre) {
    // REGLA: El subatributo debe ser mayor a 0 para poder restarle
    if (estado.subatributos[nombreSub] > 0) {

        estado.subatributos[nombreSub]--; // Bajamos el hijo
        estado.reservas[nombrePadre]++;   // Le devolvemos el punto a la reserva del padre

        actualizarPantalla();
    } else {
        console.warn(`${nombreSub} ya está en 0.`);
    }
}

// --- BOTONES FÍSICO ---
document.getElementById('btn-fisico-mas')?.addEventListener('click', () => sumarAtributo('fisico'));
document.getElementById('btn-fisico-menos')?.addEventListener('click', () => restarAtributo('fisico'));

// --- BOTONES CAPACIDAD ---
document.getElementById('btn-capacidad-mas')?.addEventListener('click', () => sumarAtributo('capacidad'));
document.getElementById('btn-capacidad-menos')?.addEventListener('click', () => restarAtributo('capacidad'));

// --- BOTONES CONSTITUCIÓN ---
document.getElementById('btn-constitucion-mas')?.addEventListener('click', () => sumarAtributo('constitucion'));
document.getElementById('btn-constitucion-menos')?.addEventListener('click', () => restarAtributo('constitucion'));

// --- BOTÓN: SUMAR FUERZA ---
document.getElementById('btn-fuerza-mas')?.addEventListener('click', () => sumarSubatributo('fuerza', 'fisico'));
document.getElementById('btn-fuerza-menos')?.addEventListener('click', () => restarSubatributo('fuerza', 'fisico'));

// --- BOTÓN: SUMAR DESTREZA ---
document.getElementById('btn-destreza-mas')?.addEventListener('click', () => sumarSubatributo('destreza', 'fisico'));
document.getElementById('btn-destreza-menos')?.addEventListener('click', () => restarSubatributo('destreza', 'fisico'));

// --- BOTÓN: SUMAR CARISMA ---
document.getElementById('btn-carisma-mas')?.addEventListener('click', () => sumarSubatributo('carisma', 'capacidad'));
document.getElementById('btn-carisma-menos')?.addEventListener('click', () => restarSubatributo('carisma', 'capacidad'));

// --- BOTÓN: SUMAR SABIDURÍA ---
document.getElementById('btn-sabiduria-mas')?.addEventListener('click', () => sumarSubatributo('sabiduria', 'capacidad'));
document.getElementById('btn-sabiduria-menos')?.addEventListener('click', () => restarSubatributo('sabiduria', 'capacidad'));

// --- BOTÓN: SUMAR RESISTENCIA ---
document.getElementById('btn-resistencia-mas')?.addEventListener('click', () => sumarSubatributo('resistencia', 'constitucion'));
document.getElementById('btn-resistencia-menos')?.addEventListener('click', () => restarSubatributo('resistencia', 'constitucion'));

// --- BOTÓN: SUMAR CANALIZACIÓN ---
document.getElementById('btn-canalizacion-mas')?.addEventListener('click', () => sumarSubatributo('canalizacion', 'constitucion'));
document.getElementById('btn-canalizacion-menos')?.addEventListener('click', () => restarSubatributo('canalizacion', 'constitucion'));

// 4. Ejemplo de Botón Nivel +
document.getElementById('btn-lvl-mas')?.addEventListener('click', () => {
    if (estado.nivel < 20) {
        estado.nivel++;
        actualizarPantalla();
    }
});


document.getElementById('btn-lvl-menos')?.addEventListener('click', () => {
    if (estado.nivel > 1) {
        estado.nivel--;
        reiniciarPuntos();
    }
});

// Iniciamos la pantalla por primera vez
actualizarPantalla();