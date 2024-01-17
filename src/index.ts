import { TopLevel, Result } from "./interfaces/general";

// Enum para las propiedades del personaje
enum CharacterProperties {
  Name = 'name',
  Gender = 'gender',
  Status = 'status',
  Species = 'species',
  Location = 'location',
}

// Función para mostrar la pantalla de detalles del personaje
function showCharacterDetails(characterData: any) {
  // Oculta el contenedor de personajes
  document.getElementById('character-container')!.style.display = 'none';

  // Muestra el contenedor de detalles del personaje
  const characterDetailContainer = document.getElementById('character-detail-container')!;
  characterDetailContainer.style.display = 'block';
  characterDetailContainer.innerHTML = `
    <h2>${characterData[CharacterProperties.Name]}</h2>
    <img src="${characterData.image}" alt="${characterData[CharacterProperties.Name]}">
    <p>${CharacterProperties.Gender}: ${characterData[CharacterProperties.Gender]}</p>
    <p>${CharacterProperties.Status}: ${characterData[CharacterProperties.Status]}</p>
    <p>${CharacterProperties.Species}: ${characterData[CharacterProperties.Species]}</p>
    <h3>Location:</h3>
    <p>${CharacterProperties.Location}: ${characterData[CharacterProperties.Location].name}</p>
  `;
}

async function displayInfo() {
  try {
    let totalEpisodes: Result[] = [];
    let nextLink = "https://rickandmortyapi.com/api/episode";

    // Realiza solicitudes hasta que no haya más enlaces 'next'
    while (nextLink) {
      const data = await fetch(nextLink);
      const JSONdata: TopLevel = await data.json();
      const episodes = JSONdata.results;

      // Agrega los episodios al array totalEpisodes
      totalEpisodes = totalEpisodes.concat(episodes);

      // Actualiza nextLink con el enlace proporcionado en 'next'
      nextLink = JSONdata.info.next;
    }

    const listaEpisodios = document.getElementById('list-episode')!;
    const totalEpisodesElement = document.getElementById('total-episodes')!;
    const mainContainer = document.getElementById('container')!;
    const characterContainer = document.getElementById('character-container')!;
    const characterDetailContainer = document.getElementById('character-detail-container')!;

    // Muestra el número total de episodios en el elemento con id 'total-episodes'
    totalEpisodesElement.textContent = `Total Episodes: ${totalEpisodes.length}`;

    totalEpisodes.forEach((result, index) => {
      const listItem = document.createElement('li');
      listItem.textContent = `Episode ${index + 1}`;

      listItem.addEventListener('click', async () => {
        // Oculta el contenedor principal
        mainContainer.style.display = 'none';

        // Muestra el contenedor de personajes
        characterContainer.style.display = 'block';

        // Limpia el contenido del contenedor de personajes
        characterContainer.innerHTML = '';

        // Agrega detalles del episodio al contenedor de personajes
        const episodeDetails = document.createElement('div');
        episodeDetails.innerHTML = `
          <h2>${result.name}</h2>
          <p>Air Date: ${result.air_date}</p>
          <p>Episode: ${result.episode}</p>
       `;
// Obtiene información de los personajes y agrega imágenes y detalles al contenedor de personajes
        for (const characterUrl of result.characters) {
          const characterResponse = await fetch(characterUrl);
          const characterData = await characterResponse.json();

          const characterItem = document.createElement('div');
          characterItem.innerHTML = `
            <h3>${characterData[CharacterProperties.Name]}</h3>
            <img src="${characterData.image}" alt="${characterData[CharacterProperties.Name]}">
            <p>${CharacterProperties.Gender}: ${characterData[CharacterProperties.Gender]}</p>
            <p>${CharacterProperties.Status}: ${characterData[CharacterProperties.Status]}</p>
            <p>${CharacterProperties.Species}: ${characterData[CharacterProperties.Species]}</p>
            <h3>Location:</h3>
            <p>${CharacterProperties.Location}: ${characterData[CharacterProperties.Location].name}</p>
          `;

          characterItem.addEventListener('click', () => {
            // Muestra detalles del personaje cuando se hace clic en el nombre
            showCharacterDetails(characterData);
          });

          characterContainer.appendChild(characterItem);
        }
      });

      // Agrega el elemento de la lista al listado en la barra lateral
      listaEpisodios.appendChild(listItem);
    });

  } catch (error) {
    console.log(error);
  }
}

document.addEventListener("DOMContentLoaded", function() {
  displayInfo();
});