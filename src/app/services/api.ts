/* eslint-disable prettier/prettier */
/* eslint-disable consistent-return */
/* eslint-disable camelcase */
import axios from 'axios';

export interface ITarefa {
  id: string;
  description: string;
  detail: string;
  user_id?: string;
  created_at: Date;
  updated_at: Date;
}

export interface IData {
  id?: string;
  description: string;
  detail: string;
  token: string;
}

export const api = axios.create({
  baseURL: 'https://api-tasks-list.herokuapp.com',
});

async function onGet(url: string, token: string): Promise<ITarefa[] | undefined> {
  try {
    const response = await api.get(url, {
      params: {
        token,
      },
    });

    if (response.data.ok) {
      return response.data.data;
    }
  } catch (err) {
    console.log(err);
    return [];
  }
}

async function onPost(url: string, data: IData): Promise<ITarefa | null> {
  try {
    const response = await api.post(url, data);
    return response.data.data;
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function onDelete(url: string, token: string, id: string): Promise<boolean> {
  try {
    const response = await api.delete(`${url}/${id}`, {
      params: {
        token,
      },
    });
    return response.data.ok;
  } catch (err) {
    console.log(err);
    return false;
  }
}

async function onUpdate(url: string, data: IData): Promise<boolean> {
  try {
    const response = await api.put(url, data);
    return response.data.data;
  } catch (err) {
    console.log(err);
    return false;
  }
}

export { onGet, onPost, onDelete, onUpdate };
