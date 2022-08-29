import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { IData, ITarefa, onDelete, onGet, onPost, onUpdate } from 'app/services/api';
import { RootState } from 'app/store';

interface IGetParametro {
  url: string;
  token: string;
}

interface IPostParametro {
  url: string;
  data: IData;
}

interface IDeleteParametro {
  id: string;
  url: string;
  token: string;
}

export const buscarTarefas = createAsyncThunk(
  'tarefas/buscarTarefas',
  async (dado: IGetParametro) => {
    const { url, token } = dado;
    const response = await onGet(url, token)
      .then((tarefas) => tarefas)
      .catch((erro) => erro);

    return response;
  }
);

export const criarTarefa = createAsyncThunk(
  'tarefas/criarTarefas',
  async (dado: IPostParametro) => {
    const { url, data } = dado;
    const response = await onPost(url, data)
      .then((tarefas) => tarefas)
      .catch((erro) => erro);

    return response;
  }
);

export const atualizarTarefa = createAsyncThunk(
  'tarefas/atualizarTarefas',
  async (dado: IPostParametro) => {
    const { url, data } = dado;

    const response = await onUpdate(url, data)
      .then((res) => (res ? 'Task atualizada com sucesso!' : 'Erro. Task não atualizada!'))
      .catch((erro) => 'Erro. Task não atualizada!');

    return response;
  }
);

export const excluirTarefa = createAsyncThunk(
  'tarefas/excluirTarefas',
  async (dado: IDeleteParametro) => {
    const { url, id, token } = dado;

    const response = await onDelete(url, id, token)
      .then((res) => (res ? 'Task deletada com sucesso!' : 'Erro. Task não deletada!'))
      .catch((erro) => 'Erro. Task não deletada!');

    return response;
  }
);

const adapter = createEntityAdapter<ITarefa>({
  selectId: (item) => item.id,
});

export const { selectAll, selectById } = adapter.getSelectors((state: RootState) => state.tarefas);

const TarefasSlice = createSlice({
  name: 'tarefas',
  initialState: adapter.getInitialState({
    loading: false,
  }),
  reducers: {
    deletarTarefa: adapter.removeOne,
    updateTarefa: adapter.updateOne,
  },
  extraReducers(builder) {
    builder.addCase(buscarTarefas.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(buscarTarefas.fulfilled, (state, action) => {
      state.loading = false;
      adapter.setAll(state, action.payload);
    });
    builder.addCase(criarTarefa.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(criarTarefa.fulfilled, (state, action) => {
      state.loading = false;
      adapter.addOne(state, action.payload);
    });
    builder.addCase(atualizarTarefa.fulfilled, (state, action) => {
      state.loading = false;
      console.log(action.payload);
    });
    builder.addCase(excluirTarefa.fulfilled, (state, action) => {
      state.loading = false;
      console.log(action.payload);
    });
  },
});

export const { deletarTarefa, updateTarefa } = TarefasSlice.actions;
export default TarefasSlice.reducer;
