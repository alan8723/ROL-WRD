// Guardamos las reglas de nuestro juego en un "Diccionario" (Objeto)
// DICCIONARIO DE RAZAS
const datosRazas = {
    angel: {
        bonos: { canalizacion: 1 },
        detalles: { tamano: 'Mediano-Alto', manaBase: 14 },
        dotesPermitidos: ['alas', 'resolucion'], // 'resolucion' es el dote genérico
        habilidad: "Imbuir",
        idiomas: "Ixiano, Divino"
    },
    demonio: {
        bonos: { fuerza: 1 },
        detalles: { tamano: 'Alto', manaBase: 18 },
        dotesPermitidos: ['sangre_ardiente', 'piel_demoniaca', 'sed_de_batalla', 'resolucion'],
        habilidad: "Frenesí",
        idiomas: "Ixiano, Secrario"
    },
    elfo: {
        bonos: { sabiduria: 1 },
        detalles: { tamano: 'Mediano', manaBase: 12 },
        dotesPermitidos: ['afinidad_natural', 'resolucion'],
        habilidad: "Sentidos Agudos (Ventaja en Percepción y rastreo).",
        idiomas: "Ixiano, Élfico"
    },
    kenko: {
        bonos: { destreza: 1 },
        detalles: { tamano: 'Mediano', manaBase: 10 },
        dotesPermitidos: ['alas_planeadoras', 'resolucion'],
        habilidad: "Imitación (Reproduce con precisión voces o sonidos).",
        idiomas: "Ixiano, Aviar"
    },
    enano: {
        bonos: { resistencia: 1 },
        detalles: { tamano: 'Pequeño', manaBase: 8 },
        dotesPermitidos: ['resolucion'], // Aquí puedes agregar más dotes generales luego
        habilidad: "Visión en la oscuridad.",
        idiomas: "Ixiano"
    }
};
//Diccionario maestro de Clases
const datosClases = {
    guerrero: { fuerza: 2, resistencia: 1, vida: 2, mana: 1 },
    mago: { sabiduria: 2, canalizacion: 1, vida: 0, mana: 3 },
    cazador: { destreza: 2, sabiduria: 1, vida: 2, mana: 2 }
};
// DICCIONARIO DE DOTES
const datosDotes = {
    alas: { nombre: "Alas", efecto: "Tienes la capacidad de volar a mediana altura." },
    sangre_ardiente: { nombre: "Sangre Ardiente", efecto: "Pagas 1 PV para ignorar Debilitamiento, Aturdimiento o Empujones este turno." },
    piel_demoniaca: { nombre: "Piel Demoníaca", efecto: "Reduce en 1 el primer daño recibido cada combate." },
    sed_de_batalla: { nombre: "Sed de Batalla", efecto: "Cada enemigo derrotado recupera 1 punto de Maná." },
    resolucion: { nombre: "Resolución", efecto: "La primera vez que quedes por debajo del 50% de Vida, recuperas 1 Maná." },
    ingenio: { nombre: "Ingenio", efecto: "Una vez por combate puedes repetir una tirada de una Técnica o Hechizo." },
    adaptabilidad: { nombre: "Adaptabilidad", efecto: "En un descanso corto puedes cambiar una Técnica/Hechizo preparada." },
    afinidad_natural: { nombre: "Afinidad Natural", efecto: "El primer hechizo en cada combate cuesta 1 Maná menos (mínimo 1)." },
    alas_planeadoras: { nombre: "Alas Planeadoras", efecto: "Puedes planear." }
};

