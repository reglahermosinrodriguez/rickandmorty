// import { TopLevel, Result } from "./interfaces/general";

// async function displayInfo() {
//   try {
//     let totalEpisodes: Result[] = [];
//     let nextLink = "https://rickandmortyapi.com/api/episode";

//     // Realiza solicitudes hasta que no haya más enlaces 'next'
//     while (nextLink) {
//       const data = await fetch(nextLink);
//       const JSONdata: TopLevel = await data.json();
//       const episodes = JSONdata.results;

//       // Agrega los episodios al array totalEpisodes
//       totalEpisodes = totalEpisodes.concat(episodes);

//       // Actualiza nextLink con el enlace proporcionado en 'next'
//       nextLink = JSONdata.info.next;
//     }

//     const listaEpisodios = document.getElementById('episode-list');
//     const totalEpisodesElement = document.getElementById('total-episodes');
//     const mainContainer = document.getElementById('main-container');

//     // Muestra el número total de episodios en el elemento con id 'total-episodes'
//     totalEpisodesElement.textContent = `Total Episodes: ${totalEpisodes.length}`;

//     totalEpisodes.forEach((result, index) => {
//       const listItem = document.createElement('li');
//       listItem.textContent = `Episode ${index + 1}`;
//       listItem.classList.add('list-group-item');

//       listItem.addEventListener('click', async () => {
//         // Limpia el contenido del contenedor principal
//         mainContainer.innerHTML = '';

//         // Agrega detalles del episodio al contenedor principal
//         const episodeDetails = document.createElement('div');
//         episodeDetails.innerHTML = `
//           <div>
//             <h2>${result.name}</h2>
//             <p>Air Date: ${result.air_date}</p>
//             <p>Episode: ${result.episode}</p>
//           </div>
//         `;

//         enum CharacterProperties {
//           Name = 'name',
//           Gender = 'gender',
//           Status = 'status',
//           Species = 'species',
//           Location = 'location',
//         }

//         // Obtiene información de los personajes y agrega imágenes y detalles al contenedor principal
//         for (const characterUrl of result.characters) {
//           const characterResponse = await fetch(characterUrl);
//           const characterData = await characterResponse.json();

//           const characterContainer = document.createElement('div');

//           const characterImage = document.createElement('img');
//           characterImage.src = characterData.image;
//           characterImage.alt = characterData[CharacterProperties.Name];

//           const characterDetails = document.createElement('p');
//           characterDetails.innerHTML = `
//             <strong>${characterData[CharacterProperties.Name]}</strong><br>
//             ${CharacterProperties.Gender}: ${characterData[CharacterProperties.Gender]}<br>
//             ${CharacterProperties.Status}: ${characterData[CharacterProperties.Status]}<br>
//             ${CharacterProperties.Species}: ${characterData[CharacterProperties.Species]}<br>
//             ${CharacterProperties.Location}: ${characterData[CharacterProperties.Location].name}
//          `;

//           characterContainer.appendChild(characterImage);
//           characterContainer.appendChild(characterDetails);

//           episodeDetails.appendChild(characterContainer);
//         }

//         mainContainer.appendChild(episodeDetails);
//       });

//       // Agrega el elemento de la lista al listado en la barra lateral
//       listaEpisodios.appendChild(listItem);
//     });

//   } catch (error) {
//     console.log(error);
//   }
// }

// document.addEventListener("DOMContentLoaded", function() {
//   displayInfo();
// });


// import { TopLevel, Result } from "./interfaces/general";

// // Variables globales para manejar la paginación
// let currentPage = 1;
// const episodesPerPage = 10;
// let totalEpisodes: Result[] = [];

// async function displayInfo() {
//   try {
//     const nextLink = `https://rickandmortyapi.com/api/episode?page=${currentPage}`;
//     const data = await fetch(nextLink);
//     const JSONdata: TopLevel = await data.json();
//     const episodes = JSONdata.results;

