var Board = new Array(9);

var Puzzle = new Array(9);

var Temp = new Array(9);


// Creating 2d arrays for sudoku table 

for (let i = 0; i < 9; ++i) {

    Board[i] = new Array(9);
    Puzzle[i] = new Array(9);
    Temp[i] = new Array(9);
}



// Storing tables elements in 2d grid (Board) 

for (let row = 0; row < 9; ++row) {
    for (let col = 0; col < 9; ++col) {
        Board[row][col] = document.getElementById(GiveId(row, col));
        Puzzle[row][col] = 0;
    }
}

function GiveId(row, col) { //Helper function to get id
    let res = "cell-";
    let Temp = row * 9 + col;
    res = res + Temp + "";
    return res;
}



// Getting HTML elements by their id's  


const time = document.getElementById("time");;
const NewGame = document.getElementById("newgame");
const Restart = document.getElementById("restart");
const SolveGame = document.getElementById("solve");
const DoValidation = document.getElementById("validate");
const Hint = document.getElementById("hint");
const PopupBtn = document.getElementById("Popup-btn");



function IsPlaceable(grid, k, m, n) { //function to check if this number can be placed  

    for (let col = 0; col < 9; ++col) {
        if (grid[m][col] === k)
            return false;
    }
    for (let row = 0; row < 9; ++row) {
        if (grid[row][n] === k)
            return false;
    }
    m = m - (m % 3);
    n = n - (n % 3);

    for (let row = 0; row < 3; ++row) {
        for (let col = 0; col < 3; ++col) {
            if (grid[row + m][col + n] === k) {
                return false;
            }
        }
    }
    return true;
}

function Solve(grid) { //function to Solve sudoku  

    let empty = true;

    for (let row = 0; row < 9; ++row) {
        for (let col = 0; col < 9; ++col) {
            if (grid[row][col] === 0)
                empty = false;
        }
    }
    if (empty) //if no space available we get our solution
        return true;

    for (let row = 0; row < 9; ++row) {
        for (let col = 0; col < 9; ++col) {

            if (grid[row][col] === 0) {

                for (let k = 1; k <= 9; ++k) {
                    if (IsPlaceable(grid, k, row, col)) {

                        grid[row][col] = k;
                        if (Solve(grid))
                            return true;

                        grid[row][col] = 0;
                    }
                }
                return false;
            }
        }
    }
}


var x = 0;

function StartTimer() {


    let StartTime = new Date().getTime();
    let PrevMinute = 0;

    x = setInterval(() => {

        let current_time = new Date().getTime();
        let distance = current_time - StartTime;

        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if (minutes < 10 && seconds < 10)
            time.innerHTML = minutes + ":0" + seconds;
        if (minutes < 10 && seconds >= 10)
            time.innerHTML = minutes + ":" + seconds;
        if (minutes >= 10 && seconds < 10)
            time.innerHTML = minutes + ":0" + seconds;
        if (minutes >= 10 && seconds >= 10)
            time.innerHTML = minutes + ":" + seconds;


    }, 1000);

    return;
}

function StopTimer() {

    clearInterval(x);
    x = 0;
    time.innerHTML = "00:00";
}



function Fill() {
    for (let row = 0; row < 9; ++row) {
        for (let col = 0; col < 9; ++col) {
            if (Math.floor(Math.random() * 3) % 3 === 0) {
                Board[row][col].value = Puzzle[row][col];
                Board[row][col].disabled = true;
            } else {
                Board[row][col].value = "";
                Board[row][col].disabled = false;

            }
            Temp[row][col] = Board[row][col].value;
            Board[row][col].style.color = "#28394d";
        }
    }
}


