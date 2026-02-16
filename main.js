 function saludar () {
     console.log("Hola coder!!")
 }

 saludar()



//  function sumar() {
//     let numeroA = parseInt(prompt("Ingrese el primer número:"), 10);
//     let numeroB = parseInt(prompt("Ingrese el segundo número:"), 10);
//     let resultado = numeroA + numeroB;
//     console.log("El resultado de la suma es: " + resultado);
// }
// 
// sumar()




function calcular(operacion) {
    let numeroA = parseInt(prompt("Ingrese el primer numero"));
    let numeroB = parseInt(prompt("Ingrese el segundo numero"));
    let resultado;

    switch (operacion) {
        case "+":
            resultado = numeroA + numeroB;
            break;
        case "-":
            resultado = numeroA - numeroB;
            break;
        case "*":
            resultado = numeroA * numeroB;
            break;
        case "/":
            if (numeroB === 0) {
                alert("No se puede dividir por cero");
                return;
            }
            resultado = numeroA / numeroB;
            break;
    }

    console.log(numeroA + " " + operacion + " " + numeroB + " = " + resultado);
}

let menu = parseInt(prompt(
    "Elija una opcion:\n 1-sumar\n 2-restar\n 3-multiplicar\n 4-dividir\n 5-salir"
));

while (menu !== 5) {
    switch (menu) {
        case 1:
            calcular("+");
            break;
        case 2:
            calcular("-");
            break;
        case 3:
            calcular("*");
            break;
        case 4:
            calcular("/");
            break;
        default:
            alert("Opción incorrecta");
    }

    menu = parseInt(prompt(
        "Elija una opcion:\n 1-sumar\n 2-restar\n 3-multiplicar\n 4-dividir\n 5-salir"
    ));
}

alert("Programa finalizado");