// DICCIONARIO DE RASGOS
const datosRasgos = {
    // SABIDURÍA
    conocimiento_divino: {
        nombre: "Conocimiento Divino",
        bonos: { sabiduria: 1 },
        efecto: "Ventaja en tiradas para identificar rituales o reliquias. Reconoces templos y costumbres."
    },
    erudicion_historica: {
        nombre: "Erudición Histórica",
        bonos: { sabiduria: 2, destreza: -1 },
        efecto: "Ventaja en tiradas de información histórica. El DM puede darte pistas extra."
    },
    disciplina: {
        nombre: "Disciplina",
        bonos: { sabiduria: 1 },
        efecto: "Ignoras la primera fuente de miedo, provocación o control mental que recibas en cada combate."
    },
    perspicacia: {
        nombre: "Perspicacia",
        bonos: { sabiduria: 1 },
        efecto: "Obtienes ventaja al detectar mentiras, emociones ocultas o intenciones sospechosas."
    },
    curioso: {
        nombre: "Curioso",
        bonos: { sabiduria: 1 },
        efecto: "Ventaja al investigar objetos desconocidos. El DM puede pedirte una tirada para resistir el impulso de explorar."
    },
    investigador: {
        nombre: "Investigador",
        bonos: { sabiduria: 1 },
        efecto: "Ventaja para analizar objetos, pistas y mecanismos."
    },
    estratega: {
        nombre: "Estratega",
        bonos: { sabiduria: 1 },
        efecto: "Una vez por combate puedes repetir una tirada de iniciativa."
    },
    prudente: {
        nombre: "Prudente",
        bonos: { sabiduria: 1 },
        efecto: "Siempre actúas después del primer turno de combate."
    },
    // CARISMA
    empatia_animal: {
        nombre: "Empatía Animal",
        bonos: { carisma: 1 },
        efecto: "Ventaja para calmar animales. Rara vez te consideran amenaza."
    },
    fumador: {
        nombre: "Fumador",
        bonos: { carisma: 1 },
        efecto: "Si fumaste en los últimos 30 min: no puedes ser sorprendido y tu primera tirada tiene ventaja. Si no: desventaja en todas las tiradas."
    },
    codicioso: {
        nombre: "Codicioso",
        bonos: { carisma: 1 },
        efecto: "Obtienes un 20% más de oro al vender objetos. Te cuesta rechazar tesoros o recompensas valiosas."
    },
    buena_reputacion: {
        nombre: "Buena Reputación",
        bonos: { carisma: 1 },
        efecto: "Ventaja en primeras interacciones con personas humildes. Es más fácil conseguir alojamiento o comida básica."
    },
    interpretacion: {
        nombre: "Interpretación",
        bonos: { carisma: 1 },
        efecto: "Las actuaciones artísticas tienen ventaja cuando intentan impresionar a un público."
    },
    engano: { // Usamos "engano" sin la ñ para la llave por seguridad en el código
        nombre: "Engaño",
        bonos: { carisma: 2, sabiduria: -1 },
        efecto: "Ventaja al intentar engañar."
    },
    diplomatico: {
        nombre: "Diplomático",
        bonos: { carisma: 1 },
        efecto: "La primera negociación con un NPC comienza con actitud neutral, salvo que la historia indique lo contrario."
    },
    // FUERZA
    atleta: {
        nombre: "Atleta",
        bonos: { fuerza: 1, destreza: 1, sabiduria: -1 },
        efecto: "La primera tirada física es con ventaja. Se reinicia tras un descanso."
    },
    forzudo: {
        nombre: "Forzudo",
        bonos: { fuerza: 2, destreza: -1 },
        efecto: "Ventaja al empujar, levantar o romper objetos."
    },
    intimidante: {
        nombre: "Intimidante",
        bonos: { fuerza: 1 },
        efecto: "Obtienes ventaja al intimidar mediante presencia física."
    },
    temerario: {
        nombre: "Temerario",
        bonos: { fuerza: 1 },
        efecto: "No puedes retirarte voluntariamente del combate mientras un aliado siga luchando."
    },
    rompehuesos: {
        nombre: "Rompehuesos",
        bonos: { fuerza: 1 },
        efecto: "Sabes aprovechar tu fuerza. Cuando impactas con un ataque contundente, el crítico aplica aturdido 1 turno."
    },
    // DESTREZA
    juego_de_manos: {
        nombre: "Juego de Manos",
        bonos: { destreza: 1, carisma: 1, fuerza: -1 },
        efecto: "Tienes una acción secundaria adicional."
    },
    escalador: {
        nombre: "Escalador",
        bonos: { destreza: 1 },
        efecto: "Ventaja para trepar, mantener el equilibrio y evitar caídas."
    },
    reflejos: {
        nombre: "Reflejos",
        bonos: { destreza: 1 },
        efecto: "Reaccionas antes que los demás. Una vez por combate, si tu rival falla su ataque, contraatacas."
    },
    duelista: {
        nombre: "Duelista",
        bonos: { destreza: 1 },
        efecto: "Si tienes un solo enemigo en 8 metros, obtienes +50% de daño en el primer ataque cuerpo a cuerpo de cada turno."
    },
    acrobata: {
        nombre: "Acróbata",
        bonos: { destreza: 1, fuerza: -1 },
        efecto: "Las caídas de poca altura no provocan daño y 50% menos de alturas superiores."
    },

    //RESISTENCIA
    resistente: {
        nombre: "Resistente",
        bonos: { resistencia: 1 },
        efecto: "Los daños causados por efectos se reducen al 50%."
    },
    medicina: {
        nombre: "Medicina",
        bonos: { resistencia: 1 },
        efecto: "Las curaciones realizadas por ti recuperan un 50% adicional de vida."
    },
    supervivencia: {
        nombre: "Supervivencia",
        bonos: { resistencia: 1 },
        efecto: "Una vez por combate ignoras un dado de salvación y vuelves a tirar."
    },
    ultimo_aliento: {
        nombre: "Último Aliento",
        bonos: { resistencia: 2, destreza: -1 },
        efecto: "Una vez por descanso, cuando recibes daño que te dejaría con 0 Vida, quedas con 1 Vida."
    },
    constitucion_de_hierro: {
        nombre: "Constitución de Hierro",
        bonos: { resistencia: 1 },
        efecto: "La primera vez que recibes daño durante un combate, reduces ese daño en 1."
    },

    //CANALIZACION
    paciente: {
        nombre: "Paciente",
        bonos: { canalizacion: 1 },
        efecto: "Cuando decides no moverte durante un turno obtienes ventaja en tu siguiente acción."
    },
    conocimiento_arcano: {
        nombre: "Conocimiento Arcano",
        bonos: { canalizacion: 1 },
        efecto: "Ventaja en la primera tirada de sabiduría. Se reinicia luego de un descanso."
    },
    sobrecarga: {
        nombre: "Sobrecarga",
        bonos: { canalizacion: 1 },
        efecto: "Una vez por combate, puedes aumentar en 1 el daño de un hechizo. Después de hacerlo, pierdes tu acción secundaria ese turno."
    },
    concentracion: {
        nombre: "Concentración",
        bonos: { canalizacion: 1 },
        efecto: "Si recibes daño mientras mantienes un hechizo, puedes realizar una tirada de Canalización para evitar perderlo."
    },


    //OTROS
    caminante: {
        nombre: "Caminante",
        bonos: {}, // No da bonos, solo pasivas
        efecto: "Nunca te pierdes en caminos conocidos. Encuentras alimento y agua suficiente en viajes."
    },
    pacto_mana: {
        nombre: "Pacto de Maná",
        bonos: { vida: -4, mana: 3 },
        efecto: "El primer hechizo de nivel 1 es gratis."
    },

};


