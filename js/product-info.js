let prodDetails = [];
let productID = localStorage.getItem("productID");
let hiProducts = `https://japceibal.github.io/emercado-api/products/${productID}.json`
let comID = [];

//entrega4, acá guardamos identificador para relProd
function setRelProductID(id) {
    localStorage.setItem("productID", id);
    window.location = "product-info.html";
}

//solicitud de los detalles
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(hiProducts).then(function(resultObj){
        if (resultObj.status === "ok"){
            prodDetails = resultObj.data
            showDetails(prodDetails);
            showRelProd(prodDetails.relatedProducts);       

        };
    });
});

//solicitud de los comentarios
async function comentarios() {
    fetch(
       `https://japceibal.github.io/emercado-api/products_comments/${productID}.json`
       )
         .then((res) => res.json())
         .then((data) => {
           showCom(data);
         });
}
//func para mostrar en pantalla (detalles)
function showDetails(prodDetails){
    const {name, cost, currency, description, category, soldCount, images} = prodDetails
      document.getElementById("productDetails").innerHTML = ` 
       
      <h2 class="title h1 mt-5">   ${name}  </h2>
      <hr>
        <div    class="col10" class="row">          
            <div  class="slider-frame"  class="row"  > 
                <h4 class="mb-1"> <b> Precio </b> <br> ${currency}  ${cost}  </h4>   
                <h4  class="mb-1">  <b> Descripción </b>  <br> ${description} </h4> 
                <h4  class="mb-1">  <b> Categoría </b>  <br> ${category} </h4>    
                <h4  class="mb-1">  <b> Cantidad de vendidos </b>  <br> ${soldCount} </h4>
                <h4  class="mb-1">  <b> Imagenes ilustrativas </b>  <br> </h4>       
            </div>
        </div>  


        <div id="carouselExampleControls" class="carousel slide carousel-dark mx-auto" style="width: 80%;" data-bs-ride="carousel">
            <div class="carousel-inner" id="prueba">
                <div class="carousel-item active">
                    <img src="${images[0]}" class="d-block w-100 " alt="...">
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>
                `
              const imgCont = document.getElementById("prueba")
                for(let i = 1; i < images.length; i++){
                    let image = images[i]
                  imgCont.innerHTML += `
                    <div class="carousel-item">
                        <img class="d-block w-100" src="${image}" alt="Img Product">
                    </div>
                    `   
                }
}

//func para mostrar los productos relacionados
function showRelProd(aaaa){
let relatedProducts = "";
for(let i= 0; i < prodDetails.relatedProducts.length; i++){
let relProd = prodDetails.relatedProducts[i];
relatedProducts += 
`  
<div class="cardBonito card">
<div> 
    <img class="card-img mt-3"   onclick="setRelProductID(${relProd.id})" src="${relProd.image}" alt="Card image cap">
        <div class="card-body">
            <h4>${relProd.name}</h4>
        </div>
</div> 
</div> 

` 
document.getElementById("relProd").innerHTML =  relatedProducts;
}
}
// func para mostrar en pantalla (comentarios)
function showCom(comID){
    console.log(comID);
    let htmlContentToAppend = "";
    for (let i = 0; i < comID.length; i++) {
        let comment= comID[i];
        htmlContentToAppend +=
        ` 
        <div class="row justify-content-center" class="col-sm-9">
        <div class="card card-white post">
        <div  class="title h5" >  <b> ${comment.user} </b> ${comment.dateTime} `+stars(comment.score)+`    <br> </div>
        <h4  class="title h5" >   "${comment.description}  "  </h4>
        </div>
        </div>
        `;
        document.getElementById("commentsZone").innerHTML = htmlContentToAppend;
      }
} 
//func para pintar estrellas según calificación
function stars(score){
let calification = "";
for (let i=1; i <=5; i++){   
      if (i <= score){ 
        calification += `<span class="fa fa-star" style="color:orange"></span>`;
    }else{
        calification +=`<span class="fa fa-star"></span>`;
    };
  };
   return calification;
};
function star(calif){
    if (calif = 1) {
    }
}
//func para mandar comentario
function sendCom(){
const today = new Date();
const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
const dateTime = date+' '+time;
let newComent = document.getElementById("opinion").value;
alert(newComent);
const user = localStorage.getItem("email");
let calif = document.getElementById("calificación"); 

let opinioncita = "";
opinioncita +=`
<div class="row justify-content-center col-sm-9">
        <div class="card card-white post">
        <div  class="title h5" >  <b> ${user} </b> ${dateTime} `+stars(calif)+`  </div>
        <h4  class="title h5" >   " ${newComent}  "  </h4>
        </div>
        </div>`;

document.getElementById("newCom").innerHTML += opinioncita
document.getElementById("opinion").value = " ";    
}

comentarios();




