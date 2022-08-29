/* eslint-disable camelcase */
import { ITarefa } from 'app/services/api';
import React from 'react';

const Tarefa: React.FC<ITarefa> = ({ id, description, detail }) => {
  return (
    <>
      <h1>Tarefa</h1>
      <p>{id}</p>
      <p>{description}</p>
      <p>{detail}</p>
    </>
  );
};

export default Tarefa;
