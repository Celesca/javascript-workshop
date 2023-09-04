const container = document.getElementById('container');
const imgs = document.querySelectorAll('#container img');

const leftBtn = document.getElementById('left');
const rightBtn = document.getElementById('right');

// สร้างตัวนับภาพ
let index = 0;

let interval = setInterval(slide,2000);
// ให้เรียกใช้ฟังก์ชัน slide ทุกๆ 2000 ms

function slide() {
    index++;
    changeImage();
}

function changeImage(){
    // 0 => 1 * 500 => 2 * 500 => 3 * 500
    if (index > imgs.length-1) {
        index = 0;
    }
    else if (index < 0) {
        index = imgs.length-1;
    }
    container.style.transform=`translateX(${-index*500}px)`;
    // console.log(`translateX(${-index*500}px)`)
}

leftBtn.addEventListener('click',()=> {
    index--;
    changeImage();
    resetInterval(); // ลบเวลาเดิมทิ้งไปก่อน จะได้ไม่ตีกัน
})
rightBtn.addEventListener('click',()=> {
    index++;
    changeImage();
    resetInterval();
});


function resetInterval() {
    clearInterval(interval);
    interval = setInterval(slide,2000);
}