const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
// เอาเฉพาะที่นั่งที่ไม่มีคนจอง

const count = document.getElementById('count');
const total = document.getElementById('total');

const movieSelect = document.getElementById('movie');

let price = +movieSelect.value; 

container.addEventListener('click' , e=> {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected');
        updateSelected(); // นับเงิน
    }
});

movieSelect.addEventListener('change', e=> {
    price= +e.target.value;
    setMovieData(e.target.selectedIndex,e.target.value);
    updateSelected();
});

function updateSelected() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    const countseats = selectedSeats.length;
    // นำ Index มา โดยเทียบจาก ที่นั่งทั้งหมด
    // เราต้องแปลง NodeList เป็น Array ก่อน โดย spread operator [...NodeList]
    const seatIndex = [...selectedSeats].map(seat=>[...seats].indexOf(seat));
    localStorage.setItem("selectedSeats",JSON.stringify(seatIndex))
    count.innerText = countseats;
    total.innerText = countseats*price;
}

// เก็บ Local Storage ของข้อมูลหนัง

function setMovieData(movieIndex,moviePrice) {
    localStorage.setItem("movieIndex",movieIndex);
    localStorage.setItem("moviePrice",moviePrice);
}

function showDatatoUI() {
    const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats")); // [0 , 13 , 27]
    const selectedmovieIndex = localStorage.getItem("movieIndex"); // ตำแหน่งหนังที่เรากดจองไว้
    // จากนั้นไล่ข้อมูลทีละตัวใน seats เพื่อเปลี่ยนสี
    seats.forEach((seat,index) => {
        console.log(seat,index)
        if (selectedSeats.indexOf(index)>-1) {
            seat.classList.add('selected');
        }
    })

    if (selectedmovieIndex != null) {
        // เปลี่ยน ตำแหน่ง dropdown
        movieSelect.selectedIndex = selectedmovieIndex;
    }
}



showDatatoUI();
updateSelected();