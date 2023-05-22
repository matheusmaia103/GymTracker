import { Button, TextField } from '@mui/material';
import React, { useState, useContext, useEffect } from 'react';
import { Store } from '../../Store';
import { AddRounded } from '@mui/icons-material';

const AddForm = ({ serie, setAlert, closeAddModal }) => {
  const { state, dispatch } = useContext(Store);

  const [img, setImg] = useState('');
  const [name, setName] = useState('');
  const [sets, setSets] = useState(3);
  const [reps, setReps] = useState(12);
  const [obs, setObs] = useState('');
  const [order, setOrder] = useState(serie.exercises.length);
  const [video, setVideo] = useState('');

  const addNew = (e) => {
    e.preventDefault();
    const newExercise = {
      gifUrl: img.trim(),
      name: name.trim(),
      sets: sets,
      reps: reps,
      obs: obs.trim(),
      video: video,
      id: Math.floor(Math.random() * 7000),
      order: order,
      weight: 5,
      serieId: serie.id,
    };
    closeAddModal();
    dispatch({ type: 'ADD_EXERCISE', payload: newExercise });
    setAlert(true)
  };

  return (
    <form
      onSubmit={addNew}
      style={{
        width: 'max-content',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <img
        src={img}
        onError={(e) => console.log(e)}
        style={{ maxWidth: '110px' }}
      />
      <TextField
        label="imagem ilustrativa"
        defaultValue={img}
        type="url"
        onChange={(e) => setImg(e.target.value)}
        helperText="link de uma imagem para ilustrar"
        autoComplete="off"
      />
      <TextField
        label="nome do exercício"
        defaultValue={name}
        required
        onChange={(e) => setName(e.target.value)}
        autoComplete="off"
      />
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <TextField
          label="sets"
          defaultValue={sets}
          type="number"
          required
          onChange={(e) => setSets(e.target.value)}
          style={{ maxWidth: '110px' }}
        />
        <TextField
          label="reps"
          defaultValue={reps}
          type="number"
          required
          onChange={(e) => setReps(e.target.value)}
          style={{ maxWidth: '110px' }}
        />
      </div>
      <div style={{ display: 'inline', width: '100%' }}>
        <Button variant="contained" color="primary" type="submit">
          <AddRounded />
          Adicionar
        </Button>
        <Button variant="outlined" color="secondary" onClick={closeAddModal}>
          Fechar
        </Button>
      </div>
    </form>
  );
};

export default AddForm;
