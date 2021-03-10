import React, { useEffect, useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import SoundSlider from '../Slider/SoundVolumeSlider';
import sound from '../../utils/sounds';

const VolumeControl = () => {
  const [soundsOn, setSoundsOn] = useState(true);
  const [musicOn, setMusicOn] = useState(false);
  const [soundsVolume, setSoundsVolume] = useState(sound.sfxVolume);
  const [musicVolume, setMusicVolume] = useState(sound.gameMusic.volume);

  useEffect(() => { sound.sfxOn = soundsOn; }, [soundsOn]);
  useEffect(() => {
    sound.musicOn = musicOn;
    if (musicOn) sound.gameMusic.play();
    else sound.gameMusic.pause();
  }, [musicOn]);

  useEffect(() => { sound.sfxVolume = soundsVolume; }, [soundsVolume]);
  useEffect(() => { sound.gameMusic.volume = musicVolume; }, [musicVolume]);

  const soundsButtonClick = () => setSoundsOn((prev) => !prev);
  const musicButtonClick = () => setMusicOn((prev) => !prev);

  const handleSoundsSlider = (newValue) => { setSoundsVolume(newValue); };
  const handleMusicSlider = (newValue) => { setMusicVolume(newValue); };

  return (
    <div>
      <Typography>Sounds: </Typography>
      <Grid container alignItems="center" spacing={2}>
        <Grid item>
          <SoundSlider value={soundsVolume} onChange={handleSoundsSlider} />
        </Grid>
        <Grid item>
          <IconButton onClick={soundsButtonClick}>
            {soundsOn ? <VolumeUpIcon /> : <VolumeOffIcon />}
          </IconButton>
        </Grid>
      </Grid>
      <Typography>Music: </Typography>
      <Grid container alignItems="center" spacing={2}>
        <Grid item>
          <SoundSlider value={musicVolume} onChange={handleMusicSlider} />
        </Grid>
        <Grid item>
          <IconButton onClick={musicButtonClick}>
            {musicOn ? <VolumeUpIcon /> : <VolumeOffIcon />}
          </IconButton>
        </Grid>
      </Grid>
    </div>
  );
};

export default VolumeControl;
