document.getElementById("random-walls").onclick = (event, wallCount = 250) => {
    if (algorithm_running) return;

    let count = 0;
    reset_data(true);
    while (count <= wallCount) {
        let cell = getRandomCell();
        if (cell.classList.length != 0) continue;

        cell.classList.add(WALL);
        count++;
    }
};

const getRandomCell = () => {
    let row = Math.floor(Math.random() * ROWS);
    let col = Math.floor(Math.random() * COLS);

    return document.getElementById(getId(row, col));
};
