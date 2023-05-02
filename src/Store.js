import { createContext, useReducer } from 'react';
import Cookies from 'js-cookie';

export const Store = createContext();

const initialState = {
  series: Cookies.get('series') ? JSON.parse(Cookies.get('series')) : [],
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
    case 'FECHAR_AVISO':
      return { ...state, dialog: { open: false } };

    case 'APAGAR_COOKIES':
      Cookies.set('series', []);
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
        peso: { msg: 'A definir', current: '', new: '', last: Date.now() },
        weightHistory: [],
        dialog: {
          message: 'Dados excluídos',
          title: 'Feito!',
          severety: 'success',
          open: true,
        },
      };

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

    case 'ADD_EXERCISE':
      const payload = action.payload;
      const stateSeries = state.series;
      const newE = {
        gifUrl: payload.gifUrl,
        name: payload.name,
        sets: payload.sets,
        reps: payload.reps,
        video: payload.video,
        obs: payload.obs,
        order: payload.order,
      };

      const newArrSeries = stateSeries.map((serie) => {
        if (serie.id === payload.id) {
          serie.exercises = [...serie.exercises, newE];

          return serie;
        }
        return serie;
      });

      Cookies.set('series', JSON.stringify(newArrSeries));
      return {
        ...state,
        series: newArrSeries,
        dialog: {
          title: 'Novo exercício adicionado!',
          message: `${newE.title} à serie!`,
          severety: 'success',
        },
      };

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

    default:
      return state;
  }
}

export default function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(Reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{children}</Store.Provider>;
}
