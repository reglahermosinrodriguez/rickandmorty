var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// DOM
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
                        listItem.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
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
                                characterName.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
                                    yield showCharacterDetails(characterData, characterContainer);
                                }));
                                characterDetails.appendChild(characterName);
                                characterDetails.appendChild(characterImage);
                                characterContainer.appendChild(characterDetails);
                            }
                            if (mainContainer) {
                                mainContainer.appendChild(episodeDescription);
                            }
                        }));
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
                function showCharacterDetails(character, container) {
                    return __awaiter(this, void 0, void 0, function* () {
                        container.classList.add("character-card");
                        const characterEpisodes = yield getCharacterEpisodes(character);
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
                            locationLink.addEventListener("click", () => __awaiter(this, void 0, void 0, function* () {
                                yield loadLocationDetails(character.location.url, container);
                            }));
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
                    });
                }
                // FUNCTION TO LOAD LOCATION DETAILS
                function loadLocationDetails(locationUrl, container) {
                    return __awaiter(this, void 0, void 0, function* () {
                        try {
                            const locationResponse = yield fetch(locationUrl);
                            const locationData = yield locationResponse.json();
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
                                    const residentResponse = yield fetch(residentUrl);
                                    const residentData = yield residentResponse.json();
                                    const residentItem = document.createElement('li');
                                    residentItem.innerHTML = ` <div class="residents-container">
                <strong>${residentData.name}</strong>
                <img src="${residentData.image}" alt="${residentData.name}" class="resident-image">
              </div>`;
                                    residentsList.appendChild(residentItem);
                                }
                            }
                        }
                        catch (error) {
                            console.log(error);
                        }
                    });
                }
                // FUNCTION TO GET CHARACTER EPISODES
                function getCharacterEpisodes(character) {
                    return __awaiter(this, void 0, void 0, function* () {
                        const episodes = [];
                        for (const episodeUrl of character.episode) {
                            const episodeResponse = yield fetch(episodeUrl);
                            const episodeData = yield episodeResponse.json();
                            episodes.push(episodeData);
                        }
                        return episodes;
                    });
                }
                // CALL FUNCTIONS
                yield uploadEpisodes();
                showEpisodes();
                // NEXT BUTTON FUNCTIONALITY
                const nextButton = document.getElementById('nextButton');
                if (nextButton) {
                    nextButton.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
                        if (presentPage * resultsPerPage < entireEpisodes) {
                            presentPage++;
                            yield uploadEpisodes();
                            showEpisodes();
                        }
                    }));
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    // CALL PRINCIPAL FUNCTION
    callApi();
});
export {};
