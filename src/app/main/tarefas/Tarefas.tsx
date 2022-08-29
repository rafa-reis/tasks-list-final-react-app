/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import FusePageCarded from '@fuse/core/FusePageCarded';
import { useThemeMediaQuery } from '@fuse/hooks';
import { Typography } from '@mui/material';
import { darkPaletteText } from 'app/configs/themesConfig';
import { useAppSelector } from 'app/store/hooks';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TarefasContent from './TarefaContent';
import TarefasHeader from './TarefasHeader';

const Tarefas: React.FC = () => {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
  const usuarioLogado = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!usuarioLogado.data.token) {
      navigate('/sign-in');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FusePageCarded
      header={<TarefasHeader title="Lista de Tarefas" showInput />}
      content={
        <>
          <Typography variant="h6" color={darkPaletteText.disabled} sx={{ padding: '30px' }}>
            Organize seu grande dia gerenciando suas tarefas:
          </Typography>
          <TarefasContent />
        </>
      }
      scroll={isMobile ? 'normal' : 'content'}
    />
  );
};

export default Tarefas;
