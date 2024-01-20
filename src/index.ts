// import { TopLevel, Result } from "./interfaces/general";

// document.addEventListener("DOMContentLoaded", function() {
//   displayInfo();

// async function displayInfo() {
//   try {
//     let currentPage = 1;
//     const episodesPerPage = 20;
//     let displayedEpisodes: Result[] = [];
//     let totalEpisodes: number;

//     const loadEpisodes = async () => {
//       const nextLink = `https://rickandmortyapi.com/api/episode?page=${currentPage}`;
//       const data = await fetch(nextLink);
//       const JSONdata: TopLevel = await data.json();
//       displayedEpisodes = JSONdata.results;
//       totalEpisodes = JSONdata.info.count; // Guarda el total de episodios
//     };

//     const renderEpisodes = () => {
//       const episodeList = document.getElementById('episode-list');
//       const mainContainer = document.getElementById('main-container');
//       const nextButton = document.getElementById('nextButton');

//       // Calcular el número de episodio inicial para la página actual
//       const startingEpisodeNumber = (currentPage - 1) * episodesPerPage + 1;

//       displayedEpisodes.forEach((result, index) => {
//         const episodeNumber = startingEpisodeNumber + index;


//         const listItem = document.createElement('li');
//         listItem.textContent = `Episode ${episodeNumber}`;
//         listItem.classList.add('custom-list-item');

        
//         listItem.addEventListener('click', async () => {
//           // Limpia el contenido del contenedor principal
//           mainContainer.innerHTML = '';

//           // Agrega detalles del episodio al contenedor principal
//           const episodeDetails = document.createElement('div');
//           episodeDetails.innerHTML = `
//             <div>
//               <h2>${result.name}</h2>
//               <p>Air Date: ${result.air_date}</p>
//               <p>Episode: ${result.episode}</p>
//             </div>
//           `;

//           enum CharacterProperties {
//             Name = 'name',
//             Gender = 'gender',
//             Status = 'status',
//             Species = 'species',
//             Location = 'location',
//           }

//           // Obtiene información de los personajes y agrega imágenes y detalles al contenedor principal
//           for (const characterUrl of result.characters) {
//             const characterResponse = await fetch(characterUrl);
//             const characterData = await characterResponse.json();

//             const characterContainer = document.createElement('div');

//             const characterImage = document.createElement('img');
//             characterImage.src = characterData.image;
//             characterImage.alt = characterData[CharacterProperties.Name];

//             const characterDetails = document.createElement('p');
//             characterDetails.innerHTML = `
//               <strong>${characterData[CharacterProperties.Name]}</strong><br>
//               ${CharacterProperties.Gender}: ${characterData[CharacterProperties.Gender]}<br>
//               ${CharacterProperties.Status}: ${characterData[CharacterProperties.Status]}<br>
//               ${CharacterProperties.Species}: ${characterData[CharacterProperties.Species]}<br>
//               ${CharacterProperties.Location}: ${characterData[CharacterProperties.Location].name}
//             `;

              
//             characterContainer.appendChild(characterImage);
//             characterContainer.appendChild(characterDetails);

//             episodeDetails.appendChild(characterContainer);
            
//           }

//           mainContainer.appendChild(episodeDetails);
          
//         });

//         // Agrega el elemento de la lista al listado en la barra lateral
//         episodeList.appendChild(listItem);
//       });

//       // El botón "Next" solo se activa si hay más episodios por cargar
//       nextButton.disabled = currentPage * episodesPerPage >= totalEpisodes;
//     };

//     // Cargar episodios al inicio
//     await loadEpisodes();
//     renderEpisodes();

//     const nextButton = document.getElementById('nextButton');
//     nextButton.addEventListener('click', async () => {
//       if (currentPage * episodesPerPage < totalEpisodes) {
//         currentPage++;
//         await loadEpisodes();
//         renderEpisodes();
//       }
//     });

//   } catch (error) {
//     console.log(error);
//   }
// }

// });

import { TopLevel, Result } from "./interfaces/TopLevel";

async function callApi() {
  try {
    
    const uploadEpisodes = async () => {
      const url = `https://rickandmortyapi.com/api/episode?page=${presentPage}`;
      const data = await fetch(url);
      const JSONdata: TopLevel = await data.json();
      visibleEpisodes = JSONdata.results;
      entireEpisodes = JSONdata.info.count; // Guarda el total de episodios*/
      console.log(JSONdata);
    };
    
    let presentPage = 1;
    const resultsPerPage = 20;
    let visibleEpisodes: Result[] = [];
    let entireEpisodes: number;
    
    
    const showEpisodes = () => {
      const listEpisodes = document.getElementById('episode-list');
      const mainContainer = document.getElementById('main-container');
      const characterContainer = document.getElementById('character-container');
      const nextButton = document.getElementById('nextButton');
      
      // Calcular el número de episodio inicial para la página actual
      const firstEpisodeNumber = (presentPage - 1) * resultsPerPage + 1;

      visibleEpisodes.forEach((result, index) => {
        const episodeNumber = firstEpisodeNumber + index;

        const listItem = document.createElement('li');
        listItem.textContent = `Episode ${episodeNumber}`;
        listItem.classList.add('list-group-item-action');

        listItem.addEventListener('click', async () => {
          // Limpia el contenido del contenedor principal y del contenedor de personajes
          mainContainer.innerHTML = '';
          characterContainer.innerHTML = '';

          // Agrega detalles del episodio al contenedor principal
          const  episodeDescription = document.createElement('div');
          episodeDescription.innerHTML = `
            <div class="container-style">
              <h2>${result.name}</h2>
              <p>Air Date: ${result.air_date}</p>
              <p>Episode: ${result.episode}</p>
            </div>
          `;
          
          // Obtiene información de los personajes y agrega imágenes y detalles al contenedor de personajes
          for (const characterUrl of result.characters) {
            const characterResponse = await fetch(characterUrl);
            const characterData = await characterResponse.json();

            const characterDetails = document.createElement('div');
            characterDetails.classList.add('character-details');

            const characterImage = document.createElement('img');
            characterImage.src = characterData.image;
            characterImage.alt = characterData.name;
            characterImage.classList.add('character-image');

            characterDetails.innerHTML =  ` 
            <strong>${characterData.name}</strong><br>
              Gender: ${characterData.gender}<br>
              Status: ${characterData.status}<br>
              Species: ${characterData.species}<br>
              Location: ${characterData.location.name}
            `;

            characterDetails.appendChild(characterImage);
            characterContainer.appendChild(characterDetails);
          }

          mainContainer.appendChild(episodeDescription);
        });

        listEpisodes.appendChild(listItem);
      });

      // El botón "Next" solo se activa si hay más episodios por cargar
      nextButton.disabled = presentPage * resultsPerPage >= entireEpisodes;
    };

    await uploadEpisodes();
    showEpisodes();

    const nextButton = document.getElementById('nextButton');
    nextButton.addEventListener('click', async () => {
      if (presentPage * resultsPerPage < entireEpisodes) {
        presentPage++;
        await uploadEpisodes();
        showEpisodes();
      }
    });

  } catch (error) {
    console.log(error);
  }
}

document.addEventListener("DOMContentLoaded", function() {
  callApi();
});




