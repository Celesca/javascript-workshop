// ควบคุมการเล่นเสียง
const music_Container = document.getElementById('music-container');

// ปุ่ม
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

// แถบสีแดง
const progress = document.getElementById('progress');
const progress_Container = document.getElementById('progress-container');

const audio = document.getElementById('audio');

// ข้อมูลเกี่ยวกับเพลง
const title = document.getElementById('title');
const cover = document.getElementById('cover');

const songs = ["Contra","HavestMoon","Mario"];
let index = 1;

//โหลดเพลง เปลี่ยนเพลง
function loadSong(song){
    title.innerText = `เพลง ${song} .mp3`;
    cover.src = `cover/${song}.jpg`;
    audio.src = `music/${song}.mp3`;
}

// เมื่อคลิกปุ่มหยุด-เริ่มเพลง
playBtn.addEventListener('click',()=> {
    //เช็คว่าเล่นเพลงอยู่ไหม
    const isPlay = music_Container.classList.contains('play');

    if (isPlay) {
        pauseSong(); // หยุดเล่น
    }
    else {
        playSong(); // เริ่มเล่น
    }
})
// เมื่อกดเพลงก่อน
prevBtn.addEventListener('click',prevSong)

function prevSong() {
    index--;
    if(index<0) {
        index = songs.length-1;
    }
    loadSong(songs[index]);
    playSong();
}

// เมื่อกดเพลงหลัง
nextBtn.addEventListener('click',nextSong)

function nextSong() {
    index++;
    if(index>songs.length-1) {
        index = 0;
    }
    loadSong(songs[index]);
    playSong();
}

function playSong() {
    music_Container.classList.add('play');
    playBtn.querySelector('i').classList.remove('fa-play');
    playBtn.querySelector('i').classList.add('fa-pause');
    audio.play();
}

function pauseSong() {
    music_Container.classList.remove('play');
    playBtn.querySelector('i').classList.remove('fa-pause');
    playBtn.querySelector('i').classList.add('fa-play');
    audio.pause();
}

// init() - เริ่มต้น
loadSong(songs[index]);

audio.addEventListener('timeupdate',updateProgress);

function updateProgress(e) {
    const {duration,currentTime} = e.srcElement;
    const progressPercent = (currentTime / duration)*100;
    progress.style.width = `${progressPercent}%`;
}

progress_Container.addEventListener('click',setProgress);

function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX/width)*duration;
}

//เพลงจบแล้วเล่นเพลงถัดไปอัตโนมัติ
audio.addEventListener('ended',nextSong)