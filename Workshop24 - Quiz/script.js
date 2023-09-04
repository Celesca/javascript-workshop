const questionData = [
	{
	  question:"1.ข้อใดไม่ใช่ระบบปฏิบัติการ",
      a:"ระบบปฏิบัติการดอส",
      b:"ไมโครซอฟท์เวิร์ด",
      c:"ไมโครซอฟต์วินโดวส์",
      d:"ระบบปฏิบัติการแอนดรอยด์",
      correct:"b"
	},
    {
        question:"2.ข้อใดคือโปรแกรม Web Browser",
        a:"Google Chrome",
        b:"Keyboard",
        c:"Mouse",
        d:"Monitor",
        correct:"a"
    },
    {
        question:"3.ข้อใดคือฮา์ดแวร์",
        a:"Keyboard",
        b:"Mouse",
        c:"Monitor",
        d:"ถูกทุกข้อ",
        correct:"d"
    }
]

const questionEl = document.getElementById('question');
const answerEls = document.querySelectorAll('.answer');
const choiceA = document.getElementById('a-text');
const choiceB = document.getElementById('b-text');
const choiceC = document.getElementById('c-text');
const choiceD = document.getElementById('d-text');
const container = document.getElementById('question-container');

const submitBtn = document.getElementById('submit');

let currentQuestion = 0;
let score = 0; 
loadQuestion();

function loadQuestion() {
    const currentQuizData = questionData[currentQuestion];
    // ถ้าเราเลือกแล้วเรากดส่งคำตอบถัดไป มันจะค้างที่ข้อนั้นที่เลือกอยู่ เราต้องขจัดออกไป
    checkChoice(); // เคลียร์ตัวเลือกก่อน
    questionEl.innerText = currentQuizData.question;
    choiceA.innerText = currentQuizData.a;
    choiceB.innerText = currentQuizData.b;
    choiceC.innerText = currentQuizData.c;
    choiceD.innerText = currentQuizData.d;
}

// Clear Choice
function checkChoice() {
    answerEls.forEach(answerEl=>answerEl.checked = false)};

submitBtn.addEventListener('click',()=> {
    // ตรวจสอบตัวเลือก
    let answer = getChoiceAnswer();
    if (answer) {
        if (answer === questionData[currentQuestion].correct) {
            score++;
        }
        currentQuestion++;
        // ถ้ายังไม่ถึงข้อสุดท้าย
        if (currentQuestion < questionData.length) {
            loadQuestion();
        }
        else {
            // ข้อหมดแล้ว สรุปคะแนน
            container.innerHTML = `<h2>คุณได้คะแนน ${score}/${questionData.length}</h2>`;
        }
    }
    else {

    }
});


// ตรวจสอบคำตอบ
function getChoiceAnswer() {
    let answer;
    // check ค่าวนลูปของ radio
    answerEls.forEach(answerEl=> {
        if (answerEl.checked) {
            answer = answerEl.id;
            
        }
    });
    return answer;
}