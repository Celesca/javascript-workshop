const slideContainer = document.querySelector('.slider-container');
const slideRight = document.querySelector('.right-content');
const slideLeft = document.querySelector('.left-content');

const upButton = document.querySelector('.up-button');
const downButton = document.querySelector('.down-button');

// จำนวนภาพสไลด์
const slideLength = slideRight.querySelectorAll('div').length;


// กำหนด index
let activeIndex = 0;

upButton.addEventListener('click', ()=> {
    changeImage("up");
});

downButton.addEventListener('click', ()=> {
    changeImage("down");
});


function changeImage(direction) {
    // ความสูงของหน้าจอที่เราดู
    const slideHeight = slideContainer.clientHeight;
    console.log(slideHeight);
    
    if (direction == "down") {
        activeIndex++;
        if (activeIndex > slideLength-1) {
            activeIndex = 0;
        }
    }
    else if (direction == "up") {
        activeIndex--;
        if (activeIndex < 0) {
            activeIndex = slideLength - 1;
        }
    }
    console.log(activeIndex)
    slideLeft.style.transform = `translateY(-${activeIndex*slideHeight}px)`;
    slideRight.style.transform = `translateY(-${activeIndex*slideHeight}px)`;
}