import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { PLAYERS } from '../../gameLogic/constants';

export default function FirstMoveChoise({ onChange }) {
  const [value, setValue] = useState(`${PLAYERS.player1}`);
  const handleChange = ({ target }) => {
    setValue(target.value);
    onChange(Number(target.value));
  };
  return (
    <FormControl component="fieldset">
      <Typography>first move</Typography>
      <RadioGroup row name="firstmove" value={value} onChange={handleChange}>
        <FormControlLabel
          value={`${PLAYERS.player1}`}
          control={<Radio />}
          label="You"
        />
        <FormControlLabel
          value={`${PLAYERS.player2}`}
          control={<Radio />}
          label="Bot"
        />
      </RadioGroup>
    </FormControl>
  );
}
