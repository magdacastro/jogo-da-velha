const squad = document.querySelectorAll('.squad');
const player = document.querySelector('.player');
const winner = document.querySelector('.winner');
const btnReboot = document.querySelector('.btn-reboot');
const btnClose = document.querySelector('.btn-closemodal');
const modalWinner = new bootstrap.Modal(document.getElementById("winnerModal"), {
  backdrop: 'static'
});
let myValue; //variável de uso comum para colocar o valor dos quadrados
let timer;

/**
 * Seta as configurações iniciais do jogo.
 * 
 * @param {Void}
 * 
 * @return {Void}
 */
function start() {
  player.innerText = 'x'; //o valor do jogador inicia com X
  myValue = 'x'; //mesmo valor do jogador para termos controle 
}

//Inicia o jogo
start();

function pickSquad(event) {
  if (event.target.innerText === 'x' || event.target.innerText === 'o') {
    return false;
  }
  event.target.innerText = myValue;
  player.innerText = myValue;
  checkWinner();
  timer = setTimeout(startMachine, 1000);
  if (checkWinner()) {
    clearTimeout(timer);
  }
}

function startMachine() {
  const posEmpty = getAvailableSquares();
  const randomPos = posEmpty[parseInt(Math.random() * posEmpty.length)];
  squad[randomPos].innerText = 'o';
  player.innerText = squad[randomPos].innerText;
  checkWinner();
}

squad.forEach((item) => {
  item.addEventListener("click", pickSquad);
});

function rebootSquad() {
  let matrix = Array.from(squad);

  for (let i = 0; i < matrix.length; i++) {
    matrix[i].innerText = "";
    matrix[i].style.color = "#6f6f6f";
  }

  modalWinner.hide();
  start();
}

btnReboot.addEventListener("click", rebootSquad);
btnClose.addEventListener("click", rebootSquad);

/**
 * Retorna um array contendo as posições das peças conforme estão distribuidas no tabuleiro.
 * 
 * @param {Void}
 * 
 * @return {Array}
 */
function getValue() {
  let arrayPosition = [];

  for (let i = 0; i < 3; i++) {
    arrayPosition[i] = [];

    for (let j = 0; j < 3; j++) {
      arrayPosition[i][j] = squad[(i * 3) + j].innerText;
    }
  }

  return arrayPosition;
};

/**
 * Função responsável pela verificação de vencedor e retorna um modal sinalizando o mesmo, caso exista.
 * 
 * @param {Void}
 * 
 * @return {Boolean}
 */
function checkWinner() {
  let tmp = getValue();

  for (let i = 0; i < tmp.length; i++) {
    if (checkEquals(tmp[i])) {
      squad[i * 3 + 0].style.color = "#2894ff";
      squad[i * 3 + 1].style.color = "#2894ff";
      squad[i * 3 + 2].style.color = "#2894ff";
      checkResult(1);
      return true;

    } else if (checkEquals([tmp[0][i], tmp[1][i], tmp[2][i]])) {
      squad[0 * 3 + i].style.color = "#2894ff";
      squad[1 * 3 + i].style.color = "#2894ff";
      squad[2 * 3 + i].style.color = "#2894ff";
      checkResult(1);
      return true;
    }
  }

  if (checkEquals([tmp[0][0], tmp[1][1], tmp[2][2]])) {
    squad[0 * 3 + 0].style.color = "#2894ff";
    squad[1 * 3 + 1].style.color = "#2894ff";
    squad[2 * 3 + 2].style.color = "#2894ff";
    checkResult(1);
    return true;

  } else if (checkEquals([tmp[2][0], tmp[1][1], tmp[0][2]])) {
    squad[2 * 3 + 0].style.color = "#2894ff";
    squad[1 * 3 + 1].style.color = "#2894ff";
    squad[0 * 3 + 2].style.color = "#2894ff";
    checkResult(1);
    return true;

  } else if (checkFilled() === 9) {
    checkResult(0);
    return true;
  }
}

/**
 * Função responsável por verificar se um array contém elementos iguais.
 * 
 * @param {Array} array
 * 
 * @return {Boolean}
 */
function checkEquals(array) {
  for (let i = 0; i < array.length; i++) {
    if (array[i] !== array[0] || array[i].length === 0) {
      return false;
    }
  }

  return true;
}

function checkFilled() {
  let matrix = Array.from(squad);

  return matrix.map((campo) => {
    return (campo.innerText === 'x' || campo.innerText === 'o') ? true : false;
  }).filter(n => n).length;
};

function checkResult(status) {
  if (status === 0) {
    winner.innerText = "Empate!";
  } else if (status === 1) {
    winner.innerText = `Jogador "${player.innerText}" venceu!`;
  }
  modalWinner.show();
}

function getAvailableSquares() {
  let arrayFilled = Array.from(squad);

  return arrayFilled.map((el, key) => {
    return (el.innerText === 'x' || el.innerText === 'o') ? null : key;
  }).filter(Number.isFinite);
}