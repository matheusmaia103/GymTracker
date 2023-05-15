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
  IconButton,
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




function App() {
  //contexts
  const { state, dispatch } = useContext(Store);
  const { series, peso, dialog } = state;
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
          </ul>
        </Nav>
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
