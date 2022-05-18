// USE WITH FIREBASE AUTH
// import checkLoginStatus from './helpers/auth';
import 'bootstrap'; // import bootstrap elements and js
import '../styles/main.scss';
import axios from 'axios';

const renderToDom = (divId, textToRender) => {
  const selectedElement = document.querySelector(divId);
  selectedElement.innerHTML = textToRender;
};

const getLyrics = () => new Promise((resolve, reject) => {
  axios.get(`https://api.lyrics.ovh/v1/${document.querySelector('#artist').value}/${document.querySelector('#song').value}`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const lyricsOnDom = (artist, song) => {
  getLyrics(artist, song).then((response) => {
    document.querySelector('#app').innerHTML = response.lyrics.replaceAll(
      '\n',
      '<br>'
    );
  });
};

const renderForm = () => {
  const domString = `<form>
          <div class="form-floating mb-3">
            <input id="artist" class="form-control form-control-lg" type="text" placeholder="artist" id="artist" aria-label="artist" required>
            <label class="label-background" for="artist">Artist Name</label>
          </div>
          
          <div class="form-floating mb-3">
            <input id="song" class="form-control form-control-lg" type="text" placeholder="song" id="song" aria-label="song" required>
            <label class="label-background" for="song">Song Title</label>
          </div>
          
  
  <button id="submit" type="submit" class="btn btn-primary">Get Lyrics</button>
</form>`;
  renderToDom('#login-form-container', domString);
};

const buttonOnDom = () => {
  const domString = `<button id="consoleButton" type="button" class="btn btn-primary"
        style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .75rem;">
  Custom button
</button>`;
  renderToDom('#button-div', domString);
};

const eventListeners = () => {
  document.querySelector('#login-form-container').addEventListener('submit', (e) => {
    e.preventDefault();
    getLyrics();
    lyricsOnDom();
    document.querySelector('#consoleButton').addEventListener('click', () => {
      console.warn();
    });
  });
};

const startApp = () => {
  buttonOnDom();
  renderForm();
  eventListeners();
};

startApp();
