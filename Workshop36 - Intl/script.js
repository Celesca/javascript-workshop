const amountEl = document.getElementById('amount');
const outputEl = document.getElementById('output');

amountEl.addEventListener("input",(e)=> {
    const number = e.target.value;
    const result = Intl.NumberFormat("en",{notation:"compact"}).format(number);
    outputEl.innerText = result;
});