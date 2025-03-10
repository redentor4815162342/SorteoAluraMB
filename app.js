let amigos = []; // Lista de amigos

// Detectar la tecla "Enter" en el input
document.getElementById("amigo").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        agregarAmigo();
    }
});

// Función para agregar amigos
function agregarAmigo() {
    let input = document.getElementById("amigo");
    let nombre = input.value.trim();

    if (nombre !== "") {
        let lista = document.getElementById("listaAmigos");
        let nuevoElemento = document.createElement("li");
        nuevoElemento.textContent = nombre;
        lista.appendChild(nuevoElemento);
        
        amigos.push(nombre);
        input.value = ""; 
        input.focus();
    } else {
        alert("Por favor ingresa un nombre.");
    }
}

// Función para sortear con efecto de tómbola y sonido
function sortearAmigo() {
    if (amigos.length < 2) {
        alert("Debes ingresar al menos 2 amigos para realizar el sorteo.");
        return;
    }

    console.log("Sorteo iniciado"); // Debug para verificar que la función se ejecuta

    let resultado = document.getElementById("resultado");
    resultado.innerHTML = ""; // Limpiar resultados previos

    let amigosMezclados = [...amigos]; // Copia de la lista
    let i = 0;

    // Obtener los elementos de sonido
    let sonidoRedoble = document.getElementById("redoble");
    let sonidoVictoria = document.getElementById("victoria");

    // Verificar si los audios están cargados
    if (!sonidoRedoble || !sonidoVictoria) {
        console.error("Los archivos de sonido no se encontraron.");
        return;
    }

    // Reproducir el sonido de redoble de tambores
    sonidoRedoble.currentTime = 0;
    sonidoRedoble.play().catch(error => console.error("Error al reproducir redoble:", error));

    // Animación de la tómbola
    let intervalo = setInterval(() => {
        resultado.innerHTML = `<li>🎲 ${amigosMezclados[i]} 🎲</li>`;
        i = (i + 1) % amigosMezclados.length;
    }, 100); // Cambia el nombre cada 100ms

    // Detener la animación y mostrar el resultado final después de 3 segundos
    setTimeout(() => {
        clearInterval(intervalo);
        resultado.innerHTML = ""; // Limpiar la animación

        // Elegir un solo ganador
        let ganador = amigosMezclados[Math.floor(Math.random() * amigosMezclados.length)];

        let elemento = document.createElement("li");
        elemento.textContent = `🎉 El ganador es: ${ganador} 🎉`;
        resultado.appendChild(elemento);

        // Detener el redoble y reproducir la fanfarria de victoria
        sonidoRedoble.pause();
        sonidoRedoble.currentTime = 0;
        
        sonidoVictoria.play().catch(error => console.error("Error al reproducir fanfarria:", error));
        lanzarConfeti();
    }, 3000); // 3 segundos de animación
}

// Función para reiniciar el sorteo
function reiniciarSorteo() {
    amigos = [];
    document.getElementById("listaAmigos").innerHTML = "";
    document.getElementById("resultado").innerHTML = "";

    let botonSortear = document.querySelector(".button-draw");
    botonSortear.disabled = false;

    alert("El sorteo ha sido reiniciado.");
}

function lanzarConfeti() {
    confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 }, // Desde la parte superior
    });
}
