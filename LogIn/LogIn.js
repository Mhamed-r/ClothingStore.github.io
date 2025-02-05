let userName = document.getElementById("username");
let password = document.getElementById("password");
let email = document.getElementById("email");
let confirmPassword = document.getElementById("confirmPassword");

const userNameValidation = /(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{6,15})$/;
const passwordValidation = /^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{6,}$/;
const emailValidation = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
function showPassword () {
    if (password.type == "password" || confirmPassword.type == "password") {
        password.type = "text";
        confirmPassword.type = "text";
    } else {
        password.type = "password"; 
        confirmPassword.type = "password";
    }
    };
function login() {
  if (userName.value == "" || password.value == ""|| email.value == "" || confirmPassword.value == "") {
    alert("Please fill in the required fields");

  }else if (userNameValidation.test(userName.value)==false) {
    alert("Invalid Username e.g. C2dfeed or sporttrak1 ");
    userName.focus();
    userName.style.border = "2px solid red";
  }else if (emailValidation.test(email.value)==false) {
    alert("Invalid Email e.g. email@em@il.com");
    email.focus();
    email.style.border = "2px solid red";}
    else if (passwordValidation.test(password.value)==false) {
    alert("Invalid Password must contain at least one letter, at least one number, and be longer than six charaters");
    password.focus();
    password.style.border = "2px solid red";
    }
    else if (password.value != confirmPassword.value) {
    alert("Passwords do not match");
    confirmPassword.focus();
    confirmPassword.style.border = "2px solid red";
  }
  else{
   window.location="../Home/Home.html";
  }
}


