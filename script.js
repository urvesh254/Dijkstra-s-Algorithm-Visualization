const ROWS = 20;
const COLS = 50;
const START_NODE = "start-node";
const END_NODE = "end-node";
const UNVISITED = "unvisited";
const VISITED = "visited";
const WALL = "wall";
const PATH = "path";
const SPEEDS = { slow: 20, medium: 10, fast: 5 };

let algorithm_running = false;
let speed = SPEEDS.medium;

const getId = (row, col) => `cell-${row}-${col}`;

const getCell = (i, j) => {
    return `<td id="${getId(
        i,
        j
    )}" ondragenter="addWalls(this)" onclick="addWalls(this)"></td>`;
};

const addWalls = (td) => {
    if (
        !(
            algorithm_running ||
            td.classList.contains(START_NODE) ||
            td.classList.contains(END_NODE)
        )
    ) {
        td.className = td.className == WALL ? "unvisited" : "wall";
    }
};

const drawCells = () => {
    let table = document.getElementById("cells");
    let str = "";
    for (let i = 0; i < ROWS; i++) {
        str += `<tr id="row-${i}">`;
        for (let j = 0; j < COLS; j++) {
            str += getCell(i, j);
        }
        str += "</tr>";
    }

    table.innerHTML = str;
};

const reset_data = (wall_remove = false) => {
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            let cell = document.getElementById(getId(row, col)).classList;
            cell.remove(VISITED);
            cell.remove(PATH);
            if (wall_remove) cell.remove(WALL);
        }
    }
};

// On script load.
drawCells();
document.getElementById("cell-7-10").classList.add("start-node");
document.getElementById("cell-7-40").classList.add("end-node");
document.getElementById("reset").onclick = () => {
    if (!algorithm_running) reset_data();
};
document.getElementById("reset-all").onclick = () => {
    if (!algorithm_running) reset_data(true);
};

let speed_bar = document.getElementById("speed-bar");
const setSpeed = () => {
    let speed_value = speed_bar.value;
    if (speed_value == 0) speed = SPEEDS.slow;
    else if (speed_value == 1) speed = SPEEDS.medium;
    else speed = SPEEDS.fast;
};
speed_bar.onmouseover = () => {
    let speed = speed_bar.value;
    if (speed == 0) speed_bar.setAttribute("title", "Slow");
    else if (speed == 1) speed_bar.setAttribute("title", "Medium");
    else speed_bar.setAttribute("title", "Fast");
};
