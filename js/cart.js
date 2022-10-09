let cartURL = `https://japceibal.github.io/emercado-api/user_cart/25801.json`


//solicitud 
function cart(){
fetch(cartURL)
  .then((response) => response.json())
  .then((data) => console.log(data));
}
//mostrar
function mostrarCartcito(cartStuff){

}




cart();
