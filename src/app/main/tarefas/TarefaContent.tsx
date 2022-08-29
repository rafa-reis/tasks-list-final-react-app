/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'app/store/hooks';
import { ITarefa } from 'app/services/api';
import { selectUser } from 'app/store/userSlice';
import CardTarefa from './detail/CardTarefa/CardTarefa';
import { buscarTarefas, selectAll } from './store/TarefasSlice';

const TarefasContent: React.FC = () => {
  const dispatch = useAppDispatch();
  const tarefasRdx = useAppSelector(selectAll);
  const userLogged = useAppSelector(selectUser);

  const [auxTarefas, setAuxTarefas] = useState<ITarefa[]>([]);

  useEffect(() => {
    const { token } = userLogged.data;
    dispatch(buscarTarefas({ url: '/task/readTasksByUserId', token }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setAuxTarefas(tarefasRdx);
  }, [tarefasRdx]);

  return (
    <>
      <Grid container spacing={2} className="p-20">
        {auxTarefas.map((tarefa: ITarefa) => (
          <Grid
            item
            key={tarefa.id}
            xs={12}
            sm={6}
            md={4}
            lg={4}
            className="flex flex-row items-center justify-center"
          >
            <CardTarefa id={tarefa.id} description={tarefa.description} detail={tarefa.detail} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default TarefasContent;
