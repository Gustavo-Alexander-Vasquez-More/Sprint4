const url = "https://mindhub-xj03.onrender.com/api/amazing";
let eventos;

fetch(url)
    .then((response) => response.json())
    .then((data) => {
    eventos = data;
    cargarImagenes(data.events);
})
    .catch((err) => console.log(err));
//ESTO ES PARA EL CARROUSEL DE IMAGENES//
const colocarImagenes = document.querySelector(".seccion-carrousel"); //LLAMAMOS POR CLASE AL CARROUSEL//
//CREAMOS LA FUNCION QUE CONTIENE LA PLANTILLA DEL CARROUSEL//
function InsertarImagenes(imagen) {
  //RECIBE UN PARÁMETRO QUE REPRESENTA UNA IMAGEN DEL EVENTO//
  return `<div class="carousel-item">
    <img src="${imagen.image}" class="img-carrousel d-block w-100" alt="${imagen.name}">
  </div>`;
}
//CREAMOS UNA FUNCION QUE CARGUE LAS IMAGENES AL CARROUSEL//
function cargarImagenes(elementos) {
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