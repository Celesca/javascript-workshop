// const card = document.querySelector('.card');
const showBtn = document.getElementById('show');
const hiddenBtn = document.getElementById('btn-hidden');
const addContainer = document.getElementById('add-container');

const clearBtn = document.getElementById('clear');

// card.addEventListener('click' , ()=>card.classList.toggle('show-answer'));

const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');
const currentEl = document.getElementById('current');

const cardContainer = document.getElementById('card-container');

const questionEl = document.getElementById('question');
const answerEl = document.getElementById('answer');
const addCard = document.getElementById('add-card');

let currentActiveCard = 0;
let cardsEl = []; // เก็บจำนวนคำถามทั้งหมด
const cardData = getCardData(); // เก็บ Data คำถามและตอบ ทั้งหมด

function createCard() {
    cardData.forEach((data,index) => {
        createSingleCard(data,index);
    })
}

function createSingleCard(data,index) {
    console.log(index)
    const card = document.createElement('div');
    card.classList.add('card')

    if(index == 0) {
        card.classList.add('active')
    }
    card.innerHTML = `<div class="inner-card">
                <div class="inner-card-front">
                <p>${data.question}</p>
                </div>

                <div class="inner-card-back">
                <p>${data.answer}</p>
                </div>

                </div>`
    card.addEventListener('click',()=> card.classList.toggle("show-answer"));
    // เก็บ แท็ก Element ไว้ใน Array cardsEl เอาไว้ระบุ index ใน cardContainer
    cardsEl.push(card);
    cardContainer.appendChild(card);
    updateCurrentQuestion();
}


// Next Previous Current

function updateCurrentQuestion() {
    currentEl.innerText = `${currentActiveCard+1}/${cardsEl.length}`;
}

// ปุ่มเพิ่มคำถาม
showBtn.addEventListener('click', ()=> {
    addContainer.classList.add('show');
})

hiddenBtn.addEventListener('click', ()=> {
    addContainer.classList.remove('show');
})

nextBtn.addEventListener('click', ()=> {

    cardsEl[currentActiveCard].className = `card`;
    currentActiveCard = currentActiveCard+1;
    if (currentActiveCard>cardsEl.length-1) { //ถ้ามันเกินเลขหน้าที่มี
        currentActiveCard = cardsEl.length-1;
    }
    cardsEl[currentActiveCard].className = `card active`;
    updateCurrentQuestion();
})

prevBtn.addEventListener('click', ()=> {

    cardsEl[currentActiveCard].className = `card`;
    currentActiveCard = currentActiveCard-1;
    if (currentActiveCard < 0) {
        currentActiveCard = 0;
    }
    cardsEl[currentActiveCard].className = `card active`;
    updateCurrentQuestion();
})

addCard.addEventListener('click' , ()=> {
    const question = questionEl.value;
    const answer = answerEl.value;
    
    if (question.trim() && answer.trim() ) {
        const newCard = {question,answer}; // Object แบบพิเศษ ระบุค่าและชื่อตัวแปรในทีเดียว
        createSingleCard(newCard);
        questionEl.value = ``;
        answerEl.value = ``;
        addContainer.classList.remove('show');
        cardData.push(newCard);

        // เก็บ Card Data ลงใน Local Storage
        setCardData(cardData);

    }
    else {
        alert("โปรดกรอกข้อมูลให้ถูกต้อง");
    }  
})

function setCardData(cards) {
    localStorage.setItem('cards',JSON.stringify(cards));
    window.location.reload(); // อันนี้คือให้โหลดหน้าใหม่ เพื่อดึงข้อมูลมาจาก Local Storage ทันที
}

function getCardData() {
    const cards = JSON.parse(localStorage.getItem('cards'));
    return cards === null ? [] : cards; // ถ้าเป็นค่าว่างก็ return []
}


createCard();

clearBtn.addEventListener('click',() => {
    localStorage.clear();
    cardContainer.innerHTML = ``;
    window.location.reload();
})