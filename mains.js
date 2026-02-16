// Para la entrega: mínimo 3 funciones con parámetros, un ciclo de iteración (con if y while),
// y uso de console, prompt y alert. Aquí añado dos funciones de orden superior con ejemplos.

// 1) Función simple: saludar al usuario
function saludarUsuario(nombre) {
    if (nombre === null || nombre.trim() === "") {
        alert("No ingresaste un nombre. Bienvenido anónimo.");
        return;
    }
    alert("¡Hola, " + nombre + "! Bienvenido a nuestro programa.");
}

// 2) Función de orden superior: mapArray
// Recibe un array y una función (callback) y devuelve un nuevo array transformado.
function mapArray(arr, fn) {
    const result = [];
    for (let i = 0; i < arr.length; i++) {
        result.push(fn(arr[i], i, arr));
    }
    return result;
}

// Ejemplo de función callback para usar con mapArray
function doble(n) {
    return n * 2;
}

// 3) Segunda función de orden superior: repeatUntil
// Recibe una acción (actionFn) que se ejecuta repetidamente y una predicateFn que
// indica cuándo detenerse. Usa while y contiene un if para manejo de casos.
function repeatUntil(actionFn, predicateFn, maxIterations = 100) {
    let iterations = 0;
    while (true) {
        const value = actionFn();
        iterations++;
        // if para cortar la ejecución por seguridad o por condición verdadera
        if (predicateFn(value)) {
            console.log("Predicate returned true after", iterations, "iterations.");
            return { iterations, value };
        }
        if (iterations >= maxIterations) {
            console.warn("Se alcanzó el máximo de iteraciones:", maxIterations);
            return { iterations, value: null };
        }
    }
}

// Action: pedir una entrada al usuario
function pedirEntrada() {
    const entrada = prompt("Ingrese un número válido o escriba 'salir' para terminar:");
    console.log("Entrada recibida:", entrada);
    return entrada;
}

// Predicate: terminar si el usuario escribió 'salir' o ingresó un número válido
function esSalirONumeroValido(entrada) {
    if (entrada === null) { // el usuario canceló el prompt
        alert("Cancelado por el usuario.");
        return true;
    }
    if (entrada.toLowerCase && entrada.toLowerCase() === 'salir') {
        alert("Terminando por solicitud del usuario (" + entrada + ").");
        return true;
    }
    const n = Number(entrada);
    if (!isNaN(n)) {
        alert("Ingresaste el número: " + n);
        return true;
    }
    // Si llegamos aquí, la entrada no es válida
    alert("Entrada no válida. Por favor intenta de nuevo.");
    return false;
}

// --- Ejecución de ejemplo ---
// 1) Pedir nombre y saludar (usa prompt y alert)
const nombreUsuario = prompt("Ingrese su nombre:");
saludarUsuario(nombreUsuario);

// 2) Usar mapArray para transformar una lista de números (usa prompt y console)
const listaStr = prompt("Ingresa números separados por comas, ejemplo: 1,2,3");
if (listaStr !== null) {
    const arr = listaStr.split(',')
        .map(s => s.trim())
        .map(s => Number(s))
        .filter(n => !isNaN(n));
    console.log("Array original:", arr);
    const arrDobles = mapArray(arr, doble);
    console.log("Array doblado con mapArray:", arrDobles);
    alert("Revisa la consola para ver los resultados de la transformación.");
}

// 3) Usar repeatUntil para solicitar entrada hasta que sea válida o se escriba 'salir'
console.log("Iniciando repeatUntil - ingresa un número o 'salir'");
repeatUntil(pedirEntrada, esSalirONumeroValido, 50);

// Fin del script