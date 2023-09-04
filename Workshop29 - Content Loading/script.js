const header = document.getElementById('header');
const title = document.getElementById('title');
const description = document.getElementById('description');
const profile_img = document.getElementById('profile_img');
const seller_name = document.getElementById('name');
const price = document.getElementById('price');

const animated_bg = document.querySelectorAll('.animated_bg');
const animated_text = document.querySelectorAll('.animated_text');

setTimeout(showContent,2000)

function showContent() {
    header.innerHTML = `<img src="https://cdn.pixabay.com/photo/2017/08/02/01/01/living-room-2569325_1280.jpg" alt="">`;
    title.innerHTML = `โซฟา`;
    description.innerHTML = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos provident consectetur corporis itaque reiciendis`;
    profile_img.innerHTML = `<img src="https://randomuser.me/api/portraits/women/8.jpg" alt="">`;
    seller_name.innerHTML = `พิมลดา`;
    price.innerHTML = `20,000 บาท`;
    animated_bg.forEach(bg=> {
        bg.classList.remove('animated_bg');
    });
    animated_text.forEach(el=> {
        el.classList.remove('animated_text');
    });
}