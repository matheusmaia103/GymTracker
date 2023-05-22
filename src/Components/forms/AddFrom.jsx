import { useState, useContext, useEffect } from 'react';
import { Exercise } from '../../styles/seriePage';
import { IconButton, List, TextField } from '@mui/material';
import { AddRounded } from '@mui/icons-material';
import { Store } from '../../Store';
import Serie from '../serie';

const AddFrom = ({ serie, setAlert }) => {
  const { state, dispatch } = useContext(Store);
  const { exercises } = state;
  const [getExercises, setExercises] = useState(exercises);
  const [query, setQuery] = useState('');

  const addToSerie = (exercise) => {
    dispatch({
      type: 'ADD_FROM_LIST',
      payload: { serie: serie, exercise: exercise },
    });
    setAlert(true);
    console.log(exercise.id);
  };

  useEffect(() => {
    setExercises(
      exercises.filter((exercise) =>
        exercise.name.toLowerCase().includes(query.toLowerCase())
      )
    );
    console.log(getExercises);
  }, [query]);

  return (
    <form>
      <TextField
        label="Pesquisar"
        defaultValue={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <List
        sx={{
          alignItems: 'center',
          overflowY: 'auto',
          overflowX: 'visible',
          maxHeight: '200px',
          paddingTop: '30px',
          minWidth: '100%',
          width: 'max-content',
          margin: '0'
        }}
      >
        {getExercises.map((exercise) => (
          <p key={exercise.name}
          style={{minWidth: '100%', display: 'flex',}}>
            <div style={{ maxWidth: '100%', width: '100%', display: 'flex', alignItems: 'center', marginRight: '0' }}>
            {exercise.gifUrl !== '' ? (
              <img
                src={exercise.gifUrl}
                style={{
                  maxHeight: '40px',
                  maxWidth: '40px',
                  borderRadius: '20px',
                }}
              />
            ) : (
              ''
            )}
              {exercise.name.length > 14
                ? exercise.name.slice(0, 14) + '...'
                : exercise.name}
            </div>
            <IconButton onClick={(e) => addToSerie(exercise)}>
              <AddRounded />
            </IconButton>
          </p>
        ))}
      </List>
    </form>
  );
};

export default AddFrom;
