import { createAsyncThunk } from '@reduxjs/toolkit';
import instance from '../../axios/apiInstance';

export const fetchAllCards = createAsyncThunk(
  'cards/fetchAllCards',
  async (columnId, thunkApi) => {
    try {
      const response = await instance.get(`/cards/all/${columnId}`);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

export const addCard = createAsyncThunk(
  'cards/addCard',
  async (newCard, thunkApi) => {
    try {
      const response = await instance.post('/cards', newCard);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

export const deleteCard = createAsyncThunk(
  'cards/deleteCard',
  async (cardId, thunkApi) => {
    try {
      const response = await instance.delete(`/cards/${cardId}`);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

export const editCard = createAsyncThunk(
  'cards/editCard',
  async ({ cardId, data }, thunkApi) => {
    try {
      const response = await instance.put(`/cards/${cardId}`, data);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

export const getCardById = createAsyncThunk(
  'cards/getCardById',
  async (cardId, thunkApi) => {
    try {
      const response = await instance.get(`/cards/${cardId}`);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);
