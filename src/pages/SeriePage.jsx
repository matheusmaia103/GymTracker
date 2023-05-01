import React, { useContext, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { H1, H2, P } from '../styles/indexStyles';
import {
  Button,
  IconButton,
  Modal,
  Box,
  Typography,
  TextField,
} from '@mui/material';
import {
  AddRounded,
  ArrowBackRounded,
  CancelRounded,
  DeleteRounded,
  EditNoteRounded,
  SaveRounded,
} from '@mui/icons-material';
import { Store } from '../Store';
import Serie from '../Components/serie';
import Exercises from '../Components/Exercises';

//modal
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const SeriePage = ({ setAlert }) => {
  //params
  const params = useParams();
  const id = params.serieId;
  const navigate = useNavigate()

  //serie
  const { state, dispatch } = useContext(Store);
  const { series } = state;
  const serie = series.filter((obj) => obj.id == id)[0];
  console.log(serie);

  //modal
  const [isOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  //Edit
  const [title, setTitle] = useState(serie.title);
  const [name, setName] = useState(serie.name);
  const changeTitle = (e) => {
    e.preventDefault();
    setAlert(false);
    closeModal();
    dispatch({
      type: 'EDITAR_SERIE',
      payload: {
        id: serie.id,
        name: name.toUpperCase(),
        title: title,
        exercises: serie.exercises,
      },
    });
    setAlert(true);
  };
  const deleteSerie = () => {
    setAlert(false);
    const sure = window.confirm('Tem certeza?');
    closeModal();
    if (sure) {
      setAlert(true);
      navigate('/');
      dispatch({ type: 'DELETAR_SERIE', payload: serie });
    }
  };

  //add exercise
  const [isAddOpen, setAddOpen] = useState(false)
  const [img, setImg] = useState(
    'https://www.mundoboaforma.com.br/wp-content/uploads/2020/12/supino-inclinado-com-halteres.gif'
  );
  const [exerciseName, setExerciseName] = useState('')
  const [sets, setSets] = useState(3);
  const [reps, setReps] = useState(12);

  const addExercise = () => {
    alert(exerciseName)
  }

  return (
    <>
      <p
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          textAlign: 'center',
        }}
      >
        <Link to={'/'}>
          <IconButton>
            <ArrowBackRounded />
          </IconButton>
        </Link>
        <span style={{ textAlign: 'center', color: 'black', fontSize: '25px' }}>
          {serie.name} - {serie.title}
        </span>
        <IconButton onClick={openModal}>
          <EditNoteRounded />
        </IconButton>
      </p>
      <Button variant="outlined" color="primary">
        <AddRounded />
      </Button>
      <ul>
        {serie.exercises.map((exercise) => (
          <Exercises serie={exercise} />
        ))}
      </ul>

      <Modal
        open={isOpen}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={changeTitle}>
            <TextField
              label="Nome da série"
              defaultValue={name}
              onChange={(e) => setName(e.target.value.toUpperCase())}
              variant="filled"
              color="primary"
              sx={{ textTransform: 'capitalize' }}
            />
            <TextField
              label="Título da série"
              defaultValue={title}
              onChange={(e) => setTitle(e.target.value)}
              variant="filled"
              color="primary"
            />
            <p style={{ display: 'flex', justifyItems: 'end' }}>
              <Button variant="contained" color="primary" type="submit">
                Salvar
              </Button>
              <Button variant="contained" color="info" onClick={closeModal}>
                <CancelRounded /> Cancelar
              </Button>
              <Button variant="contained" color="warning" onClick={deleteSerie}>
                <DeleteRounded /> Excluir série
              </Button>
            </p>
          </form>
        </Box>
      </Modal>

    </>
  );
};
