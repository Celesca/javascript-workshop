const calculatorDisplay = document.querySelector('h1');
const inputBtn = document.querySelectorAll('button'); // array
const clearBtn = document.getElementById('clear-btn');

// ตัวเลขที่ 1 ตัวดำเนินการ ตัวเลขที่ 2
// 10 + 20

// + 10. + 20

let firstValue = 0; // ตัวเลขที่ 1
let operatorValue = ''; // เก็บตัวดำเนินการ
let waitForNext = false; // เก็บสถานะเช็คก่อนว่ามีตัวเลขที่ 1 กับตัวดำเนินการรึยัง

const calculate = {
    "/":(firstNumber,secondNumber)=>(secondNumber!=0) ? firstNumber/secondNumber : "error",
    '*':(firstNumber,secondNumber)=>firstNumber*secondNumber ,
    '+':(firstNumber,secondNumber)=>firstNumber+secondNumber ,
    '-':(firstNumber,secondNumber)=>firstNumber-secondNumber ,
    '=':(firstNumber,secondNumber) => secondNumber
}

function setNumberValue(number){
    if (waitForNext) {
        calculatorDisplay.textContent = number; // ถ้ากรอกตัวที่สอง
        waitForNext = false; // มันจะไม่ waitForNext
    }
    else {
        const displayValue = calculatorDisplay.textContent;
        calculatorDisplay.textContent = displayValue === '0' ? number : displayValue+number;
    }
}

function callOperator(operator){
    const currentValue = Number(calculatorDisplay.textContent);
    if(operatorValue && waitForNext) { //ดักเอาไว้ ไม่ให้มันกดบวกสองรอบติด
        operatorValue=operator;
        return;
    }
    if (!firstValue) {
        firstValue = currentValue; //ค่าเริ่มต้น
    }
    else { // เท่ากับ จะมาทำงานตรงนี้
        const result = calculate[operatorValue](firstValue,currentValue);
        console.log(result)
        calculatorDisplay.textContent=result;
        firstValue = result;
        if (firstValue === "error") {
            resetAll();
        }
    }
    operatorValue = operator;
    waitForNext = true; // => WaitforNext คือรอตัวเลขใหม่ขึ้นครั้งสอง
}

function addDecimal(){
    if (waitForNext) return; // รอตัวเลขที่สอง ขึ้นก่อน 
    else if
        (!calculatorDisplay.textContent.includes('.')) {
    calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
    }
}

inputBtn.forEach((input)=> {
    //ปุ่มตัวเลข 0-9 ไม่มี class
    if (input.classList.length === 0) { 
        input.addEventListener('click',()=>setNumberValue(input.value));
    }
    // ตัวดำเนินการ
    else if (input.classList.contains("operator")) {
        input.addEventListener('click',()=>callOperator(input.value));
    }
    // จุดทศนิยม
    else if (input.classList.contains("decimal")) {
        input.addEventListener('click',()=>addDecimal());
    }
})


function resetAll() {
    calculatorDisplay.textContent= '0';
    firstValue = 0;
    operatorValue ='';
    waitForNext = false;
}
clearBtn.addEventListener('click',()=>resetAll());