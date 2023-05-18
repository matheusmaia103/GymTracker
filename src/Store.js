import { createContext, useReducer } from 'react';
import Cookies from 'js-cookie';

export const Store = createContext();

const initialState = {
  series: localStorage.getItem('series')
    ? JSON.parse(localStorage.getItem('series'))
    : [],
  exercises: localStorage.getItem('exercises')
    ? JSON.parse(localStorage.getItem('exercises'))
    : [],
  peso: localStorage.getItem('peso')
    ? JSON.parse(localStorage.getItem('peso'))
    : { msg: 'A definir', current: '', new: '', last: Date.now() },
  weightHistory: localStorage.getItem('weightHistory')
    ? JSON.parse(localStorage.getItem('weightHistory'))
    : [],
  dialog: {
    message: '',
    title: '',
    open: false,
    severety: 'success',
  },
  profile: localStorage.getItem('profile')
    ? JSON.parse(localStorage.getItem('profile'))
    : { name: '', age: '', sex: '', weight: '', IMC: '' },
};

function Reducer(state, action) {
  switch (action.type) {
    case 'NOVA_SERIE':
      const newSerie = action.payload;
      if (newSerie.title === '') {
        newSerie.title = 'Nova série';
      }

      const seriesEditadas = [...state.series, newSerie];

      localStorage.setItem('series', JSON.stringify(seriesEditadas));

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
      localStorage.setItem('series', []);

      return {
        ...state,
        series: [],
        dialog: {
          message: 'Séries excluídas',
          title: 'Feito!',
          severety: 'success',
          open: true,
        },
      };

      break;

    case 'UPDATE_PESO':
      const novoPeso = parseFloat(action.payload);
      const peso = state.profile.weight;
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

      const profile = {
        ...state.profile,
        weight: action.payload,
      };

      const history = state.weightHistory;
      const change = {
        wheight: novoPeso,
        time: date,
        amount: amount,
        msg: msg,
      };

      localStorage.setItem('profile', JSON.stringify(profile));
      localStorage.setItem(
        'weightHistory',
        JSON.stringify([...history, change])
      );
      return {
        ...state,
        weightHistory: [...history, change],
        profile: profile,
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
      let serieNameE;

      const newArrSeries = stateSeries.map((serie) => {
        if (serie.id == payload.serieId) {
          serie.exercises = [...serie.exercises, newE];
          serieNameE = serie.name;
          return serie;
        }
        return serie;
      });

      localStorage.setItem('series', JSON.stringify(newArrSeries));
      localStorage.setItem(
        'exercises',
        JSON.stringify([...state.exercises, newE])
      );
      return {
        ...state,
        exercises: [...state.exercises, newE],
        series: newArrSeries,
        dialog: {
          title: 'Novo exercício adicionado!',
          message: `${newE.name} à serie ${serieNameE}!`,
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
        if (obj.id == serieId) {
          obj.exercises = obj.exercises.filter(
            (exercise) => exercise.id !== exerciseToDelete.id
          );
          return obj;
        }
        return obj;
      });

      localStorage.setItem('series', JSON.stringify(newArrayDelete));

      return {
        ...state,
        series: newArrayDelete,
        dialog: {
          title: 'Feito!',
          message: `O exercício ${payloadDelete.exercise.name} foi excluído da série ${serieName}!`,
        },
      };

      break;

    case 'ADD_FROM_LIST':
      const exerciseToInclude = action.payload.exercise;

      const serieObj = action.payload.serie;

      const newArrSeriesToAdd = state.series.map((serie) => {
        if (serie.id == serieObj.id) {
          serieObj.exercises = [...serieObj.exercises, exerciseToInclude];
        }
        return serie;
      });

      localStorage.setItem('series', JSON.stringify(newArrSeriesToAdd));
      return {
        ...state,
        serie: newArrSeriesToAdd,
        dialog: {
          title: 'Exercício adicionado da lista',
          message: `${exerciseToInclude.name} foi adicionado à serie ${serieObj.name}`,
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
        (serie) => serie.id == serieToEdit
      );

      const editedExerciseList = state.exercises.map((exercise) => {
        if (exercise.id === idToEdit) {
          return editPayload.exercise;
        }
        return exercise;
      });

      const newEditArr = state.series.map((serie) => {
        if (serie.id === serieToEdit) serie.exercises = exercisesInSerie;
        return serie;
      });

      localStorage.setItem('series', JSON.stringify(newEditArr));
      localStorage.setItem('exercises', JSON.stringify(editedExerciseList));

      return {
        ...state,
        series: newEditArr,
        exercises: editedExerciseList,
        dialog: {
          title: 'Exercício editado',
          message: 'Mudança feita!',
          severety: 'success',
        },
      };

      break;

    case 'ADD_TO_LIST':
      localStorage.setItem(
        'exercises',
        JSON.stringify([...state.exercises, action.payload.exercise])
      );

      return {
        ...state,
        exercises: [...state.exercises, action.payload.exercise],
        dialog: {
          title: 'Feito!',
          message: `${action.payload.exercise.name} foi adcionado à sua lista`,
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

      localStorage.setItem('series', JSON.stringify(editedSeries));

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

      localStorage.setItem('series', JSON.stringify(newArr));

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

    case 'SAVE_PROFILE':
      localStorage.setItem('profile', JSON.stringify(action.payload));
      return {
        ...state,
        profile: action.payload,
        dialog: {
          title: 'Feito!',
          message: `Seu perfil foi editado!`,
        },
      };

    default:
      return state;
  }
}

export default function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(Reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{children}</Store.Provider>;
}
