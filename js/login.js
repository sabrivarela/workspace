function showEError() {
  document.getElementById("email").classList.add("is-invalid");
}
function showPwError() {
  document.getElementById("password").classList.add("is-invalid");
}

function success() {
  window.location.href = "index.html";
}

document.getElementById("form").addEventListener("submit", (e) => {
  e.preventDefault();
  let email = document.getElementById("email").value;
  let pw = document.getElementById("password").value;
  if (pw.length === 0 && email.length === 0) {
    showEError();
    showPwError();
  }
  if (pw.length === 0) {
    return showPwError();
  } else if (email.length === 0) {
    return showEError();
  } else {
    return success();
  }
});

// if (email == sortedEmail){
//     window.location.href = "index.html";
// }else{
//     wondow.location.href  = "login.html";
// }
// })´

// function login(){
//     localStorage.setItem("email", email.value);
//     localStorage.setItem("pw", pw.value);

// let storedName = localStorage.getItem("email");
// let storedPw = localStorage.getItem("pw");
// let userName = document.getElementById("userName");
// let userPw = document.getElementById('userPw');

// if(userName.value == storedName && userPw.value == storedPw){
//     window.location.href="/";
// }else{
//     alert("Error on login");
// }
// }
