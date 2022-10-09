function showEError() {
  document.getElementById("email").classList.add("is-invalid");
  document.getElementById("divE").innerText = "Ingresa un email";
}
function showPwError() {
  document.getElementById("password").classList.add("is-invalid");
  document.getElementById("divP").innerText = "Ingresa una contraseña"; 
}

function success() {
  window.location.href = "index.html";
}

const email = document.getElementById("email");
document.getElementById("form").addEventListener("submit", (e) => {
  e.preventDefault();
  localStorage.setItem("email", email.value);
  //seteo el login aca con valor=3 
  localStorage.setItem("login", 3);
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

function holi(po)
{localStorage.setItem("login",po)};
let holis = localStorage.getItem("login")
if (holis > 1){
  window.location.replace("index.html");
}
