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
let number2 = 0;
let operating = false;
let showed_result = false;

//Definicion de otras variables
const screen = document.querySelector("#screen h1");
const op_screen = document.querySelector("#screen h4:nth-child(1)");
const num_screen = document.querySelector("#screen > section h4:nth-child(2)");


//Funcion que muestra el valor en pantalla
function show_value(button) {
    if (screen.innerHTML.length < 11) {
        //Comprobar si el valor del boton es un numero
        if (!isNaN(parseInt(button.innerHTML))) {
            //Comprobar si el valor en pantalla solo contiene un cero (0)
            if (screen.innerHTML === "0" || operating) {
                screen.innerHTML = button.innerHTML;
                operating = false;
            } else {
                screen.innerHTML += button.innerHTML;
            }
            //Comprobar si el valor en pantalla contiene o no el caracter decimal (.)
        } else if (button.innerHTML == '.' && !screen.innerHTML.includes('.')) {
            screen.innerHTML += button.innerHTML;
        }
        showed_result = false;
        console.log({ number, number2, operating, screen, op_screen });
    }
}

//Metodo para reiniciar la pantalla
function delete_all() {
    screen.innerText = "0";
    op_screen.innerText = "";
    operating = false;
    number = 0;
    number2 = 0;
    console.log({ number, number2, operating, screen, op_screen });
}

//Metodo que realiza la operacion y muestra el resultado
function operation(button) {
    if (number === 0 || showed_result) {
        number = fix_number_length(parseFloat(screen.innerText));
        op_screen.innerText = button.innerHTML;
    } else if (!showed_result) {
        if(number2 !== 0){
            number = fix_number_length(parseFloat(screen.innerText));
        } else {
            number2 = fix_number_length(parseFloat(screen.innerText));
        }
        //Seleccion de metodo a utilizar
        switch (op_screen.innerText) {
            case "+":   //suma
                screen.innerText = fix_number_length(add(number, number2));
                break;
            case "-":   //resta
                screen.innerText = fix_number_length(subtract(number, number2));
                break;
            case "x":   //multiplicacion
                screen.innerText = fix_number_length(multiply(number, number2));
                break;
            case "÷":   //division
                screen.innerText = fix_number_length(divide(number, number2));
                break;
            default:
                screen.innerText = "Syntax Error";
        }
        op_screen.innerText = button.innerText;
        number = parseFloat(screen.innerText);
        number2 = 0;
        showed_result = true;
    }
    operating = true;
    console.log({ number, number2, operating, screen, op_screen });
}

//Metodo que realiza la suma
function add(a, b) {
    return a + b;
}

//Metodo que realiza la resta
function subtract(a, b) {
    return a - b;
}

//Metodo que realiza la multiplicacion
function multiply(a, b) {
    return a * b;
}

//Metodo que realiza la division
function divide(a, b) {
    return a / b;
}

function result() {
    if (op_screen.innerText !== "") {
        number2 = fix_number_length(parseFloat(screen.innerText));
        //Seleccion de operacion
        switch (op_screen.innerText) {
            case "+":
                screen.innerText = fix_number_length(add(number, number2));
                break;
            case "-":
                screen.innerText = fix_number_length(subtract(number, number2));
                break;
            case "x":
                screen.innerText = fix_number_length(multiply(number, number2));
                break;
            case "÷":
                screen.innerText = fix_number_length(divide(number, number2));
                break;
            default:
                screen.innerText = "Error! " + number + number2;
        }
        showed_result = true;
        op_screen.innerText = "";
        number = 0;
        number2 = 0;
    }
    console.log({ number, number2, operating, screen, op_screen });
}

//Metodo que revisa la longitud del numero a mostrar en pantalla
function fix_number_length(element, width = 10) {
    if (String(element).length > width) {
        return parseFloat(element.toFixed(width));
    }
    return element;
}