const loginForm=document.getElementById('login-form');
const loginButton=document.getElementById('login-submit');

if(sessionStorage.getItem('AuthenticationState'))
{
    window.open('index.html','_self');
}
loginButton.addEventListener('click',validate);

function validate()
{
    const username = loginForm.username.value;
    const password = loginForm.password.value;
    console.log(username);
    if (username === "user" && password === "1234") {
        alert("You have successfully logged in.");
        sessionStorage.setItem('AuthenticationState','Authenticated');
        window.open('index.html','_self');
    } else {
        alert("Please enter correct username and password");
        location.reload();
    }
}