import music from '../assets/music.mp3';
import shot from '../assets/shot.mp3';
import miss from '../assets/miss.mp3';

class Sound {
  constructor() {
    this.sfx = {
      shot: new Audio(shot),
      miss: new Audio(miss),
    };
    this.gameMusic = new Audio(music);
    this.gameMusic.loop = true;
    this.gameMusic.volume = 0.5;
    this.sfxVolume = 0.5;
    this.sfxOn = true;
    this.musicOn = false;
  }

  makeSound = (sound) => {
    if (!this.sfxOn) return;
    this.sfx[sound].currentTime = 0;
    this.sfx[sound].volume = this.sfxVolume;
    this.sfx[sound].play();
  }

  playMusic = () => {
    if (!this.musicOn) return;
    this.gameMusic.play();
  }
}

const sound = new Sound();

export default sound;