async function cargarDatosIniciales() {
    // Función auxiliar para crear opciones de HTML dinámicamente
    const popularSelect = (selectId, datos) => {
        const select = document.getElementById(selectId);
        // Limpiamos opciones previas (excepto quizás una opción "Selecciona...")
        select.innerHTML = '<option value="">Selecciona...</option>';

        Object.keys(datos).forEach(nombreClave => {
            // Convertimos "nombre_clave" a "Nombre Clave" para mostrar
            const display = nombreClave.replace(/_/g, ' ');
            const option = document.createElement('option');
            option.value = nombreClave;
            option.textContent = display.charAt(0).toUpperCase() + display.slice(1); // Capitalizado
            select.appendChild(option);
        });
    };

    // Obtenemos las listas desde Supabase (asumiendo que tienes la función getRasgos)
    try {
        // Obtener Clases
        const { data: clasesData, error: errorClases } = await supabase
            .from('clases')
            .select('nombre'); // Asume que tu tabla se llama 'clases'

        if (clasesData) {
            // Convertimos el array [ {nombre: 'Mago'}, ... ] a un objeto { mago: {...} }
            // O simplemente pasamos la lista si la lógica lo maneja, 
            // pero para tu HTML necesitamos un objeto { 'mago': {}, 'guerrero': {} }
            const clasesObj = {};
            clasesData.forEach(c => clasesObj[c.nombre] = {}); // OJO: Aquí deberías luego poner sus bonos si quieres
            popularSelect('select-clase', clasesObj);
        }

        // Obtener Razas
        const { data: razasData, error: errorRazas } = await supabase
            .from('razas')
            .select('nombre'); // Asume que tu tabla se llama 'razas'

        if (razasData) {
            const razasObj = {};
            razasData.forEach(r => razasObj[r.nombre] = {});
            popularSelect('select-raza', razasObj);
        }

        // Obtener Rasgos (AQUI ESTÁ LA CLAVE PARA TU SELECTOR)
        const { data: rasgosData, error: errorRasgos } = await supabase
            .from('rasgos')
            .select('nombre');

        if (rasgosData) {
            const rasgosObj = {};
            rasgosData.forEach(r => rasgosObj[r.nombre] = {});
            popularSelect('contenedor-rasgos', rasgosObj); // <--- ¡Aquí se cargan los rasgos!
        }

    } catch (error) {
        console.error('Error cargando datos:', error);
    }
}

