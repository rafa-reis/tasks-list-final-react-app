/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import React, { useState } from 'react';
import { Paper, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import AddTaskIcon from '@mui/icons-material/AddTask';
import CustomButton from './CustomButton';
import ModalTarefas from './ModalTarefas';

interface TarefasHeaderProps {
  title: string;
  showInput?: boolean;
}

const TarefasHeader: React.FC<TarefasHeaderProps> = ({ title, showInput }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  return (
    <>
      <div className="flex flex-col sm:flex-row space-y-16 sm:space-y-0 flex-1 w-full items-center justify-between py-32 px-24 md:px-32">
        <Typography
          component={motion.span}
          initial={{ x: -20 }}
          animate={{ x: 0, transition: { delay: 0.2 } }}
          delay={300}
          color="secondary"
          className="text-24 md:text-32 font-extrabold tracking-tight"
        >
          {title}
        </Typography>

        <div className="flex flex-col w-full sm:w-auto sm:flex-row space-y-16 sm:space-y-0 flex-1 items-center justify-end space-x-8">
          {showInput && (
            <Paper
              component={motion.div}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
              className="flex items-center w-full sm:max-w-256 space-x-8 px-16 rounded-full border-1 shadow-0"
            />
          )}

          <CustomButton
            color="primary"
            title="Adicionar Tarefa"
            onClick={handleOpen}
            icon={<AddTaskIcon />}
          />

          {/* <FuseDialog /> */}

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
          />
        </div>
      </div>
      <ModalTarefas openModal={open} closeModal={handleClose} tarefaID="salvar" />
    </>
  );
};

export default TarefasHeader;
