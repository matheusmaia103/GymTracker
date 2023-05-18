import React, { useState } from 'react';
import { P } from '../styles/indexStyles';
import { Exercise } from '../styles/seriePage';
import { Checkbox, IconButton, MenuItem, TextField } from '@mui/material';
import {
  CheckBox,
  Delete,
  Edit,
  EditRoadRounded,
  MoreVertRounded,
  VideoLibraryRounded,
  YoutubeSearchedForRounded,
} from '@mui/icons-material';
import ThreeDotsMenu from './ThreeDotsMenu';
import { red } from '@mui/material/colors';
import ModalWindow from './Modal';
import AddForm from './forms/AddForm';
import EditForm from './forms/EditForm';

const Exercises = ({ exercise, setAlert, dispatch, serie, closeAddModal }) => {
  if (exercise.video === '') {
    exercise.video =
      'https://www.youtube.com/results?search_query=' +
      exercise.name.replace(' ', '+');
  }

  const [getExercise, setExercise] = useState(exercise);
  const [done, setDone] = useState(false);
  const handleDone = (e) => {
    setDone(!done);
    console.log(getExercise);
  };

  //menu
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClose = () => {
    setAnchorEl(null);
  };

  //delete exercise
  const deleteExercise = () => {
    const sureDelete = window.confirm(
      `Tem certeza que deseja excluir o exercício ${exercise.name}?`
    );
    handleClose();
    if (sureDelete) {
      console.log(serie);
      dispatch({
        type: 'DELETE_EXERCISE',
        payload: {
          serieId: serie.id,
          serieName: serie.name,
          exercise: exercise,
        },
      });
    }
    setAlert(true);
  };

  //modal edit
  const [isOpen, setOpen] = useState(false);
  const closeModal = () => {
    handleClose();
    setOpen(false);
  };
  const openModal = () => {
    handleClose();
    setOpen(true);
  };

  return (
    <Exercise className="exercise" key={exercise.id}>
      <Checkbox
        checked={done}
        sx={{ width: '48px', height: '48px', alignSelf: 'center' }}
        onClick={handleDone}
      />
      {exercise.gifUrl !== '' ? (
        <img src={exercise.gifUrl} alt={exercise.name} />
      ) : (
        ''
      )}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          width: '90%',
          marginLeft: '6px',
        }}
      >
        <p>{exercise.name}</p>
        <p
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            width: '100% !important',
          }}
        >
          {exercise.sets && exercise.reps ? (
            <span>
              {exercise.sets} x {exercise.reps}
            </span>
          ) : (
            ''
          )}
          {exercise.weight ? <span>{exercise.weight} Kg</span> : ''}
        </p>
        {exercise.obs != '' ? (
          <p
            style={{
              marginTop: '5px',
              marginBottom: '5px',
              marginLeft: '12px',
              color: '#5a5959',
              fontWeight: '500',
            }}
          >
            {exercise.obs}
          </p>
        ) : (
          ''
        )}
      </div>
      <ThreeDotsMenu
        handleClose={handleClose}
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
      >
        <MenuItem onClick={handleClose}>
          <a
            href={exercise.video}
            target="_blank"
            style={{
              display: 'flex',
              alignItems: 'center',
              color: 'unset',
              textDecoration: 'none',
              textTransform: 'none',
            }}
          >
            <VideoLibraryRounded color={red[500]} />
            Ver vídeo demonstrativo
          </a>
        </MenuItem>
        <MenuItem onClick={openModal}>
          <Edit />
          Editar
        </MenuItem>
        <MenuItem onClick={deleteExercise}>
          <Delete />
          Apagar
        </MenuItem>
      </ThreeDotsMenu>

      <ModalWindow isOpen={isOpen} closeModal={closeModal}>
        <EditForm
          serie={serie}
          setAlert={setAlert}
          closeAddModal={closeAddModal}
          exercise={exercise}
          dispatch={dispatch}
          setOpen={setOpen}
        />
      </ModalWindow>
    </Exercise>
  );
};

export default Exercises;
