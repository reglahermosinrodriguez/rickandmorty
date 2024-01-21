// // IMPORT API'S INTERFACES

// import { TopLevel, Result } from "./interfaces/general";

// document.addEventListener("DOMContentLoaded", function() {

// // PRINCIPAL FUNCTION

// async function callApi() { // CALL API
//   try {
//       const uploadEpisodes = async () => {
//       const url = `https://rickandmortyapi.com/api/episode?page=${presentPage}`;
//       const data = await fetch(url);
//       const JSONdata: TopLevel = await data.json(); // Convert information to JSON language
//       visibleEpisodes = JSONdata.results;
//       entireEpisodes = JSONdata.info.count; // Save total episodes
//       console.log(JSONdata);
//     };
    
//     // GLOBAL VARIABLES
//     let presentPage = 1;
//     const resultsPerPage = 20; // Load chapters 20 at a time
//     let visibleEpisodes: Result[] = []; // Call the Result interface
//     let entireEpisodes: number; 
    
//     // DOM 
//     const showEpisodes = () => { 
//       const listEpisodes = document.getElementById('episode-list');
//       const mainContainer = document.getElementById('main-container');
//       const characterContainer = document.getElementById('character-container');
//       const nextButton = document.getElementById('nextButton');
      
//       // Calculate starting episode number for current page 
//       const firstEpisodeNumber = (presentPage - 1) * resultsPerPage + 1;

//       visibleEpisodes.forEach((result, index) => { // Iterates through the values ​​of the result interface
//         const episodeNumber = firstEpisodeNumber + index;

//         const listItem = document.createElement('li'); // Creation of episode list
//         listItem.textContent = `Episode ${episodeNumber}`;
//         listItem.classList.add('list-group-item-action');

//         listItem.addEventListener('click', async () => {
//           // Clear the contents of main container and character container
//           mainContainer.innerHTML = '';
//           characterContainer.innerHTML = '';

//           // Add episode details to the main container
//           const  episodeDescription = document.createElement('div');
//           episodeDescription.innerHTML = `
//             <div class="container-style">
//               <h2>${result.name}</h2>
//               <p>Air Date: ${result.air_date}</p>
//               <p>Episode: ${result.episode}</p>
//             </div>
//           `;
          
//           // Get character information and add images and details to the character container
//           for (const characterUrl of result.characters) {
//             const characterResponse = await fetch(characterUrl);
//             const characterData = await characterResponse.json();

//             const characterDetails = document.createElement('div'); // Creation of div of character details
//             characterDetails.classList.add('character-details');

//             const characterImage = document.createElement('img'); // Creation of image element for character images
//             characterImage.src = characterData.image;
//             characterImage.alt = characterData.name;
//             characterImage.classList.add('character-image');

//             // Display info characters
//             characterDetails.innerHTML =  ` 
//             <strong>${characterData.name}</strong><br>
//               Gender: ${characterData.gender}<br>
//               Status: ${characterData.status}<br>
//               Species: ${characterData.species}<br>
//               Origin: ${characterData.origin.name}<br>
//               Location: ${characterData.location.name} 
//             `;

//             // Character info added to principal div
//             characterDetails.appendChild(characterImage);
//             characterContainer.appendChild(characterDetails);
//           }

//           mainContainer.appendChild(episodeDescription);
//         });

//         listEpisodes.appendChild(listItem);
//       });

//       // Next button is only activated if there are more episodes to load
//       nextButton.disabled = presentPage * resultsPerPage >= entireEpisodes;
//     };

//     // CALL FUNCTIONS
//     await uploadEpisodes();
//     showEpisodes();

//     // Next buttom functionality
//     const nextButton = document.getElementById('nextButton');
//     nextButton.addEventListener('click', async () => {
//       if (presentPage * resultsPerPage < entireEpisodes) {
//         presentPage++;
//         await uploadEpisodes();
//         showEpisodes();
//       }
//     });

//   } catch (error) {
//     console.log(error);
//   }
// }
// callApi(); // CALL PRINCIPAL FUNCTION 
// });


// EL CÓDIGO DE ABAJO INCLUYE EL EXTRA 1
// IMPORT API'S INTERFACES
// import { TopLevel, Result } from "./interfaces/general";

// interface CharacterData {
//   name: string;
//   image: string;
//   gender: string;
//   status: string;
//   species: string;
//   origin: { name: string };
//   location: { name: string };
// }

