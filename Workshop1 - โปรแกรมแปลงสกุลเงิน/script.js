// Import Select Data
const currency_one = document.getElementById("currency-one");
const currency_two = document.getElementById("currency-two");

// Import Input Data
const amount_one = document.getElementById("amount-one");
const amount_two = document.getElementById("amount-two");

//Display
const rateText= document.getElementById("rate");

// button
const swap = document.getElementById('btn');

// Event when onchange in select

currency_one.addEventListener('change', calculateMoney);
currency_two.addEventListener('change' , calculateMoney);

// Event when onchange in input number

amount_one.addEventListener('input',calculateMoney)
amount_two.addEventListener('input',calculateMoney)

function calculateMoney() {
    // เก็บ Drop down
    const one = currency_one.value;
    const two = currency_two.value;

    //มันจะเปลี่ยน url ของ api ตามเงื่อนไขที่เราเลือก
    let url=`https://api.exchangerate-api.com/v4/latest/${one}`

    fetch(url).then(res=>res.json()).then(data=> {
        const rate = data.rates[two];
        rateText.innerText = `1 ${one} = ${rate} ${two}`
        amount_two.value = (amount_one.value * rate).toFixed(2)
    })
    
}

// Event of swap money
swap.addEventListener('click',() => {
    const temp = currency_one.value; // เก็บค่าสกุลเงินต้นทาง
    currency_one.value = currency_two.value;
    currency_two.value = temp;
    calculateMoney()
})

// เรียกใช้ตอนเปิดเว็บเบราวเซอร์
calculateMoney();