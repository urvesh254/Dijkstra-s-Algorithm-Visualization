let distances, visited;
let startNode, endNode;
let parents, path;
let iterations;

const dijkstra_algorithm = () => {
    initialize_values();
    iterations = 1;

    while (true) {
        let min = minDistanceNode();
        if (!min || (min.row == endNode.row && min.col == endNode.col)) {
            break;
        }

        visited[min.row][min.col] = true;
        addClass(min, VISITED, iterations++);

        visit_neighbors(min.row, min.col);
    }

    calculatePath();
};

const initialize_values = () => {
    parents = {};
    distances = [];
    visited = [];
    path = [];

    for (let i = 0; i < ROWS; i++) {
        let distance = [];

        for (let j = 0; j < COLS; j++) {
            let cell = document.getElementById(`cell-${i}-${j}`);
            let classList = cell.classList;

            if (classList.contains(START_NODE)) {
                startNode = { row: i, col: j };
                distance.push(0);
            } else if (classList.contains(END_NODE)) {
                endNode = { row: i, col: j };
                distance.push(Infinity);
            } else if (classList.contains(WALL)) {
                distance.push(WALL);
            } else {
                distance.push(Infinity);
            }
        }
        distances.push(distance);
        visited.push(new Array(COLS).fill(false));
    }
};

const visit_neighbors = (row, col) => {
    currDis = distances[row][col];
    // UP
    if (row - 1 >= 0 && distances[row - 1][col] != WALL) {
        if (distances[row - 1][col] > currDis + 1) {
            distances[row - 1][col] = currDis + 1;
            // parents[row - 1][col] = { row, col };
            parents[getId(row - 1, col)] = { row, col };
        }
    }

    // DOWN
    if (row + 1 < ROWS && distances[row + 1][col] != WALL) {
        if (distances[row + 1][col] > currDis + 1) {
            distances[row + 1][col] = currDis + 1;
            // parents[row + 1][col] = { row, col };
            parents[getId(row + 1, col)] = { row, col };
        }
    }

    // LEFT
    if (col - 1 >= 0 && distances[row][col - 1] != WALL) {
        if (distances[row][col - 1] > currDis + 1) {
            distances[row][col - 1] = currDis + 1;
            // parents[row][col - 1] = { row, col };
            parents[getId(row, col - 1)] = { row, col };
        }
    }

    // RIGHT
    if (col + 1 < COLS && distances[row][col + 1] != WALL) {
        if (distances[row][col + 1] > currDis + 1) {
            distances[row][col + 1] = currDis + 1;
            // parents[row][col + 1] = { row, col };
            parents[getId(row, col + 1)] = { row, col };
        }
    }
};

const addClass = (node, className, i, time = speed) => {
    setTimeout(() => {
        let id = getId(node.row, node.col);
        document.getElementById(id).classList.add(className);
    }, time * i);
};

const minDistanceNode = () => {
    let min = Infinity;
    let node;

    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            if (
                !isNaN(distances[row][col]) &&
                !visited[row][col] &&
                distances[row][col] < min
            ) {
                min = distances[row][col];
                node = { row, col };
            }
        }
    }

    return node;
};

const calculatePath = () => {
    let parent = parents[getId(endNode.row, endNode.col)];
    while (parent) {
        path.push(parent);
        parent = parents[getId(parent.row, parent.col)];
    }
    path.reverse();

    iterationsTime = iterations * speed;

    setTimeout(() => {
        path.forEach((parent, index) => {
            addClass(parent, PATH, index + 1, speed + 10);
        });
    }, iterationsTime);
};

let btn = document.getElementById("visualize");
btn.onclick = () => {
    algorithm_running = true;
    setSpeed();
    reset_data();
    btn.setAttribute("disabled", "disabled");
    dijkstra_algorithm();

    // After Path is generated btn is enabled.
    setTimeout(() => {
        btn.removeAttribute("disabled");
        algorithm_running = false;
    }, iterations * speed + path.length * (speed + 10));
};
