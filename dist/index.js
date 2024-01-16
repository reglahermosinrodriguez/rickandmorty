"use strict";
// document.addEventListener('DOMContentLoaded', function () {
//   // Obtener datos de la API
//   fetch('https://rickandmortyapi.com/api/episode')
//       .then(response => response.json())
//       .then(data => {
//       // Manejar los datos obtenidos de la API
//       console.log('Datos de la API:', data);
//   })
//       .catch(error => console.error('Error fetching data:', error));
// });
// interface Episode {
//   name: string;
//   airdate: string;
//   episodecode: string;
// }
// const episode: Episode = {
//   name: "Name",
//   airdate: "Air date",
//   episodecode: "Episode code",
// };
// document.addEventListener('DOMContentLoaded', function () {
//   // Obtener datos de la API
//   fetch('https://rickandmortyapi.com/api/episode')
//       .then(response => response.json())
//       .then(data => {
//           // Manejar los datos obtenidos de la API
//           console.log('Datos de la API:', data);
//           // Obtener el elemento ul para los episodios
//           const episodeList = document.getElementById('episode-list');
//           // Iterar sobre los resultados y agregar elementos a la lista
//           data.results.forEach(episodeData => {
//               const li = document.createElement('li');
//               li.classList.add('list-group-item');
//               li.textContent = episodeData.name;
//               // Agregar el elemento a la lista
//               episodeList.appendChild(li);
//           });
//       })
//       .catch(error => console.error('Error fetching data:', error));
// });
// document.addEventListener('DOMContentLoaded', function () {
//   const episodeList = document.querySelector('.list-group');
//   // Obtener datos de la API
//   fetch('https://rickandmortyapi.com/api/episode')
//       .then(response => response.json())
//       .then(data => {
//           // Manejar los datos obtenidos de la API
//           console.log('Datos de la API:', data);
//           // En el Sidebar
//           data.results.forEach((episodeData, index) => {
//               const li = document.createElement('li');
//               li.classList.add('list-group-item');
//               li.textContent = `Episodio ${index + 1}: ${episodeData.name}`;
//               episodeList.appendChild(li);
//           });
//           // En el Main Container
//           const mainContainer = document.getElementById('main-container');
//           data.results.forEach((episodeData, index) => {
//               const episodeDiv = document.createElement('div');
//               episodeDiv.classList.add('episode-info');
//               episodeDiv.innerHTML = `
//                   <h3>${episodeData.name}</h3>
//                   <p>Fecha de estreno: ${episodeData.air_date}</p>
//                   <p>Código del episodio: ${episodeData.episode}</p>
//               `;
//               mainContainer.appendChild(episodeDiv);
//           });
//       })
//       .catch(error => console.error('Error fetching data:', error));
// });
document.addEventListener('DOMContentLoaded', function () {
    const episodeList = document.querySelector('.list-group');
    const mainContainer = document.getElementById('main-container');
    // Obtener datos de la API
    fetch('https://rickandmortyapi.com/api/episode')
        .then(response => response.json())
        .then(data => {
        // Manejar los datos obtenidos de la API
        console.log('Datos de la API:', data);
        // En el Sidebar
        data.results.forEach((episodeData, index) => {
            const li = document.createElement('li');
            li.classList.add('list-group-item');
            li.textContent = `Episodio ${index + 1}`;
            li.addEventListener('click', () => showEpisodeDetails(episodeData));
            episodeList.appendChild(li);
        });
    })
        .catch(error => console.error('Error fetching data:', error));
    function showEpisodeDetails(episodeData) {
        // Limpiar contenido previo
        mainContainer.innerHTML = '';
        // En el Main Container
        const episodeDiv = document.createElement('div');
        episodeDiv.classList.add('episode-info');
        episodeDiv.innerHTML = `
          <h3>${episodeData.name}</h3>
          <p>Fecha de estreno: ${episodeData.air_date}</p>
          <p>Código del episodio: ${episodeData.episode}</p>
      `;
        mainContainer.appendChild(episodeDiv);
    }
});
