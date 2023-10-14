const captchaTextBox = document.querySelector(".captch_box input");
const captchaInputBox = document.querySelector(".captch_input input");
const message = document.querySelector(".message");
const submitButton = document.querySelector("button");

let captchaText = null

const generateCaptcha = () => {
    const randomString = Math.random().toString(36).substring(2, 7);
    const randomStringArray = randomString.split("");
    const changeString = randomStringArray.map((char) => (Math.random() > 0.5 ? char.toUpperCase() : char));
    captchaText = changeString.join("   ");
    captchaTextBox.value = captchaText;
};

const captchaKeyUpValidate = () => {
    submitButton.classList.toggle("disabled", !captchaInputBox.value);
};

generateCaptcha(); 
captchaInputBox.value = "";
captchaKeyUpValidate();

const handleCorrectCaptcha = () => {
    document.querySelector(".form-contact input[type=\"submit\"]").style.display = "flex";
    document.querySelector(".containerr").style.display = "none";
};

const submitBtnClick = () => {
    captchaText = captchaText.split("").filter((char) => char !== " ").join("");
    message.classList.add("active");
    if(captchaInputBox.value === captchaText){
        message.innerText = "Captcha is correct";
        handleCorrectCaptcha();
    }else {
        message.innerText = "Captcha is incorrect";
    }
}

captchaInputBox.addEventListener("keyup", captchaKeyUpValidate);
submitButton.addEventListener("click", submitBtnClick);


/*------Form Submission-------*/


const fname = document.getElementById('fname');
const fcompany = document.getElementById('fcompany');
const femail = document.getElementById('femail');
const fnumber = document.getElementById('fnumber');
const fmessage = document.getElementById('fmessage');
const submit = document.getElementsByClassName('form-contact')[0];

submit.addEventListener('submit', (e)=>{
    e.preventDefault();

    let ebody = `
    <b>Name: </b>${fname.value} 
    <br> 
    <b>Company: </b>${fcompany.value}
    <br>
    <b>Email: </b>${femail.value}
    <br>
    <b>Phone: </b>${fnumber.value}
    <br>
    <b>Message: </b>${fmessage.value}
    <br>`

    Email.send({
        SecureToken : "374d6f26-5e69-43f3-b89b-4f92fd5b00b4",
        To : 'chip.maftei@gmail.com',
        From : "mctatechnologies@outlook.com",
        Subject : "MCTA Form Submission from " + femail.value,
        Body : ebody
    }).then(function() {
        window.location.href = "sentcontact.html";
    });

});
