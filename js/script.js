window.onload = function() {
    var bienvenida = document.getElementById("bienvenida");
    var siguienteBtn = document.getElementById("siguiente");
    var instrucciones = document.getElementById("instrucciones");
    var continuarBtn = document.getElementById("continuar-btn");
    var main = document.getElementById("main");
    var modalConfirmacion = document.getElementById("modalConfirmacion");
    var btnSi = document.getElementById("btnSi");
    var btnNo = document.getElementById("btnNo");

    // IDs de las imágenes estáticas
    var imagenesEstaticasIds = ['amarillo', 'verde', 'rojo', 'azul'];

    // Evento de clic en el botón "Siguiente" en la bienvenida
    siguienteBtn.addEventListener("click", function() {
        bienvenida.style.display = "none";
        instrucciones.style.display = "block";
        continuarBtn.style.display = "block";
    });

    // Evento de clic en el botón "¿Estás listo para continuar?" en las instrucciones
    continuarBtn.addEventListener("click", function() {
        instrucciones.style.display = "none";
        main.style.display = "block";
        document.getElementById("cuenta-regresiva").classList.remove("oculto");
        moverImagenesAleatorias();
    });

    // Manejo de botones del modal
    btnSi.addEventListener("click", function() {
        modalConfirmacion.style.display = "none";
        moverImagenesAleatorias();
    });

    btnNo.addEventListener("click", function() {
        modalConfirmacion.style.display = "none";
        resetearSimulacion();
    });

    // Función para resetear la simulación al estado inicial
    function resetearSimulacion() {
        bienvenida.style.display = "block";
        main.style.display = "none";
        currentIndex = 0;
        clearInterval(intervaloMovimiento);
        var imagenes = document.querySelectorAll('.imagen');
        imagenes.forEach(function(imagen) {
            imagen.style.display = 'none';
        });
    }
}

// Función para generar un número aleatorio dentro de un rango
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Función para asignar ubicación aleatoria a una imagen
function asignarUbicacionAleatoria(imagen) {
    var contenedorRect = document.querySelector('.contenedor').getBoundingClientRect();
    var contenedorAncho = contenedorRect.width;
    var contenedorAlto = contenedorRect.height;
    var imagenAncho = imagen.width;
    var imagenAlto = imagen.height;

    var nuevoLeft = getRandomNumber(0, contenedorAncho - imagenAncho);
    var nuevoTop = getRandomNumber(0, contenedorAlto - imagenAlto);

    imagen.style.left = nuevoLeft + 'px';
    imagen.style.top = nuevoTop + 'px';
}

// Variable para rastrear el índice de la imagen actual
var currentIndex = 0;
var intervaloMovimiento;

// Función para mover imágenes de forma aleatoria
function moverImagenesAleatorias() {
    var imagenes = document.querySelectorAll('.imagen');

    imagenes.forEach(function(imagen) {
        imagen.style.display = 'none';
    });

    var imagenActual = imagenes[currentIndex];
    imagenActual.style.display = 'block';

    var imagenesEstaticasIds = ['amarillo', 'verde', 'rojo', 'azul']; // IDs de imágenes estáticas
    var imagenEstaticaId = imagenesEstaticasIds[currentIndex % imagenesEstaticasIds.length];
    var imagenEstatica = document.getElementById(imagenEstaticaId);
    var imagenEstaticaContainer = document.getElementById('imagen-estatica-container');
        
    if (!imagenEstaticaContainer) {
        imagenEstaticaContainer = document.createElement('div');
        imagenEstaticaContainer.id = 'imagen-estatica-container';
        imagenEstaticaContainer.className = 'imagen-estatica-container';
        document.querySelector('.contenedor').appendChild(imagenEstaticaContainer);
    }
    
    imagenEstaticaContainer.innerHTML = '';
    if (imagenEstatica) {
        imagenEstaticaContainer.appendChild(imagenEstatica.cloneNode());
    }

    asignarUbicacionAleatoria(imagenActual);

    intervaloMovimiento = setInterval(function() {
        asignarUbicacionAleatoria(imagenActual);
    }, 3000);

    setTimeout(function() {
        clearInterval(intervaloMovimiento);
        currentIndex++;

        if (currentIndex >= imagenes.length) {
            currentIndex = 0;
            mostrarModal();
        } else {
            moverImagenesAleatorias();
        }
    }, 10000);
}

// Función para mostrar el modal de confirmación
function mostrarModal() {
    var modalConfirmacion = document.getElementById("modalConfirmacion");
    modalConfirmacion.style.display = "flex";
}
