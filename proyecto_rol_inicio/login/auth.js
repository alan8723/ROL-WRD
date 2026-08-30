// 1. Inicializamos la conexión con Supabase usando las llaves de tu supabase-config.js
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

// 2. Buscamos el formulario en el HTML
const formRegistro = document.getElementById('form-registro');
// 3. Buscamos el formulario de login en el HTML
const formLogin = document.getElementById('form-login');

// Si estamos en la página de login, ejecutamos este bloque
if (formLogin) {
    formLogin.addEventListener('submit', async function (evento) {
        evento.preventDefault();

        // Atrapamos el correo y la contraseña
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        console.log("Intentando iniciar sesión con:", email);

        // 2. Le pedimos a Supabase que verifique los datos
        const { data, error } = await supabaseClient.auth.signInWithPassword({
            email: email,
            password: password,
        });

        // 3. Revisamos el resultado
        if (error) {
            // Si la contraseña está mal o el usuario no existe
            alert("Error al entrar: " + error.message);
        } else {
            // Si todo está correcto
            alert("¡Bienvenido de vuelta a la Taberna!");

            // 4. REDIRECCIÓN: Mandamos al jugador a su hoja de personaje
            window.location.href = "../hoja_personaje_ui/hoja_personaje.html";
        }
    });
}

// Si estamos en la página de registro, ejecutamos este bloque
if (formRegistro) {
    formRegistro.addEventListener('submit', async function (evento) {
        // Evitamos que la página se recargue (comportamiento por defecto de los formularios)
        evento.preventDefault();

        // Obtenemos los valores que escribió el usuario
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const nombre = document.getElementById('nombre').value;

        console.log("Intentando registrar a:", email);

        // 3. Enviamos los datos a Supabase para crear el usuario
        const { data, error } = await supabaseClient.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    // Aquí guardamos el nombre del jugador como un dato extra
                    nombre_jugador: nombre
                }
            }
        });

        // 4. Revisamos si hubo algún error o si fue un éxito
        if (error) {
            alert("Error al crear la cuenta: " + error.message);
        } else {
            alert("¡Leyenda forjada con éxito! Revisa tu correo para confirmar tu cuenta.");
            // Opcional: limpiar el formulario
            formRegistro.reset();
        }
    });
}