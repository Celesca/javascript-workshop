const switchToggle = document.querySelector('input[type="checkbox"]')

// เราเข้าถึง Toggle Icon ซึ่งรวมอยู่ใน span
const toggleIcon = document.querySelector('#toggle-icon')

// Nav bar ให้มันเปลี่ยนสี
const nav = document.getElementById('nav');

function switchMode(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme','dark')
        darkMode();
        imageSwitchMode('dark');
    }
    else {
        document.documentElement.setAttribute('data-theme','light')
        lightMode();
        imageSwitchMode('light');
    }
}

function darkMode() {
    toggleIcon.children[0].textContent="โหมดกลางคืน";
    toggleIcon.children[1].classList.replace('fa-sun','fa-moon');
    nav.style.backgroundColor='rgb(0 0 0 / 50%)';
}

function lightMode() {
    toggleIcon.children[0].textContent="โหมดกลางคืน";
    toggleIcon.children[1].classList.replace('fa-moon','fa-sun');
    nav.style.backgroundColor='rgb(255 255 255 / 50%)';
}

// เข้าถึงรูปภาพ image 1,2,3
const image1 = document.getElementById('image1')
const image2 = document.getElementById('image2')
const image3 = document.getElementById('image3')

function imageSwitchMode(mode) {
    image1.src=`img/undraw_website_builder_re_${mode}.svg`;
    image2.src=`img/undraw_freelancer_${mode}.svg`;
    image3.src=`img/undraw_video_game_night_${mode}.svg`
}
switchToggle.addEventListener('change', switchMode)