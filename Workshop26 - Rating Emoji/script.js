const ratingContainer = document.querySelector('.ratings-container');
const ratings = document.querySelectorAll('.rating');
const panel = document.getElementById('panel');
const sendBtn = document.getElementById('send');

let selected;

ratingContainer.addEventListener('click',(e) => {
    if (e.target.classList.contains('rating')) {
        removeActive();
        e.target.classList.add('active');
        selected = e.target.children[1].innerHTML;

        
    }
    else if (e.target.parentNode.classList.contains('rating')) {
        removeActive();
        e.target.parentNode.classList.add('active');
        if (e.target.tagName == "IMG") {
            selected = e.target.nextElementSibling.innerHTML;
        }
        else {
            
            selected = e.target.innerHTML;
        }
        
    }
})

// ลบ class Active ให้หมดเลย
function removeActive() {
    for (let i = 0 ; i < ratings.length ; i++) {
        ratings[i].classList.remove('active');
    }
}

sendBtn.addEventListener('click', ()=> {
    if (selected) {
        panel.innerHTML = `
        <img src="image/heart.svg" class="img-complete"></img>
        <strong>ขอบคุณที่ใช้บริการของเรา</strong>
        <br>
        <strong>ผลการประเมิน : ${selected}`;
    }
    else {
        alert("กรุณาเลือกความพึงพอใจก่อนยืนยัน");
    }
})