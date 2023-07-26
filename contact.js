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
        To : 'tudor.alex.3000@gmail.com',
        From : "tudor.alex.3000@gmail.com",
        Subject : "MCTA Form Submission from " + femail.value,
        Body : ebody
    }).then(function() {
        window.location.href = "sentcontact.html";
    });

});
