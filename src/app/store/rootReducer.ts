import { combineReducers } from '@reduxjs/toolkit';
import chatPanel from 'app/theme-layouts/shared-components/chatPanel/store';
import quickPanel from 'app/theme-layouts/shared-components/quickPanel/store';
import fuse from './fuse';
import i18n from './i18nSlice';
import user from './userSlice';
import tarefas from '../main/tarefas/store/TarefasSlice';

const combinedReducer = combineReducers({
  fuse,
  i18n,
  user,
  chatPanel,
  quickPanel,
  tarefas,
});

export default combinedReducer;
