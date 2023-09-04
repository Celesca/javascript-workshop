const toggleEl = document.getElementById('toggle');

const open = document.getElementById('open');
const modalEl = document.getElementById('modal');
const close = document.getElementById('close');

toggleEl.addEventListener('click', ()=> {
    document.body.classList.toggle('show-nav');
});

open.addEventListener('click',()=> {
    modalEl.classList.add('show-modal');
})

close.addEventListener('click', ()=> {
    modalEl.classList.remove('show-modal');
})


// Check Event in Window
window.addEventListener('click', e=> {
    // ถ้ากดอยู่ที่ modalEl ที่เป็น container ใหญ่สุด
    e.target == modalEl ? modalEl.classList.remove('show-modal') : false;
})