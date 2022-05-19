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
    document.querySelector('#app').innerHTML = response.lyrics;
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
          
  
  <button id="submit" type="submit" class="btn btn-primary">Find Lyrics</button>
</form>`;
  renderToDom('#form', domString);
};

const eventListeners = () => {
  const form = document.querySelector('#form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    getLyrics();
    lyricsOnDom();
    form.reset();
  });
};

const startApp = () => {
  renderForm();
  eventListeners();
};

startApp();
