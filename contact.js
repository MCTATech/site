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
    e.stopPropagation();
    console.log("Form submission started...");

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
        To : 'chip@mcta-tech.com',
        From : "mctatechnologies@outlook.com",
        Subject : "MCTA Form Submission from " + femail.value,
        Body : ebody
    }).then(function(response) {
        console.log("=== EMAIL SEND SUCCESS ===");
        console.log("Response:", response);
        console.log("Full response:", JSON.stringify(response, null, 2));
        
        if (response === "OK") {
            console.log("SUCCESS: Email sent successfully!");
            if(confirm("Email sent successfully! Click OK to go to confirmation page.")) {
                window.location.href = "sentcontact.html";
            }
        } else {
            console.error("UNEXPECTED RESPONSE:", response);
            alert("Email may not have sent properly. Response: " + response + "\nCheck console for details.");
        }
        
    }).catch(function(error) {
        console.error("=== EMAIL SEND ERROR ===");
        console.error("Error:", error);
        console.error("Error type:", typeof error);
        console.error("Error message:", error.message || error.toString());
        console.error("Full error object:", JSON.stringify(error, null, 2));
        
        // Show error in page instead of just alert
        const form = document.querySelector('.form-contact');
        const errorDiv = document.createElement('div');
        errorDiv.style.cssText = 'background: #ffebee; border: 1px solid #f44336; color: #d32f2f; padding: 10px; margin: 10px 0; border-radius: 4px;';
        errorDiv.innerHTML = '<strong>Email Send Error:</strong><br>' + 
                           'Error: ' + (error.message || error.toString()) + '<br>' +
                           'Check browser console (F12) for full details.<br>' +
                           '<button onclick="this.parentElement.remove()">Close</button>';
        form.appendChild(errorDiv);
        
        alert("Failed to send email. Check the red error box above and browser console for details.");
    });

});
