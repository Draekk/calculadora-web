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

//Definicion de otras variables
const screen = document.querySelector("#screen h1");

//Funcion que muestra el valor en pantalla
function show_value(button){
    //Comprobar si el valor del boton es un numero
    if(!isNaN(parseInt(button.innerHTML))){
        console.log(parseInt(button.innerHTML));
        //Comprobar si el valor en pantalla solo contiene un cero (0)
        if(screen.innerHTML === "0"){
            screen.innerHTML = button.innerHTML;
        } else {
            screen.innerHTML += button.innerHTML;
        }
    //Comprobar si el valor en pantalla contiene o no el caracter decimal (.)
    } else if(button.innerHTML == '.' && !screen.innerHTML.includes('.')){
        console.log(button.innerHTML);
        screen.innerHTML += button.innerHTML;
    }
}