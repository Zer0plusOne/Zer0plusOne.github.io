document.addEventListener("DOMContentLoaded", function () {
    const videoOverlay = document.getElementById("video-overlay");
    const videoContainer = document.getElementById("video-container");
    const iframe = document.getElementById("youtube-video");
    const playButton = document.getElementById("play-button");
    const staticCard = document.getElementById("static-card");

    // 1. Cuando el usuario hace clic en "Press_Me"
    playButton.addEventListener("click", function () {
        // Reproduce el video con sonido
        iframe.src += "&autoplay=1&mute=0"; // Habilita el sonido y autoplay
        iframe.style.opacity = 1; // Muestra el video
        playButton.style.display = "none"; // Oculta el botón

        // 2. Inicia un countdown de 27.7 segundos
        setTimeout(() => {
            // Mutea la pestaña
            muteTab();
            
            // Elimina el iframe para detener el video
            iframe.remove();

            // Difumina y oculta el reproductor
            videoOverlay.style.opacity = 0;
            videoOverlay.style.pointerEvents = "none"; // Desactiva interacciones

            // Muestra la tarjeta estática
            staticCard.style.display = "block";
        }, 27700); // 27.7 segundos
    });

    // Función para mutear la pestaña
    function muteTab() {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const mediaStream = audioCtx.createMediaStreamDestination();
        mediaStream.stream.getAudioTracks().forEach(track => track.enabled = false);
    }
});