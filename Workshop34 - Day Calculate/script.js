const button = document.querySelector("button");
const result = document.getElementById('result');

button.addEventListener('click',()=> {
    const date1 = document.getElementById('date1').value
    const date2 = document.getElementById('date2').value
    // เนื่องจากมันเป็น String เราจึงต้องทำให้มันเป็น Object class date
    const startDate = new Date(date1)
    const endDate = new Date(date2)

    // คำนวณหาผลต่างของวัน
    const times = Math.abs(endDate - startDate); // millisecond
    const days = Math.round(times/(1000*60*60*24));
    result.innerText = `ระยะห่างของวัน : ${days} วัน`;
})