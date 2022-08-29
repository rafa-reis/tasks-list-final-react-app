/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import React, { ReactNode } from 'react';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

interface CustomButtonProps {
  title: string;
  icon: ReactNode;
  path?: string;
  color: string;
  onClick?: () => void;
}

const CustomButton: React.FC<CustomButtonProps> = ({ title, icon, path, color, onClick }) => {
  return (
    <Button
      className=""
      component={path ? Link : null}
      to={path || null}
      variant="contained"
      color={color}
      startIcon={icon}
      onClick={onClick}
    >
      {title}
    </Button>
  );
};

export default CustomButton;
