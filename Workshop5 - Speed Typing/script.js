const wordEl = document.getElementById('word'); /*คำที่ใบ้*/
const textEl = document.getElementById('text'); /*ที่กรอก */
const timeEl = document.getElementById('time');
const scoreEl = document.getElementById('score');

const btnLevelEl =document.getElementById('level-btn'); /*ปุ่มตั้งค่า*/
const settingsEl = document.getElementById('settings'); /*โซน settings */
const levelFormEl =document.getElementById('level-form'); /*ฟอร์ม */
const levelEl = document.getElementById('level'); /*drop down */
const gameoverEl = document.getElementById('gameover-container');

const words = ['แก้ว','แมว','หมู']

let randomText; //ค่าเปลี่ยน
let score = 0;
let time; // easy => 15 , medium => 10 , hard => 5
const saveMode = localStorage.getItem('mode') !== null ? localStorage.getItem('mode') : 'medium';
let level='medium';
// โปรแกรมสำหรับลดทุกๆ 1 วินาที


const timeInterval = setInterval(updateTime,1000);

function getRandomWord() {
    return words[Math.floor(Math.random()*words.length)]
}

function displayWordToUI() { // Start
    randomText = getRandomWord();
    wordEl.innerHTML = randomText;
    timeEl.innerHTML = time;

}

textEl.addEventListener('input', (e)=> {
    const inputText = e.target.value;

    if (inputText === randomText) {
        
        // ถ้าตอบถูกจะเพิ่มเวลา
        if (saveMode == 'easy') {
            time += 5;
        }
        else if (saveMode == 'medium') {
            time += 3;
        }
        else {
            time += 2;
        }
        updateScore();
        displayWordToUI();
        e.target.value='';
        
    }
})

function updateScore() {
    score+= 10;
    scoreEl.innerHTML = score;
}

function updateTime() {
    time--;
    timeEl.innerHTML = time;
    if (time === 0) { // เกมหมดเวลา
        clearInterval(timeInterval);
        gameOver();
    }
}

function gameOver() {
    gameoverEl.innerHTML= `<h1>จบเกมแล้วนะครับ</h1>
    <p>คะแนนของคุณ = ${score}</p>
    <button onclick="location.reload()">เล่นอีกครั้ง</button>`
    gameoverEl.style.display = 'flex';
}

btnLevelEl.addEventListener('click',()=>{
    settingsEl.classList.toggle('hide') // เลือกสถานะเปิด-ปิด class hide
})

levelEl.addEventListener('change',(e)=> {
    level = e.target.value;
    localStorage.setItem("mode",level);

})

function startgame() {
    //ดึงโหมดที่ฝังในเว็บมาเก็บ
    
    levelEl.value = saveMode;

    if (saveMode == 'easy') {
        time = 15;
    }
    else if (saveMode == 'medium'){
        time = 10;
    }
    else {
        time = 5;
    }
    displayWordToUI();
}
startgame();
textEl.focus(); // ให้ Cursor มากระพริบตรงช่องใส่