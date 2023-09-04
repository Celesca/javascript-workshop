// ยอดเงินคงเหลือ
const balance = document.getElementById("balance");

// ตัวเลขรายรับรายจ่าย รวม

const money_plus = document.getElementById("money-plus");
const money_minus = document.getElementById("money-minus");

// ประวัติธุรกรรม
const list = document.getElementById("list");

// form
const form = document.getElementById("form");

// input จาก form
const text = document.getElementById("text");
const amount = document.getElementById("amount");

// ตัวอย่าง Database ประวัติธุรกรรม เชื่อมกับ list <ul>
// const dataTransaction = [
//     { id:1 , text:"ค่าขนม" , amount:-100},
//     { id:2 , text:"เงินเดือน" , amount:+30000},
//     { id:3 , text:"ค่าห้อง" , amount:-3000}
// ]
// ID ใช้อ้างอิงตอนที่จะลบข้อมูล

let transaction = [];

function init() {
    list.innerHTML = `` // เคลียร์ค่า list
    // มันจะไล่ list แต่ละตัวซึ่งเป็น object ออกมา
    transaction.forEach(addDataToList);
    calculateMoney();
}

//ฟังก์ชัน กรองข้อมูล
function addDataToList(transaction) {
    // เช็คว่า ค่าเป็น + หรือ - 
    const symbol = transaction.amount < 0 ? '-' : '+' ;
    
    //เช็คว่าเป็นรายรับ หรือ รายจ่าย (กำหนด class li)
    const status = transaction.amount < 0 ? 'minus' : 'plus';
    // เราจะเพิ่ม tag li ลงไปใน list
    const item = document.createElement('li');
    const result = formatNumber(Math.abs(transaction.amount))
    item.classList.add(status)

    //item.innerHTML = `ค่าซ่อมรถ<span>- ฿400</span><button class="delete-btn">x</button>`;
    item.innerHTML = `${transaction.text}<span>${symbol}฿${result}</span><button class="delete-btn" onclick="removeData(${transaction.id})">x</button>`
    
    // นำ  item เข้าไปเพิ่มที่ list โดยอ้างอิง list แล้วเพิ่ม element
    list.appendChild(item)


}
function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }

function autoID() { // สุ่มรหัสไอดี ซึ่ง Math.random มันจะสุ่ม 0.0 - 1.0
    return Math.floor(Math.random()*1000000)
}


function calculateMoney(){
    // ดึงข้อมูล amount ทั้งหมดมาใช้
    // map จะดึงทุกข้อมูลภายในลิสต์ออกมา แล้วไล่เป็น x
    const amounts = transaction.map(x=>x.amount); //ได้เป็น List

    // คำนวณยอดคงเหลือ
    const total = amounts.reduce((result,item)=>(result+=item),0).toFixed(2); // result เป็นตัวรวม แล้ว item เป็น แต่ละตัวที่ดึงมา โดยให้ค่าเริ่มต้น result = 0 
    
    // รายรับ เอาเฉพาะ >0 เพื่อมารวมกัน
    const income = amounts.filter(item=>item>0).reduce((result,item)=>(result+=item),0).toFixed(2);

    // ราย จ่าย
    const expense = (amounts.filter(item=>item<0).reduce((result,item)=>(result+=item),0)*-1).toFixed(2);
    
    // จัด Formatting number ให้มันมีคอมม่า
    // นำไปแสดงผลใน UI (ยอด รายรับ รายจ่าย)

    balance.innerText = `฿`+formatNumber(total);
    money_plus.innerText = `฿`+formatNumber(income);
    money_minus.innerText = `฿`+formatNumber(expense);

}

function removeData(id) {
    // ไล่ทีละ obj แล้วเข้าถึง obj.id 
    // 2 , 3 => id = 1 เอาตัวที่จะลบออกจาก database
    transaction = transaction.filter(x=>x.id !== id)
    init();
}

function addTransaction(e) {
    e.preventDefault();

    // เอามาเช็คค่าว่าที่ช่องว่างนั้นกรอกครบหรือไม่
    if (text.value.trim() == '' || amount.value.trim() == '') {
        alert("กรุณาป้อนข้อมูลให้ครบ");
    } else {
        // นำข้อมูลที่กรอก ไปเก็บใน Data Transaction
        const data = {
            id:autoID() ,
            text: text.value,
            amount: +amount.value
        }
        transaction.push(data)
        // เราเอา obj ไปใส่ในฟังก์ชัน addDatatoList
        addDataToList(data)
        calculateMoney();
        // เคลียร์ค่ายอดเงินออกจากแบบฟอร์ม
        text.value = ``;
        amount.value = ``;
        
    }

}



form.addEventListener('submit',addTransaction);
init();