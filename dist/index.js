// import { TopLevel, Result } from "./interfaces/general";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function callApi() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const uploadEpisodes = () => __awaiter(this, void 0, void 0, function* () {
                const url = `https://rickandmortyapi.com/api/episode?page=${presentPage}`;
                const data = yield fetch(url);
                const JSONdata = yield data.json();
                visibleEpisodes = JSONdata.results;
                entireEpisodes = JSONdata.info.count; // Guarda el total de episodios*/
                console.log(JSONdata);
            });
            let presentPage = 1;
            const resultsPerPage = 20;
            let visibleEpisodes = [];
            let entireEpisodes;
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
                    listItem.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
                        // Limpia el contenido del contenedor principal y del contenedor de personajes
                        mainContainer.innerHTML = '';
                        characterContainer.innerHTML = '';
                        // Agrega detalles del episodio al contenedor principal
                        const episodeDescription = document.createElement('div');
                        episodeDescription.innerHTML = `
            <div class="container-style">
              <h2>${result.name}</h2>
              <p>Air Date: ${result.air_date}</p>
              <p>Episode: ${result.episode}</p>
            </div>
          `;
                        // Obtiene información de los personajes y agrega imágenes y detalles al contenedor de personajes
                        for (const characterUrl of result.characters) {
                            const characterResponse = yield fetch(characterUrl);
                            const characterData = yield characterResponse.json();
                            const characterDetails = document.createElement('div');
                            characterDetails.classList.add('character-details');
                            const characterImage = document.createElement('img');
                            characterImage.src = characterData.image;
                            characterImage.alt = characterData.name;
                            characterImage.classList.add('character-image');
                            characterDetails.innerHTML = ` 
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
                    }));
                    listEpisodes.appendChild(listItem);
                });
                // El botón "Next" solo se activa si hay más episodios por cargar
                nextButton.disabled = presentPage * resultsPerPage >= entireEpisodes;
            };
            yield uploadEpisodes();
            showEpisodes();
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
document.addEventListener("DOMContentLoaded", function () {
    callApi();
});
export {};