function GeneratePuzzle(grid) {

    for (let row = 0; row < 9; ++row) {
        for (let col = 0; col < 9; ++col) {
            grid[row][col] = 0;
        }
    }

    let BoxNo_ = (Math.floor(Math.random() * 9));

    let row_ = Math.floor(BoxNo_ / 3);
    let col_ = Math.floor(BoxNo_ % 3);

    for (let row = 0; row < 3; ++row) {
        for (let col = 0; col < 3; ++col) {
            grid[row + row_][col + col_] = (3 * row) + col + 1;
        }
    }

    for (let i = 0; i < 10; ++i) {

        let r1 = Math.floor(Math.random() * 3);
        let c1 = Math.floor(Math.random() * 3);
        let r2 = Math.floor(Math.random() * 3);
        let c2 = Math.floor(Math.random() * 3);

        let temp = grid[r1][c1];
        grid[r1][c1] = grid[r2][c2];
        grid[r2][c2] = temp;
    }

}



function Mark() {
    for (let row = 0; row < 9; ++row) {
        for (let col = 0; col < 9; ++col) {
            if (Board[row][col].value != Puzzle[row][col] && Board[row][col].value != "") {
                Board[row][col].style.color = "#fb3e40";
            }

        }
    }
}

function Validate(row, col) {

    Board[row][col].style.color = "#28394d";

    if (Board[row][col].value.length > 1) {

        Board[row][col].value = "";
    }

    if (Board[row][col].value != Puzzle[row][col] && Board[row][col].value != "" && DoValidation.checked) {

        Board[row][col].style.color = "#fb3e40";

    } else if (Board[row][col].value == Puzzle[row][col] && DoValidation.checked) {

        Board[row][col].disabled = true;
    }

    IsSolved();
}





function GiveCordinates(id) {

    let Temp_ = 0;

    if (id.length > 6) {
        Temp_ = (id[5] - '0') * 10 + (id[6] - '0');
    } else {
        Temp_ = id[5] - '0';
    }

    let row = Math.floor(Temp_ / 9);
    let col = Math.floor(Temp_ % 9);

    return [row, col];

}


function ShowNext() {
    let LeftCells = 0;
    for (let row = 0; row < 9; ++row) {
        for (let col = 0; col < 9; ++col) {
            if ((Puzzle[row][col] != 0) && (Board[row][col].value == "" || Board[row][col].style.color == "#fb3e40")) {
                if (LeftCells === 0) {
                    Board[row][col].style.color = "#28394d";
                    Board[row][col].value = Puzzle[row][col];
                    Board[row][col].disabled = true;

                }
                ++LeftCells;

            }
        }
    }
    if (LeftCells === 1) {
        StopTimer();
    }
}


function Print(grid) {
    for (let row = 0; row < 9; ++row) {
        for (let col = 0; col < 9; ++col) {
            if (grid[row][col] === "" || grid[row][col] === 0) {
                Board[row][col].value = "";
                Board[row][col].disabled = false;
            } else {
                Board[row][col].value = grid[row][col];
                Board[row][col].disabled = true;
            }
            Board[row][col].style.color = "#28394d";
        }
    }
}

function IsSolved() {
    for (let row = 0; row < 9; ++row) {
        for (let col = 0; col < 9; ++col) {
            if (Board[row][col] === "" || Board[row][col].value != Puzzle[row][col]) {
                return;
            }
        }
    }
    StopTimer();

}




for (let row = 0; row < 9; ++row) {
    for (let col = 0; col < 9; ++col) {
        Board[row][col].addEventListener("keyup", (e) => {
            let dimension = GiveCordinates(e.target.getAttribute('id') + "");
            Validate(dimension[0], dimension[1]);
        });
    }
}

NewGame.addEventListener("click", () => {
    GeneratePuzzle(Puzzle);
    Solve(Puzzle);
    StopTimer();
    Fill();
    StartTimer();

});

Restart.addEventListener("click", () => {
    StopTimer();
    StartTimer();
    Print(Temp);
});

SolveGame.addEventListener("click", () => {
    StopTimer();
    Print(Puzzle);
});

Hint.addEventListener("click", ShowNext);

DoValidation.addEventListener("change", () => {
    if (DoValidation.checked) {
        Mark();
    }
});