//     // Agrega los episodios al array totalEpisodes
//     totalEpisodes = totalEpisodes.concat(episodes);

//     const listaEpisodios = document.getElementById('episode-list');
//     const totalEpisodesElement = document.getElementById('total-episodes');
//     const mainContainer = document.getElementById('main-container');
//     const nextButton = document.getElementById('nextButton');

//     // Limpiar la lista de episodios antes de agregar nuevos
//     listaEpisodios.innerHTML = '';

//     // Muestra el número total de episodios en el elemento con id 'total-episodes'
//     totalEpisodesElement.textContent = `Total Episodes: ${JSONdata.info.count}`;

//     // Selecciona solo los episodios que deben mostrarse en la página actual
//     const currentEpisodes = totalEpisodes.slice(
//       (currentPage - 1) * episodesPerPage,
//       currentPage * episodesPerPage
//     );

//     currentEpisodes.forEach((result, index) => {
//       const listItem = document.createElement('li');
//       listItem.textContent = `Episode ${index + 1 + (currentPage - 1) * episodesPerPage}`;
//       listItem.classList.add('list-group-item');

//       listItem.addEventListener('click', async () => {
//         // Limpia el contenido del contenedor principal
//         mainContainer.innerHTML = '';

//         // Agrega detalles del episodio al contenedor principal
//         const episodeDetails = document.createElement('div');
//         episodeDetails.innerHTML = `
//           <div>
//             <h2>${result.name}</h2>
//             <p>Air Date: ${result.air_date}</p>
//             <p>Episode: ${result.episode}</p>
//           </div>
//         `;

//         enum CharacterProperties {
//           Name = 'name',
//           Gender = 'gender',
//           Status = 'status',
//           Species = 'species',
//           Location = 'location',
//         }

//         // Obtiene información de los personajes y agrega imágenes y detalles al contenedor principal
//         for (const characterUrl of result.characters) {
//           const characterResponse = await fetch(characterUrl);
//           const characterData = await characterResponse.json();

//           const characterContainer = document.createElement('div');

//           const characterImage = document.createElement('img');
//           characterImage.src = characterData.image;
//           characterImage.alt = characterData[CharacterProperties.Name];

//           const characterDetails = document.createElement('p');
//           characterDetails.innerHTML = `
//             <strong>${characterData[CharacterProperties.Name]}</strong><br>
//             ${CharacterProperties.Gender}: ${characterData[CharacterProperties.Gender]}<br>
//             ${CharacterProperties.Status}: ${characterData[CharacterProperties.Status]}<br>
//             ${CharacterProperties.Species}: ${characterData[CharacterProperties.Species]}<br>
//             ${CharacterProperties.Location}: ${characterData[CharacterProperties.Location].name}
//           `;

//           characterContainer.appendChild(characterImage);
//           characterContainer.appendChild(characterDetails);

//           episodeDetails.appendChild(characterContainer);
//         }

//         mainContainer.appendChild(episodeDetails);
//       });

//       // Agrega el elemento de la lista al listado en la barra lateral
//       listaEpisodios.appendChild(listItem);
//     });

//     // Habilita o deshabilita el botón "Next" según si hay más páginas
//     nextButton.disabled = !JSONdata.info.next;

//   } catch (error) {
//     console.log(error);
//   }
// }

// document.addEventListener("DOMContentLoaded", function () {
//   const nextButton = document.getElementById('nextButton');

//   nextButton.addEventListener('click', async () => {
//     // Incrementa el número de página y llama a la función displayInfo
//     currentPage++;
//     await displayInfo();
//   });

//   // Llama a la función displayInfo inicialmente
//   displayInfo();
// });


import { TopLevel, Result } from "./interfaces/general";

