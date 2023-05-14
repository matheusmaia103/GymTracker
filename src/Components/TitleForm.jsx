import { CancelRounded, ClearRounded, DeleteRounded } from '@mui/icons-material';
import { Box, Button, IconButton, Modal, TextField } from '@mui/material';
import React, {useContext, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Store } from '../Store';

const TitleForm = ({serie, setAlert, closeModal}) => {
  const { state, dispatch } = useContext(Store);

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
      },
    });
    setAlert(true);
  };

  //delete
  const navigate = useNavigate()
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
  return (
    <>
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
        <p style={{ display: 'flex', justifyItems: 'end', width: 'max-content' }}>
          <Button variant="contained" color="primary" type="submit">
            Salvar
          </Button>
        <Button variant="contained" color="error" onClick={deleteSerie}>
          <DeleteRounded /> Excluir série
        </Button>
        </p>
      </form>
    </>
  );
};

export default TitleForm;
