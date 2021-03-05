import music from './assets/music.mp3';
import shot from './assets/shot.mp3';
import miss from './assets/miss.mp3';

const gameMusic = new Audio(music);
gameMusic.loop = true;
gameMusic.volume = 0.5;

const sfx = {
  shot: new Audio(shot),
  miss: new Audio(miss),
};

const makeSound = (sound) => {
  sfx[sound].currentTime = 0;
  sfx[sound].play();
};

export {
  gameMusic,
  makeSound,
};