async function displayInfo() {
  try {
    let currentPage = 1;
    const episodesPerPage = 20;
    let displayedEpisodes: Result[] = [];
    let totalEpisodes: number;

    const loadEpisodes = async () => {
      const nextLink = `https://rickandmortyapi.com/api/episode?page=${currentPage}`;
      const data = await fetch(nextLink);
      const JSONdata: TopLevel = await data.json();
      displayedEpisodes = JSONdata.results;
      totalEpisodes = JSONdata.info.count; // Guarda el total de episodios
    };

    const renderEpisodes = () => {
      const listaEpisodios = document.getElementById('episode-list');
      const mainContainer = document.getElementById('main-container');
      const nextButton = document.getElementById('nextButton');

      // Limpiar la barra lateral antes de agregar nuevos elementos
      listaEpisodios.innerHTML = '';

      // Calcular el número de episodio inicial para la página actual
      const startingEpisodeNumber = (currentPage - 1) * episodesPerPage + 1;

      displayedEpisodes.forEach((result, index) => {
        const episodeNumber = startingEpisodeNumber + index;

        const listItem = document.createElement('li');
        listItem.textContent = `Episode ${episodeNumber}`;

        listItem.addEventListener('click', async () => {
          // Limpia el contenido del contenedor principal
          mainContainer.innerHTML = '';

          // Agrega detalles del episodio al contenedor principal
          const episodeDetails = document.createElement('div');
          episodeDetails.innerHTML = `
            <div>
              <h2>${result.name}</h2>
              <p>Air Date: ${result.air_date}</p>
              <p>Episode: ${result.episode}</p>
            </div>
          `;

          enum CharacterProperties {
            Name = 'name',
            Gender = 'gender',
            Status = 'status',
            Species = 'species',
            Location = 'location',
          }

          // Obtiene información de los personajes y agrega imágenes y detalles al contenedor principal
          for (const characterUrl of result.characters) {
            const characterResponse = await fetch(characterUrl);
            const characterData = await characterResponse.json();

            const characterContainer = document.createElement('div');

            const characterImage = document.createElement('img');
            characterImage.src = characterData.image;
            characterImage.alt = characterData[CharacterProperties.Name];

            const characterDetails = document.createElement('p');
            characterDetails.innerHTML = `
              <strong>${characterData[CharacterProperties.Name]}</strong><br>
              ${CharacterProperties.Gender}: ${characterData[CharacterProperties.Gender]}<br>
              ${CharacterProperties.Status}: ${characterData[CharacterProperties.Status]}<br>
              ${CharacterProperties.Species}: ${characterData[CharacterProperties.Species]}<br>
              ${CharacterProperties.Location}: ${characterData[CharacterProperties.Location].name}
            `;

            characterContainer.appendChild(characterImage);
            characterContainer.appendChild(characterDetails);

            episodeDetails.appendChild(characterContainer);
          }

          mainContainer.appendChild(episodeDetails);
        });

        // Agrega el elemento de la lista al listado en la barra lateral
        listaEpisodios.appendChild(listItem);
      });

      // Modifica el texto del botón "Next" a "Back" si estás en la última página
      nextButton.textContent = currentPage * episodesPerPage >= totalEpisodes ? 'Back' : 'Next';
    };

    const resetPage = () => {
      currentPage = 1;
      // Lógica para reiniciar la barra lateral a la primera página
      loadEpisodes().then(() => {
        renderEpisodes();
      });
    };

    // Cargar episodios al inicio
    await loadEpisodes();
    renderEpisodes();

    const nextButton = document.getElementById('nextButton');
    nextButton.addEventListener('click', async () => {
      currentPage++;

      if (currentPage > Math.ceil(totalEpisodes / episodesPerPage)) {
        // Si se supera el número total de páginas, reiniciar a la página 1
        resetPage();
      } else {
        await loadEpisodes();
        renderEpisodes();
      }
    });

  } catch (error) {
    console.log(error);
  }
}

document.addEventListener("DOMContentLoaded", function() {
  displayInfo();
});





