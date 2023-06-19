//PARA EL CARROUSEL
export function InsertarImagenes(eventos) {
  //RECIBE UN PARÁMETRO QUE REPRESENTA UNA IMAGEN DEL EVENTO//
  return `<div class="carousel-item">
    <img src="${eventos.image}" class="img-carrousel d-block w-100" alt="${eventos.name}">
  </div>`;
}
//CREAMOS UNA FUNCION QUE CARGUE LAS IMAGENES AL CARROUSEL//
 export function cargarImagenes(elementos, colocarImagenes) {
  //RECIBE COMO PARAMETRO LOS ELEMENTOS DEL EVENTO//
  let template = ""; //CREAMOS UNA PLANTILLA TEMPLATE VACIA PARA DESPUES IR CONCATENANDO CADA IMAGEN//
  for (const elemento of elementos) {
    //HACEMOS LA ITERACION//
    template += InsertarImagenes(elemento); //CARGAMOS EN EL TEMPLATE LA FUNCION INSERTAR IMAGENES REEMPLAZANDO EL PARAMETRO POR EL ELEMENTO,
  } //QUE SE GENERA EN EL BUCLE POR ENDE LA INTERPOLACION QUEDARIA COMO CADA ELEMENTO(OBJETO) QUE ACCEDE A SU PROPIEDAD//
  //CARGAMOS LA PLANTILLA AL HTML//
  colocarImagenes.innerHTML = `
    <div id="carouselExampleAutoplaying" class="carousel slide" data-bs-ride="carousel" data-bs-interval="3000">
        <div class="carousel-inner">
        ${template}
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
        </button>
    </div>`;
  // Inicializar el carrusel con autoplay
  const carousel = document.querySelector("#carouselExampleAutoplaying"); //LLAMAMOS AL CARROUSEL AUTOPLAYING POR SU ID//
  carousel.querySelector(".carousel-item").classList.add("active"); //LLAMAMOS POR CLASE AL CARROUSEL ITEM Y LE AGREGAMOS UNA CLASE "ACTIVE PARA QUE PUEDA HACER AUTOPLAY"
  new bootstrap.Carousel(carousel, { interval: 3000 }); //Y ACA LE DAMOS LOS INTERVALOS DE REPRODUCCION//
}

//PARA LOS CHECKS
export function crearLosCheckbox(category) {
  const contCheck=document.createElement("div")
  contCheck.classList.add("form-check")
  contCheck.innerHTML = `<input class="form-check-input" type="checkbox" value="${category}" id="${category}">
  <label class="form-check-label" for="${category}">${category}</label>`;
    return contCheck;
  }
  // Función para imprimir los checkboxes sin repetir
 export  function ImprimirLosChecks(eventos, $checkbox) {
    let checkSinRepetir = new Set(
      eventos
        .filter((elemento) => elemento.category)
        .map((elemento) => elemento.category)
    );
    checkSinRepetir.forEach((category) => {
      const categoriaRecorridas = crearLosCheckbox(category);
      $checkbox.appendChild(categoriaRecorridas);
    });
  }
  export function crearLasCards(objeto) {
    const contCard = document.createElement("div");
    contCard.classList.add("card" ,"card-pages");
    contCard.style = "width: 18rem";
    contCard.innerHTML = `
      <img src="${objeto.image}" class="card-img-top" alt="${objeto.name}">
      <div class="card-body">
        <h5 class="card-title">${objeto.name}</h5>
        <p class="card-text">${objeto.description}</p>
        
        <p class="tex-price" >Price: ${objeto.price}</p>
        <a href="./details.html?id=${objeto._id}" class="btn btn-primary btn-card">Details</a>
        
        
      </div>`;
    return contCard;
  }
  
  // Función para imprimir las cards
 export function imprimirCards(eventos, $secCards ) {
  eventos.forEach((element) => {
      const cardsRecorridas = crearLasCards(element);
      $secCards.appendChild(cardsRecorridas);
    });
  }
  
  export function filtrar(eventos, selectedCategories, searchQuery, $secCards) {
    const filteredEvents = eventos.filter((event) => {
      const categoryNameMatch = selectedCategories.length === 0 || selectedCategories.includes(event.category.toLowerCase());
      const nameMatch = event.name.toLowerCase().includes(searchQuery);
      return categoryNameMatch && nameMatch;
    });
  
    $secCards.innerHTML = ""; // Limpiar el contenido del contenedor antes de imprimir las nuevas cards
  
    if (filteredEvents.length === 0) {
      const noResultsMessage = document.createElement("h2");
      noResultsMessage.innerHTML = `<h2 class="text-error">"Ops! Lo sentimos, no hemos encontrado resultados con su busqueda</h2>
                                  <h3 class="text-error">Intentelo nuevamente, busque por el nombre del evento.</h3>
                                  <h3 class="text-error">Asegurese de que el evento corresponda con la fecha adecuada.</h3>
                                  <img class="img-error" src="https://static.vecteezy.com/system/resources/previews/010/302/093/non_2x/oops-web-error-line-icon-illustration-vector.jpg" alt="img">`
      $secCards.appendChild(noResultsMessage);
    } else {
      imprimirCards(filteredEvents, $secCards);
    }
  }