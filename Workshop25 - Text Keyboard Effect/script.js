const textEl = document.getElementById('text');
const speedEl = document.getElementById('speed');

const text = "ยินดีต้อนรับเข้าสู่เว็บไซต์";
let speed = 300/speedEl.value; // (ms) 300/1 300/2

let characterId = 1;

writeText();

function writeText() {
    textEl.innerText = text.slice(0,characterId);
    characterId++;
    if (characterId > text.length) {
        characterId = 1;
    }
    setTimeout(writeText,speed);
}

speedEl.addEventListener('change',(e)=> {
    speed = 300/e.target.value;
})