/* Lógica del cambio de raza y clase */
const selectorClase = document.getElementById('select-clase');
const selectorRaza = document.getElementById('select-raza');
//Escuchamos el evento del cambio de clase
selectorClase?.addEventListener('change', () => {

    const claseElegida = selectorClase.value.toLowerCase();

    // Limpiamos los bonos si el jugador se arrepiente y cambia de clase
    estado.bonosFijosClase = { fuerza: 0, destreza: 0, carisma: 0, sabiduria: 0, resistencia: 0, canalizacion: 0, vida: 0, mana: 0 };

    if (claseElegida !== "") {
        const datos = datosClases[claseElegida];
        // EL BUCLE MÁGICO: Recorre todos los bonos que tenga esta clase y los inyecta en el estado
        for (let propiedad in datos) {
            estado.bonosFijosClase[propiedad] = datos[propiedad];
        }
    }
    // Refrescamos la pantalla
    actualizarPantalla();
});

// Función para manejar el clic en los dotes (Límite de 1)
function manejarClicDote(evento) {
    const doteElegida = evento.target.value;

    if (evento.target.checked) {
        if (estado.dotesActivos.length >= 1) { // Límite de 1 dote por raza
            evento.target.checked = false;
            alert("Solo puedes elegir 1 Dote de raza.");
            return;
        }
        estado.dotesActivos.push(doteElegida);
    } else {
        estado.dotesActivos = estado.dotesActivos.filter(d => d !== doteElegida);
    }

    // Llamamos al actualizador de textos
    actualizarTextosPasivas();
}

// EVENTO DE CAMBIO DE RAZA ACTUALIZADO
selectorRaza?.addEventListener('change', () => {
    const razaElegida = selectorRaza.value.toLowerCase();
    const contenedorDotes = document.getElementById('contenedor-dotes');

    // 1. Limpieza de números y dotes anteriores
    estado.bonosFijosRaza = { fuerza: 0, destreza: 0, carisma: 0, sabiduria: 0, resistencia: 0, canalizacion: 0 };
    estado.detalles = { tamano: '-', manaBase: 0, razaID: '' };
    estado.dotesActivos = [];
    contenedorDotes.innerHTML = ''; // Borramos los botones del HTML

    if (razaElegida !== "") {
        const datos = datosRazas[razaElegida];

        // Asignamos matemáticas (bucle mágico)
        for (let propiedad in datos.bonos) {
            estado.bonosFijosRaza[propiedad] = datos.bonos[propiedad];
        }
        estado.detalles.tamano = datos.detalles.tamano;
        estado.detalles.manaBase = datos.detalles.manaBase;
        estado.detalles.razaID = razaElegida; // Guardamos qué raza es para los textos

        // 2. FABRICAMOS LOS BOTONES DE DOTES
        datos.dotesPermitidos.forEach(idDote => {
            const infoDote = datosDotes[idDote];

            const label = document.createElement('label');
            label.className = 'rasgo-label';

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'checkbox-dote'; // Para no mezclarlo con rasgos
            checkbox.value = idDote;

            const span = document.createElement('span');
            span.className = 'rasgo-texto';
            span.innerText = infoDote.nombre;

            label.appendChild(checkbox);
            label.appendChild(span);
            contenedorDotes.appendChild(label);

            checkbox.addEventListener('change', manejarClicDote);
        });
    } else {
        contenedorDotes.innerHTML = '<span style="color: #8c5a35; font-size: 0.8rem;">Selecciona una raza primero...</span>';
    }

    actualizarPantalla();
    actualizarTextosPasivas();
});

