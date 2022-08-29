/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */
import { Card, CardActions, CardContent, IconButton, Typography } from '@mui/material';
import React, { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppDispatch, useAppSelector } from 'app/store/hooks';
import { selectUser } from 'app/store/userSlice';
import themesConfig from '../../../../configs/themesConfig';
import { deletarTarefa, excluirTarefa } from '../../store/TarefasSlice';
import ModalTarefas from '../../ModalTarefas';

interface CardTarefaProps {
  id: string;
  description: string;
  detail: string;
}

const CardTarefa: React.FC<CardTarefaProps> = ({ id, description, detail }) => {
  const dispatch = useAppDispatch();
  const userLogged = useAppSelector(selectUser);
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => setOpen(true);

  const handleEditar = () => {
    handleOpen();
  };
  const handleApagar = () => {
    const { token } = userLogged.data;
    const confirma = confirm(`Deseja apagar o recado ${id}?`);
    if (confirma) {
      dispatch(excluirTarefa({ url: '/task', id, token }));
      dispatch(deletarTarefa(id));
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Card
        sx={{
          width: 320,
          height: 320,
          backgroundColor: themesConfig.default.palette.common.light,
          color: themesConfig.default.palette.secondary.main,
          marginTop: 2,
        }}
        id={id}
      >
        <CardContent>
          <div className="flex flex-row items-center justify-between">
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              color={themesConfig.default.palette.common.black}
            >
              {description}
            </Typography>
          </div>
          <Typography variant="body2" color={themesConfig.default.palette.common.black}>
            {detail}
          </Typography>
        </CardContent>
        <CardActions disableSpacing className="flex items-end">
          <IconButton aria-label="add to favorites" onClick={() => handleEditar()}>
            <EditIcon color="secondary" />
          </IconButton>
          <IconButton aria-label="add to cart" onClick={() => handleApagar()}>
            <DeleteIcon color="error" />
          </IconButton>
        </CardActions>
      </Card>
      <ModalTarefas openModal={open} closeModal={handleClose} tarefaID={id} />
    </>
  );
};
export default CardTarefa;
