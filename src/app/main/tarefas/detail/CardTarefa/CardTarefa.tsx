/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */
import {
  Button,
  ButtonGroup,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppDispatch, useAppSelector } from 'app/store/hooks';
import { selectUser } from 'app/store/userSlice';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
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
          /* width: 320,
          height: 320, */
          backgroundColor: themesConfig.default.palette.common.light,
          color: themesConfig.default.palette.secondary.main,
          marginTop: 2,
          maxHeight: 180,
          minHeight: 180,
        }}
        id={id}
        elevation={4}
      >
        <CardActionArea>
          <CardContent sx={{ background: '#EAECF6' }}>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              color={themesConfig.default.palette.common.black}
            >
              <PlaylistAddCheckIcon color="primary" /> {description}
            </Typography>

            <Typography variant="body2" color={themesConfig.default.palette.common.black}>
              {detail}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions disableSpacing className="flex justify-center items-end m-20">
          <ButtonGroup disableElevation variant="contained" color="secondary">
            <Button aria-label="add to favorites" onClick={() => handleEditar()}>
              <EditIcon sx={{ color: 'white', width: 50 }} />
            </Button>
            <Button aria-label="add to cart" onClick={() => handleApagar()}>
              <DeleteIcon sx={{ color: 'white', width: 50 }} />
            </Button>
          </ButtonGroup>
        </CardActions>
      </Card>
      <ModalTarefas openModal={open} closeModal={handleClose} tarefaID={id} />
    </>
  );
};
export default CardTarefa;
