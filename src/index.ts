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
            mainContainer.innerHTML = '';
            characterContainer.innerHTML = ''; 
            
            nextButton.style.display = 'block';
          });
        }

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
              characterName.addEventListener('click', async () => {
                await showCharacterDetails(characterData, characterContainer);
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
        nextButton.style.display = presentPage * resultsPerPage >= entireEpisodes ? 'none' : 'block';
        nextButton.disabled = presentPage * resultsPerPage >= entireEpisodes;
      };

      // Function to show character details
      async function showCharacterDetails(character: CharacterData, container: HTMLElement) {
        container.classList.add("character-card");

        const characterEpisodes = await getCharacterEpisodes(character);

        const episodesList = document.createElement("ul");
        episodesList.id = "episodesList";
        episodesList.classList.add('residents-card');

        characterEpisodes.forEach((episode) => {
          const episodeItem = document.createElement('li');
          episodeItem.textContent = `Episode: ${episode.episode}`;
          episodesList.appendChild(episodeItem);
        });

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
            ${episodesList.outerHTML}
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

          container.innerHTML = '';

          container.innerHTML += `
            <div class="location-details">
              <h3>${locationData.name}</h3>
              <p>Type: ${locationData.type}</p>
              <p>Dimension: ${locationData.dimension}</p>
              <p>Residents:</p>
            </div>
            <ul id="residentsList" class="residents-card"></ul>
          `;

          const residentsList = document.getElementById("residentsList");
          for (const residentUrl of locationData.residents) {
            const residentResponse = await fetch(residentUrl);
            const residentData = await residentResponse.json();

            const residentItem = document.createElement('li');
            residentItem.innerHTML = ` 
              <div class="residents-container">
                <strong>${residentData.name}</strong>
                <img src="${residentData.image}" alt="${residentData.name}" class="resident-image">
              </div>`;
            residentsList.appendChild(residentItem);
          }

        } catch (error) {
          console.log(error);
        }
      }

      // CHARACTER EPISODES

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



