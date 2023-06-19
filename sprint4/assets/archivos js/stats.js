import {cargarImagenes} from "../module/funciones.js";
const url = "https://mindhub-xj03.onrender.com/api/amazing";
let eventos;

fetch(url)
.then((response) => response.json())
  .then((data) => {
    eventos = data.events;
let currentDate = data.currentDate;
const colocarImagenes = document.querySelector(".seccion-carrousel");
cargarImagenes(eventos, colocarImagenes)
//CREAMOS UNA FUNCION PARA EL EVENTO CON MAYOR ASISTENCA, MENOR ASISTENCIA Y MAS CAPACIDAD//
//SI HABLAMOS DE ASISTENCIA ENTONCES ESTAMOS HABLANDO DE EVENTOS PASADOS//
function cargarDatosTabla1(){
  const pastFiltrados = eventos.filter(event => event.date < currentDate);
 //ORDENAR DE MAYOR A MENOR EN BASE AL PORCENTAJE DE ASISTENCIA//
 const ordenarMayorAsistencia = pastFiltrados.sort((a, b) => {
  const porcentajeAsistenciaUno = (a.assistance / a.capacity) * 100;
  const porcentajeAsistenciaDos = (b.assistance / b.capacity) * 100;
  return porcentajeAsistenciaDos - porcentajeAsistenciaUno;
});
const guardarElDeMayorAsistencia = ordenarMayorAsistencia[0];
const guardarElDeMenorAsistencia=ordenarMayorAsistencia[17]

//DE TODOS LOS ORDENADOS OBTENGO AHORA SI VOY A CALCULAR EL PORCENTAJE DEL PRIMERO OSEA EL MAYOR//
const calculoPorcentajeDelMayor = (ordenarMayorAsistencia[0].assistance / ordenarMayorAsistencia[0].capacity) * 100;
const calculoPorcentajeDelMenor=(ordenarMayorAsistencia[17].assistance/ordenarMayorAsistencia[17].capacity)*100
//Ahora desarrollamos el de mayor capacidad//
const recorrerPorCapacidad = eventos.map(element => {
  return {
    capacity: element.capacity,
    name: element.name
  };
});

const ordenarCapacidades = recorrerPorCapacidad.sort((a, b) => b.capacity - a.capacity);
    const obtenerEldeMayorCapacidad = ordenarCapacidades[0];
//CARGAMOS LOS DATOS A LA TABLA1//
const bodytabla1 = document.querySelector("#bodytabla1");
const tr = document.createElement("tr");
tr.innerHTML = `<td>${guardarElDeMayorAsistencia.name} ${calculoPorcentajeDelMayor.toFixed(1)}%</td>
                <td>${guardarElDeMenorAsistencia.name} ${calculoPorcentajeDelMenor.toFixed(2)}%</td>
                <td>${obtenerEldeMayorCapacidad.name} ${obtenerEldeMayorCapacidad.capacity}</td>`
                bodytabla1.appendChild(tr);
}
cargarDatosTabla1()
function cargarDatosTabla2() {
  const guardarCategoriasNoRepetidas = [...new Set(eventos.filter(element => element.date > currentDate).map(evento => evento.category))];
  
  guardarCategoriasNoRepetidas.forEach(categoria => {
    const eventosCategoria = eventos.filter(evento => evento.category === categoria && evento.date > currentDate);
    
    const revenueTotalPorCat = (eventosCategoria.reduce((acc, evento) => {
      return acc + (evento.estimate * evento.price);}, 0)).toLocaleString();
    console.log(revenueTotalPorCat)
    
    const porcentajeTotalPorCat = (eventosCategoria.reduce((acumulador, evento) => {
      return acumulador + ((evento.estimate * 100) / evento.capacity); }, 0) / eventosCategoria.length).toFixed(2);
    //cargamos la tabla//
    const bodytabla2 = document.querySelector("#tbodyTabla2");
    
    const tr = document.createElement('tr');
    const tdCategoria = document.createElement('td');
    tdCategoria.textContent = categoria;
    tr.appendChild(tdCategoria);
    
    const tdRevenue = document.createElement('td');
    tdRevenue.textContent = `$${revenueTotalPorCat}`;
    tr.appendChild(tdRevenue);
    
    const tdPorcentaje = document.createElement('td');
    tdPorcentaje.textContent = `${porcentajeTotalPorCat}%`;
    tr.appendChild(tdPorcentaje);
    
    bodytabla2.appendChild(tr);
  });
}
cargarDatosTabla2();
  ///AHORA VAMOS CON LA TABLA DE PAST//
  function cargarDatosTabla3() {
    const guardarCategoriasNoRepetidas3 = [...new Set(eventos.filter(element => element.date < currentDate).map(evento => evento.category))];
    
    guardarCategoriasNoRepetidas3.forEach(categoria => {
      const eventosCategoria3 = eventos.filter(evento => evento.category === categoria && evento.date < currentDate);
      
      const revenueTotalPorCat3 = (eventosCategoria3.reduce((acc, evento) => {
        return acc + (evento.assistance * evento.price);
      }, 0)).toLocaleString();
      
      const porcentajeTotalPorCat3 = (eventosCategoria3.reduce((acumulador, evento) => {
        return acumulador + ((evento.assistance * 100) / evento.capacity);
      }, 0) / eventosCategoria3.length).toFixed(2);
      
      const bodytabla3 = document.querySelector("#tbodyTabla3");
      
      const tr = document.createElement('tr');
      const tdCategoria = document.createElement('td');
      tdCategoria.textContent = categoria;
      tr.appendChild(tdCategoria);
      
      const tdRevenue = document.createElement('td');
      tdRevenue.textContent = `$${revenueTotalPorCat3}`;
      tr.appendChild(tdRevenue);
      
      const tdPorcentaje = document.createElement('td');
      tdPorcentaje.textContent = `${porcentajeTotalPorCat3}%`;
      tr.appendChild(tdPorcentaje);
      
      bodytabla3.appendChild(tr);
    });
  }
cargarDatosTabla3();
  })
  .catch((err) => console.log(err));
