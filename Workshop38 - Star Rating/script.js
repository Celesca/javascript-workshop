const rating = document.querySelectorAll("i");
const result = document.getElementById("result");

rating.forEach((star,selectIndex)=>{
    star.addEventListener("click",()=> {
        result.innerText = "ผลการประเมิน " + (selectIndex+1) + "/5"
        
        // Loop to color 
        rating.forEach((star,choices)=> {
            if (selectIndex >= choices) {
                // เติมสีเข้าไปในดาว
                star.classList.add("active")
            }
            else {
                // ลบสีออกจากดาว
                star.classList.remove("active")
            }
        })
    })
    
} )