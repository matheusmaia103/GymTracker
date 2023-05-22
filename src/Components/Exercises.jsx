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

const Exercises = ({
  exercise,
  setAlert,
  dispatch,
  serie,
  closeAddModal,
  setLength,
  length
}) => {
  if (exercise.video === '') {
    exercise.video =
      'https://www.youtube.com/results?search_query=' +
      exercise.name.replace(' ', '+');
  }

  const [getExercise, setExercise] = useState(exercise);
  const [done, setDone] = useState(false);
  const handleDone = (e) => {
    setDone(!done);
    if (done === false) setLength(length - 1);
    if (done === true) setLength(length + 1);
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
      {exercise.gifUrl.length > 10 ? (
        <img src={exercise.gifUrl} alt={exercise.name} />
      ) : (
        ''
      )}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-evenly',
          alignItems: 'left',
          width: '100%',
          marginLeft: '15px',
          maxWidth: '100%',
          wordWrap: 'break-word',
          paddingTop: '10px',
          paddingBottom: '10px',
          overflowWrap: 'anywhere',
        }}
      >
        <p>{exercise.name}</p>
        <p
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            margin: '0',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              minWidth: '50% !important',
              margin: '0',
              width: '50%',
              maxWidth: '100%',
            }}
          >
            {exercise.sets && exercise.reps ? (
              <span className="reps">
                {exercise.sets} x {exercise.reps}
              </span>
            ) : (
              ''
            )}
            {exercise.weight ? (
              <span className="weight">{exercise.weight} Kg</span>
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
        </p>
        <p
          style={{
            marginTop: '5px',
            marginBottom: '5px',
            color: '#5a5959',
            fontWeight: '500',
            width: '100%',
            maxWidth: '100%',
            wordWrap: 'break-word',
          }}
          className="obs"
        >
          {exercise.obs != '' ? exercise.obs : ''}
        </p>
      </div>

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
