// IMPORT API'S INTERFACES
import { TopLevel, Result, CharacterData } from "./interfaces/general";

// DOM
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

// FUNCTION TO DISPLAY EPISODES 
      const showEpisodes = () => {
        const listEpisodes = document.getElementById('episode-list');
        const mainContainer = document.getElementById('main-container');
        const characterContainer = document.getElementById('character-container');
        const nextButton = document.getElementById('nextButton');

// LINK HEADER
      const headerElement = document.getElementById('mainHeader');

      if (headerElement) {
          headerElement.addEventListener('click', () => {

// RETURN INDEX
      const mainContainer = document.getElementById('main-container');
      const characterContainer = document.getElementById('character-container');
        if (mainContainer && characterContainer) {
            mainContainer.innerHTML = '';
            characterContainer.innerHTML = '';
            }

        if (nextButton) {
              nextButton.style.display = 'block';
            }
          });
        }

// CALCULATE STARTING NUMBER FOR THE CURRENT PAGE
      const firstEpisodeNumber = (presentPage - 1) * resultsPerPage + 1;

      visibleEpisodes.forEach((result, index) => {
        const episodeNumber = firstEpisodeNumber + index;

        const listItem = document.createElement('li'); // Creation of episode list
        listItem.textContent = `Episode ${episodeNumber}`;
        listItem.classList.add('list-group-item-action');

        listItem.addEventListener('click', async () => {
          if (mainContainer && characterContainer) {
              mainContainer.innerHTML = '';
              characterContainer.innerHTML = '';
            }

// EPISODE DATA
        const episodeDescription = document.createElement('div');
          episodeDescription.innerHTML = `
            <div class="container-style">
              <h2>${result.name}</h2>
              <p>Air Date: ${result.air_date}</p>
              <p>Episode: ${result.episode}</p>
            </div>
            `;

// CHARACTERS DATA
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
            characterName.addEventListener('click', async () => {
              await showCharacterDetails(characterData, characterContainer);
              });

            characterDetails.appendChild(characterName);
            characterDetails.appendChild(characterImage);
            characterContainer.appendChild(characterDetails);
            }

              if (mainContainer) {
              mainContainer.appendChild(episodeDescription);
            }
          });

              if (listEpisodes) {
            listEpisodes.appendChild(listItem);
          }
        });

// NEXT BUTTON ONLY ACTIVE IF THERE ARE MORE EPISODES TO LOAD
        if (nextButton) {
          nextButton.style.display = presentPage * resultsPerPage >= entireEpisodes ? 'none' : 'block';
          nextButton.disabled = presentPage * resultsPerPage >= entireEpisodes;
        }
      };

// FUNCTION TO SHOW CHARACTER DETAILS
      async function showCharacterDetails(character: CharacterData, container: HTMLElement) {
        container.classList.add("character-card");

        const characterEpisodes = await getCharacterEpisodes(character);

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
          <div class="character-episode">
            <p>Episodes: ${characterEpisodes.length}</p>
            <ul id="episodesList" class=""></ul>
          </div>
        `;

        const locationLink = document.getElementById("locationLink");
        if (locationLink) {
          locationLink.addEventListener("click", async () => {
            await loadLocationDetails(character.location.url, container);
          });
        }

// EPISODE LIST
        const episodesList = document.getElementById("episodesList");
        if (episodesList) {
          episodesList.classList.add('residents-card');

          characterEpisodes.forEach((episode) => {
            const episodeItem = document.createElement('li');
            episodeItem.textContent = `Episode: ${episode.episode}`;
            episodesList.appendChild(episodeItem);
          });
        }
      }

// FUNCTION TO LOAD LOCATION DETAILS
      async function loadLocationDetails(locationUrl: string, container: HTMLElement) {
        try {
          const locationResponse = await fetch(locationUrl);
          const locationData = await locationResponse.json();

          container.innerHTML = '';

          container.innerHTML += `
            <div class="location-details">
              <h3>${locationData.name}</h3>
              <p>Type: ${locationData.type}</p>
              <p>Dimension: ${locationData.dimension}</p>
              <p>Residents:</p></div>
              <ul id="residentsList"></ul>
          `;

// RESIDENTS LOCATION DATA
          const residentsList = document.getElementById("residentsList");
            if (residentsList) {
            residentsList.classList.add('residents-card');

            for (const residentUrl of locationData.residents) {
              const residentResponse = await fetch(residentUrl);
              const residentData = await residentResponse.json();

              const residentItem = document.createElement('li');
              residentItem.innerHTML = ` <div class="residents-container">
                <strong>${residentData.name}</strong>
                <img src="${residentData.image}" alt="${residentData.name}" class="resident-image">
              </div>`;
              residentsList.appendChild(residentItem);
            }
          }
        } catch (error) {
          console.log(error);
        }
      }

// FUNCTION TO GET CHARACTER EPISODES
         async function getCharacterEpisodes(character: CharacterData): Promise<Result[]> {
         const episodes: Result[] = [];
            for (const episodeUrl of character.episode) {
          const episodeResponse = await fetch(episodeUrl);
          const episodeData: Result = await episodeResponse.json();
          episodes.push(episodeData);
        }
            return episodes;
      }

// CALL FUNCTIONS
      await uploadEpisodes();
      showEpisodes();

// NEXT BUTTON FUNCTIONALITY
      const nextButton = document.getElementById('nextButton');
      if (nextButton) {
        nextButton.addEventListener('click', async () => {
          if (presentPage * resultsPerPage < entireEpisodes) {
            presentPage++;
            await uploadEpisodes();
            showEpisodes();
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

// CALL PRINCIPAL FUNCTION
  callApi(); 
});
