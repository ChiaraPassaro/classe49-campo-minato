/******************************************
 * CAMPO MINATO DOM - I PARTE: GRIGLIA
 ******************************************/

/******************************************
 *  FUNZIONI
 ******************************************/

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
function generatePlayground(cellsNumber, cellsPerSide, BOMBS_NUMBER) {
  const grid = document.createElement("div");
  grid.className = "grid";

  //faccio un ciclo per aggiungere i div nel dom e agganciare event listener
  for (let i = 1; i <= cellsNumber; i++) {
    const cell = createGridItem(i, cellsPerSide);

    // se clicco succede...
    cell.addEventListener("click", function () {
      this.classList.add("selected");
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

  //avviamo la creazione del campo da gioco
  generatePlayground(cellsNumber, cellsPerSide, BOMBS_NUMBER);

}


/******************************************
 *  AVVIO GIOCO
 ******************************************/

// il campo di gioco si rigenera cliccando sul pulsante 'play'
document.getElementById("play").addEventListener("click", function (event) {
  play();
});
