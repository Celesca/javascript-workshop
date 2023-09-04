// เพิ่มรายการ
const box1 = document.getElementById('box-1');
const box2 = document.getElementById('box-2');
const box3 = document.getElementById('box-3');

// List
const list = document.getElementById('ul-list');


const form = document.getElementById('form-control');
form.addEventListener('submit',addNewList)

let data = []

function init(){
    list.innerHTML=``;
    data.forEach((subject)=>displayList(subject));
}

function displayList(subject) {
    const item = document.createElement('li');
    const id = subject.id;
    const grade = subject.grade;
    const credit = subject.credit;
    const name = subject.name;
    item.innerHTML = `${name}<span class="credit">${credit.toFixed(1)} หน่วยกิต ${grade}</span>
    <button class="delete-btn" onclick="deleteList(${id})">x</button>`
    // Border-color
    item.classList.add('list');
    item.classList.add(`${grade}`);
    list.appendChild(item);
}
function addNewList(e){
    e.preventDefault();
    const current_name = box1.value.trim();
    const current_grade = box3.value.trim();
    const current_credit = +box2.value;
    if (current_name == "" || current_grade == "") {
        alert("โปรดกรอกข้อมูลให้ครบ")
    }
    else if (!(current_grade in grade_comparison)) {
        alert("โปรดกรอกเกรดเป็น A-F");
    }
    else if (current_credit <= 0) {
        alert("โปรดกรอกหน่วยกิตเป็นค่าจำนวนเต็มบวก");
    }
    else {
        const obj = {
            id:autoID(),
            credit:current_credit,
            grade:current_grade,
            name:current_name
        }
        data.push(obj)
        init();
    }
}
    

function autoID() {
    return Math.floor(Math.random()*1000000)
}

function deleteList(id_number) {
    data = data.filter((x)=> x.id != id_number)
    init();
}


// Calculate Section
const grade_comparison = {
    'A':4, 
    'B':3,
    'C':2,
    'D':1,
    'F':0
}

const result_container = document.getElementById('result-container');

const showGrade = document.getElementById('grade-result');
const showText = document.getElementById('text-result');
const showimg = document.getElementById('result-img');

function calculategrade() {
    result_container.classList.remove('hide');
    let total = 0;
    let total_credit = 0;
    data.forEach((obj)=> {
        const Grade = obj.grade;
        const Credit = +obj.credit;   
        total += (grade_comparison[Grade] * Credit)
        total_credit += Credit
    })

    const result_grade = (total / total_credit);
    
    showGrade.innerText = result_grade.toFixed(2);
    showResult(result_grade);
}

function showResult(grade){
    if (grade >= 3.5) {
        showimg.src=`img/undraw_programming.svg`;
        showText.innerText = `คุณทำผลงานออกมาได้ดีเยี่ยมในเทอมนี้ ขอจงรักษาความขยันนี้ต่อไป`;
    }
    else if (grade >= 3.0 && grade < 3.5) {
        showimg.src=`img/undraw_businessman.svg`;
        showText.innerText = `คุณทำผลงานออกมาได้ดี คุณพยายามดีแล้ว ขอให้พยายามแบบนี้ต่อไป`;
    }
    else if (grade >= 2.0 && grade < 3.0) {
        showimg.src=`img/undraw_shopping.svg`;
        showText.innerText = `คุณทำผลงานได้ไม่ดี พยายามเข้าอีกนิด อ่านหนังสือให้มากขึ้น`;
    }
    else if (grade >= 1.0 && grade < 2.0) {
        showimg.src=`img/undraw_reading.svg`;
        showText.innerText = `ลาออก`;
    }
}

