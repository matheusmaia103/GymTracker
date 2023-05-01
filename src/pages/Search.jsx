import React, { useState, useEffect, useContext } from 'react';
import FormList from '../Components/FormList';
import { TextField, IconButton, InputAdornment, Button } from '@mui/material';
import { AddRounded, PlusOneRounded, SearchRounded } from '@mui/icons-material';
import Exercises from '../Components/Exercises';
import { H1, H2, H3 } from '../styles/indexStyles';
import { muscle, muscles } from '../data';
import { Form } from '../styles/searchStyles';

const SearchPage = () => {
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(url, options)
      .then((response) => response.json())
      .then((response) => {
        setResponse(response);
      });
  };

  const [name, setName] = useState('triceps');
  const [targetM, setTargetM] = useState('');
  const [bodyPart, setBodyP] = useState('');

  const [response, setResponse] = useState([]);
  const url = `https://exercisedb.p.rapidapi.com/exercises/name/${name}`;
  const options = {
    method: 'GET',
    headers: {
      'content-type': process.env.REACT_APP_CONTENT_TYPE,
      'X-RapidAPI-Key': process.env.REACT_APP_KEY_ENV,
      'X-RapidAPI-Host': process.env.REACT_APP_HOST_ENV,
    },
  };

  useEffect(() => {
    if(targetM === '') return
    fetch(`https://exercisedb.p.rapidapi.com/exercises/target/${targetM.replace(' ', '%20')}`, options)
      .then((response) => response.json())
      .then((response) => {
        setResponse(response);
      });
  }, [targetM]);

  return (
    <>
      <H1>Encontre mais exercícios</H1>
      <br />
      <br />
      <form action="#" onSubmit={handleSubmit}>
        <TextField
          defaultValue={query}
          onChange={handleChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleSubmit}>
                  <SearchRounded />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <br />
        <H2>Por músculos</H2>
        <Form>
          {muscles.map((muscle) => (
            <li>
              <Button
                onClick={() => setTargetM(muscle.target)}
                variant="contained"
                color="primary"
                sx={{ justifyContent: 'space-around' }}
              >
                <img
                  src={muscle.gif}
                  alt="muscle gif"
                  style={{ maxWidth: '60px' }}
                />
                {muscle.name}
              </Button>
            </li>
          ))}
        </Form>
      </form>
      {response.map((exercise) => (
        <Button
          variant="contained"
          color="primary"
          sx={{ pointerEvents: 'none' }}
        >
          <span>
            <img src={exercise.gifUrl} style={{ maxWidth: '70px' }} />
            {exercise.name}
          </span>
          <AddRounded />
        </Button>
      ))}
    </>
  );
};

export default SearchPage;