// document.addEventListener("DOMContentLoaded", function () {
//   // PRINCIPAL FUNCTION
//   async function callApi() {
//     try {
//       const uploadEpisodes = async () => {
//         const url = `https://rickandmortyapi.com/api/episode?page=${presentPage}`;
//         const data = await fetch(url);
//         const JSONdata: TopLevel = await data.json(); // Convert information to JSON language
//         visibleEpisodes = JSONdata.results;
//         entireEpisodes = JSONdata.info.count; // Save total episodes
//         console.log(JSONdata);
//       };

//       // GLOBAL VARIABLES
//       let presentPage = 1;
//       const resultsPerPage = 20; // Load chapters 20 at a time
//       let visibleEpisodes: Result[] = []; // Call the Result interface
//       let entireEpisodes: number;

//       // DOM
//       const showEpisodes = () => {
//         const listEpisodes = document.getElementById('episode-list');
//         const mainContainer = document.getElementById('main-container');
//         const characterContainer = document.getElementById('character-container');
//         const nextButton = document.getElementById('nextButton');

//         // Calculate starting episode number for the current page
//         const firstEpisodeNumber = (presentPage - 1) * resultsPerPage + 1;

//         visibleEpisodes.forEach((result, index) => {
//           const episodeNumber = firstEpisodeNumber + index;

//           const listItem = document.createElement('li'); // Creation of episode list
//           listItem.textContent = `Episode ${episodeNumber}`;
//           listItem.classList.add('list-group-item-action');

//           listItem.addEventListener('click', async () => {
//             mainContainer.innerHTML = '';
//             characterContainer.innerHTML = '';

//             const episodeDescription = document.createElement('div');
//             episodeDescription.innerHTML = `
//               <div class="container-style">
//                 <h2>${result.name}</h2>
//                 <p>Air Date: ${result.air_date}</p>
//                 <p>Episode: ${result.episode}</p>
//               </div>
//             `;

//             for (const characterUrl of result.characters) {
//               const characterResponse = await fetch(characterUrl);
//               const characterData: CharacterData = await characterResponse.json();

//               const characterDetails = document.createElement('div');
//               characterDetails.classList.add('character-details');

//               const characterImage = document.createElement('img');
//               characterImage.src = characterData.image;
//               characterImage.alt = characterData.name;
//               characterImage.classList.add('character-image');

//               // Aquí agregamos el addEventListener al nombre del personaje
//               const characterName = document.createElement('div');
//               characterName.classList.add('character-name');
//               characterName.innerHTML = `
//                 <strong>${characterData.name}</strong><br>
//                 Species: ${characterData.species}<br>
//                 Status: ${characterData.status}
//               `;
//               characterName.addEventListener('click', () => {
//                 showCharacterDetails(characterData, characterContainer);
//               });

//               characterDetails.appendChild(characterName);
//               characterDetails.appendChild(characterImage);
//               characterContainer.appendChild(characterDetails);
//             }

//             mainContainer.appendChild(episodeDescription);
//           });

//           listEpisodes.appendChild(listItem);
//         });

//         // Next button is only activated if there are more episodes to load
//         nextButton.disabled = presentPage * resultsPerPage >= entireEpisodes;
//       };

//       // CALL FUNCTIONS
//       await uploadEpisodes();
//       showEpisodes();

//       // Next button functionality
//       const nextButton = document.getElementById('nextButton');
//       nextButton.addEventListener('click', async () => {
//         if (presentPage * resultsPerPage < entireEpisodes) {
//           presentPage++;
//           await uploadEpisodes();
//           showEpisodes();
//         }
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   // Function to show character details
//   function showCharacterDetails(character: CharacterData, container: HTMLElement) {
//     container.classList.add("character-card")
//     container.innerHTML = `
//       <div class="character-details">
//         <h2>${character.name}</h2>
//         <img src="${character.image}" alt="${character.name}" class="character-image">
//         <p>Species: ${character.species}</p>
//         <p>Status: ${character.status}</p>
//         <p>Gender: ${character.gender}</p>
//         <p>Origin: ${character.origin.name}</p>
//         <p>Location: ${character.location.name}</p>
//       </div>
//     `;
//   }

//   callApi(); // CALL PRINCIPAL FUNCTION
// });

// STEP 2 EXTRA
// IMPORT API'S INTERFACES
import { TopLevel, Result } from "./interfaces/general";

interface CharacterData {
  name: string;
  image: string;
  gender: string;
  status: string;
  species: string;
  origin: { name: string };
  location: { name: string; url: string };
}

