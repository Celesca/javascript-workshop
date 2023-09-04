const contents = document.querySelectorAll('.content'); // return เป็น array ของ 3

document.addEventListener('scroll',showText);

function showText() {
    contents.forEach((section)=> { // ดึงภาพของแต่ละ content ออกมา
        const imgEl = section.querySelector('img');
        const textEl = section.querySelector('.text');
        // นำภาพมาคำนวณ (Offset ดูว่ากี่สัดส่วนแล้ว)

        const scrollPos = window.pageYOffset;
        // ภาพ 500px ตำแหน่งสูงสุดของภาพคือ 100 (500+100/50)
        // 502 => แสดงข้อความ 
        // 500 ตำแหน่งสูงสุดของภาพ ณ ตอนนี้
        // 100/50 (50%) => ยิ่งกำหนดเยอะยิ่งแสดงผลเร็ว ระยะห่าง
        const textPos = imgEl.offsetTop + imgEl.offsetHeight / 50
        if (scrollPos > textPos ) {
            // แสดงเนื้อหาออกมา
            textEl.classList.add('show-reveal');
        }
        else {
            // ปิดการแสดงเนื้อหา
            textEl.classList.remove('show-reveal');
        }
    })
}
