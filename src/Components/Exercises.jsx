import React from 'react'
import { P } from '../styles/indexStyles';

const Exercises = ({exercise}) => {
  return (
    <P>
      {exercise.gifUrl && (<img src={exercise.gifUrl} />)}
      {exercise.name}
    </P>
  );
}

export default Exercises