const dropList = document.querySelectorAll("form select");

const fromCurrency = document.querySelector(".countryhai select");
const toCurrency = document.querySelector(".tocountry select");
const btn = document.querySelector("form button");
const Frcurr = document.querySelector(".fromcountry select");
const Tocurr = document.querySelector(".tocountry select");
const msg = document.querySelector(".result p")

for (let i = 0; i < dropList.length; i++) {

    
    
    for(let currency_code in country_list){
        
        let selected = "";

// default USD in first dropdown, INR in the rest
        if (i === 0 && currency_code === "USD") {    
                 selected = "selected";
        }
        else if (i !== 0 && currency_code === "INR") {
                selected = "selected";
        }
        
       /* let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
        dropList[i].insertAdjacentHTML("beforeend", optionTag);
    }
    dropList[i].addEventListener("change", e =>{
        loadFlag(e.target);
    });*/
    // Create a new <option> element
    let option = document.createElement("option");

    // Set its value (what you’ll submit in a form)
    option.value = currency_code;

    // Set what's shown to the user
    option.textContent = currency_code;

    // If we decided it should be the default selected…
    if (selected) {
        option.selected = true;
    } 

    // Finally, add it into the dropdown
    dropList[i].appendChild(option);
    

}
//console.log(myboy, typeof myboy);
//let withoutN = myboy.slice(0, -1);   // take everything except the last character
//console.log(withoutN); 



dropList[i].addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
  
}








const updateFlag = (element) => {
    let currency_code = element.value;
    let countryCode = country_list[currency_code];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
  };


  /*function loadFlag(element){
    for(let code in country_list){
        if(code == element.value){
            let imgTag = element.parentElement.querySelector("img");
            imgTag.src = `https://flagsapi.com/${country_list[code]}/flat/64.png`;
        }
    }
}
  */

btn.addEventListener("click" , async (evt) =>{
    evt.preventDefault();
    let amounthai= document.querySelector(".enteramount input");
    let amt = amounthai.value ;

    if(amt === "" || amt <1){
        amt = 1 ;
        amounthai.value = "1";
    }

    const URL = `https://v6.exchangerate-api.com/v6/897dac4fb87edd886a9807b9/latest/${Frcurr.value}`;

    
    let response = await fetch(URL);
    let data = await response.json() ;
    let rate = data.conversion_rates[Tocurr.value];


    let finalAmount = amt * rate;

    
   msg.innerHTML = `${amt} ${Frcurr.value} = ${finalAmount} ${Tocurr.value}`;


});
