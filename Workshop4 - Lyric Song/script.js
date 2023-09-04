const form = document.getElementById('form')
const search = document.getElementById('search')
// สำหรับแสดงเนื้อเพลง
const result = document.getElementById('result')
// เลขหน้า
const more = document.getElementById('more')

const apiURL = "https://api.lyrics.ovh";

form.addEventListener('submit',e=>{
    e.preventDefault();
    // ข้อความที่เสิร์จ
    const songtxt = search.value.trim();
    if (!songtxt){
        alert("ป้อนข้อมูลไม่ถูกต้อง")
    } else {
        searchLyrics(songtxt);
    }
});

async function searchLyrics(song){
    const res = await fetch(`${apiURL}/suggest/${song}`);
    const allSongs = await res.json();
    showData(allSongs);
}

function showData(songs) {
    result.innerHTML= `
        <ul class="songs">
            ${songs.data.map(song=>
                `<li><span>
                <strong>${song.artist.name}</strong> - ${song.title}
                </span>
                <button class="btn"
                 data-artist="${song.artist.name}"
                 data-song="${song.title}"
                >เนื้อเพลง</button>
                </li>`
            ).join("")}
        </ul>
        `;

    if (songs.next || songs.prev) {
        more.innerHTML = `
        ${songs.prev ? `<button class="btn" onclick="getMoreSongs('${songs.prev}')">ก่อนหน้า</button>` : ''}
        ${songs.next ? `<button class="btn" onclick="getMoreSongs('${songs.next}')">ถัดไป</button>` : ''}
        `
    }
    else {
        more.innerHTML="";
    }
}

async function getMoreSongs(songsURL) {
    const res = await fetch(`http://localhost:8080/${songsURL}`);
    const allSongs = await res.json();
    showData(allSongs);
}

result.addEventListener('click' , e=> {
    const clickEl=e.target;
    
    if (clickEl.tagName=="BUTTON") {
        const artist = clickEl.getAttribute('data-artist');
        const songName = clickEl.getAttribute('data-song');
        getLyrics(artist,songName);
    }
})


async function getLyrics(artist,songName) {
    const res = await fetch(`${apiURL}/v1/${artist}/${songName}`);
    const data = await res.json();
    const lyrics = data.lyrics.replace(/(\r\n | \r | \n)/g,"<br>") // เข้า obj ที่ส่งกลับมา
    if(lyrics) { // ถ้ามีเนื้อเพลง
        result.innerHTML=`<h2><span>
        <strong>${artist}</strong> - ${songName}
        </span></h2>
        <span>${lyrics}</span>
        `
    }
    else{
        result.innerHTML=`<h2><span>
        <strong>${artist}</strong> - ${songName}
        </span></h2>
        <span>ไม่ข้อมูลเนื้อเพลงนี้</span>
        `
    }
    more.innerHTML=""
}
