import { ImprimirLosChecks, cargarImagenes, imprimirCards, filtrar } from "../module/funciones.js";

const $secCards = document.getElementById("sec-card");
const $checkbox = document.querySelector("#checkbox");
const url = "https://mindhub-xj03.onrender.com/api/amazing";
const colocarImagenes = document.querySelector(".seccion-carrousel");
let eventos;

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    eventos = data.events;
   
    cargarImagenes(eventos, colocarImagenes);
    ImprimirLosChecks(eventos, $checkbox);
    let upcoming=eventos.filter(event=>event.date > data.currentDate)
    imprimirCards(upcoming, $secCards);

    // Declaraciones para los filtros
    const selectedCategories = [];
    const checkboxes = $checkbox.querySelectorAll('input[type="checkbox"]');
    const $inputSearch = document.getElementById("search");

    // Filtros
    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", () => {
        selectedCategories.length = 0; // Vaciar el arreglo antes de cada filtrado
        checkboxes.forEach((checkbox) => {
          if (checkbox.checked) {
            selectedCategories.push(checkbox.labels[0].textContent.toLowerCase());
          }
        });
        const searchQuery = $inputSearch.value.toLowerCase().trim();
        filtrar(upcoming, selectedCategories, searchQuery, $secCards);
      });
    });

    $inputSearch.addEventListener("keyup", () => {
      const searchQuery = $inputSearch.value.toLowerCase().trim();
      filtrar(upcoming, selectedCategories, searchQuery, $secCards);
    });
  })
  .catch((err) => console.log(err));
