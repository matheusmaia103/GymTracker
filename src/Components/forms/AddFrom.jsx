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
      dispatch({ type: 'ADD_FROM_LIST', payload: { serie: serie, exercise: exercise } });
      setAlert(true)
      console.log(exercise.id);
  };

  useEffect(() => {
    setExercises(
      exercises.filter((exercise) =>
        exercise.name.toLowerCase().includes(query.toLowerCase())
      )
    );
  }, [query]);

  return (
    <form>
      <TextField
        label="Pesquisar"
        defaultValue={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <List
        style={{
          alignItems: 'center',
          overflowY: 'auto',
          overflowX: 'hidden',
          maxHeight: '200px',
          paddingTop: '30px',
        }}
      >
        {getExercises.map((exercise) => (
          <Exercise key={exercise.name}>
            {exercise.gifUrl !== '' ? <img src={exercise.gifUrl} /> : ''}
            <div style={{ width: '90%', alignItems: 'center' }}>
              {exercise.name.lenght > 30 ? (
                <p title={exercise.name}>{exercise.name.slice(0, 30)}...</p>
              ) : (
                <p>{exercise.name}</p>
              )}
            </div>
            <IconButton onClick={(e) => addToSerie(exercise)}>
              <AddRounded />
            </IconButton>
          </Exercise>
        ))}
      </List>
    </form>
  );
};

export default AddFrom;
