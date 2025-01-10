let currentDoor = {villain: null, hero: null};


document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("board");
    for(let i = 0; i<9; i++){
        const door = document.createElement("div"); // create div element
        door.id = i.toString();// give id = 1;
        board.appendChild(door);// add it to board
    }

    // setInterval(function, interval);
    setInterval(()=> setCharacter("villain"), 1500);
    setInterval(()=> setCharacter("hero"), 2000);
    // setCharacter("villain");
    // setCharacter("hero");
});

const getRandomDoorId = () => Math.floor(Math.random() * 9).toString();

const setCharacter = (character) => {
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
