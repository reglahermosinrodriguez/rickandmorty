// // document.addEventListener('DOMContentLoaded', function () {
// //   const episodeList = document.querySelector('.list-group');
// //   const mainContainer = document.getElementById('main-container');

// //   // Obtener datos de la API
// //   fetch('https://rickandmortyapi.com/api/episode')
// //       .then(response => response.json())
// //       .then(data => {
// //           // Manejar los datos obtenidos de la API
// //           console.log('Datos de la API:', data);

// //           // En el Sidebar
// //           data.results.forEach((episodeData, index) => {
// //               const li = document.createElement('li');
// //               li.classList.add('list-group-item');
// //               li.textContent = `Episodio ${index + 1}`;
// //               li.addEventListener('click', () => showEpisodeDetails(episodeData));
// //               episodeList.appendChild(li);
// //           });
// //       })
// //       .catch(error => console.error('Error fetching data:', error));

// //   function showEpisodeDetails(episodeData) {
// //       // Limpiar contenido previo
// //       mainContainer.innerHTML = '';
      
// //       // En el Main Container
// //       const episodeDiv = document.createElement('div');
// //       episodeDiv.classList.add('episode-info');
// //       episodeDiv.innerHTML = `
// //           <h3>${episodeData.name}</h3>
// //           <p>Fecha de estreno: ${episodeData.air_date}</p>
// //           <p>Código del episodio: ${episodeData.episode}</p>
// //       `;
// //       mainContainer.appendChild(episodeDiv);
// //   }
// // });

import {Episode} from "./interfaces/episodes";
import {Character} from "./interfaces/characters";
import {Location} from "./interfaces/locations";

async function displayInfo() {
  try {
    const data = await fetch("https://rickandmortyapi.com/api/episode")
    const JSONdata = await data.json();
    console.log(JSONdata);
  } catch (error) {
  
  }
}

displayInfo()

const episodeList = document.getElementById('episode-list');

JSONdata.forEach(episode) => {
  const episodeList = `
  <ul>
  <li>${api.episode}</li>
  </ul>
  `
}

