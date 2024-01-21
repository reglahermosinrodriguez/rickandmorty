// // IMPORT API'S INTERFACES
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
document.addEventListener("DOMContentLoaded", function () {
    // PRINCIPAL FUNCTION
    function callApi() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const uploadEpisodes = () => __awaiter(this, void 0, void 0, function* () {
                    const url = `https://rickandmortyapi.com/api/episode?page=${presentPage}`;
                    const data = yield fetch(url);
                    const JSONdata = yield data.json(); // Convert information to JSON language
                    visibleEpisodes = JSONdata.results;
                    entireEpisodes = JSONdata.info.count; // Save total episodes
                    console.log(JSONdata);
                });
                // GLOBAL VARIABLES
                let presentPage = 1;
                const resultsPerPage = 20; // Load chapters 20 at a time
                let visibleEpisodes = []; // Call the Result interface
                let entireEpisodes;
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
                        listItem.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
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
                                const characterResponse = yield fetch(characterUrl);
                                const characterData = yield characterResponse.json();
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
                        }));
                        listEpisodes.appendChild(listItem);
                    });
                    // Next button is only activated if there are more episodes to load
                    nextButton.disabled = presentPage * resultsPerPage >= entireEpisodes;
                };
                // Function to show character details
                function showCharacterDetails(character, container) {
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
                    locationLink.addEventListener("click", () => __awaiter(this, void 0, void 0, function* () {
                        yield loadLocationDetails(character.location.url, container);
                    }));
                }
                // Function to load location details
                function loadLocationDetails(locationUrl, container) {
                    return __awaiter(this, void 0, void 0, function* () {
                        try {
                            const locationResponse = yield fetch(locationUrl);
                            const locationData = yield locationResponse.json();
                            container.innerHTML += `
            <div class="location-details">
              <h3>${locationData.name}</h3>
              <p>Type: ${locationData.type}</p>
              <p>Dimension: ${locationData.dimension}</p>
              <p>Residents: ${locationData.residents.length}</p>
            </div>
          `;
                        }
                        catch (error) {
                            console.log(error);
                        }
                    });
                }
                // CALL FUNCTIONS
                yield uploadEpisodes();
                showEpisodes();
                // Next button functionality
                const nextButton = document.getElementById('nextButton');
                nextButton.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
                    if (presentPage * resultsPerPage < entireEpisodes) {
                        presentPage++;
                        yield uploadEpisodes();
                        showEpisodes();
                    }
                }));
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    callApi(); // CALL PRINCIPAL FUNCTION
});
export {};
