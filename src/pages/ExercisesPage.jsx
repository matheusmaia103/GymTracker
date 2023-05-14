import { useState, useContext, useEffect } from 'react';
import { Store } from '../Store';
import { Exercise } from '../styles/seriePage';
import ThreeDotsMenu from '../Components/ThreeDotsMenu';
import { H1, List } from '../styles/indexStyles';
import { IconButton, InputAdornment, MenuItem, TextField } from '@mui/material';
import { ClearAllRounded, ClearRounded } from '@mui/icons-material';

const ExercisesPage = () => {
  const { state, dispatch } = useContext(Store);
  const { exercises } = state;
  const [getExercises, setExercises] = useState(exercises);
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (query === '') return;
    if (query === ' ') return;
    setExercises(exercises.filter((exercise) => exercise.name.includes(query)));
    console.log(getExercises);
  }, [query]);

  //menu
  const [anchorEl, setAnchorEl] = useState(false);
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <H1>Seus Exercícios</H1>

      <br />
      <br />
      {exercises.length === 0 ? (
        <>
          <p 
          style={{width: '100%', textAlign: 'center', color: '#252525eb'}}
          >Quando você adicionar exercícios, eles apareceram aqui</p>
        </>
      ) : (
        <>
          <TextField
            label="Pesquisar exercício"
            defaultValue={query}
            onChange={(e) => setQuery(e.target.value)}
            sx={{ alignSelf: 'start' }}
          />
          <List>
            {getExercises.map((exercise) => (
              <Exercise>
                <img src={exercise.gifUrl} />
                <div style={{ width: '90%', alignItems: 'center' }}>
                  <p>{exercise.name}</p>
                </div>
                <ThreeDotsMenu
                  handleClose={handleClose}
                  anchorEl={anchorEl}
                  setAnchorEl={setAnchorEl}
                >
                  <MenuItem>adicionar</MenuItem>
                </ThreeDotsMenu>
              </Exercise>
            ))}
          </List>
        </>
      )}
    </>
  );
};

export default ExercisesPage;
