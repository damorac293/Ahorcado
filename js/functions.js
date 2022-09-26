let tries = 5;
let points = 0;
let sendWordTbx = "";
let sendWord = "";
let btnGame = document.getElementById('btnSend');
const popSta = document.getElementById('statusPopUP');
const popWindow = document.getElementById('mainModalCont');

// Palabra selecciona para ser encontrada
function getSendWord() {
    sendWordTbx = document.getElementById('sendText');
    sendWord = sendWordTbx.value.toUpperCase();

}
popSta.addEventListener('click', (e) => {
    e.preventDefault();
});

function popUpStatus(status) {
    if (sendWord != "") {

        switch (status) {
            case 1: popSta.classList.add('popUpClose');
            sendWordTbx.setAttribute('required', '');
            break;
            case 2: popSta.classList.add('popUpWin');
            popWindow.classList.add('popUpWinWindow');
            sendWordTbx.setAttribute('type', 'text');
            sendWordTbx.setAttribute('readonly', 'true');
            sendWordTbx.value = "La palabra es:" + sendWord;
            btnGame.textContent = 'reiniciar';
            break;
            case 3: popSta.classList.add('popUpLose');
            popWindow.classList.add('popUpLoseWindow');
            sendWordTbx.setAttribute('type', 'text');
            sendWordTbx.setAttribute('readonly', 'true');
            sendWordTbx.value = "La palabra era:" + sendWord;
            btnGame.textContent = 'reiniciar';
            break;
        }
    }
}

// Función que recibe el valor alfabetico del input seleccionado en el html
// verifica cada letra dentro del input result y la ubica según su posición
// en la palabra que se nececita descubrir.
function btnValue(letterByBtn) { // Cadena enviada desde el input que muestra las letras descubiertas
    const wordResult = document.getElementById('result').value.toUpperCase().replace(/,/g, '');
    // Arreglo que almacena las letras decubiertas
    const discoveredW = new Array(sendWord.length);
    const resultBC = document.getElementById('result').style.backgroundColor = 'rgba(171, 169, 169, 0.315';
    const resultLength = document.getElementById('result');
    let icon = document.getElementsByName('lifeIcon');
    let btnVal = document.getElementsByName(letterByBtn);
    let btnColor = 'red';

    if (sendWord.length >= 10) {
        resultLength.style.width = '100%';
        resultLength.style.height = '12rem';
    }

    for (let b = 0; b < sendWord.length; b++) {
        if (btnVal[0].value == sendWord[b]) {
            btnColor = 'green';
            break;
        }
    }

    for (let i = 0; i <= (sendWord.length) - 1; i++) {

        if (wordResult[i] == sendWord[i]) {
            discoveredW.splice(i, i, wordResult[i]);
            btnVal[0].style.backgroundColor = btnColor;
            btnVal[0].style.color = 'white';

        } else {

            if (sendWord[i] == letterByBtn) {
                discoveredW.splice(i, i, letterByBtn);
                btnVal[0].style.backgroundColor = btnColor;
                btnVal[0].style.color = 'white';
                points = points + 1;
            } else {
                discoveredW.splice(i, i, " ");
                btnVal[0].style.backgroundColor = btnColor;
                btnVal[0].style.color = 'white';

            }
        }
    }
    if (btnVal[0].style.backgroundColor == 'red') {
        tries = tries - 1;

        if (tries <= 0) {
            icon[tries].classList.add('livesLost')
            icon[tries].style.color = 'trasparent';
            popUpStatus(3);

        } else {
            icon[tries].classList.add('livesLost')
            icon[tries].style.color = 'trasparent';
        }
    } else {
        if (btnVal[0].style.backgroundColor == 'green') {

            if (points == sendWord.length) {
                popUpStatus(2);
            }
        }
    }
    document.getElementById('result').innerHTML = discoveredW;
}

// Captura los caracteres escritos en el input y los envia a la función
sendWord.addEventListener("input", function (event) {
    validateText(this, "[a-z]")
});
// Funcion que valida las palabras escritas en el input, no permite caracteres especiales
// ni espacios entre palabras
function validateText(inputType, regExp) {
    let inputText = inputType.value;
    let txtLetters = inputText.split("");

    for (let x in txtLetters) {
        let txbChar = txtLetters[x]
        if (!(new RegExp(regExp, "i")).test(txbChar)) {
            txtLetters[x] = ""
        }
    }
    inputType.value = txtLetters.join("");
}

function restartPage() {
    if (btnGame.textContent == 'reiniciar') {
        tries = 5;
        points = 0;
        sendWordTbx = "";
        sendWord = "";
        window.location.reload(true);
    }
}
