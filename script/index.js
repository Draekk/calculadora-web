//Definicion de variables de teclas numericas
const b0 = document.querySelector("#ckeys li:nth-child(18) > button");
const b1 = document.querySelector("#ckeys li:nth-child(13) > button");
const b2 = document.querySelector("#ckeys li:nth-child(14) > button");
const b3 = document.querySelector("#ckeys li:nth-child(15) > button");
const b4 = document.querySelector("#ckeys li:nth-child(9) > button");
const b5 = document.querySelector("#ckeys li:nth-child(10) > button");
const b6 = document.querySelector("#ckeys li:nth-child(11) > button");
const b7 = document.querySelector("#ckeys li:nth-child(5) > button");
const b8 = document.querySelector("#ckeys li:nth-child(6) > button");
const b9 = document.querySelector("#ckeys li:nth-child(7) > button");

//Definicion de variables de teclas de operacion
const plus = document.querySelector("#ckeys li:nth-child(12) > button");
const minus = document.querySelector("#ckeys li:nth-child(8) > button");
const product = document.querySelector("#ckeys li:nth-child(3) > button");
const div = document.querySelector("#ckeys li:nth-child(2) > button");
const negative = document.querySelector("#ckeys li:nth-child(4) > button");

//Definicion de variables de almacenamiento
let number = 0;
let operating = false;

//Definicion de otras variables
const screen = document.querySelector("#screen h1");
const op_screen = document.querySelector("#screen h4:nth-child(1)");
const num_screen = document.querySelector("#screen > section h4:nth-child(2)");

//Funcion que muestra el valor en pantalla
function show_value(button) {
    if (screen.innerHTML.length < 11) {
        //Comprobar si el valor del boton es un numero
        if (!isNaN(parseInt(button.innerHTML))) {
            console.log(parseInt(button.innerHTML));
            //Comprobar si el valor en pantalla solo contiene un cero (0)
            if (screen.innerHTML === "0" || operating) {
                screen.innerHTML = button.innerHTML;
                operating = false;
            } else {
                screen.innerHTML += button.innerHTML;
            }
            //Comprobar si el valor en pantalla contiene o no el caracter decimal (.)
        } else if (button.innerHTML == '.' && !screen.innerHTML.includes('.')) {
            console.log(button.innerHTML);
            screen.innerHTML += button.innerHTML;
        }
    }
}

//Metodo para reiniciar la pantalla
function delete_all() {
    screen.innerText = "0";
    op_screen.innerText = "";
    operating = false;
    number = 0;
}

//Metodo que realiza la operacion y muestra el resultado
function operation(button) {
    if (number === 0) {
        number = parseFloat(screen.innerText);
        console.log(number);
        op_screen.innerText = button.innerHTML;
    } else {
        //Seleccion de metodo a utilizar
        switch(op_screen.innerText){
            case "+":   //suma
                number = add(number, parseFloat(screen.innerText));
                screen.innerText = eleven_or_more(number);
                break;
            case "-":   //resta
                number = subtract(number, parseFloat(screen.innerText));
                screen.innerText = eleven_or_more(number);
                break;
            case "x":   //multiplicacion
                number = multiply(number, parseFloat(screen.innerText));
                screen.innerText = eleven_or_more(number);
                break;
            case "÷":   //division
                number = divide(number, parseFloat(screen.innerText));
                screen.innerText = eleven_or_more(number);
                break;
            default:
                screen.innerText = "Syntax Error";
        }
    }
    if(button.innerText !== "="){
        op_screen.innerText = button.innerText;
    }
    operating = true;
}

//Metodo que realiza la suma
function add(a, b) {
    return a + b;
}

//Metodo que realiza la resta
function subtract(a, b){
    return a - b;
}

//Metodo que realiza la multiplicacion
function multiply(a, b){
    return a * b;
}

//Metodo que realiza la division
function divide(a, b){
    return a / b;
}

//Metodo que revisa si el numero a mostrar tiene mas de 11 digitos
function eleven_or_more(element){
    if(String(element).length > 10){
        return parseFloat(element.toFixed(10));
    }
    return element;
}