//Actualizando los textos de las pasivas

function actualizarTextosPasivas() {
    const cajaTexto = document.getElementById('texto-pasivas');
    if (!cajaTexto) return;

    let textoFinal = "";

    // 1. Textos de la Raza (Habilidades e Idiomas)
    if (estado.detalles.razaID) {
        const infoRaza = datosRazas[estado.detalles.razaID];
        textoFinal += `--- RAZA ---\n`;
        textoFinal += `Habilidad: ${infoRaza.habilidad}\n`;
        textoFinal += `Idiomas: ${infoRaza.idiomas}\n\n`;
    }

    // 2. Textos del Dote Seleccionado
    if (estado.dotesActivos.length > 0) {
        textoFinal += `--- DOTE ---\n`;
        estado.dotesActivos.forEach(idDote => {
            textoFinal += `• ${datosDotes[idDote].nombre}: ${datosDotes[idDote].efecto}\n`;
        });
        textoFinal += `\n`;
    }

    // 3. Textos de los Rasgos Seleccionados
    if (estado.rasgosActivos.length > 0) {
        textoFinal += `--- RASGOS ---\n`;
        estado.rasgosActivos.forEach(idRasgo => {
            // Solo imprimimos los que tienen un efecto descriptivo
            if (datosRasgos[idRasgo] && datosRasgos[idRasgo].efecto) {
                textoFinal += `• ${datosRasgos[idRasgo].nombre}: ${datosRasgos[idRasgo].efecto}\n`;
            }
        });
    }

    // Inyectamos todo el compendio en el textarea
    cajaTexto.value = textoFinal.trim();
}



/* Logica rasgos elegidos por el jugador */

function manejarClicRasgo(evento) {
    const rasgoElegido = evento.target.value;

    if (evento.target.checked) {
        // FILTRO DE LÍMITE
        if (estado.rasgosActivos.length >= 5) {
            evento.target.checked = false;
            alert("Has alcanzado el límite máximo de 5 rasgos.");
            return;
        }
        estado.rasgosActivos.push(rasgoElegido);
    } else {
        estado.rasgosActivos = estado.rasgosActivos.filter(r => r !== rasgoElegido);
    }

    // Actualizamos contador
    if (document.getElementById('contador-rasgos')) {
        document.getElementById('contador-rasgos').innerText = estado.rasgosActivos.length;
    }

    // Llamamos al cálculo
    calcularRasgos(); // (Nota: en tu código esto se llama calcularRasgos, no recalcularRasgos)
    actualizarTextosPasivas();
}

// ¡MUY IMPORTANTE! Al final de tu archivo hoja_personaje.js, llama a la función para que todo arranque:
inicializarHTML();

function inicializarHTML() {
    const contenedorRasgos = document.getElementById('contenedor-rasgos');

    // Generar Rasgos
    for (const [idRasgo, datos] of Object.entries(datosRasgos)) {

        // 1. Crear la etiqueta <label>
        const label = document.createElement('label');
        label.className = 'rasgo-label';

        // 2. Crear la casilla <input type="checkbox">
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'checkbox-rasgo';
        checkbox.value = idRasgo;

        const spanTexto = document.createElement('span');
        spanTexto.className = 'rasgo-texto';
        spanTexto.innerText = datos.nombre;

        // 3. Unir las piezas (el checkbox y el nombre del rasgo)
        label.appendChild(checkbox);
        label.appendChild(spanTexto);


        // 4. Inyectarlo en la pantalla
        contenedorRasgos.appendChild(label);

        // 5. Agregar el Event Listener a ESTE checkbox específico
        checkbox.addEventListener('change', manejarClicRasgo);
    }
}
