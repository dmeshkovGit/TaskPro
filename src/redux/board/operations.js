import { createAsyncThunk } from '@reduxjs/toolkit';
import instance from '../../axios/apiInstance';
import toast from 'react-hot-toast';

export const fetchBoards = createAsyncThunk(
  'boards/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await instance.get('/boards');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
export const addBoard = createAsyncThunk(
  'boards/addBoard',
  async (newBoard, thunkAPI) => {
    try {
      const response = await instance.post('/boards', newBoard);
      toast.success('New board added');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const deleteBoard = createAsyncThunk(
  'boards/deleteBoard',
  async (id, thunkAPI) => {
    try {
      const response = await instance.delete(`/boards/${id}`);
      toast.success('Board was deleted');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const editBoard = createAsyncThunk(
  'boards/editBoard',
  async ({ boardId, data }, thunkApi) => {
    try {
      const response = await instance.put(`boards/${boardId}`, data);
      toast.success('Changes successfully added');
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

export const getBoardById = createAsyncThunk(
  'boards/getBoardById',
  async (id, thunkApi) => {
    try {
      const response = await instance.get(`boards/${id}`);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);
