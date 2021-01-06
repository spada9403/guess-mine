import { disableChat, enableChat } from "./chat";
import {
  disableCanvas,
  enableCanvas,
  hideControls,
  resetCanvas,
  showControls,
} from "./paint";

const board = document.getElementById("jsPBoard");
const notifs = document.getElementById("jsNotifs");
const timer = document.getElementById("jsTimer");
let gameTime = 30;

const addPlayer = (players) => {
  board.innerHTML = "";
  players.forEach((player) => {
    const playerElement = document.createElement("span");
    playerElement.innerText = `${player.nickname}: ${player.points}`;
    board.appendChild(playerElement);
  });
};

const setNotifs = (text = null) => {
  notifs.innerText = "";
  if (text !== null) {
    notifs.innerText = text;
  }
};

export const handlePlayerUpdate = ({ sockets }) => addPlayer(sockets);
export const handleGameStarted = () => {
  setNotifs();
  disableCanvas();
  hideControls();
  enableChat();
};
export const handleLeaderNotif = ({ word }) => {
  enableCanvas();
  showControls();
  disableChat();
  notifs.innerText = `You are the leader, paint: ${word}`;
};
export const handleGameEnded = () => {
  setNotifs("Game ended.");
  disableCanvas();
  hideControls();
  resetCanvas();
  setTimer();
};
export const handleGameStarting = () => setNotifs("Game will start soon");

const setTimer = (time = null) => {
  if (time !== null) {
    timer.innerText = `Until the end of the game :  ${time}`;
  } else {
    gameTime = 30;
    timer.innerText = "";
  }
};

export const handleGameTimer = () => {
  setTimer((gameTime -= 1));
};
