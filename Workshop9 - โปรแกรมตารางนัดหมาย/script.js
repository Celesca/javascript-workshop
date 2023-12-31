const inputContainer = document.getElementById('input-container');
const countDownForm = document.getElementById('countdownForm');
const dateEl = document.getElementById('date-picker');


const countDownEl = document.getElementById('countdown');
const countdownTitleEl = document.getElementById('countdown-title');
const countdownButtonEl = document.getElementById('countdown-button');
const timeEl = document.querySelectorAll('span'); // Array ของ Span

const completeEl = document.getElementById('complete');
const completeInfoEl = document.getElementById('complete-info');
const completeButtonEl = document.getElementById('complete-button');

// ตัวแปรควบคุมการทำงาน

let countDownTitle = ``;
let countDownDate = ``;

let countDownValue = Date; // เก็บวันที่เลือกจากฟอร์ม
let countDownActive; // ตัวนับเวลา
let saveCountDown; // เก็บข้อมูลหัวข้อและวันแจ้งเตือน (object)

// ตัวแปรแปลงหน่วยเวลา
const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour*24;

countDownForm.addEventListener('submit', updateCountDown);

function updateCountDown(e) {
    e.preventDefault(); // ไม่ให้ refresh
    countDownTitle = e.srcElement[0].value;
    countDownDate= e.srcElement[1].value;

    if (countDownTitle.trim() === '') {
        alert("ป้อนข้อมูลให้ครบ");
    }
    else {
        saveCountDown = {title:countDownTitle , date:countDownDate}
        localStorage.setItem("countDown",JSON.stringify(saveCountDown));
        countDownValue = new Date(countDownDate).getTime(); // เวลาที่ตั้งไว้
        setUpTime();
    }
}

// ฟังก์ชันการนับเวลาถอยหลัง
function setUpTime() {
    countDownActive = setInterval(()=> {
        // ตั้งเอาไว้ - ปัจจุบัน
        const now = new Date().getTime();
        // มันจะได้ออกมาเป็นค่า millisecond
        const difference = countDownValue - now;
        const days = Math.floor(difference/day);
        const hours = Math.floor((difference%day)/hour);
        const minutes = Math.floor((difference%hour)/minute);
        const seconds = Math.floor((difference%minute)/second);
        inputContainer.hidden=true;
        if (difference < 0) {
            // หมดเวลา
            countDownEl.hidden=true;
            completeEl.hidden=false;
            completeInfoEl.textContent = `${countDownTitle} วันที่ ${countDownDate}`
            clearInterval(countDownActive);
        } else {
            countdownTitleEl.textContent = `${countDownTitle}`;
            // นับถอยหลังเรื่อยๆ
            timeEl[0].textContent=`${days}`;
            timeEl[1].textContent=`${hours}`;
            timeEl[2].textContent=`${minutes}`;
            timeEl[3].textContent=`${seconds}`;
            countDownEl.hidden=false;
            completeEl.hidden=true;
            
        }
    },second);
}


// เช็คว่ามีข้อมูลใน Local Storage ไหม
function callDatainStore() {
    if (localStorage.getItem("countDown")) {
        inputContainer.hidden=true;
        saveCountDown = JSON.parse(localStorage.getItem("countDown"));
        countDownTitle = saveCountDown.title;
        countDownDate = saveCountDown.date;
        countDownValue = new Date(countDownDate).getTime();
        setUpTime();
    }
}

// ลบ key local storage
function reset() {
    localStorage.removeItem("countDown");
    countDownEl.hidden=true;
    completeEl.hidden=true;
    inputContainer.hidden=false;
    clearInterval(countDownActive);
    countDownTitle=``;
    countDownDate = ``;
}
callDatainStore(); // เรียกใช้ตอนเริ่มเพื่อเช็คว่ามี local storage อยู่ไหม

countdownButtonEl.addEventListener('click',reset);
completeButtonEl.addEventListener('click',reset);