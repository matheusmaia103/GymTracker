import { Button, TextField } from '@mui/material'
import React, {useState, useContext} from 'react'
import { Store } from '../Store';
import { AddRounded } from '@mui/icons-material';

const AddForm = ({serie, setAlert, closeAddModal}) => {
    const {state, dispatch} = useContext(Store)

    const [img, setImg] = useState('');
    const [name, setName] = useState('');
    const [sets, setSets] = useState(3);
    const [reps, setReps] = useState(12);
    const [obs, setObs] = useState('');
    const [order, setOrder] = useState(serie.exercises.length)
    const [video, setVideo] = useState('')

    const addNew = (e) => {
        e.preventDefault()
        const newExercise = {
            gifUrl: img,
            name: name,
            sets: sets,
            reps: reps,
            obs: obs,
            video: video,
            id: serie.id,
            order: order,
        }
        closeAddModal()
        dispatch({ type: 'ADD_EXERCISE', payload: newExercise });
    }

  return (
    <form onSubmit={addNew}>
      <TextField
        label="imagem ilustrativa"
        defaultValue={img}
        type='url'
        onChange={(e) => setImg(e.target.value)}
        helperText="link de uma imagem para ilustrar"
      />
      <TextField
        label="nome do exercício"
        defaultValue={name}
        required
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        label="sets"
        defaultValue={sets}
        type="number"
        required
        onChange={(e) => setSets(e.target.value)}
      />
      <TextField
        label="reps"
        defaultValue={reps}
        type="number"
        required
        onChange={(e) => setReps(e.target.value)}
      />
      <TextField
        label="Link para vídeo"
        defaultValue={video}
        onChange={(e) => setVideo(e.target.value)}
        helperText="link para um vídeo no youtube"
      />
      <TextField
        label="Observação"
        defaultValue={obs}
        type="text"
        onChange={(e) => setObs(e.target.value)}
        helperText="Informações adicionais"
      />

      <TextField
        label="Ordem na série"
        defaultValue={order}
        type="number"
        onChange={(e) => setOrder(e.target.value)}
      />
      <Button variant="contained" color="primary" type="submit">
        <AddRounded />
        add
      </Button>
      <Button variant="contained" color="secondary" onClick={closeAddModal}>
        fechar
      </Button>
    </form>
  );
}

export default AddForm
