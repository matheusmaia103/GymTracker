import React, { useContext, useState, useRef } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { H1, H2, List, P } from '../styles/indexStyles';
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
import ModalWindow from '../Components/Modal';
import TitleForm from '../Components/TitleForm';
import AddForm from '../Components/AddForm';


export const SeriePage = ({ setAlert }) => {
  //params
  const params = useParams();
  const id = params.serieId;
  const navigate = useNavigate();

  //serie
  const { state, dispatch } = useContext(Store);
  const { series } = state;
  const serie = series.filter((obj) => obj.id == id)[0];
  console.log(serie);

  //Title modal
  const [isOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  //Add modal
  const [adding, setAdding] = useState(false);
  const openAddModal = () => setAdding(true);
  const closeAddModal = () => setAdding(false);

  //add exercise
  const [isAddOpen, setAddOpen] = useState(false);
  const [img, setImg] = useState(
    'https://www.mundoboaforma.com.br/wp-content/uploads/2020/12/supino-inclinado-com-halteres.gif'
  );
  const [exerciseName, setExerciseName] = useState('');
  const [sets, setSets] = useState(3);
  const [reps, setReps] = useState(12);

  const addExercise = () => {
    alert(exerciseName);
  };

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
      <Button variant="outlined" color="primary" onClick={openAddModal}>
        <AddRounded />
      </Button>
      <List>
        {serie.exercises.map((exercise) => (
          <Exercises exercise={exercise} />
        ))}
      </List>

      <ModalWindow isOpen={isOpen} closeModal={closeModal}>
        <TitleForm
          closeModal={closeModal}
          serie={serie}
          setAlert={setAlert}
        />
      </ModalWindow>

      <ModalWindow isOpen={adding} closeModal={closeAddModal}>
        <AddForm 
        serie={serie}
        setAlert={setAlert}
        closeAddModal={closeAddModal}
        />
      </ModalWindow>
    </>
  );
};
