import { createContext, useReducer } from 'react';
import Cookies from 'js-cookie';

export const Store = createContext();

const initialState = {
  series: Cookies.get('series') ? JSON.parse(Cookies.get('series')) : [],
  exercises: Cookies.get('exercises')
    ? JSON.parse(Cookies.get('exercises'))
    : [],
  peso: Cookies.get('peso')
    ? JSON.parse(Cookies.get('peso'))
    : { msg: 'A definir', current: '', new: '', last: Date.now() },
  weightHistory: Cookies.get('weightHistory')
    ? JSON.parse(Cookies.get('weightHistory'))
    : [],
  dialog: {
    message: '',
    title: '',
    open: false,
    severety: 'success',
  },
};

function Reducer(state, action) {
  switch (action.type) {
    case 'NOVA_SERIE':
      const newSerie = action.payload;
      if (newSerie.title === '') {
        newSerie.title = 'Nova série';
      }

      const seriesEditadas = [...state.series, newSerie];

      Cookies.set('series', JSON.stringify(seriesEditadas));

      return {
        ...state,
        series: seriesEditadas,
        dialog: {
          title: 'Sucesso',
          message: 'Nova série adicionada',
          severety: 'success',
          open: true,
        },
      };
      break;

    case 'FECHAR_AVISO':
      return { ...state, dialog: { open: false } };

      break;

    case 'APAGAR_COOKIES':
      Cookies.set('series', []);
      Cookies.set('exercises', []);
      Cookies.set(
        'peso',
        JSON.stringify({
          msg: 'A definir',
          current: '',
          new: '',
          last: Date.now(),
        })
      );
      Cookies.set('weightHistory', []);

      return {
        ...state,
        series: [],
        exercises: [],
        peso: { msg: 'A definir', current: '', new: '', last: Date.now() },
        weightHistory: [],
        dialog: {
          message: 'Dados excluídos',
          title: 'Feito!',
          severety: 'success',
          open: true,
        },
      };

      break;

    case 'UPDATE_PESO':
      const novoPeso = parseFloat(action.payload);
      const peso = state.peso.new;
      const current = parseFloat(peso);
      const date = Date.now();
      let time = date - parseInt(peso.last);
      let amount;

      if (current > novoPeso) {
        amount = current - novoPeso;
      }
      if (current < novoPeso) {
        amount = novoPeso - current;
      }
      amount = parseFloat(amount).toFixed(2);
      time = time / 86400000;
      if (novoPeso === peso) return;

      let msg = `${peso > novoPeso ? 'Emagreceu' : 'Engordou'} ${
        peso > novoPeso ? peso - novoPeso : novoPeso - peso
      }kg em ${time > 1 ? `${time} dias` : 'em menos de um dia'}`;

      if (isNaN(current)) {
        msg = 'Peso definido!';
      }

      const objPeso = {
        current: current,
        new: novoPeso,
        msg: msg,
        last: date,
      };

      const history = state.weightHistory;
      const change = {
        wheight: novoPeso,
        time: date,
        amount: amount,
        msg: msg,
      };

      Cookies.set('peso', JSON.stringify(objPeso));
      Cookies.set('weightHistory', JSON.stringify([...history, change]));
      return {
        ...state,
        peso: objPeso,
        weightHistory: [...history, change],
        dialog: {
          message: msg,
          title: 'Feito!',
          severety: 'success',
          open: true,
        },
      };
      break;

    case 'ADD_EXERCISE':
      const payload = action.payload;
      const stateSeries = state.series;
      const newE = {
        gifUrl: payload.gifUrl,
        name: payload.name,
        sets: payload.sets,
        reps: payload.reps,
        weight: payload.weight,
        video: payload.video,
        obs: payload.obs,
        order: payload.order,
        id: Math.floor(Math.random() * 7000),
      };

      const newArrSeries = stateSeries.map((serie) => {
        if (serie.id === payload.serieId) {
          serie.exercises = [...serie.exercises, newE];
          return serie;
        }
        return serie;
      });

      Cookies.set('series', JSON.stringify(newArrSeries));
      Cookies.set('exercises', JSON.stringify([...state.exercises, newE]));
      return {
        ...state,
        exercises: [...state.exercises, newE],
        series: newArrSeries,
        dialog: {
          title: 'Novo exercício adicionado!',
          message: `${newE.title} à serie!`,
          severety: 'success',
        },
      };
      break;

    case 'DELETE_EXERCISE':
      const payloadDelete = action.payload;
      const serieId = payloadDelete.serieId;
      const serieName = payloadDelete.serieName;
      const exerciseToDelete = payloadDelete.exercise;

      const arrDelete = state.series;
      const newArrayDelete = arrDelete.map((obj) => {
        if (obj.id === serieId) {
          obj.exercises = obj.exercises.filter(
            (exercise) => exercise.id !== exerciseToDelete.id
          );
          return obj;
        }
        return obj;
      });

      Cookies.set('series', JSON.stringify(newArrayDelete));

      return {
        ...state,
        series: newArrayDelete,
        dialog: {
          title: 'Feito!',
          message: `O exercício ${payloadDelete.exercise.name} foi excluído da série ${serieName}!`,
        },
      };

      break;

    case 'EDIT_EXERCISE':
      const editPayload = action.payload;
      const idToEdit = editPayload.exercise.id;
      const serieToEdit = editPayload.serie.id;
      const exercisesInSerie = editPayload.serie.exercises.map((exercise) => {
        if (exercise.id === idToEdit) return editPayload.exercise;
        return exercise;
      });

      const editedSerie = state.series.filter(
        (serie) => serie.id === serieToEdit
      );

      const editedExerciseList = state.exercises.map((exercise) => {
        if (exercise.id === idToEdit) {
          return editPayload.exercise;
        }
        return exercise;
      });

      const newEditArr = state.series.map((serie) => {
        if (serie.id === serieToEdit)
          return { ...serie, exercises: exercisesInSerie };
        return serie;
      });

      Cookies.set('series', JSON.stringify(newEditArr));
      Cookies.set('exercises', JSON.stringify(editedExerciseList));

      return {
        ...state,
        series: newEditArr,
        exercises: editedExerciseList,
        dialog: {
          title: 'Exercício editado',
          msg: 'Mudança feita!',
          severety: 'success',
        },
      };

      break;
    case 'EDITAR_SERIE':
      const edited = action.payload;
      const series = state.series;
      const editedSeries = series.map((serie) => {
        if (serie.id == edited.id) {
          serie.name = edited.name;
          serie.title = edited.title;
          return serie;
        }
        return serie;
      });

      Cookies.set('series', JSON.stringify(editedSeries));

      return {
        ...state,
        series: editedSeries,
        dialog: {
          message: `A série ${edited.name} foi editada: ${edited.title}`,
          title: 'Feito!',
          open: true,
        },
      };
      break;

    case 'DELETAR_SERIE':
      const serie = action.payload;
      const seriesArr = state.series;
      const newArr = seriesArr.filter((arr) => arr.id !== serie.id);

      Cookies.set('series', JSON.stringify(newArr));

      return {
        ...state,
        series: newArr,
        dialog: {
          message: `A série ${serie.name}: ${serie.title} foi excluída!`,
          title: 'Excluída!',
          open: true,
        },
      };

      break;

    default:
      return state;
  }
}

export default function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(Reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{children}</Store.Provider>;
}
