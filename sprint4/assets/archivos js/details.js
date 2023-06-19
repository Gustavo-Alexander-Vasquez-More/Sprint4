import { cargarImagenes } from "../module/funciones.js";
const url = "https://mindhub-xj03.onrender.com/api/amazing";
const containerPlantilla = document.querySelector("#container-detail");
let eventos;

fetch(url)
.then((response) => response.json())
.then((data) => {
  eventos = data.events;
  const colocarImagenes = document.querySelector(".seccion-carrousel"); //LLAMAMOS POR CLASE AL CARROUSEL//
  cargarImagenes(eventos, colocarImagenes);
    const params = new URLSearchParams(location.search);
    const id = Number(params.get("id")); // Convertir a número
    const detailEncontrado = eventos.find((elemento) => elemento._id === id);
    containerPlantilla.innerHTML = `
  <div class="row g-0 ">
    <div class="col-md-4" id="cont-img-details">
      <img id="image-detail" src="${detailEncontrado.image}" class="img-fluid rounded-start card-img-top-details" alt="${detailEncontrado.name}">
    </div>
    <div class="col-md-8">
      <div class="card-body body-details">
        <h5 class="card-title">${detailEncontrado.name}</h5>
        <p class="card-text">Date: ${detailEncontrado.date}</p>
        <p class="card-text">Description: ${detailEncontrado.description}</p>
        <p class="card-text">Place: ${detailEncontrado.place}</p>
        <p class="card-text">Capacity: ${detailEncontrado.capacity}</p>
        <p class="card-text">Assistance: ${detailEncontrado.assistance}</p>
        <p class="card-text">Price: $ ${detailEncontrado.price}</p>
      </div>
    </div>
  </div>`;
  })
  .catch((err) => console.log(err));

