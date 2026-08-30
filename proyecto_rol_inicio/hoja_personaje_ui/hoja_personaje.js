// Guardamos las reglas de nuestro juego en un "Diccionario" (Objeto)
// Diccionario maestro de razas
const datosRazas = {
    angel: { bonoAtributo: 'canalizacion', bonoValor: 1, tamano: 'Mediano-Alto', manaBase: 14 },
    demonio: { bonoAtributo: 'fuerza', bonoValor: 1, tamano: 'Alto', manaBase: 18 },
    elfo: { bonoAtributo: 'sabiduria', bonoValor: 1, tamano: 'Mediano', manaBase: 12 },
    kenko: { bonoAtributo: 'destreza', bonoValor: 1, tamano: 'Mediano', manaBase: 10 },
    enano: { bonoAtributo: 'resistencia', bonoValor: 1, tamano: 'Pequeño', manaBase: 8 }
};
//Diccionario maestro de Clases
const datosClases = {
    guerrero: { fuerza: 2, resistencia: 1, vida: 2, mana: 1 },
    mago: { sabiduria: 2, canalizacion: 1, vida: 0, mana: 3 },
    cazador: { destreza: 2, sabiduria: 1, vida: 2, mana: 2 }
};
//Diccionario de rasgos
const datosRasgos = {
    investigador: { sabiduria: 1 },
    prudente: { sabiduria: 1 },
    disciplina: { sabiduria: 1 },
    curioso: { sabiduria: 1 },
    medicina: { sabiduria: 1 },
    estrategia: { sabiduria: 1 },
    conocimiento_divino: { sabiduria: 1 },
    perspicacia: { sabiduria: 1 },
    erudicion_historica: { sabiduria: 2, destreza: -1 },

    acrobata: { destreza: 1 },
    escalador: { destreza: 1 },
    juego_de_manos: { destreza: 1, carisma: 1, fuerza: -1 },

    atleta: { fuerza: 1, destreza: 1, sabiduria: -1 },
    intimidante: { fuerza: 1 },
    temerario: { fuerza: 1, },

    supervivencia: { resistencia: 1 },
    resistente: { resistencia: 1 },
    voluntad_ferrea: { resistencia: 2, canalizacion: -1 },

    diplomatico: { carisma: 1 },
    interpretacion: { carisma: 1 },
    empatia_animal: { carisma: 1 },
    buena_reputacion: { carisma: 1 },
    engaño: { carisma: 2, sabiduria: -1 },
    fumador: { carisma: 1 },
    codicioso: { carisma: 1 },

    paciente: { canalizacion: 1 },
    conocimiento_arcano: { canalizacion: 1 },
    pacto_mana: { vida: -4, mana: 3 },

};

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

selectorRaza?.addEventListener('change', () => {

    const razaElegida = selectorRaza.value.toLowerCase(); // Pasamos a minúsculas por seguridad

    // PASO CRÍTICO: Limpiamos los bonos anteriores antes de aplicar los nuevos.
    // Así evitamos que los bonos se acumulen si el jugador cambia de idea.
    estado.bonosFijosRaza = { fuerza: 0, destreza: 0, carisma: 0, sabiduria: 0, resistencia: 0, canalizacion: 0 };
    estado.detalles = { tamano: '-', manaBase: 0 };

    // Si el usuario eligió una raza válida (y no la opción por defecto vacía)
    if (razaElegida !== "") {
        // Extraemos las reglas de esa raza específica
        const datos = datosRazas[razaElegida];

        // INYECCIÓN DINÁMICA: Usamos el texto (ej. 'fuerza') para apuntar al lugar correcto del estado
        estado.bonosFijosRaza[datos.bonoAtributo] = datos.bonoValor;

        // Asignamos el resto de los datos
        estado.detalles.tamano = datos.tamano;
        estado.detalles.manaBase = datos.manaBase;
    }

    // Le pedimos al cerebro que redibuje toda la pantalla con la nueva información
    actualizarPantalla();
});
