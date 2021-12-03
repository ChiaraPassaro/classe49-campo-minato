/******************************************
 * CAMPO MINATO DOM - II PARTE: LOGICA DI GIOCO
 *******************************************/


/******************************************
Consegna
L'utente indica un livello di difficoltà in base al quale viene generata una griglia di gioco quadrata, in cui ogni cella contiene un numero tra quelli compresi in un range:
con difficoltà 1 => tra 1 e 100
con difficoltà 2 => tra 1 e 81
con difficoltà 3 => tra 1 e 49

[1]
Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.
I numeri nella lista delle bombe non possono essere duplicati.

In seguito l'utente clicca su una cella: 
se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina, 

altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle. 

La partita termina quando il giocatore clicca su una bomba o raggiunge il numero massimo possibile di numeri consentiti. 

Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una b.


BONUS:
1- quando si clicca su una bomba e finisce la partita, evitare che si possa cliccare su altre celle
2- quando si clicca su una bomba e finisce la partita, il software scopre tutte le bombe nascoste
 ******************************************/


/******************************************
 *  FUNZIONI
 ******************************************/

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

/**
 * 
 * @param {*} lengthArray numero
 * @param {*} min numero
 * @param {*} max numero
 * @returns array
 */
function createBombs(lengthArray, min, max) {
  const arrayNumbers = [];
  //devo girare finche non ho 16 come lunghezza dell'array
  while (arrayNumbers.length < lengthArray) {
    const number = getRandomIntInclusive(min, max);
    //se il numero non e inserito nell'array allora pusho
    if (arrayNumbers.includes(number) != true) {
      arrayNumbers.push(number);
    }
  }

  return arrayNumbers;
}


//funzione per generare elemento griglia
function createGridItem(num, cellsPerSide) {
  const cell = document.createElement("div");
  cell.classList.add("square");
  // metodo con calc all'interno dello style
  // const sideLength = `calc(100% / ${cellsPerSide})`;
  // cell.style.width = sideLength;
  // cell.style.height = sideLength;

  //metodo con variabile
  const sideLength = `--cell-length : ${cellsPerSide}`;
  cell.style = sideLength;

  cell.innerHTML = `<span class="cell-number">${num}</span>`;
  return cell;
}

// funzione per generare campo
function generatePlayground(cellsNumber, cellsPerSide, BOMBS_NUMBER, bombs) {
  console.log(bombs);
  const grid = document.createElement("div");
  grid.className = "grid";
  let attempts = 0;
  console.log(cellsNumber, BOMBS_NUMBER);
  let maxAttempts = cellsNumber - BOMBS_NUMBER;

  //faccio un ciclo per aggiungere i div nel dom e agganciare event listener
  for (let i = 1; i <= cellsNumber; i++) {
    const cell = createGridItem(i, cellsPerSide);

    // se clicco succede...
    cell.addEventListener("click", function () {
      const isSelected = this.classList.contains('selected');
      // console.log(isSelected);

      //cerco nel dom se ho degli square bomb
      const bombsDom = document.querySelectorAll('.bomb');
      // const bombsDom = document.querySelector('.bomb');

      if (isSelected == false && bombsDom.length == 0 && attempts != maxAttempts) { //se il mio elemento non ha come classe selected
        this.classList.add("selected");
        //controllo se il numero che sta nella cella e contenuto nella mia lista di bombe
        const numSquare = parseInt(this.innerText);
        // console.log(numSquare);
        if (bombs.includes(numSquare) == true) {
          this.classList.add('bomb');
          //devo colorare tutte le bombe
          //controllo square per square se il numero e uguale ad uno contenuto nell'array bombe
          const squares = document.querySelectorAll('.square');
          for (let index = 0; index < squares.length; index++) {
            const numDom = parseInt(squares[index].innerText);
            // console.log(numDom);

            if (bombs.includes(numDom)) {
              squares[index].classList.add('bomb');
            }
          }

          console.log('bomba');


        } else {
          console.log('non bomba');
          attempts += 1;
          // console.log(attempts, maxAttempts);

          if (attempts == maxAttempts) { //se ho raggiunto il numero massimo scrivo messaggio e poi blocco
            console.log('hai vinto');
          }
        }
      }


    });

    grid.append(cell);
  }

  document.querySelector("main").append(grid);
}

//funzione che racchiude tutto il gioco
function play() {
  // Puliamo prima il terreno...
  document.querySelector("main").innerHTML = "";

  //Setup gioco
  const levelSelector = document.getElementById("level");
  const level = parseInt(levelSelector.value);
  const BOMBS_NUMBER = 16;
  let cellsNumber;
  let cellsPerSide;

  //usiamo uno switch per modificare il numero di celle in base alla difficolta
  switch (level) {
    case 1:
    default:
      cellsNumber = 100;
      cellsPerSide = 10;
      break;

    case 2:
      cellsNumber = 81;
      cellsPerSide = 9;
      break;

    case 3:
      cellsNumber = 49;
      cellsPerSide = 7;
      break;
  }


  const bombs = createBombs(BOMBS_NUMBER, 1, cellsNumber);

  //avviamo la creazione del campo da gioco
  generatePlayground(cellsNumber, cellsPerSide, BOMBS_NUMBER, bombs);

}


/******************************************
 *  AVVIO GIOCO
 ******************************************/

// il campo di gioco si rigenera cliccando sul pulsante 'play'
document.getElementById("play").addEventListener("click", function (event) {
  play();
});
