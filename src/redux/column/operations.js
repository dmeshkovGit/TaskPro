import { createAsyncThunk } from '@reduxjs/toolkit';
import instance from '../../axios/apiInstance';
import toast from 'react-hot-toast';

export const fetchColumns = createAsyncThunk(
  'columns/fetchColumns',
  async (boardId, thunkApi) => {
    try {
      const response = await instance.get('/columns', boardId);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

export const addColumn = createAsyncThunk(
  'columns/addColumn',
  async (columnData, thunkApi) => {
    try {
      const response = await instance.post('/columns', columnData);
      return response.data;
    } catch (error) {
      toast.error('There is already a column with that name');
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

export const deleteColumn = createAsyncThunk(
  'columns/deleteColumn',
  async (columnId, thunkApi) => {
    try {
      const response = await instance.delete(`/columns/${columnId}`);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

export const editColumn = createAsyncThunk(
  'columns/editColumn',
  async ({ columnId, data }, thunkApi) => {
    try {
      const response = await instance.put(`columns/${columnId}`, data);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

export const getColumnById = createAsyncThunk(
  'columns/getColumnById',
  async (columnId, thunkApi) => {
    try {
      const response = await instance.get(`columns/${columnId}`);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);
