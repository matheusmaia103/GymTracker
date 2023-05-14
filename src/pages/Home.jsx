import { useState, useEffect, useContext } from 'react';
import { Box, Button, IconButton, InputAdornment, Modal, TextField } from '@mui/material';
import { H1, H2, H3, List, StyledInput } from '../styles/indexStyles';
import Serie from '../Components/serie';
import {
  AddRounded,
  ArrowRightRounded,
  CancelRounded,
  DeleteRounded,
  RotateLeftRounded,
} from '@mui/icons-material';

//Alert

//Context
import Cookies from 'js-cookie';
import { Store } from '../Store';
import { Link } from 'react-router-dom';

function Home({ setAlert }) {
  //contexts
  const { state, dispatch } = useContext(Store);
  const { series, peso, weightHistory } = state;
  console.log(weightHistory);
  const date = new Date();
  const [getSeries, setSeries] = useState(series);
  const [getPeso, setPeso] = useState(peso.new);


  let arr = 'a b c d e f g h i j l m n';
  arr = arr.toUpperCase();
  arr = arr.split(' ');
  const addSerie = (e) => {
    e.preventDefault();
    setAlert(false);
    dispatch({
      type: 'NOVA_SERIE',
      payload: { name: name, title: title, exercises: [], id: Date.now() },
    });
    setAlert(true);
    setSeries(series);
    closeModal();
    setTitle('');
    try{
      
    setName(arr[series.length + 1]);
    } catch (e){
      console.log(e);
    }
  };

  const apagarCookies = () => {
    setAlert(false);
    dispatch({ type: 'APAGAR_COOKIES' });
    setSeries(series);
    setPeso(0);
    setAlert(true);
  };

  const handleChangePeso = (e) => {
    setPeso(e.target.value);
    console.log(peso);
  };

  const updatePeso = (e) => {
    e.preventDefault();
    if (peso.new != getPeso) {
      try {
        dispatch({ type: 'UPDATE_PESO', payload: getPeso });
        setAlert(true);
        console.log(weightHistory);
      } catch (error) {
        console.log(error);
      }
    }
  };

  //Create serie
  const [title, setTitle] = useState('');
  const [name, setName] = useState(arr[series.length]);
  //modal
  const [isOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
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

  return (
    <>
      <form onSubmit={updatePeso} style={{width: '100%', textAlign: 'right', color: 'black'}}>
          <TextField
            variant="filled"
            color="secondary"
            defaultValue={getPeso}
            onChange={handleChangePeso}
            onBlur={updatePeso}
            onSubmit={updatePeso}
            label="Peso"
            sx={{
              width: '100px',
            }}
            InputProps={{
              endAdornment: <InputAdornment position='end'>Kg</InputAdornment>
            }}
          />
        <p style={{marginTop: '3px'}}>{peso.msg}</p>
      </form>

      <br />
      <List>
        <H2>
          Séries:
          <IconButton onClick={apagarCookies}>
            <RotateLeftRounded />
          </IconButton>
        </H2>
        {series.map((n) => (
          <Link
            to={`/serie/${n.id}`}
            style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
          >
            <Button
              variant="contained"
              sx={{
                width: '80%',
                borderRadius: '50px',
                display: 'flex',
                justifyContent: 'space-between',
                background: 'white',
              }}
            >
              Série {n.name} - {n.title}
              <ArrowRightRounded />
            </Button>
          </Link>
        ))}
        <Button
          variant="outlined"
          onClick={openModal}
          sx={{
            width: '40%',
            borderRadius: '50px',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <AddRounded />
        </Button>
      </List>

      <Modal
        open={isOpen}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={addSerie}>
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
            </p>
          </form>
        </Box>
      </Modal>
    </>
  );
}

export default Home;
