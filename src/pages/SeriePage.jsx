import React, { useContext, useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { H1, H2, List, P } from '../styles/indexStyles';
import {
  Button,
  IconButton,
  Modal,
  Box,
  Typography,
  TextField,
  Tabs,
  Tab,
  AppBar,
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
import TitleForm from '../Components/forms/TitleForm';
import AddForm from '../Components/forms/AddForm';
import PropTypes from 'prop-types';
import { Exercise } from '../styles/seriePage';
import AddFrom from '../Components/forms/AddFrom';

export const SeriePage = ({ setAlert }) => {
  //params
  const params = useParams();
  const id = params.serieId;
  const navigate = useNavigate();

  //serie
  const { state, dispatch } = useContext(Store);
  const { exercises, series } = state;
  const [serie, setSerie] = useState(
    series.filter((serie) => (serie.id = id))[0]
  );
  console.clear();
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

  const addToSerie = (name) => {
    alert(name);
  };

  //modal tabs
  const [value, setValue] = useState(0);
  const changeTab = (event, newValue) => setValue(newValue);
  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        sx={{ textTransform: 'none !important' }}
        {...other}
      >
        {value === index && (
          <Box
            sx={{
              p: 3,
              textTransform: 'none !important',
            }}
          >
            {children}
          </Box>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
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
      <Button variant="outlined" color="primary" onClick={openAddModal}>
        <AddRounded /> Adicionar exercício
      </Button>
      <List>
        {serie.exercises.map((exercise) => (
          <Exercises
            exercise={exercise}
            setAlert={setAlert}
            dispatch={dispatch}
            serie={serie}
            closeAddModal={closeAddModal}
          />
        ))}
      </List>

      <ModalWindow isOpen={isOpen} closeModal={closeModal}>
        <TitleForm closeModal={closeModal} serie={serie} setAlert={setAlert} />
      </ModalWindow>

      <ModalWindow isOpen={adding} closeModal={closeAddModal}>
        <Box
          sx={{ borderBottom: 1, borderColor: 'divider' }}
          id="modal-modal-title"
        >
          <Tabs
            value={value}
            onChange={changeTab}
            aria-label="basic tabs example"
            sx={{ width: 'max-content' }}
          >
            <Tab
              label="Novo exercicio"
              sx={{ textTransform: 'none !important' }}
              {...a11yProps(1)}
            />
            <Tab
              label="Adicionar da lista"
              sx={{ textTransform: 'none !important' }}
              {...a11yProps(0)}
            />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <AddForm
            serie={serie}
            setAlert={setAlert}
            closeAddModal={closeAddModal}
          />
        </TabPanel>
        <TabPanel
          value={value}
          index={1}
          sx={{ width: 'max-content' }}
          id="modal-modal-description"
        >
          {exercises.length > 0 ? (
            <AddFrom serie={serie} setAlert={setAlert}/>
          ) : (
            <p style={{ color: '#444444', textAlign: 'center' }}>
              Você ainda não salvou nenhum exercício
            </p>
          )}
        </TabPanel>
      </ModalWindow>
    </>
  );
};
