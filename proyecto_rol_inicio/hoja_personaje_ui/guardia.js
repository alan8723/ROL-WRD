// Esperamos a que el navegador termine de leer el HTML básico
document.addEventListener("DOMContentLoaded", async function () {

    // Le preguntamos a Supabase si existe una sesión activa (el Pase VIP) guardada en este navegador
    const { data: { session } } = await supabaseClient.auth.getSession();

    // Si NO hay sesión (!session), bloqueamos el paso
    if (!session) {
        console.warn("¡Intruso detectado! Redirigiendo a la taberna...");
        // Usamos replace en lugar de href para que no puedan usar el botón "Atrás" del navegador
        window.location.replace("login.html");
    } else {
        // Si hay sesión, lo dejamos pasar tranquilamente
        console.log("Acceso VIP concedido. Jugador conectado:", session.user.email);
    }
});