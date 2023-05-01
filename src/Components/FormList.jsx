import React from 'react'
import { Form } from '../styles/searchStyles'
import SearchTool from './SearchTool';
import { H1 } from '../styles/indexStyles';

const FormList = ({ title, setTargetM }) => {
  const muscle = [
    {
      name: 'bíceps',
      target: 'biceps',
      gif: 'http://d205bpvrqc9yn1.cloudfront.net/1648.gif',
    },
    {
      name: 'tríceps',
      target: 'triceps',
      gif: 'http://d205bpvrqc9yn1.cloudfront.net/0241.gif',
    },
    {
      name: 'peito',
      target: 'pectorals',
      gif: 'http://d205bpvrqc9yn1.cloudfront.net/0314.gif',
    },
    {
      name: 'costas (superior)',
      target: 'back',
      gif: 'http://d205bpvrqc9yn1.cloudfront.net/1317.gif',
    },
    {
      name: 'pernas (superior)',
      target: 'upper legs',
      gif: 'http://d205bpvrqc9yn1.cloudfront.net/0032.gif',
    },
    {
      name: 'pernas (inferior)',
      target: 'lower legs',
      gif: 'http://d205bpvrqc9yn1.cloudfront.net/3241.gif',
    },
    {
      name: 'glúteos',
      target: 'glute',
      gif: 'http://d205bpvrqc9yn1.cloudfront.net/0032.gif',
    },
  ];

  return (
    <Form>
      {muscle.map((target) => (
        <SearchTool data={target} setTargetM={setTargetM} />
      ))}
    </Form>
  );
};

export default FormList