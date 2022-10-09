let arrP = [];
let idCategory = localStorage.getItem("catID");
let currentSortCriteria = undefined;
const ORDER_ASC_BY_PRICE = "cheap";
const ORDER_DESC_BY_PRICE = "expensive";
const ORDER_BY_PROD_REL = "relevance";
let minCount = undefined;
let maxCount = undefined;

//entrega3, acá guardamos identificador 
function setProductsID(id) {
     localStorage.setItem("productID", id);
     window.location = "product-info.html";
}

function sortProducts(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_PRICE)
    {
        result = array.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_PRICE){
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_REL){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount < bCount ){ return -1; }
            if ( aCount > bCount ){ return 1; }
            return 0;
        });
    }

    return result;
}
// async function cars() {
//     fetch(`https://japceibal.github.io/emercado-api/cats_products/${idCategory}.json`)
//       .then((response) => response.json())
//        .then((data) => {
//              showCars(data.products);
//            //esto es para q aparezca el nombre de cada categoría
//            const titulo = document.getElementById("categoryName");
//            titulo.innerHTML = data.catName;

//       });
// }

function showCars(arrP) {
  let htmlContentToAppend = "";
  for (let i = 0; i < arrP.length; i++) {
    let product = arrP[i];
    if (((minCount == undefined) || (minCount != undefined && parseInt(product.cost) >= minCount)) &&
    ((maxCount == undefined) || (maxCount != undefined && parseInt(product.cost) <= maxCount))){
    htmlContentToAppend += `
                <div onclick="setProductsID(${product.id})" class="list-group-item list-group-item-action cursor-active">
                    <div class="row">
                        <div class="col-3">
                          <img src="${product.image}" alt="empty" class="img-thumbnail">
                        </div>
                        <div class="col">
                            <div class="d-flex w-100 justify-content-between">
                                <h4 class="mb-1">${product.name}  -  ${product.cost} ${product.currency}</h4>
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
}
//Filtro.

function filterSortShowProducts(sortCriteria) {
  currentSortCriteria = sortCriteria;

  arrP = sortProducts(currentSortCriteria, arrP);

  //Muestro products
  showCars(arrP);
}
let hi = `https://japceibal.github.io/emercado-api/cats_products/${idCategory}.json`

document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(hi).then(function(resultObj){
        if (resultObj.status === "ok"){
            arrP = resultObj.data.products
            showCars(arrP);
            //esto es para q aparezca el nombre de cada categoría
            const titulo = document.getElementById("categoryName");
            titulo.innerHTML = resultObj.data.catName;
        }
});

    document.getElementById("sortAsc").addEventListener("click", function(){
        filterSortShowProducts(ORDER_ASC_BY_PRICE);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        filterSortShowProducts(ORDER_DESC_BY_PRICE);
    });

    document.getElementById("sortByCount").addEventListener("click", function(){
        filterSortShowProducts(ORDER_BY_PROD_REL);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showCars(arrP);
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function(){
        //min y max de los filtros por precio.
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
            minCount = parseInt(minCount);
        }
        else{
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
            maxCount = parseInt(maxCount);
        }
        else{
            maxCount = undefined;
        }

        showCars(arrP);
    });


});

// e.target.value = text in textarea
// search bar en tiempo real x nombre FALTA X DESCRIPCIÓN
document.getElementById("search").addEventListener("input", (e)=>{
    const input = e.target.value.toLowerCase();
    const arrFilter = arrP.filter((eg) => eg.name.toLowerCase().includes(input.toLowerCase()));
    showCars(arrFilter);
    
})
