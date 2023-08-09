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
    if (screen.innerHTML.length < 10) {
        //Comprobar si el valor del boton es un numero
        if (!isNaN(parseInt(button.innerHTML))) {
            //Comprobar si el valor en pantalla solo contiene un cero (0)
            if (screen.innerHTML === "0" || operating || showed_result) {
                screen.innerHTML = button.innerHTML;
            } else {
                screen.innerHTML += button.innerHTML;
            }
            //Comprobar si el valor en pantalla contiene o no el caracter decimal (.)
        } else if (button.innerHTML == '.' && !screen.innerHTML.includes('.') || showed_result) {
            if(showed_result){
                screen.innerText = "0";
            }
            screen.innerHTML += button.innerHTML;
        }
        operating = false;
        showed_result = false;
        console.log({ number, number2, operating, screen, op_screen });
    } else if(operating){
        screen.innerText = button.innerText;
    }
}

//Metodo para reiniciar la pantalla
function delete_all() {
    screen.innerText = "0";
    op_screen.innerText = "";
    operating = false;
    showed_result = false;
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
        if (number2 !== 0) {
            number = fix_number_length(parseFloat(screen.innerText));
        } else {
            number2 = fix_number_length(parseFloat(screen.innerText));
        }
        //Seleccion de metodo a utilizar
        op_selection(number, number2);
        op_screen.innerText = button.innerText;
        number = parseFloat(screen.innerText);
        number2 = 0;
        showed_result = true;
    }
    operating = true;
    console.log({ number, number2, operating, screen, op_screen });
}

function plus_minus(){
    if(screen.innerText !== "0"){
        screen.innerText = fix_number_length(parseFloat(screen.innerText) * -1);
        showed_result = true;
    }
}

function clean_screen(){
    screen.innerText = "0";
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

function percent() {
    if (op_screen.innerText !== "" && !showed_result) {
        number2 = number * fix_number_length(parseFloat(screen.innerText)) / 100;
        op_selection(number, number2);
        number = parseFloat(screen.innerText);
        number2 = 0;
        showed_result = true;
        operating = true;
        console.log({ number, number2, operating, screen, op_screen });
    }
}

function result() {
    if (op_screen.innerText !== "") {
        number2 = fix_number_length(parseFloat(screen.innerText));
        //Seleccion de operacion
        op_selection(number, number2);
        showed_result = true;
        op_screen.innerText = "";
        number = 0;
        number2 = 0;
    }
    console.log({ number, number2, operating, screen, op_screen });
}

function op_selection(a, b) {
    switch (op_screen.innerText) {
        case "+": //suma
            screen.innerText = fix_number_length(add(a, b));
            break;
        case "-": //resta
            screen.innerText = fix_number_length(subtract(a, b));
            break;
        case "x": //multiplicacion
            screen.innerText = fix_number_length(multiply(a, b));
            break;
        case "÷": //division
            screen.innerText = fix_number_length(divide(a, b));
            break;
        default:
            screen.innerText = "Syntax Error";
    }
}

//Metodo que revisa la longitud del numero a mostrar en pantalla
function fix_number_length(element, width = 11){
    //Longitud del numero a mostrar
    let number_length = String(element).length;

    //Comparar si la longitud del numero es mayor al espacio disponible
    //y si el numero contiene decimales
    if(number_length > width && String(element).includes('.')){
        let number_parts = String(element).split('.');
        let int_length = number_parts[0].length;

        //Si la longitud del numero entero es menor al espacio disponible
        if(int_length < width) {
            //restar al espacio disponible la longitud del entero
            //-1 que es el espacio que ocupa el punto decimal(.)
            width = width - int_length - 1;
            return element.toFixed(width);
        } else {
            return "Out of range!";
        }
    } else {
        return element;
    }
}