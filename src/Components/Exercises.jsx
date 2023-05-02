import React, {useState} from 'react'
import { P } from '../styles/indexStyles';
import { Exercise } from '../styles/seriePage';
import { IconButton, TextField } from '@mui/material';
import { VideoLibraryRounded, YoutubeSearchedForRounded } from '@mui/icons-material';

const Exercises = ({exercise}) => {
  if(exercise.video === ''){
    exercise.video =
      'https://www.youtube.com/results?search_query='+exercise.name.replace(' ', '+');
  }

  const [sets, setSets] = useState(exercise.sets);
  const [reps, setReps] = useState(exercise.reps);
  return (
    <Exercise>
      <p>
        <div>
          {exercise.img != '' ? <img src={exercise.gifUrl} alt="" /> : ''}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-evenly',
              alignItems: 'center',
            }}
          >
            <p>{exercise.name}</p>
            <p
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}
            >
              <TextField
                defaultValue={sets}
                onChange={(e) => setSets(e.target.value)}
                label="Sets"
                variant="filled"
                color="secondary"
                size="small"
                sx={{ maxWidth: '60px', textAlign: 'right' }}
              />
              x
              <TextField
                defaultValue={reps}
                onChange={(e) => setReps(e.target.value)}
                label="Reps"
                variant="filled"
                color="secondary"
                size="small"
                sx={{ maxWidth: '70px' }}
              />
            </p>
          </div>
        </div>
        <div></div>
        {/*
        <div>
          <a href={exercise.video} target="_blank" rel='noferrer'>
            <IconButton>
              <VideoLibraryRounded />
            </IconButton>
          </a>
        </div>
            */}
      </p>
      {exercise.obs != '' ? <p>{exercise.obs}</p> : ''}
    </Exercise>
  );
}

export default Exercises