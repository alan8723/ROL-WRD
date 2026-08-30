const btnGuardar = document.getElementById('btn-guardar');

if (btnGuardar) {
    btnGuardar.addEventListener('click', async function () {
        // 1. Verificamos quién está jugando
        const { data: { session } } = await supabaseClient.auth.getSession();

        // 2. Atrapamos lo que el jugador escribió
        const nombrePersonaje = document.getElementById('input-nombre').value;
        const razaPersonaje = document.getElementById('select-raza').value;

        console.log("Guardando en la base de datos...");

        // 3. Insertamos los datos en la tabla 'personajes'
        const { error } = await supabaseClient
            .from('Personajes')
            .insert([
                {
                    user_id: session.user.id,
                    nombre: nombrePersonaje,
                    raza: razaPersonaje
                }
            ]);

        if (error) {
            alert("Hubo un error: " + error.message);
        } else {
            alert("¡Tu personaje ha sido guardado en los registros!");
        }
    });
}