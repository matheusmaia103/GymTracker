import { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import logo from './logo.svg';
import Home from './pages/Home';
import SearchPage from './pages/Search';
import './App.css';
import {
  AppBar,
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  InputAdornment,
  Radio,
  RadioGroup,
  Snackbar,
  TextField,
} from '@mui/material';
import {
  Nav,
  Title,
  Body,
  H1,
  H2,
  H3,
  Main,
  List,
  StyledInput,
} from './styles/indexStyles';
import Serie from './Components/serie';
import {
  AddRounded,
  FitnessCenterRounded,
  HomeRounded,
  ListAltRounded,
  OpenInBrowser,
  PersonRounded,
  PlusOneRounded,
  RotateLeftRounded,
  SearchRounded,
} from '@mui/icons-material';

//Alert
import { Alert, AlertTitle } from '@mui/material';

//Context
import Cookies from 'js-cookie';
import { Store } from './Store';
import { SeriePage } from './pages/SeriePage';
import ExercisesPage from './pages/ExercisesPage';
import ModalWindow from './Components/Modal';




function App() {
  //contexts
  const { state, dispatch } = useContext(Store);
  const { series, peso, dialog, profile } = state;
  const date = new Date();
  const { title, message, severity } = dialog;
  const [alert, setAlert] = useState(false);
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlert(false);
  };

  //modal
  const [isOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const [name, setName] = useState(profile.name);
  const [age, setAge] = useState(parseInt(profile.age));
  const [height, setHeight] = useState(parseInt(profile.height));
  const [weight, setWeight] = useState(parseInt(profile.weight));
  const [sex, setSex] = useState(profile.sex);
const submitForm = e => {
  e.preventDefault()
  let imc = weight/(height*height)
  const profile = {name: name, age:age, height:height, sex: sex, weight: weight, IMC: imc}
  console.log(profile);
  dispatch({type: 'SAVE_PROFILE',  payload: profile})
  closeModal()
  setAlert(true)
}


  return (
    <Body>
      <Router>
        <Nav>
          <Title>TechFit</Title>
          <ul>
            <li>
              <Link to="/search">
                <IconButton>
                  <SearchRounded />
                </IconButton>
              </Link>
            </li>
            <li>
              <Link to="/exercises">
                <IconButton>
                  <FitnessCenterRounded />
                </IconButton>
              </Link>
            </li>
            <li>
              <Link to="/">
                <IconButton>
                  <HomeRounded />
                </IconButton>
              </Link>
            </li>
            <li>
              <IconButton onClick={openModal}>
                <PersonRounded />
              </IconButton>
            </li>
          </ul>
        </Nav>
        <ModalWindow isOpen={isOpen} closeModal={closeModal}>
          <form
            onSubmit={submitForm}
            style={{
              maxWidth: '380px'
            }}
          >
            <TextField
              label="Nome"
              defaultValue={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              required
            />
            <p
              style={{
                textAlign: 'center',
                margin: '0',
                display: 'inline-block',
              }}
            >
              <TextField
                label="idade"
                defaultValue={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="20"
                type="number"
                style={{ maxWidth: '100px' }}
                required
              />
              <TextField
                label="altura"
                defaultValue={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="172"
                type="number"
                style={{ maxWidth: '120px' }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">cm</InputAdornment>
                  ),
                }}
                required
              />
              <TextField
                label="Peso"
                defaultValue={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="77.60"
                style={{ maxWidth: '120px' }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">Kg</InputAdornment>
                  ),
                }}
                required
              />
            </p>
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">Sexo</FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue={sex}
                onChange={(e) => setSex(e.target.value)}
                name="radio-buttons-group"
                sx={{ display: 'inline' }}
                required
              >
                <FormControlLabel
                  value="feminino"
                  control={<Radio />}
                  label="feminino"
                />
                <FormControlLabel
                  value="masculino"
                  control={<Radio />}
                  label="masculino"
                />
              </RadioGroup>
            </FormControl>
            <p
              style={{
                textAlign: 'right',
                margin: '0',
                color: 'white !important',
              }}
            >
              <Button
                type="submit"
                variant="contained"
                sx={{ color: 'white !important' }}
              >
                Salvar
              </Button>
            </p>
          </form>
        </ModalWindow>
        <Main>
          <Routes>
            <Route path="/" element={<Home setAlert={setAlert} />} />
            <Route
              path="/search"
              element={<SearchPage setAlert={setAlert} dispatch={dispatch} />}
            />

            <Route
              path="/serie/:serieId"
              element={<SeriePage series={series} setAlert={setAlert} />}
            />
            <Route
              path="/exercises"
              element={<ExercisesPage setAlert={setAlert} />}
            />
          </Routes>
        </Main>

        <Snackbar open={alert} autoHideDuration={4000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={severity}>
            <AlertTitle>{title}</AlertTitle>
            {message}
          </Alert>
        </Snackbar>
      </Router>
    </Body>
  );
}

export default App;
