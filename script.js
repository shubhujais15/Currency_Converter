const Base_Url = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");


for (let select of dropdowns){
    for(currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        select.append(newOption);

        if(select.name === "from" && currCode === "USD"){
            newOption.selected="selected";
        }
        else if(select.name === "to" && currCode === "INR"){
            newOption.selected="selected";
        }
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
     })
}

let updateExcRate = async()=>{
    let amount =  document.querySelector("#amount");
    let amtValue = amount.value;
    // console.log(amtValue)
    if(amtValue==="" || amtValue<1){
        amtValue = 1;
        amount.value = "1";
    }
    // 

    const URL = `${Base_Url}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[toCurr.value.toLowerCase()];
    // console.log(rate);
    let finalamt = amtValue * rate;
    msg.innerText = `${amtValue} ${fromCurr.value} = ${finalamt} ${toCurr.value}`
}



const updateFlag = (element) => {
   let currCode = element.value;
   let countryCode = countryList[currCode];
   let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
   let img = element.parentElement.querySelector("img");
   img.src=newSrc; 
    
}




btn.addEventListener('click', (evt)=>{
    evt.preventDefault();
    updateExcRate();

});

window.addEventListener("load",() =>{
    updateExcRate();

});
