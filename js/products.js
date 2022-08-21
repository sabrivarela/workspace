
// function setProductsID(id) {
//     localStorage.setItem("pID", id);
//     window.location = "product-info.html"
// 
async function cars() {
    fetch(`https://japceibal.github.io/emercado-api/cats_products/101.json`)
      .then((response) => response.json())
       .then((data) => {
             showCars(data.products);
           console.log(data)
      });

}


    function showCars(idP){
        let htmlContentToAppend = "";
        for (let i = 0; i < idP.length; i++){
            let product = idP[i];
            
                htmlContentToAppend += `
                <div onclick="setProductsID(${product.id})" class="list-group-item list-group-item-action cursor-active">
                    <div class="row">
                        <div class="col-3">
                          <img src="${product.image}" alt="empty" class="img-thumbnail">
                        </div>
                        <div class="col">
                            <div class="d-flex w-100 justify-content-between">
                                <h4 class="mb-1">${product.name}  -  ${product.cost} ${product.cost}</h4>
                                <small class="text-muted">${product.soldCount} vendidos</small>
                            </div>
                            <p class="mb-1">${product.description}</p>
                        </div>
                    </div>
                </div>
                `;
            
            document.getElementById("product").innerHTML = htmlContentToAppend; 
        }
    }

    // document.addEventListener("DOMContentLoaded", function(e){
    //    getJSONData(`https://japceibal.github.io/emercado-api/cats_products/101.json`).then(function(resultObj){
    //         if (resultObj.status === "ok"){
    //            idP = resultObj.data
    //             showCars()
               
    //        }
    //    });}
    // )

cars();