document.addEventListener("DOMContentLoaded", function () {
  // PRINCIPAL FUNCTION
  async function callApi() {
    try {
      const uploadEpisodes = async () => {
        const url = `https://rickandmortyapi.com/api/episode?page=${presentPage}`;
        const data = await fetch(url);
        const JSONdata: TopLevel = await data.json(); // Convert information to JSON language
        visibleEpisodes = JSONdata.results;
        entireEpisodes = JSONdata.info.count; // Save total episodes
        console.log(JSONdata);
      };

      // GLOBAL VARIABLES
      let presentPage = 1;
      const resultsPerPage = 20; // Load chapters 20 at a time
      let visibleEpisodes: Result[] = []; // Call the Result interface
      let entireEpisodes: number;

      // DOM
      const showEpisodes = () => {
        const listEpisodes = document.getElementById('episode-list');
        const mainContainer = document.getElementById('main-container');
        const characterContainer = document.getElementById('character-container');
        const nextButton = document.getElementById('nextButton');

        // Calculate starting episode number for the current page
        const firstEpisodeNumber = (presentPage - 1) * resultsPerPage + 1;

        visibleEpisodes.forEach((result, index) => {
          const episodeNumber = firstEpisodeNumber + index;

          const listItem = document.createElement('li'); // Creation of episode list
          listItem.textContent = `Episode ${episodeNumber}`;
          listItem.classList.add('list-group-item-action');

          listItem.addEventListener('click', async () => {
            mainContainer.innerHTML = '';
            characterContainer.innerHTML = '';

            const episodeDescription = document.createElement('div');
            episodeDescription.innerHTML = `
              <div class="container-style">
                <h2>${result.name}</h2>
                <p>Air Date: ${result.air_date}</p>
                <p>Episode: ${result.episode}</p>
              </div>
            `;

            for (const characterUrl of result.characters) {
              const characterResponse = await fetch(characterUrl);
              const characterData: CharacterData = await characterResponse.json();

              const characterDetails = document.createElement('div');
              characterDetails.classList.add('character-details');

              const characterImage = document.createElement('img');
              characterImage.src = characterData.image;
              characterImage.alt = characterData.name;
              characterImage.classList.add('character-image');

              const characterName = document.createElement('div');
              characterName.classList.add('character-name');
              characterName.innerHTML = `
                <strong>${characterData.name}</strong><br>
                Species: ${characterData.species}<br>
                Status: ${characterData.status}
              `;
              characterName.addEventListener('click', () => {
                showCharacterDetails(characterData, characterContainer);
              });

              characterDetails.appendChild(characterName);
              characterDetails.appendChild(characterImage);
              characterContainer.appendChild(characterDetails);
            }

            mainContainer.appendChild(episodeDescription);
          });

          listEpisodes.appendChild(listItem);
        });

        // Next button is only activated if there are more episodes to load
        nextButton.disabled = presentPage * resultsPerPage >= entireEpisodes;
      };

      // Function to show character details
      function showCharacterDetails(character: CharacterData, container: HTMLElement) {
        container.classList.add("character-card");
        container.innerHTML = `
          <div class="character-details">
            <h2>${character.name}</h2>
            <img src="${character.image}" alt="${character.name}" class="character-image">
            <p>Species: ${character.species}</p>
            <p>Status: ${character.status}</p>
            <p>Gender: ${character.gender}</p>
            <p>Origin: ${character.origin.name}</p>
            <p>Location: <a href="#" id="locationLink">${character.location.name}</a></p>
          </div>
        `;

        const locationLink = document.getElementById("locationLink");
        locationLink.addEventListener("click", async () => {
          await loadLocationDetails(character.location.url, container);
        });
      }

      // Function to load location details
      async function loadLocationDetails(locationUrl: string, container: HTMLElement) {
        try {
          const locationResponse = await fetch(locationUrl);
          const locationData = await locationResponse.json();

          container.innerHTML += `
            <div class="location-details">
              <h3>${locationData.name}</h3>
              <p>Type: ${locationData.type}</p>
              <p>Dimension: ${locationData.dimension}</p>
              <p>Residents: ${locationData.residents.length}</p>
            </div>
          `;
        } catch (error) {
          console.log(error);
        }
      }

      // CALL FUNCTIONS
      await uploadEpisodes();
      showEpisodes();

      // Next button functionality
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

  callApi(); // CALL PRINCIPAL FUNCTION
});




