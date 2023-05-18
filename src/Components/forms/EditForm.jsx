import { Button, InputAdornment, TextField } from '@mui/material';
import React, { useState, useContext, useEffect } from 'react';
import { Store } from '../../Store';
import { AddRounded } from '@mui/icons-material';

const EditForm = ({
  serie,
  setOpen,
  setAlert,
  closeAddModal,
  exercise,
  dispatch,
}) => {
  const [img, setImg] = useState(exercise.gifUrl);
  const [name, setName] = useState(exercise.name);
  const [sets, setSets] = useState(exercise.sets);
  const [reps, setReps] = useState(exercise.reps);
  const [obs, setObs] = useState(exercise.obs);
  const [order, setOrder] = useState(exercise.order);
  const [weight, setWeight] = useState(exercise.weight);
  const [video, setVideo] = useState(exercise.name);

  const editExercise = (e) => {
    e.preventDefault();
    const editedExercise = {
      gifUrl: img,
      name: name,
      sets: sets,
      reps: reps,
      obs: obs,
      video: video,
      id: exercise.id,
      weight: weight,
      order: order,
    };
    closeAddModal();
    dispatch({
      type: 'EDIT_EXERCISE',
      payload: { serie: serie, exercise: editedExercise },
    });
    setOpen(false);
    setAlert(true);
  };

  return (
    <form
      onSubmit={editExercise}
      style={{
        width: 'max-content',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {img !== '' ? (
        <img
          src={img}
          alt="Imagem do exercício"
          style={{
            maxWidth: '120px',
            borderRadius: '5px',
            marginBottom: '12px',
          }}
        />
      ) : (
        ''
      )}
      <TextField
        label="nome do exercício"
        defaultValue={name}
        required
        onChange={(e) => setName(e.target.value)}
      />
      <span
        style={{
          display: 'flex',
          width: '270px',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <TextField
          label="sets"
          defaultValue={sets}
          type="number"
          required
          onChange={(e) => setSets(e.target.value)}
          style={{ maxWidth: '70px' }}
        />
        <TextField
          label="reps"
          defaultValue={reps}
          type="number"
          required
          onChange={(e) => setReps(e.target.value)}
          style={{ maxWidth: '70px' }}
        />
        <TextField
          label="Peso"
          defaultValue={weight}
          type="number"
          step="0.01"
          onChange={(e) => setWeight(e.target.value)}
          inputProps={{
            step: '0.25'
          }}
          InputProps={{
            endAdornment: <InputAdornment position="end">Kg</InputAdornment>,
          }}
          style={{ maxWidth: '120px' }}
        />
      </span>
      <TextField
        label="imagem ilustrativa"
        defaultValue={img}
        type="url"
        onChange={(e) => setImg(e.target.value)}
        helperText="link de uma imagem para ilustrar"
      />
      <TextField
        label="Observação"
        defaultValue={obs}
        type="text"
        onChange={(e) => setObs(e.target.value)}
        helperText="Informações adicionais"
      />
      <div style={{ display: 'inline', width: '100%' }}>
        <Button variant="contained" color="primary" type="submit">
          Atualizar
        </Button>
        <Button variant="outlined" color="secondary" onClick={closeAddModal}>
          Fechar
        </Button>
      </div>
    </form>
  );
};

export default EditForm;
