// ดูว่ารองรับแบบใด
const SpeechRecognize = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognize=new SpeechRecognize();
const btn=document.querySelector('.control');
const clear= document.querySelector('.clear-text');

function recordVoice() {
    const isRecord = btn.classList.contains('record'); 
    if (isRecord) {
        btn.classList.remove('record');
        recognize.start(); // เริ่มอัดเสียง
        btn.classList.add('pause');
        btn.innerText = `Pause`;
    }
    else {
        recognize.stop();
        btn.classList.remove('pause');
        btn.classList.add('record');
        btn.innerText = `Record`;
    }
}

function setVoicetoText(e) {
    let message = document.querySelector('.message');
    message.innerText += e.results[0][0].transcript;
}

function continueRecord() {
    const isPause = btn.classList.contains('pause'); 
    if (isPause) {
        recognize.start();
    }
}

function setUpVoice() {
    console.log(recognize);
    recognize.lang="th-TH";
    btn.addEventListener('click',recordVoice);
    recognize.addEventListener('result',setVoicetoText);
    // ดักอีเว้นท์ต่อไป เมื่อพูดจบครั้งแรก
    recognize.addEventListener('end',continueRecord);
    clear.addEventListener('click' , ()=> {
        let message = document.querySelector('.message')
        message.innerText = ``;
    })
}

setUpVoice();