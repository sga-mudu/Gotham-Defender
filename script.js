let currentDoor = {villain: null, hero: null};
let score = 0;
let isGameOver = false;
const restart = document.querySelector("#restart");
const scoreElement = document.getElementById("score");

document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("board");
    for(let i = 0; i<9; i++){
        const door = document.createElement("div"); // create div element
        door.id = i.toString();// give id = 1;
        door.addEventListener("click", selectDoor);
        board.appendChild(door);// add it to board
    }


    const customCursor = document.createElement("div");
    customCursor.id = "custom-cursor";
    document.body.appendChild(customCursor);

    document.addEventListener("mousemove", (e) =>{
        customCursor.style.left = `${e.pageX - 25}px`;
        customCursor.style.top = `${e.pageY - 25}px`;
    });

    spinCursor(true);
    // setInterval(function, interval);
    setInterval(()=> setCharacter("villain"), 1500);
    setInterval(()=> setCharacter("hero"), 2000);
    // setCharacter("villain");
    // setCharacter("hero");

});

const getRandomDoorId = () => Math.floor(Math.random() * 9).toString();

const setCharacter = (character) => {
    if(isGameOver) return;
    clearDoor(character);

    const randomDoorId = getRandomDoorId();
    if(isDoorOccupied(randomDoorId)) return;
    const randomDoor = document.getElementById(randomDoorId);
    const img = document.createElement("img");
    img.src = `./images/${character}.png`;
    randomDoor.appendChild(img);
    currentDoor[character] = randomDoor;

    //setTimeout(function, time)
    setTimeout(()=> clearDoor(character), 1000)
};


const isDoorOccupied = (randomDoorId) => 
    currentDoor.villain?.id === randomDoorId || 
        currentDoor.hero?.id === randomDoorId;


const clearDoor = (character) => {
    if(currentDoor[character]){
        currentDoor[character].innerHTML = "";
    }
}


const selectDoor = (e) => {
    const selectedDoor = e.target;
    if(selectedDoor.children.length === 0) return 0;

    if(currentDoor.villain === selectedDoor){
        updateScore();
        clearDoor("villain");
    }
    if(currentDoor.hero === selectedDoor){
        isGameOver = true;
        scoreElement.textContent = `GAME OVER: ${score}`;
        showRestartButton();
        spinCursor(false);
    }
}

const updateScore = () =>{
    score += 10;
    scoreElement.textContent = score.toString();
}

const showRestartButton = () =>{
    restart.classList.add("active");
    restart.addEventListener("click", restartGame);
}

const restartGame = () => {
    isGameOver = false;
    score = 0;
    scoreElement.textContent = score.toString();
    restart.classList.remove("active");
    spinCursor(true);
};


const spinCursor = (shouldSpin) => {
    const customCursor = document.getElementById("custom-cursor");
    if(shouldSpin){
        customCursor.classList.add("spinning");
    } else{
        customCursor.classList.remove("spinning");
    }
}

