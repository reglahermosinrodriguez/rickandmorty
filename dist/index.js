// // document.addEventListener('DOMContentLoaded', function () {
// //   const episodeList = document.querySelector('.list-group');
// //   const mainContainer = document.getElementById('main-container');
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function displayInfo() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield fetch("https://rickandmortyapi.com/api/episode");
            const JSONdata = yield data.json();
            console.log(JSONdata);
        }
        catch (error) {
        }
    });
}
displayInfo();
const episodeList = document.getElementById('episode-list');
JSONdata.forEach(episode);
{
    const episodeList = `
  <ul>
  <li>${api.episode}</li>
  </ul>
  `;
}
export {};
