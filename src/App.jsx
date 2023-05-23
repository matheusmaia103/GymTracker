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
  ArrowForwardRounded,
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
  const [height, setHeight] = useState(profile.height);
  const [weight, setWeight] = useState(profile.weight);
  const [sex, setSex] = useState(profile.sex);
  const [imc, setImc] = useState(profile.imc);
  const [imcTitle, setImcTitle] = useState(profile.imcTitle);
  const submitForm = (e) => {
    setHeight(parseFloat(height).toFixed(2));
    setWeight(parseFloat(weight).toFixed(2));
    e.preventDefault();

    const imcCount = (weight, height) => {
      let altura = parseFloat(height);
      let peso = parseFloat(weight);
      let imc = altura ** 2;
      imc = peso / imc;
      return imc.toFixed(2);
    };

    const imcTest = (imc) => {
      if (imc < 17) {
        return 'Muito abaixo do peso';
      }

      if (imc >= 17 && imc < 18.5) {
        return 'Abaixo do peso';
      }

      if (imc >= 18.5 && imc < 24.9) {
        return 'Peso normal';
      }

      if (imc >= 25 && imc < 29.9) {
        return 'Acima do peso';
      }

      if (imc >= 30 && imc < 34.9) {
        return 'Obesidade I';
      }

      if (imc >= 35 && imc < 39.9) {
        return 'Obesidade II (severa)';
      }

      if (imc >= 40) {
        return 'Obesidade mórbida';
      }
    };

    const idealWeight = (altura, sex) => {
      let idealWeight;
      if (sex === 'masculino') {
        idealWeight = parseFloat(altura) * 72.7;
        idealWeight = idealWeight - 58;
      } else {
        idealWeight = parseFloat(altura) * 62.1;
        idealWeight = idealWeight - 44.7;
      }
      return idealWeight.toFixed(2);
    };

    const profile = {
      name: name,
      age: age,
      height: height,
      sex: sex,
      weight: weight,
    };
    console.log(profile);
    dispatch({ type: 'SAVE_PROFILE', payload: profile });
    closeModal();
    setAlert(true);
  };

  const handleReset = () => {
    const sure = window.confirm(
      `Tem certeza que deseja apagar todos os dados do app?`
    );
    if (sure) {
      dispatch({ type: 'RESET' });
      window.location.reload();
    }
  };

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
              maxWidth: '380px',
              width: 'max-content',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <TextField
              label="Nome"
              defaultValue={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              autoComplete="off"
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
                inputProps={{
                  step: '1',
                }}
                style={{ maxWidth: '100px' }}
                required
              />
              <TextField
                label="altura"
                defaultValue={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="1,72"
                type="number"
                inputProps={{
                  step: '0.01',
                }}
                style={{ maxWidth: '120px' }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">m</InputAdornment>
                  ),
                }}
                required
              />
              <TextField
                label="Peso"
                defaultValue={weight}
                onChange={(e) => setWeight(e.target.value)}
                style={{ maxWidth: '130px' }}
                placeholder="77,60"
                type="number"
                inputProps={{
                  step: '0.01',
                }}
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

            {!isNaN(profile.imc) && profile.imc !== '' ? (
              <>
                <p style={{ display: 'flex', alignItems: 'center' }}>
                  IMC: {profile.imc} <ArrowForwardRounded /> {profile.imcTitle}
                </p>
                <p style={{ display: 'flex', alignItems: 'center' }}>
                  Seu peso ideal <ArrowForwardRounded /> {profile.idealWeight}{' '}
                  kg
                </p>
              </>
            ) : (
              ''
            )}
            <p
              style={{
                textAlign: 'right',
                margin: '0',
                color: 'white !important',
              }}
            >
              <Button
                variant="contained"
                color="error"
                sx={{ color: 'white !important' }}
                onClick={handleReset}
              >
                Resetar app
              </Button>

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
            <Route
              path="/"
              element={
                <Home
                  setAlert={setAlert}
                  weight={weight}
                  setWeight={setWeight}
                />
              }
            />
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
